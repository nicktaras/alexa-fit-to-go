// Should get the application exercise step
// and return the correct text.

const exerciseStore = require('./../exerciseStore');
const congratulateStore = require('./../congratulateStore');
const continueStore = require('./../continueStore');
const { getRandomItemFromArr, exerciseMethods } = require('./../utils');


{
  state: {
    type: 'ACTIVITY', // 'ACTIVITY'
    data: {
      difficulty: 'LIGHT', // 'LIGHT', 'MEDIUM', 'HARD'
      activity: 'JOG', // 'JOG'
    }
  },
  routineState: {
    type: 'JOG_LIGHT', // 'JOG_LIGHT'
    completed: []  
  },
  exerciseState: {
    type: undefined, // 'JOG_LIGHT_INIT'
    data: null
  }
},

// TODO as the app scales look to break this into seperate functions
// e.g. conversation, exercise, activity...
exports.conversationHandler = (applicationState) => {
  console.log('applicationState.exerciseState.type', applicationState.exerciseState);
  console.log('exerciseStore', exerciseStore);
  const responseData = exerciseStore[applicationState.exerciseState.type];
  switch(responseData.type) {
    case 'text':
        /*
        returns:
        {
          responseType: (string),
          text: (string) 
        }
      */
      return {
        responseType: responseData.config.responseType,
        text: responseData.config.text
      }
    case 'exerciseMethod':
      /*
      returns:
      {
        responseType: (string),
        text: (string) 
      }
      */
      // apply exercise routine text. 
      var outputText = exerciseMethods[responseData.config.method](responseData.config);
      // congratulate when config is true
      if (responseData.config.congratulate) outputText += getRandomItemFromArr(congratulateStore);
      // add navigation hint to help the user to continue.
      outputText += getRandomItemFromArr(continueStore);
      return {
        responseType: responseData.config.responseType,
        text: outputText
      }
    default:
      return 'I need to work out which exercise you are doing to ensure I give you the correct routine'
  }
}
