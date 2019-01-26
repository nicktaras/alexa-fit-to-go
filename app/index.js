/*
  Alexa-Fit-To-Go
  author: Nick Taras
  For more information please visit: 
  https://github.com/nicktaras/alexa-fit-to-go
*/

/* eslint-disable  func-names */
/* eslint-disable  no-console */

// Core libs
const Alexa = require('ask-sdk-core');

// Default APL document
const defaultAplTemplate = require('./aplDocuments/onload.json');

// Application Stores
const randomTipStore = require('./randomTipStore');
const randomJokeStore = require('./randomJokeStore');
const routineStore = require('./routineStore');
const chitChatExerciseStore = require('./chitChatExerciseStore');
const startSpeechStore = require('./startSpeechStore');

// Common Utils
const { getRandomItemFromArr } = require('./utils');

// Help Utils
const { helpConversationHandler } = require('./helpConversationHandler');

// Exercise Utils
const { exerciseConversationHandler } = require('./exerciseConversationHandler');

// State Machine
const ApplicationStateModelStore = require('./applicationState');
var applicationStateModelStore = new ApplicationStateModelStore();
var applicationState = applicationStateModelStore.getApplicationState();

// API's / Facebook
const { getFbUser, shareToWall } = require('./facebookAPI');

// Method can be used to determine if the user has a screen
// const supportsDisplay = require('./supportsDisplay');

// TODO - look to re-integrate aplDocumentMaker.
// Builds APL documents for display devices - TEXT and VIDEO.
// const aplDocumentMaker = require('./aplDocumentMaker');

// On Init of application each load.
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) { 

    let speechText = '';
    let accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;

    // if (applicationState.state.type === 'INIT') {

      if(accessToken == undefined) {
        
        speechText = "Welcome, what type of activity or sport will you be doing today?";

      } else { // Facebook Account is linked.

        const accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
        const fbUserName = await getFbUser(accessToken);
        speechText = "Welcome, " +  fbUserName + " what type of activity or sport will you be doing today?";

      }

      try {

        // supportsDisplay
        return handlerInput.responseBuilder
        .speak(speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: defaultAplTemplate,
          datasources: {}
        })
        .withShouldEndSession(false)
        .getResponse();

      } catch (error) {

        let speechText = "There was an error with fit to go, please try again or restart the application.";
        return handlerInput.responseBuilder
          .speak(speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: defaultAplTemplate,
            datasources: {}
          })
          .withSimpleCard('Error', speechText)
          .withShouldEndSession(false)
          .getResponse();

      }
    // }
  }
};

// TODO - Sports is not currently handled.
const SportIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
       handlerInput.requestEnvelope.request.intent.name === 'sport_intent'
  },
  handle(handlerInput) {
    const speechText = "I'm not ready to teach sports exercise quite yet. Please come back soon, I'll have some great moves to help you prepare for your next game.";
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .getResponse();
  }
};

// Collect data. Elicit ensure we have the difficulty and activity
const ActivityIntentHandlerInit = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
      handlerInput.requestEnvelope.request.intent.name === 'activity_intent' &&
      handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .addDelegateDirective()
      .withShouldEndSession(false)
      .getResponse();
  }
}

const ActivityIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
      handlerInput.requestEnvelope.request.intent.name === 'activity_intent' &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.value &&
      handlerInput.requestEnvelope.request.intent.slots.size.value
  },
  handle(handlerInput) {
    
    // Update State to 'ACTIVITY'
    applicationState = applicationStateModelStore.updateState({ 
      state: applicationState, 
      stateName: 'ACTIVITY'
    });
    
    var userActivity = handlerInput.requestEnvelope.request.intent.slots.exercise.value.toUpperCase();
    var difficulty = handlerInput.requestEnvelope.request.intent.slots.size.value.toUpperCase();
    
    // Update 'ACTIVITY' routine state incase they choose to exercise
    applicationState = applicationStateModelStore.updateRoutineState({ 
      state: applicationState, 
      difficulty: difficulty,
      activity: userActivity
    });

    var speechText = '';
    speechText += getRandomItemFromArr(startSpeechStore);
    speechText += getRandomItemFromArr(chitChatExerciseStore[userActivity.toUpperCase()]);
    speechText += "So, would you like some tips or warm up exercises before todays " + userActivity;
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .getResponse();
  }
};

const ExerciseIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
       handlerInput.requestEnvelope.request.intent.name === 'exercise_intent'
  },
  handle(handlerInput) {

    var aplDisplayTemplate = defaultAplTemplate;

    if (!applicationState) { 
      speechText += 'Sorry something went wrong, my nuts and bolts come loose sometimes. Try restarting me. ';
    }
    if (applicationState && 
        applicationState.state &&
        applicationState.state.type !== 'ACTIVITY'
    ) { 
      speechText += 'Sorry something went wrong, my nuts and bolts come loose sometimes. Try restarting me. ';
    }
    if (applicationState && 
      applicationState.state &&
      applicationState.state.type === 'ACTIVITY'
    ) { 
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });

      var response = exerciseConversationHandler({ state: applicationState });
      var { text, APL } = response;

      if (APL) {
        aplDisplayTemplate = require('./aplDocuments/'+ APL +'.json');
      } 

      speechText = text;

    }
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: aplDisplayTemplate,
        datasources: {}
      })
      .withShouldEndSession(false) // Causes the mic to stay open. This isn't so bad.
      .getResponse()
  }
};

// TODO:
// If you want your skill to play a video and then accept voice input, 
// use the onEnd event handler to invoke a SendEvent command. 
// Your skill should handle the subsequent UserEvent request. 
// Send a response with shouldEndSession set to false to accept voice input. 
// Your response should include appropriate outputSpeech and reprompt objects 
// to ask your Alexa customer for input.
// Ready handler, is used to allow the user to move to the next stage within the applications flow
// TODO - ensure the conversation handler can manage all types of conversation flow.
// TODO - Add other ways to allow the user to continue, ready, lets go, yo, fun ways.
const ReadyIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
     handlerInput.requestEnvelope.request.intent.name === 'ready_intent'
  },
  handle(handlerInput) {

    var aplDisplayTemplate = defaultAplTemplate;
    var speechText = '';

    if (applicationState.state.type === 'ACTIVITY') {
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });

      var response = exerciseConversationHandler({ state: applicationState });
      var { text, APL } = response;

      if (APL) {
        aplDisplayTemplate = require('./aplDocuments/'+ APL +'.json');
      } 

      speechText += text;

    } else {

      speechText += "I've got a bit lost, try restarting me.";

    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: aplDisplayTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .getResponse();
  }
};

const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
    handlerInput.requestEnvelope.request.intent.name === 'repeat_intent'
  },
  handle(handlerInput) {

    var aplDisplayTemplate = defaultAplTemplate;
    var speechText = '';

    if (applicationState.state.type === 'ACTIVITY') {
      
      var response = exerciseConversationHandler({ state: applicationState });
      var { text, APL } = response;

      if (APL) {
        aplDisplayTemplate = require('./aplDocuments/'+ APL +'.json');
      } 

      speechText += text;

    } else {

      speechText += "Sorry, I'm not sure what you want to repeat.";

    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: aplDisplayTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .getResponse();
  }
};

const JokeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'joke_intent';
  },
  handle(handlerInput) {
    const speechText = getRandomItemFromArr(randomJokeStore);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .withSimpleCard('Joke', speechText)
      .getResponse();
  },
};

const TipIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'tip_intent';
  },
  handle(handlerInput) {
    const speechText = getRandomItemFromArr(randomTipStore);
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .withSimpleCard('Tip', speechText)
      .getResponse();
  },
};

const AppFunctionIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'app_function_intent';
  },
  handle(handlerInput) {
    var speechText = "Fit to Go is here to help keep you fit and reduce the chances of injury. ";
    speechText += "You can ask for a tip, joke and follow sets of exercises that have been designed to help prepare you for further activities and sports. ";
    speechText += "However, do not follow any instruction of this application if it will put you at risk of hurting yourself, others or damaging objects within your home."
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .getResponse();
  },
};

const AuthorIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'author_intent';
  },
  handle(handlerInput) {
    var speechText = "A web developer based in Sydney, Australia. ";
    speechText += "He loves sport and exercise, however sometimes struggles to stay fit and has obtained a few injuries from sport. ";
    speechText += "He designed this application for you, to help with your health and fitness. ";
    speechText += "We hope you have a long and enjoyable relationship with sport and exercise."
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .getResponse();
  },
};

const TermsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'terms_intent';
  },
  handle(handlerInput) {
    var speechText = "Fit to go is an experimental fitness tool, we take no liability or costs for the actions, damage, harm caused by those who use it. For full terms and conditions please see the Fit To Go skill page. We hope you enjoy the skill and find it useful in helping you warm up before activities and sport.";
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    
    var speechText = "Fit to Go is here to help keep you fit and reduce the chances of injury. ";
    speechText += "You can ask for a tip, a joke and follow sets of exercises that have been designed to help prepare you for further activities and sports when telling me the sport you wish to exercise for. ";
    speechText += "How can I help you today?";

    if (applicationState){
      speechText = helpConversationHandler({
        applicationState: applicationState
      }).text;
    } 
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .withShouldEndSession(false)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(handlerInput, error);
    return handlerInput.responseBuilder
      .speak("Sorry, fit to go can\'t understand the command. Please say again. If I can't help you find the answer, please restart me.")
      .withShouldEndSession(false)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: defaultAplTemplate,
        datasources: {}
      })
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    JokeIntentHandler,
    TipIntentHandler,
    ActivityIntentHandlerInit,
    ActivityIntentHandler,
    SportIntentHandler,
    HelpIntentHandler,
    ReadyIntentHandler,
    ExerciseIntentHandler,
    RepeatIntentHandler,
    AuthorIntentHandler,
    AppFunctionIntentHandler,
    TermsIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

