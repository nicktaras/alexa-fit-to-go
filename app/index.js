/*
  Alexa-Fit-To-Go
  author: Nick Taras
  For more infromation please visit: 
  https://github.com/nicktaras/alexa-fit-to-go
*/

/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('ask-sdk-core');
const https = require('https');

// Add Stores
const tipStore = require('./tipStore');
const jokeStore = require('./jokeStore');
const routineStore = require('./routineStore');
const chitChatExerciseStore = require('./chitChatExerciseStore');
const startSpeechStore = require('./startSpeechStore');

// Common Util Methods
const { getRandomItemFromArr } = require('./utils');

const { 
  exerciseConversationHandler 
} = require('./exerciseConversationHandler/exerciseConversationHandler');

// Help Conversation Handler
const { 
  helpConversationHandler 
} = require('./helpConversationHandler/helpConversationHandler');

const ApplicationStateModelStore = require('./applicationState/applicationState');

// Create instance of state machine class.
var applicationStateModelStore = new ApplicationStateModelStore();

// Define the initial application state.
var applicationState = applicationStateModelStore.getApplicationState();

// Does app support the display
function supportsDisplay(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
  return hasDisplay;
}

// Application Launch handler.
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) { 
    var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
    if (accessToken == undefined){
      let speechText = "You must have a Facebook account to use this app. Please use the Alexa app to link your Amazon account ";        
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Fit To Go', speechText)
        .getResponse();
    } else {
     
      // if the application is in its initial state and the user is logged in.
      // if (applicationState.state.type === 'INIT') {

      try {
        const accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
        const fbUserName = await getFbUser(accessToken);
        let speechText = "Welcome, " +  fbUserName + " what type of activity or sport will you be doing today?";

        if (supportsDisplay) {
            
          const myImage = new Alexa.ImageHelper()
          .addImageInstance('https://github.com/nicktaras/alexa-physio-me/blob/master/assets/double_heal_lifts.gif?raw=true')
          .getImage();

          const primaryText = new Alexa.RichTextContentHelper()
            .withPrimaryText(speechText)
            .getTextContent();

          handlerInput.responseBuilder
          .addRenderTemplateDirective({
            type: 'BodyTemplate1',
            token: 'string',
            backButton: 'HIDDEN',
            backgroundImage: myImage,
            title: "Fit to Go",
            textContent: primaryText,
          })

        } 

        return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(false)
        .getResponse();

      } catch (error) {
        let speechText = "There was an error with fit to go, try again.";
        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Error', speechText)
          .withShouldEndSession(false)
          .getResponse();
      }

      // } else  { // TODO handle when user comes back at later stage of app
        // let speechText = "User is at state beyond init:" + applicationState.state.type;
        //   return handlerInput.responseBuilder
        //     .speak(speechText)
        //     .withShouldEndSession(false)
        //     .getResponse();
      // }

    }
  }
};

const getFbUser = (accessToken) => {
  let userFBCredentialsURL = 'https://graph.facebook.com/v3.1/me?access_token=' + accessToken;
  return new Promise(function (resolve, reject) {
    https.get(userFBCredentialsURL, (resp) => {
      var results = { response: "" };
      resp.on('data', (chunk) => {
        results.response += chunk;
      });
      resp.on('end', () => {
        /*
          data : {
            name: String,
            id: Number,
            email: String
          }
        */
        let output = JSON.parse(results.response);
        resolve(output.name);
      });
      resp.on('error', (error) => {
        reject(error);
      });
    });
  });
};

// Init handler is to allow the user to go back to the start of the application.
// TODO - Move the state back to 'INIT'.
const InitIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
       handlerInput.requestEnvelope.request.intent.name === 'init_intent'
  },
  handle(handlerInput) {
    const speechText = 'hello from InitIntentHandler,';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
};

// TODO - Sports is not currently handled.
const SportIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
       handlerInput.requestEnvelope.request.intent.name === 'sport_intent'
  },
  handle(handlerInput) {
    const speechText = 'hello from SportIntentHandler';
    return handlerInput.responseBuilder
      .speak(speechText)
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

// Ask if the user would like exercises, tips, or jokes.
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
    // Create var reference to difficulty and exercise type.
    var userActivity = handlerInput.requestEnvelope.request.intent.slots.exercise.value.toUpperCase();
    var difficulty = handlerInput.requestEnvelope.request.intent.slots.size.value.toUpperCase();
    // Update 'ACTIVITY' routine state incase they choose to exercise
    applicationState = applicationStateModelStore.updateRoutineState({ 
      state: applicationState, 
      difficulty: difficulty,
      activity: userActivity
    });
    // BUG FIXME! Try to replicate this.
    // undefinedTo continue say next or repeat to do the step again.
    var speechText = '';
    speechText += getRandomItemFromArr(startSpeechStore);
    speechText += getRandomItemFromArr(chitChatExerciseStore[userActivity.toUpperCase()]);
    speechText += "So, would you like some tips or warm up exercises before todays " + userActivity;
    return handlerInput.responseBuilder
      .speak(speechText)
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
    if (!applicationState) { 
      speechText += 'Something went wrong. ApplicationState is not defined';
    }
    if (applicationState && 
        applicationState.state &&
        applicationState.state.type !== 'ACTIVITY'
    ) { 
      speechText += 'Something went wrong, it appears you got to this stage to early.';
    }
    if (applicationState && 
      applicationState.state &&
      applicationState.state.type === 'ACTIVITY'
    ) { 
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });
      var speechText = exerciseConversationHandler({ state: applicationState }).text;
      // test video
      // handlerInput.responseBuilder.addVideoAppLaunchDirective("https://github.com/nicktaras/alexa-physio-me/blob/master/assets/double_heal_lifts.mp4", "title", "subtitle");
      const myImage = new Alexa.ImageHelper()
      .addImageInstance('https://github.com/nicktaras/alexa-physio-me/blob/master/assets/double_heal_lifts.gif?raw=true')
      .getImage();

      const primaryText = new Alexa.RichTextContentHelper()
        .withPrimaryText(speechText)
        .getTextContent();

      handlerInput.responseBuilder
      .addRenderTemplateDirective({
        type: 'BodyTemplate1',
        token: 'string',
        backButton: 'HIDDEN',
        backgroundImage: myImage,
        title: "Fit to Go",
        textContent: primaryText,
      })
      
    } 

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
};

// Ready handler, is used to allow the user to move to the next stage within the applications flow
// TODO - ensure the conversation handler can manage all types of conversation flow.
// TODO - Add other ways to allow the user to continue, ready, lets go, yo, fun ways.
const ReadyIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
     handlerInput.requestEnvelope.request.intent.name === 'ready_intent'
  },
  handle(handlerInput) {
    var speechText = '';
    if (applicationState.state.type === 'ACTIVITY') {
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });
      speechText = exerciseConversationHandler({ state: applicationState }).text;
    } else {
      speechText += 'Handle user flow here. What are they ready to do?';
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
};

// TOOD should be repeat exercise handler.
const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
    handlerInput.requestEnvelope.request.intent.name === 'repeat_intent'
  },
  handle(handlerInput) {

    // Check if its the last exercise
    var isLastExercise = ApplicationStateModelStore.isLastExercise({
      state: applicationState,
      routineStore: routineStore
    });

    var speechText;

    // Exercise reset
    if(isLastExercise) {
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });
      speechText = exerciseConversationHandler({ state: applicationState }).text;
    } else {
      speechText = exerciseConversationHandler({ state: applicationState }).text;
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
};

// Joke handler, gives some random jokes
const JokeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'joke_intent';
  },
  handle(handlerInput) {
    const speechText = getRandomItemFromArr(jokeStore);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .withSimpleCard('Joke', speechText)
      .getResponse();
  },
};

// Tip handler, gives some random tips
const TipIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'tip_intent';
  },
  handle(handlerInput) {
    const speechText = getRandomItemFromArr(tipStore);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .withSimpleCard('Tip', speechText)
      .getResponse();
  },
};

// app_function_intent
// How do I use this App || Tell me how to use this App
// What does this Application do | How can this Application help me
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
      .withShouldEndSession(false)
      .getResponse();
  },
};

// What are the terms of using this App?
const TermsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'terms_intent';
  },
  handle(handlerInput) {
    var speechText = "For terms and conditions please see the Fit To Go skill page.";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};
  
// Help handler, helps user find their way
// TODO - build out from insights. log user activity.
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    
    var speechText = "How can I help?";

    if (applicationState){
      speechText = helpConversationHandler({
        applicationState: applicationState
      }).text;
    } 
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};

// Cancel handler, allow user to leave the app
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

// Error handler, catches application errors
// TODO - improve effort to catch errors so fixes can be made
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(handlerInput, error);
    // Send mishandled text to DynamoDB. Or logs. Read best practice.
    return handlerInput.responseBuilder
      .speak('Sorry, fit to go can\'t understand the command. Please say again.')
      .withShouldEndSession(false)
      .getResponse();
  },
};

// What's the difference?
// const skillBuilder = Alexa.SkillBuilders.standard();
const skillBuilder = Alexa.SkillBuilders.custom();

// Assign all app handlers
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    InitIntentHandler,
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

// Dev API options:
// speak(speechOutput: string): this;
// reprompt(repromptSpeechOutput: string): this;
// withSimpleCard(cardTitle: string, cardContent: string): this;
// withStandardCard(cardTitle: string, cardContent: string, smallImageUrl?: string, largeImageUrl?: string): this;
// withLinkAccountCard(): this;
// withAskForPermissionsConsentCard(permissionArray: string[]): this;
// withCanFulfillIntent(canFulfillIntent : CanFulfillIntent) : this;
// addDelegateDirective(updatedIntent?: Intent): this;
// addElicitSlotDirective(slotToElicit: string, updatedIntent?: Intent): this;
// addConfirmSlotDirective(slotToConfirm: string, updatedIntent?: Intent): this;
// addConfirmIntentDirective(updatedIntent?: Intent): this;
// addAudioPlayerPlayDirective(playBehavior: interfaces.audioplayer.PlayBehavior, url: string, token: string, offsetInMilliseconds: number, expectedPreviousToken?: string, audioItemMetadata? : AudioItemMetadata): this;
// addAudioPlayerStopDirective(): this;
// addAudioPlayerClearQueueDirective(clearBehavior: interfaces.audioplayer.ClearBehavior): this;
// addRenderTemplateDirective(template: interfaces.display.Template): this;
// addHintDirective(text: string): this;
// addVideoAppLaunchDirective(source: string, title?: string, subtitle?: string): this;
// withShouldEndSession(val: boolean): this;
// addDirective(directive: Directive): this;
// getResponse(): Response;
// updateRoutineState,
// updateExerciseState, 
// getNextExerciseState
// handlerInput.responseBuilder options:
// .withSimpleCard('Hello World', speechText)
// .reprompt(speechText) || .withShouldEndSession(false)
// ideas: 
// Send gifs / video to card when exercise of events are complete e.g. linked account.
