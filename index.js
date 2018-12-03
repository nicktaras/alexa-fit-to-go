//
// alexa-fit-to-go
// For more infromation please visit: https://github.com/nicktaras/alexa-fit-to-go
//

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const https = require('https');

// Add Stores
const tipStore = require('./tipStore');
const jokeStore = require('./jokeStore');

// Common Util Methods
const { getRandomItemFromArr } = require('./utils');

// // Application state 
// const { getApplicationState, 
//         setApplicationState, 
//         setToNextSubState 
//       } = require('./applicationState/applicationState');
// // apply store state
// {
//   nameRef: 'init', 
//   id: 0, 
//   step: 0;
// }
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
      if (applicationState.state === 'INIT') {
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
          console.log('error found:', error);
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
    let speechText = "Great, would you like to do some warm up exercises?";
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
    // user says, 'a jog'
    applicationState.setState({
      state: 'ACTIVITY',
      substate: undefined
    });
    let speechText = "Great, would you like any tips or warm up exercises?";
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

// TODO add to Alexa:

// tips please, I would like some tips please, tips.
// warm up exercises, I would like some warm up exercises please.
// JOG warm up exercises on the way.. :) 
// We should make these items relevant to the conversation

// TODO make a function to store current intent e.g. going for a jog.
// aim: Great, did you know .... Would you like to do some warm up exercises, a joke or some tips?
// request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.name

// Add conversation handlers for:
// Warm Up Exercises Please
// Ready / Next

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
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
