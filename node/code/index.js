//
// alexa-fit-to-go
// For more information please visit: https://github.com/nicktaras/alexa-fit-to-go
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
      let speechText = "You must have a Facebook account to use this app. Please use the Alexa app to link your Amazon account ";        
      return handlerInput.responseBuilder
        .speak(speechText)
        .withLinkAccountCard()
        .getResponse();
    } else {
      let speechText = "Just fetching your user profile, wait one moment please."; 
      return handlerInput.responseBuilder
        .speak(speechText)
        .withLinkAccountCard()
        .getResponse();
    }
  },
  async handle(handlerInput) { 
    try {
      const accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
      const fbUser = await getFbUser(accessToken);
      let capabilites = [
        "To do some exercise before you head out to do some real sport or an activity say, exercise ",
        "To hear some tips say, tips ",
        "Lastly, to check the best day to go out this week to exercise in the sun just say, when's the sun next out. "
      ];
      let speechText = "Great, " +  fbUser.name + " your profile has been connected. ";
      speechText += "Let's get started. " + capabilites[0], capabilites[1], capabilites[2];
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
        .getResponse()
    }
  }
};

// API's:
// Facebook
// Calendar
// Weather

// Monetise:
// Exercise routines
// Advertisement?

// Handle alternative responses
// Cancel, Help and help areas (make help sub trees)
// Handle repeat of actions
// Tidy code into JSON format imports / speech and methods.

// Store to DB using app user id.

// Injury / Emergency

// Please seek medical advice. Or if it is an emergency please call ...
// I can call the emergency services for you if you need, just say "YES Call Now".

// IDEAS for EXERCISE (MATH RANDOM - 30 mins to implement)

// How about....
// Cycling around the park
// Going for a walk with a mate
// Finding a meetup group or exercise class
// Doing a karate lessons
// Learning the ancient art of Tai Chi
// Laughing Yoga
// Yoga
// Swimming
// asking a friend if they want to play a sport, like tennis or catch?
// calling around to get a cricket match together at the park?

// ACTIVIY EXERCISE

// SPORTS EXERCISE

// JOKES (MATH RANDOM - 30 mins to implement)

// Was in the gym earlier and decided to jump on the treadmill.
// People were giving me weird looks, so I started jogging instead.

// Treadmills get you nowhere.

// I made the mistake of buying a running machine the other day....
// Haven't seen it since.

// TIPS: (MATH RANDOM - 30 mins to implement)

// SOURCE: https://www.betterhealth.vic.gov.au/health/ten-tips/10-tips-to-exercise-safely

// Be aware of your body. Think about how the particular exercise is making you feel. If something doesn’t feel right, stop immediately and seek medical advice.
// Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.
// Pace yourself. Have at least one recovery day each week to rest. If you are experiencing pain, rest until the pain has gone.
// Mix it up. Try other sports and exercises to reduce the risk of overtraining.
// Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.
// Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after a session.
// Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.
// Do it right. Try to get the technique right from the beginning, to ensure you are using your muscles correctly.
// Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety.
// Be sensible, especially at night or in secluded areas. Take a friend or your dog, stick to well-lit areas and wear bright or light-reflective clothing so drivers can see you.

// So you've worked out on the weekend, and you want to keep up the momentum around office hours.
// How about trying some of the following ideas:
// Get off one bus, train, tram stop earlier and walk
// Park car further away from work and walk
// Consider cycling to work
// Walk more briskly on your commute or in between meetings
// Walking meetings
// Choose a bathroom further away
// Make sure you take a break from your screen over lunch
// Take the stairs and not the elevator

// Exercise doesnt have to be scoring the goal, or hitting the wickets. 
// What about trying out some of these types of exercise instead; Gardening, washing the car or House work.
// It's a win win - exercise and a chore knocked off the list.

// get Facebook User data available to application.
// accessToken (String)
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
          results : {
            name: String,
            id: Number,
            email: String
          }
        */
        let output = JSON.parse(results.response);
        resolve(output);
      });
      resp.on('error', (error) => {
        reject(error);
      });
    });
  });
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'For Help, ask me things like: give me an exercise tip or tell me what activiy or sport you are doing today.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('fit to go', speechText)
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
      .withSimpleCard('fit to go', speechText)
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
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
