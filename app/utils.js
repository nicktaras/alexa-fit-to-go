const halfwayMotivationStore = require('./halfwayMotivationStore');
const lastStepMotivationStore = require('./lastStepMotivationStore');
const restStore = require('./restStore');
const congratulateStore = require('./congratulateStore');
const continueStore = require('./continueStore');
const repeatExerciseStore = require('./repeatExerciseStore');

exports.getRandomItemFromArr = (list) => {
  return list[Math.floor((Math.random() * list.length) + 0)];
}

// local version
const getRandomItemFromArr = (list) => {
  return list[Math.floor((Math.random() * list.length) + 0)];
}

// A string building technique to add repeated steps.
exports.exerciseMethods = {
  // Produces an exercise routine with copy for left and right limbs.
  // To use this method you must include 'DIRECTION' inside your copy
  // this will be replaced with left and right by this method. 
  leftAndRight: function (config) {
    let { text } = config;
    let output = '';
    const dirArr = ['left', 'right'];
    for (var i = 0; i < dirArr.length; i++) {
      // Switch out any text 'DIRECTION' with left or right
      var dirText = text;
      var dirTextReplace = dirText.replace(/DIRECTION/g, dirArr[i]);
      var modText = dirTextReplace;
      var modInx = (i + 1) % dirArr.length;
      // Switch out any text 'OPPOSITE' with left or right
      var modTextReplace = modText.replace(/OPPOSITE/g, dirArr[modInx]);
      output += modTextReplace;
    }
    // Rest store.
    output += getRandomItemFromArr(restStore);
    // Congratulate store.
    output += getRandomItemFromArr(congratulateStore);
    // Continue store.
    output += getRandomItemFromArr(continueStore);
    return output;
  },
  // Repeats middle step of exercise
  repeatedMiddleStep: function (config) {
    let { repetitions,
          initialInstruction,  
          repeatedInstruction
    } = config;
    let output = initialInstruction;
    // Build repeated steps and final instruction.
    for (var i = 0; i < repetitions; i++) {
      if (i >= repetitions) { // last step
        output += getRandomItemFromArr(lastStepMotivationStore);
      } else if (i === repetitions / 2) { // half way
        output += getRandomItemFromArr(halfwayMotivationStore);
      } else if (i > 0) { // 
        output += getRandomItemFromArr(repeatExerciseStore);
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