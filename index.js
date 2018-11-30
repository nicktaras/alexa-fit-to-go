//
// alexa-fit-to-go
// For more infromation please visit: https://github.com/nicktaras/alexa-fit-to-go
//

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const https = require('https');

// Custom Handlers
const JokeIntentHandler = require('./JokeIntentHandler');

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

// Responds to the initial user request.
const ActivityIntentHandler = {
  canHandle(handlerInput) {
     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'activity_intent';
  },
  handle(handlerInput) {
    // <amazon:effect name="whispered">I am not a real human.</amazon:effect>
    let speechText = "Great, would you like to do some warm up exercises, learn some tips, or hear a related joke?";
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const TestIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'test';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SportIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'sport_intent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';
    return handlerInput.responseBuilder
      .speak(speechText)
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
    SportIntentHandler,
    ActivityIntentHandler,
    TestIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();


// util methods to get data.
// const getRandomTypeTip = (key) => {
//   let randomTip = tips[key][Math.floor((Math.random() * tips[key].length) + 0)];
//   return randomTip;
// }
// const getRandomTip = () => {
//   let randomKey = Object.keys(tips)[Math.floor((Math.random() * Object.keys(tips).length) + 0)]; 
//   let randomTip = tips[randomKey][Math.floor((Math.random() * tips[randomKey].length) + 0)];
//   return randomTip;
// }
// const tipStore = {
//   "RANDOM": {
//     type: 'text',
//     config: {
//       responseType: ':tell',
//       text: getRandomTip()
//     }
//   },
//   "RANDOM_GYM": {
//     type: 'text',
//     config: {
//       responseType: ':tell',
//       text: getRandomTypeTip('GYM')
//     }
//   }
// }