const halfwayMotivationStore = require('./halfwayMotivationStore');
const lastStepMotivationStore = require('./lastStepMotivationStore');
const restStore = require('./restStore');
const congratulateStore = require('./congratulateStore');
const continueStore = require('./continueStore');

exports.getRandomItemFromArr = (list) => {
  return list[Math.floor((Math.random() * list.length) + 0)];
}

// local version
const getRandomItemFromArr = (list) => {
  return list[Math.floor((Math.random() * list.length) + 0)];
}

// A string building technique to add repeated steps.
exports.exerciseMethods = {
  repeatedMiddleStep: function (config) {
    let { repetitions,
          initialInstruction,  
          repeatedInstruction
    } = config;
    let output = initialInstruction;
    // Build repeated steps and final instruction.
    for (var i = 0; i < repetitions; i++) {
      if (i >= repetitions) {    
        output += getRandomItemFromArr(lastStepMotivationStore);
      }
      if (i === repetitions / 2) { 
        output += getRandomItemFromArr(halfwayMotivationStore);
      }
      if (i <= repetitions) {
        output += repeatedInstruction;
      } 
    }
    
    // Rest store.
    output += getRandomItemFromArr(restStore);
    // Congratulate store.
    output += getRandomItemFromArr(congratulateStore);
    // Continue store.
    output += getRandomItemFromArr(continueStore);

    return output;
  }
}