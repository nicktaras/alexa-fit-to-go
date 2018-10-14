//
// alexa-fit-to-go
// For more infromation please visit: https://github.com/nicktaras/alexa-fit-to-go
//

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const https = require('https');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
        
    var accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
    if (accessToken == undefined){
      
      // The request did not include a token, so tell the user to link
      // accounts and return a LinkAccount card
      let speechText = "You must have a Facebook account to use this app. " + 
                      "Please use the Alexa app to link your Amazon account ";        
      return handlerInput.responseBuilder
        .speak(speechText)
        .withLinkAccountCard()
        .getResponse();

    } else {
      
      console.log('user has token', handlerInput.requestEnvelope.context.System.user);
      
      let speechText = "You are logged in - well done ";  

      // handlerInput.requestEnvelope.session.user;

      // TODO:
      // FB.setAccessToken(accessToken);   
      
      // let userID = "10161204687095457";
      // let accessToken = "EAADjsOuNQ9ABAC3S4ZB0MDs8Fq1xZBPrcUflwokvr9EdUQxnrJG1cSx8QwKeDWZBfic1gO9h3zQ7Gk5ZAHCHsUWlpifNTaHTZAFLYV4x0eWL0Nk90U09bO1iXMvebrqlSZB8WpPLONk6pDv7pt1dxQGSVyDLYKZCpRyYgNFVOX5ZBgZDZD";
      // let userFBCredentialsURL = 'https://graph.facebook.com/v3.1/'+ userID +'/?access_token=' + accessToken;
      
      let userFBCredentialsURL = 'https://graph.facebook.com/v3.1/me?access_token=' + accessToken + '&fields=id%2Cname%2Cemail&format=json&method=get&pretty=0&suppress_http_code=1';
      
      return https.get(userFBCredentialsURL, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {

          /*
            data : {
              name: String,
              id: Number
            }
          */

          speechText += data.name;

          // This should also verify that the token represents a valid Facebook user.
          return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('fit to go', speechText)
            .getResponse();
        })
        resp.on('error', (error) => {
          let speechText = "Something didnt work, try again.";        
          return handlerInput.responseBuilder
            .speak(speechText)
            .withLinkAccountCard()
            .getResponse();
        });
      });
    }
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
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

// import axios from 'axios';

// const API_KEY = '0568df9eb81d9a701ef8da2bd3b80246';
// const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appId=${API_KEY}`;

// // http://api.openweathermap.org/data/2.5/forecast?appId=0568df9eb81d9a701ef8da2bd3b80246&q=chicago,us

// // A convention to hold a variable type and reduce room
// // for typos.
// export const FETCH_WEATHER = 'FETCH_WEATHER';

// export function fetchWeather(city) {

//   const url = `${ROOT_URL}&q=${city},us`; // us is hardcoded etc.
//   const request = axios.get(url);

//   // the request is a promise - It's stopped until its resolved.
//   // Once data has arrived, the middleware creates a new
//   // FETCH_WEATHER request to return to the reducers.
//   return {
//     type: FETCH_WEATHER,
//     payload: request
//   }
// }
