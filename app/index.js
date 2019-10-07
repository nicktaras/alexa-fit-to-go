// ---------------------------------- //
//  Alexa-Go-Fit                      //
//  author: Nicholas Alexander Taras  //
// ---------------------------------- //

/* eslint-disable  func-names */
/* eslint-disable  no-console */

// Core libs
const Alexa = require('ask-sdk-core');

// --------------------------------- //
// Application Stores                //
// --------------------------------- //

// TODO - merge Tips and Jokes into one intent type.

// General conversation flow speech store
const appStartConversationFlow = require('./appStartConversationFlow');
// Contains activity routines
const routineStore = require('./routineStore');
// Used to create a more natural conversation with user at the start of each comment
const startSpeechStore = require('./startSpeechStore');
// Used to create a more natural conversation with user during conversation
const chitChatExerciseStore = require('./chitChatExerciseStore');
// Provides the media location to all video files of application
const mediaStore = require('./mediaStore');
// For Tips, Jokes and Facts:
// [storename][Random] - This store is used when the activity is unknown to the application.
const randomTipStore = require('./randomTipStore');
const randomJokeStore = require('./randomJokeStore');
// [storename] - This store is used when the activity is known, providing more specific conteent.
const tipStore = require('./tipStore');
const jokeStore = require('./jokeStore');
// Dynamic conversation
const anotherJokeStore = require('./anotherJokeStore');
const anotherTipStore = require('./anotherTipStore');

// Common Utils
const { getRandomItemFromArr } = require('./utils');

// Help Utils
const { helpConversationHandler } = require('./helpConversationHandler');

// Exercise Utils
const { exerciseConversationHandler } = require('./exerciseConversationHandler');

// Builds APL documents for display devices - TEXT and VIDEO
const { aplDocumentMaker } = require('./aplDocumentMaker');

// State Machine
const ApplicationStateModelStore = require('./applicationState');
let applicationStateModelStore = new ApplicationStateModelStore();
let applicationState = applicationStateModelStore.getApplicationState();

// Determines if the user has a display
const supportsDisplay = (handlerInput) => {
  let hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
  return hasDisplay;
}

// App Init - Start conversation with user.
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const speechText = getRandomItemFromArr(appStartConversationFlow);
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
  }
}

// Elicit user to ensure we have the difficulty and activity.
// Is this working correctly? TODO test, check.
const ActivityIntentHandlerInit = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'activity_intent' &&
      handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent.slots &&
      handlerInput.requestEnvelope.request.intent.slots.exercise &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0] &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0] &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value &&
      handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.id
    ) {
      let userActivity = handlerInput.requestEnvelope.request.intent.slots.exercise.resolutions.resolutionsPerAuthority[0].values[0].value.id;
      applicationState = applicationStateModelStore.updateRoutineState({
        state: applicationState,
        difficulty: "LIGHT",
        activity: userActivity
      });
    }
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
    let speechText = '';
    let userActivity = "WARMUP"
    let difficulty = "LIGHT";
    // Locate user activity from ID (Ideal way of finding exercise e.g. 'SOCCER').
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
    // Locate user difficulty from ID (Ideal way of finding the level of exercise e.g. 'HARD').
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
    // If the exercise exists, lets do it. Otherwise we'll 
    // get the user to try again.
    let userActivityExists = (routineStore[applicationState.routineState.type]);
    if (userActivityExists) {
      speechText += getRandomItemFromArr(startSpeechStore);
      if (chitChatExerciseStore[userActivity]) {
        speechText += getRandomItemFromArr(chitChatExerciseStore[userActivity]);
      }
      // Keys to exercises - TODO, store these elsewhere.
      let playArray = ['BASKETBALL', 'TENNIS', 'CRICKET', 'GOLF', 'NETBALL', 'SOCCER'];
      let doArray = ['WEIGHTS'];
      let exerciseOnlyArray = ['WARMUP'];
      if (playArray.indexOf(userActivity) > -1) {
        speechText += "Would you like tips or perhaps some warm up exercises to practice, that will help the next time you play " + userActivity;
      } else if (doArray.indexOf(userActivity) > -1) {
        speechText += "Would you like tips or perhaps some warm up exercises to practice, that will help the next time you do " + userActivity;
      } else if (exerciseOnlyArray.indexOf(userActivity) > -1) {
        // Exercise Step is given here. 
        // TODO Confirm if this type of even can be triggered here
        // it maybe duplication of code!
        applicationState = applicationStateModelStore.getNextExerciseState({
          state: applicationState,
          routineStore: routineStore
        });
        let response = exerciseConversationHandler({ state: applicationState });
        let { text } = response;
        if (text) {
          speechText += text;
        } else {
          speechText += 'Something went wrong, I did not understand the request, please restart me.';
          console.log('ERROR: ActivityIntentHandler ', handlerInput);
        }
      } else {
        // e.g. JOG
        speechText += "Would you like tips or perhaps some warm up exercises to practice, that will help the next time you " + userActivity;
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
      speechText += "I'm not trained to do exercises for that yet. I'll keep improving on what I can do, please try again soon.";
      return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(false)
        .getResponse();
    }
  }
};

// When asked if you would like to do warm ups.
// User can respond with warm ups and we'll handle the conversation here
// should it relate to starting an exercise routine.
const ExerciseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'exercise_intent'
  },
  handle(handlerInput) {
    let speechText = '';
    if (!applicationState) {
      // User has come too far into the application without providing details.
      speechText = appStartConversationFlow.init; // random
      console.log('ERROR: ExerciseIntentHandler missing application state. ', handlerInput);
    }
    if (applicationState &&
      applicationState.state &&
      applicationState.state.type !== 'ACTIVITY'
    ) {
      speechText += 'Sorry I could not remember the activity you were interested in. Can you start over.';
      console.log('ERROR: ExerciseIntentHandler missing activity. ', handlerInput);
    }
    if (applicationState &&
      applicationState.state &&
      applicationState.state.type === 'ACTIVITY'
    ) {
      // Get the next state from the activity routine sequence
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });
      let displayContent = null;
      let response = exerciseConversationHandler({ state: applicationState });
      let { text, APL, withShouldEndSession } = response;
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
        speechText += "I'm not trained to do exercises for that yet. I'll keep improving on what I can do, say another sport or activity.";
        console.log('ERROR: ExerciseIntentHandler ', handlerInput);
        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      }
    } else {
      return handlerInput.responseBuilder
        .speak("I'm not trained to do exercises for that yet. I'll keep improving on what I can do, say another sport or activity.")
        .getResponse();
    }
  }
};

// Next exercise in the routine trigger.
const ReadyIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ready_intent'
  },
  handle(handlerInput) {
    let speechText = '';
    if (applicationState.state.type === 'ACTIVITY') {
      // Get the next state
      applicationState = applicationStateModelStore.getNextExerciseState({
        state: applicationState,
        routineStore: routineStore
      });
      let displayContent = null;
      let response = exerciseConversationHandler({ state: applicationState });
      let { text, APL } = response;
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
      speechText += "Sorry, I've got a bit lost, I'm not sure what you're ready to do exactly. Ask me to start over.";
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
    let speechText = '';
    if (applicationState.state.type === 'ACTIVITY') {
      let displayContent = null;
      let response = exerciseConversationHandler({ state: applicationState });
      let { text, APL } = response;
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
      let speechText = "Sorry, I'm not sure what you want to repeat.";
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
    let speechText = "";
    if (
      applicationState &&
      applicationState.routineState &&
      applicationState.routineState.activity &&
      jokeStore[applicationState.routineState.activity]
    ) { // Actvity Specific Joke
      speechText += getRandomItemFromArr(jokeStore[applicationState.routineState.activity]);
    } else { // Random joke when we don't know a preferred activity.
      speechText += getRandomItemFromArr(randomJokeStore);
    }
    // Ask the user if they want another joke.
    speechText += getRandomItemFromArr(anotherJokeStore);
    // ----- //
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
      .withSimpleCard('Tip', speechText)
      .getResponse();
  }
};

const TipIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'tip_intent';
  },
  handle(handlerInput) {
    let speechText = "";
    if (
      applicationState &&
      applicationState.routineState &&
      applicationState.routineState.activity &&
      tipStore[applicationState.routineState.activity]
    ) { // Actvity Specific Tip
      speechText = getRandomItemFromArr(tipStore[applicationState.routineState.activity]);
    } else { // Random
      speechText = getRandomItemFromArr(randomTipStore);
    }
    // Ask the user if they want another tip.
    speechText += getRandomItemFromArr(anotherTipStore);
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
    let speechText = "Go fit is here to help keep you fit and reduce the chances of injury. ";
    speechText += "You can ask for a tip, joke and follow sets of exercises that have been designed to help prepare you for further activities and sports. ";
    speechText += "Do not follow any instruction of this application if it will put you at risk of hurting yourself, others or damaging objects within your home."
    speechText += " Why not ask me which exercise you are interested about today.";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const InitIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'init_intent'
  },
  handle(handlerInput) {
    let speechText = "So, what type of activity or sport are you interested in today?";
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
    let speechText = "A web developer based in Sydney, Australia. ";
    speechText += "He loves sport and exercise, however sometimes struggles to stay fit and has obtained a few injuries from sport. ";
    speechText += "He designed this application for you, to help with your health and fitness. ";
    speechText += "Enjoy and have a long and enjoyable relationship with sport and exercise."
    speechText += " Anyway, its not about him, its about you. Why not tell me which sport or activity you are interested about today and we can go from there. ";
    return handlerInput.responseBuilder
      .speak(speechText)
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
    let speechText = "Go fit is an experimental fitness tool, we take no liability or costs for the actions, damage, harm caused by those who use it. For full terms and conditions please see the Go fit skill page. We hope you enjoy the skill and find it useful in helping you warm up before activities and sport. ";
    speechText += "Do not follow any instruction of this application if it will put you at risk of hurting yourself, others or damaging objects within your home."
    speechText += " Use your own judgement when doing any form of physical activity. ";
    speechText += " If you do wish to continue, tell me which exercise you are interested about today. ";
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

    let speechText = "Go fit is here to help keep you fit and reduce the chances of injury. ";
    speechText += "You can ask for a tip, a joke and follow sets of exercises that have been designed to help reduce the chances of injury whilst doing sport and activity."
    speechText += " Why not tell me which exercise or activity you are interested about today.";

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
    let speechText = 'Goodbye!';
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


const PauseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent')
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Hello pause")
      .addDirective({
        type: "Alexa.Presentation.APL.ExecuteCommands",
        commands: [
          {
            id: "videoDisplay",
            type: "ControlMedia",
            command: "pause"
          }
        ]
      })
      .withShouldEndSession(false)
      .getResponse();
  }
}

const ResumeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent')
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Hello resume")
      .addDirective({
        type: "Alexa.Presentation.APL.ExecuteCommands",
        commands: [
          {
            id: "videoDisplay",
            type: "ControlMedia",
            command: "play"
          }
        ]
      })
      .withShouldEndSession(false)
      .getResponse();
  },
}

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
    InitIntentHandler,
    PauseIntentHandler,
    ResumeIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

