// Should get the application exercise step
// and return the correct text.

const exerciseStore = require('./../exerciseStore');
const congratulateStore = require('./../congratulateStore');
const continueStore = require('./../continueStore');
const { getRandomItemFromArr } = require('./../utils');

// TODO seperate and test this method
const exerciseMethods = {
  repeatedMiddleStep: function (config) {
    let { repetitions,
          initialInstruction,  
          repeatedInstruction,
          finalInstruction
    } = config;
    let output = initialInstruction;
    // Build repeated steps and final instruction.
    for (var i = 1; i < repetitions; i++) {
      if (i < repetitions - 1) {
        output += repeatedInstruction;
      } else {
        output += finalInstruction;
      }
    }
    return output;
  },
}


// TODO as the app scales look to break this into seperate functions
// e.g. conversation, exercise, activity...
const conversationHandler = (applicationState) => {
  const responseData = exerciseStore[applicationState.exerciseState.type];
  if (responseData.type === 'text') {
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
  }
  if (responseData.type === 'exerciseMethod') {
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
  }
}

module.exports = conversationHandler;