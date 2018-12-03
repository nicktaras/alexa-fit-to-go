// Should get the application exercise step
// and return the correct text.

const exerciseStore = require('./../exerciseStore');

// TODO seperate and test this method
const exerciseMethods = {
  repeatedMiddleStep: function (config) {
    let { repetitions,
          initialInstruction,  
          instruction,
          finalInstruction,
          congratulate
    } = config;
    let output = initialInstruction;
    for (var i = 1; i < repetitions; i++) {
      if (i < repetitions - 1) {
        output += instruction;
      } else {
        output += finalInstruction;
        output += congratulate;
      }
    }
    return output;
  },
}

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
  if (responseData.type === 'syncMethod') {
    /*
      returns:
      {
        responseType: (string),
        text: (string) 
      }
    */
    return {
      responseType: responseData.config.responseType,
      text: exerciseMethods[responseData.config.method](responseData.config)
    }
  }
}

module.exports = conversationHandler;