/*
  Alexa-Fit-To-Go
  author: Nick Taras
  For more information please visit: 
  https://github.com/nicktaras/alexa-fit-to-go
*/

/* eslint-disable  func-names */
/* eslint-disable  no-console */

// TODO REWORK ALEXA so all activities and sports can
// co-exists in one intent.

// Core libs
const Alexa = require('ask-sdk-core');

// Application Stores
// const randomTipStore = require('./randomTipStore');
const TipStore = require('./tipStore');
const randomJokeStore = require('./randomJokeStore');
const routineStore = require('./routineStore');
const chitChatExerciseStore = require('./chitChatExerciseStore');
const startSpeechStore = require('./startSpeechStore');
const mediaStore = require('./mediaStore');

// Common Utils
const { getRandomItemFromArr } = require('./utils');

// Help Utils
const { helpConversationHandler } = require('./helpConversationHandler');

// Exercise Utils
const { exerciseConversationHandler } = require('./exerciseConversationHandler');

// Builds APL documents for display devices - TEXT and VIDEO.
const { aplDocumentMaker } = require('./aplDocumentMaker');

// State Machine
const ApplicationStateModelStore = require('./applicationState');
var applicationStateModelStore = new ApplicationStateModelStore();
var applicationState = applicationStateModelStore.getApplicationState();

// API's / Facebook
const { getFbUser } = require('./facebookAPI');

// Method can be used to determine if the user has a screen
// const supportsDisplay = require('./supportsDisplay');

const supportsDisplay = (handlerInput) => {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
  return hasDisplay;
}

// On Init of application each load.
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  async handle(handlerInput) {

    let speechText = '';
    let accessToken = undefined;

    if (handlerInput &&
      handlerInput.requestEnvelope &&
      handlerInput.requestEnvelope.context &&
      handlerInput.requestEnvelope.context.System &&
      handlerInput.requestEnvelope.context.System.user &&
      handlerInput.requestEnvelope.context.System.user.accessToken
    ) {
      accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
    }

    if (accessToken) { // Facebook Account is linked.

      const fbUserName = await getFbUser(accessToken);
      speechText = "Welcome, " + fbUserName + " what type of activity or sport will you be doing today?";

      if (supportsDisplay(handlerInput)) {
        return handlerInput.responseBuilder
          .speak(speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: aplDocumentMaker({
              handlerInput: handlerInput,
              displayContent: mediaStore.INTRO
            }),
            datasources: {}
          })
          .withShouldEndSession(false)
          .getResponse();

      } else {

        return handlerInput.responseBuilder
          .speak(speechText)
          .withShouldEndSession(false)
          .getResponse();

      }

    } else { // Facebook is not linked

      speechText = "Welcome to Go Fit, ";
      speechText += "I'm here to help you warm up before leaving the house to do more strenuous activities or sport. ";
      speechText += "A link Account home card was sent to your Alexa App in case you wish to connect to us via Facebook. ";
      speechText += "In the meantime let's do some exercises. What type of activity or sport will you be doing today? ";

      if (supportsDisplay(handlerInput)) {

        return handlerInput.responseBuilder
          .speak(speechText)
          .withLinkAccountCard()
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: aplDocumentMaker({
              handlerInput: handlerInput,
              displayContent: mediaStore.INTRO
            }),
            datasources: {}
          })
          .withShouldEndSession(false)
          .getResponse();

      } else {

        return handlerInput.responseBuilder
          .speak(speechText)
          .withLinkAccountCard()
          .withShouldEndSession(false)
          .getResponse();

      }

    }

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
      handlerInput.requestEnvelope.request.intent.name === 'activity_intent'
  },
  handle(handlerInput) {

    // Update State to 'ACTIVITY'
    applicationState = applicationStateModelStore.updateState({
      state: applicationState,
      stateName: 'ACTIVITY'
    });

    // Defaults:
    var userActivity = "WARMUP"
    var difficulty = "LIGHT";

    // Locate user activity from ID (Ideal way of finding exercise).
    if (handlerInput.requestEnvelope.request.intent.slots &&
      handlerInput.requestEnvelope.request.intent.slots.exercise &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0] &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0] &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.id
    ) {

      userActivity = handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.id;

    } else { // fallback. This seems to be an issue with Alexa itself when using the same names.

      if (handlerInput.requestEnvelope.request.intent.slots.exercise.value) {

        userActivity = handlerInput.requestEnvelope.request.intent.slots.exercise.value.toUpperCase().replace(/-/g, "");
      }

    }

    // Locate user difficulty from ID (Ideal way of finding the level of exercise).
    if (handlerInput.requestEnvelope.request.intent.slots &&
      handlerInput.requestEnvelope.request.intent.slots.exercise &&
      handlerInput.requestEnvelope.request.intent.slots.size.resolutions &&
      handlerInput.requestEnvelope.request.intent.slots.size.resolutions.resolutionsPerAuthority &&
      handlerInput.requestEnvelope.request.intent.slots.size.resolutions.resolutionsPerAuthority[0] &&
      handlerInput.requestEnvelope.request.intent.slots.size.resolutions.resolutionsPerAuthority[0].values[0] &&
      handlerInput.requestEnvelope.request.intent.slots.size.resolutions.resolutionsPerAuthority[0].values[0].value &&
      handlerInput.requestEnvelope.request.intent.slots.size.resolutions.resolutionsPerAuthority[0].values[0].value.id
    ) {

      difficulty = handlerInput.requestEnvelope.request.intent.slots.size.resolutions.resolutionsPerAuthority[0].values[0].value.id;

    } else { // fallback

      difficulty = handlerInput.requestEnvelope.request.intent.slots.size.value.toUpperCase().replace(/-/g, "");

    }

    // Update 'ACTIVITY' routine state incase they choose to exercise
    applicationState = applicationStateModelStore.updateRoutineState({
      state: applicationState,
      difficulty: difficulty,
      activity: userActivity
    });

    console.log('applicationState: ', applicationState);

    // If the exercise exists, lets do it. Otherwise we'll 
    // get the user to try again.
    var userActivityExists = (routineStore[applicationState.routineState.type]);
    if (userActivityExists) {

      var speechText = '';
      speechText += getRandomItemFromArr(startSpeechStore);

      if (chitChatExerciseStore[userActivity]) {
        speechText += getRandomItemFromArr(chitChatExerciseStore[userActivity]);
      }

      // TODO Look at how we can do this in a smarter way.
      var playArray = ['BASKETBALL', 'TENNIS', 'CRICKET', 'GOLF', 'NETBALL', 'SOCCER'];
      var doArray = ['WEIGHTS'];
      var exerciseOnlyArray = ['WARMUP'];

      if (playArray.indexOf(userActivity) > -1) {

        speechText += "So, would you like some tips or warm up exercises before you play " + userActivity;

      } else if (doArray.indexOf(userActivity) > -1) {

        speechText += "So, would you like some tips or warm up exercises before you do " + userActivity;

      } else if (exerciseOnlyArray.indexOf(userActivity) > -1) {

        applicationState = applicationStateModelStore.getNextExerciseState({
          state: applicationState,
          routineStore: routineStore
        });

        var response = exerciseConversationHandler({ state: applicationState });
        var { text } = response;

        if (text) {
          speechText += text;
        } else {
          speechText += 'Something went wrong, please restart me.';
          console.log('ERROR: ActivityIntentHandler ', handlerInput);
        }

      } else {

        speechText += "So, would you like some tips or warm up exercises before you go for a " + userActivity;

      }

      if (supportsDisplay(handlerInput)) {

        return handlerInput.responseBuilder
          .speak(speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: aplDocumentMaker({
              handlerInput: handlerInput,
              displayContent: mediaStore.INTRO
            }),
            datasources: {}
          })
          .withShouldEndSession(false)
          .getResponse();

      } else {

        return handlerInput.responseBuilder
          .speak(speechText)
          .withShouldEndSession(false)
          .getResponse();

      }

    } else {

      speechText += "I'm not trained to do exercises for that yet. I'll keep improving on what I can do, please come back again soon.";

      return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(false)
        .getResponse();

    }

  }
};

const ExerciseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'exercise_intent'
  },
  handle(handlerInput) {

    var speechText = '';

    if (!applicationState) {
      speechText += 'Sorry something went wrong, my nuts and bolts come loose sometimes. Try restarting me. ';
      console.log('ERROR: ExerciseIntentHandler ', handlerInput);
    }
    if (applicationState &&
      applicationState.state &&
      applicationState.state.type !== 'ACTIVITY'
    ) {
      speechText += 'Sorry something went wrong, my nuts and bolts come loose sometimes. Try restarting me. ';
      console.log('ERROR: ExerciseIntentHandler ', handlerInput);
    }

    if (applicationState &&
      applicationState.state &&
      applicationState.state.type === 'ACTIVITY'
    ) {

      // Get the next state
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });

      var displayContent = null;
      var response = exerciseConversationHandler({ state: applicationState });
      var { text, APL, withShouldEndSession } = response;

      if (APL) { displayContent = mediaStore[APL]; }
      if (text) { speechText += text; }

      if (supportsDisplay(handlerInput) && displayContent && text) {

        return handlerInput.responseBuilder
          .speak(speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: aplDocumentMaker({
              handlerInput: handlerInput,
              displayContent: displayContent
            }),
            datasources: {}
          })
          .withShouldEndSession(withShouldEndSession ? withShouldEndSession : false)
          .getResponse();

      } else if (text) {

        return handlerInput.responseBuilder
          .speak(speechText)
          .withShouldEndSession(withShouldEndSession ? withShouldEndSession : false)
          .getResponse();

      } else {

        speechText += "Something went wrong, please restart me.";
        console.log('ERROR: ExerciseIntentHandler ', handlerInput);

        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      }

    } else {

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();

    }
  }
};

const ReadyIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ready_intent'
  },
  handle(handlerInput) {

    var speechText = '';

    if (applicationState.state.type === 'ACTIVITY') {

      // Get the next state
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });

      var displayContent = null;
      var response = exerciseConversationHandler({ state: applicationState });
      var { text, APL } = response;

      if (APL) { displayContent = mediaStore[APL]; }
      if (text) { speechText += text; }

      if (supportsDisplay(handlerInput) && displayContent && text) {

        return handlerInput.responseBuilder
          .speak(speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: aplDocumentMaker({
              handlerInput: handlerInput,
              displayContent: displayContent
            }),
            datasources: {}
          })
          .withShouldEndSession(false)
          .getResponse();

      } else if (text) {

        return handlerInput.responseBuilder
          .speak(speechText)
          .withShouldEndSession(false)
          .getResponse();

      } else {

        speechText += "Something went wrong, please restart me.";
        console.log('ERROR: ReadyIntentHandler ', handlerInput);

        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      }

    } else {

      speechText += "Sorry, I've got a bit lost, I'm not sure what you're ready to do exactly. Try restarting me.";
      console.log('ERROR: ReadyIntentHandler ', handlerInput);

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();

    }

  }
};

const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'repeat_intent'
  },
  handle(handlerInput) {

    var speechText = '';

    if (applicationState.state.type === 'ACTIVITY') {

      var displayContent = null;
      var response = exerciseConversationHandler({ state: applicationState });
      var { text, APL } = response;

      if (APL) { displayContent = mediaStore[APL]; }
      if (text) { speechText += text; }

      if (supportsDisplay(handlerInput) && displayContent && text) {

        return handlerInput.responseBuilder
          .speak(speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: aplDocumentMaker({
              handlerInput: handlerInput,
              displayContent: displayContent
            }),
            datasources: {}
          })
          .withShouldEndSession(false)
          .getResponse();

      } else if (text) {

        return handlerInput.responseBuilder
          .speak(speechText)
          .withShouldEndSession(false)
          .getResponse();

      } else {

        speechText += "Something went wrong, please restart me.";
        console.log('ERROR: RepeatIntentHandler ', handlerInput);

        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      }

    } else {

      var speechText = "Sorry, I'm not sure what you want to repeat.";
      console.log('ERROR: RepeatIntentHandler ', handlerInput);
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();

    }
  }
};

const JokeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'joke_intent';
  },
  handle(handlerInput) {
    var speechText = getRandomItemFromArr(randomJokeStore);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .withSimpleCard('Joke', speechText)
      .getResponse();

  }
};

const TipIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'tip_intent';
  },
  handle(handlerInput) {

    var speechText = "";
    var userActivity = undefined;

    if (
      handlerInput.requestEnvelope &&
      handlerInput.requestEnvelope.request &&
      handlerInput.requestEnvelope.request.intent &&
      handlerInput.requestEnvelope.request.intent.slots &&
      handlerInput.requestEnvelope.request.intent.slots.exercise &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0] &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0] &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.id
    ) {
      userActivity = handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    }

    if (TipStore[userActivity]) { // Actvity Specific Tip
      speechText = getRandomItemFromArr(TipStore[userActivity]);
    } else { // Random
      speechText = getRandomItemFromArr(randomTipStore);
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: aplDocumentMaker({
          handlerInput: handlerInput,
          displayContent: mediaStore.INTRO
        }),
        datasources: {}
      })
      .withShouldEndSession(true)
      .withSimpleCard('Tip', speechText)
      .getResponse();
  },
};

const AppFunctionIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'app_function_intent';
  },
  handle(handlerInput) {
    var speechText = "Go fit is here to help keep you fit and reduce the chances of injury. ";
    speechText += "You can ask for a tip, joke and follow sets of exercises that have been designed to help prepare you for further activities and sports. ";
    speechText += "However, do not follow any instruction of this application if it will put you at risk of hurting yourself, others or damaging objects within your home."
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const InitIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'init_intent'
  },
  handle(handlerInput) {
    var speechText = "So, what type of activity or sport will you be doing today?";
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
    speechText += "Enjoy and have a long and enjoyable relationship with sport and exercise."
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const TermsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'terms_intent';
  },
  handle(handlerInput) {
    var speechText = "Go fit is an experimental fitness tool, we take no liability or costs for the actions, damage, harm caused by those who use it. For full terms and conditions please see the Go fit skill page. We hope you enjoy the skill and find it useful in helping you warm up before activities and sport. ";
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

    var speechText = "Go fit is here to help keep you fit and reduce the chances of injury. ";
    speechText += "You can ask for a tip, a joke and follow sets of exercises that have been designed to help prepare you for further activities and sports when telling me the sport you wish to exercise for. ";
    speechText += "How can I help you today?";

    if (applicationState) {
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

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    var speechText = 'Goodbye!';
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

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log('ERROR: ErrorHandler ', handlerInput, error);
    return handlerInput.responseBuilder
      .speak("Sorry, Go fit can\'t understand the command. Please say again. If I can't help you find the answer, please restart me.")
      .withShouldEndSession(false)
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
    HelpIntentHandler,
    ReadyIntentHandler,
    ExerciseIntentHandler,
    RepeatIntentHandler,
    AuthorIntentHandler,
    AppFunctionIntentHandler,
    TermsIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    InitIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

