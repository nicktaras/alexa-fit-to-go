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

// Common Util Methods
const { getRandomItemFromArr } = require('./utils');

// Custom
const { 
  conversationHandler 
} = require('./conversationHandler/conversationHandler');

const ApplicationStateModelStore = require('./applicationState/applicationState');

// Create instance of state machine class.
var applicationStateModelStore = new ApplicationStateModelStore();

// Define the initial application state.
var applicationState = applicationStateModelStore.getApplicationState();

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
      if (applicationState.state.type === 'INIT') {
        try {
          const accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
          const fbUserName = await getFbUser(accessToken);
          let speechText = "Welcome, " +  fbUserName + " what type of activity or sport will you be doing today?";
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
      } else  {
        let speechText = "TO DO. User has loaded application and it is beyond the INIT state.";
          return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
      }
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

// Sport handler, responds to a user who is going to do sport such as soccer.
// TODO - 
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

// Activity handler, for example responds to a user who is going for a jog.
const ActivityIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
      handlerInput.requestEnvelope.request.intent.name === 'activity_intent'
  },
  handle(handlerInput) {
    console.log('fit to go: ActivityIntentHandler');
    
    applicationState = applicationStateModelStore.updateState({ 
      state: applicationState, 
      stateName: 'ACTIVITY'
    });

    var userActivity = 'JOG'; // default
    // if (handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.name){
    //   userActivity = handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    // } 

    // TODO consider merge state keys with main state? This may help reduce the code effort.
    applicationState = applicationStateModelStore.updateRoutineState({ 
      state: applicationState, 
      difficulty: 'HARD',
      activity: userActivity
    });


    // FIXME!
    // undefinedTo continue say next or repeat to do the step again.
    
    // TODO make a store to store a list of speech starters.
    var speechText = "Great, ";
    // TODO Create a function that will build a response correctly here.
    speechText += getRandomItemFromArr(chitChatExerciseStore[userActivity.toUpperCase()]);
    speechText += "So, would you like some tips or warm up exercises before todays " + userActivity;
    // TODO Elicit extra conversation when required.
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      // .addElicitSlotDirective(difficulty, difficultyIntent);
      .getResponse();
  }
};

// When user asks to have a warm up.
// TODO: find out if they are doing, light, med, hard type of exercise.

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

      var speechText = conversationHandler({ state: applicationState }).text;
      
    } 
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
};

// Ready handler, is used to allow the user to move to the next stage within the applications flow
// TODO - ensure the conversation handler can manage all types of conversation flow.
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

      speechText = conversationHandler({ state: applicationState }).text;
    
    } else {
      
      speechText += 'Handle user flow here. What are they ready to do?';
      
    }

    return handlerInput.responseBuilder
      .speak(speechText)
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
    // TODO if the user is at the end of the routine,
    // take them back to the first step.
    // For MVP we could just finish here.
    const speechText = conversationHandler({ state: applicationState }).text;
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

// Help handler, helps user find their way
// TODO - build out from insights. log user activity.
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Here to help.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};

// updateRoutineState,
// updateExerciseState, 
// getNextExerciseState
// handlerInput.responseBuilder options:
// .withSimpleCard('Hello World', speechText)
// .reprompt(speechText) || .withShouldEndSession(false)

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
    console.log(`Error handled: ${error.message}`);
    return handlerInput.responseBuilder
      .speak('Sorry, fit to go can\'t understand the command. Please say again.')
      .withShouldEndSession(false)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

// Assign all app handlers
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    InitIntentHandler,
    JokeIntentHandler,
    TipIntentHandler,
    ActivityIntentHandler,
    SportIntentHandler,
    HelpIntentHandler,
    ReadyIntentHandler,
    ExerciseIntentHandler,
    RepeatIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
