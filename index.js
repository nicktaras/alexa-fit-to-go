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
const { conversationHandler } = require('./conversationHandler/conversationHandler');
const { 
  getApplicationState, 
  setState,
  setNextExerciseState, 
  getNextExerciseState
} = require('./applicationState/applicationState');

// App state
const applicationState = getApplicationState();

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
        .withLinkAccountCard()
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
            .reprompt(speechText)
            .withSimpleCard('fit to go', speechText)
            .getResponse();
        } catch (error) {
          let speechText = "There was an error with fit to go, try again.";
          return handlerInput.responseBuilder
            .speak(speechText)
            .withLinkAccountCard()
            .getResponse();
        }
      } else  {
        // TODO jump to last state.
        // e.g. if the user was doing an exercise let them return or restart the app.
        // let speechText = "It looks like you didn't complete your previous warm up exercise, would you like to return?";
        let speechText = "TO DO. User has loaded application and it is beyond the INIT state.";
          return handlerInput.responseBuilder
            .speak(speechText)
            .withLinkAccountCard()
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
const SportIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
       handlerInput.requestEnvelope.request.intent.name === 'sport_intent'
  },
  handle(handlerInput) {
    // console.log('fit to go: SportIntentHandler');
    // var userSport = request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    // setState(applicationState, 'SPORT', { activity: userSport.toUpperCase(), difficulty: 'LIGHT' });
    // let speechText = "Great, would you like to do some warm up exercises?";
    // return handlerInput.responseBuilder
    //   .speak(speechText)
    //   .getResponse();
    const speechText = 'hello from SportIntentHandler';
    return handlerInput.responseBuilder
      .speak(speechText)
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
    var userActivity = handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    
    setState(applicationState, 'ACTIVITY', { difficulty: 'LIGHT', activity: userActivity.toUpperCase() } );
    
    var speechText = "Great, ";
    speechText += getRandomItemFromArr(chitChatExerciseStore[userActivity.toUpperCase()]);
    speechText += "So, would you like some tips or warm up exercises?";
    return handlerInput.responseBuilder
      .speak(speechText)
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
    console.log('fit to go: exerciseIntentHandler');
    // applicationState = getApplicationState();
    // const speechText = conversationHandler(applicationState);
    // return handlerInput.responseBuilder
    //   .speak(speechText)
    //   .getResponse();
    const speechText = 'hello from ExerciseIntentHandler';
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const ReadyIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
     handlerInput.requestEnvelope.request.intent.name === 'ready_intent'
  },
  handle(handlerInput) {
    console.log('fit to go: readyIntentHandler');
    // const nextExerciseState = getNextExerciseState(applicationState, routineStore);
    // setNextExerciseState(applicationState, nextExerciseState);
    // applicationState = getApplicationState();
    // const speechText = conversationHandler(applicationState);
    const speechText = 'hello from ReadyIntentHandler';
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
    handlerInput.requestEnvelope.request.intent.name === 'repeat_intent'
  },
  handle(handlerInput) {
    const speechText = 'to do';
    return handlerInput.responseBuilder
      .speak(speechText)
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
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
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
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
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
      .withSimpleCard('Hello World', speechText)
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
      .reprompt('Sorry, fit to go can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
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
