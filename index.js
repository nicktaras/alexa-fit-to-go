//
// Alexa-Fit-To-Go
// author: Nick Taras
// For more infromation please visit: https://github.com/nicktaras/alexa-fit-to-go
//

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

const { 
  applicationStateModel,
  getApplicationState, 
  updateState,
  updateExerciseState, 
  getNextExerciseState
} = require('./applicationState/applicationState');

// Create a local var of entire app state model history.
var appStateModel = applicationStateModel;
// Get the latest app state from model.
var applicationState = getApplicationState(appStateModel);

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

// Responds to a user who is going to do sport such as soccer.
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

// Responds to a user who is going to do sport such as soccer.
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

// Responds to a user who is going to do an activity like weights or walk the dog.
const ActivityIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
      handlerInput.requestEnvelope.request.intent.name === 'activity_intent'
  },
  handle(handlerInput) {
    console.log('fit to go: ActivityIntentHandler');
    // handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    var userActivity = 'jog';
    // update application state with new data.
    appStateModel = updateState(appStateModel, 'ACTIVITY', { difficulty: 'LIGHT', activity: userActivity.toUpperCase() } );    
    // ask following question.
    var speechText = "Great, ";
    speechText += getRandomItemFromArr(chitChatExerciseStore[userActivity.toUpperCase()]);
    speechText += "So, would you like some tips or warm up exercises before todays " + userActivity;
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();

    // const speechText = 'hello from ActivityIntentHandler';
    // return handlerInput.responseBuilder
    //   .speak(speechText)
    //   .withShouldEndSession(false)
    //   .getResponse();

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
    console.log('fit to go: exercise_intent');
    // Update state to say they want to do exercises.. not get tips etc.
    // get current state.
    applicationState = getApplicationState(appStateModel);
    var speechText = '';
    // if the user tries to hop straight to this point without
    // any exercise defined, let's ask first.
    console.log('applicationState', applicationState);
    if (applicationState.state.type !== 'ACTIVITY') {
      speechText += 'Great, what type of activity or sport will you be doing today';
    } else {

      // TODO! updateExerciseState must be run before we know the exercise.
      // Thing about a pattern for state management.

      speechText = conversationHandler(applicationState);
      console.log('speechText', speechText);
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
};

const ReadyIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
     handlerInput.requestEnvelope.request.intent.name === 'ready_intent'
  },
  handle(handlerInput) {
    // console.log('fit to go: readyIntentHandler');
    // TODO - Tidy this up, there is too much effort to make changes.
    // Get latest state.
    // applicationState = getApplicationState(appStateModel);
    // var speechText = '';
    // if the user tries to hop straight to this point without
    // any exercise defined, let's ask first.
    // if (applicationState.state !== 'ACTIVITY') {
    //   speechText += 'Great, what type of activity or sport will you be doing today';
    // } else {
    //   // Use latest state to get next exercise state
    //   var nextExerciseState = getNextExerciseState(applicationState, routineStore);
    //   // Update app state model to contain the next exercise state
    //   appStateModel = updateExerciseState(appStateModel, nextExerciseState);
    //   // Get the latest state from changes
    //   applicationState = getApplicationState(appStateModel);
    //   // define speech text from application state
    //   speechText = conversationHandler(applicationState);
    // }
    // return handlerInput.responseBuilder
    //   .speak(speechText)
    //   .getResponse();
    const speechText = 'hello from ReadyIntentHandler';
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
    const speechText = 'to do repeat_intent';
    return handlerInput.responseBuilder
      .speak(speechText)
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
    const speechText = getRandomItemFromArr(jokeStore);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};

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
      .getResponse();
  },
};

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

// handlerInput.responseBuilder options:
// .withSimpleCard('Hello World', speechText)
// .reprompt(speechText) || .withShouldEndSession(false)

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
      .withShouldEndSession(false)
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
    console.log(`Error handled: ${error.message}`);
    return handlerInput.responseBuilder
      .speak('Sorry, fit to go can\'t understand the command. Please say again.')
      .withShouldEndSession(false)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

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
