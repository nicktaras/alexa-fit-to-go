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
  // Produces an exercise routine with copy for left and right limbs.
  // To use this method you must include 'DIRECTION' inside your copy
  // this will be replaced with left and right by this method. 
  leftAndRight: function (config) {
    let { text } = config;
    let output = '';
    const dirArr = ['left', 'right'];
    for (var i = 0; i < repetitions; i++) {
      var newText = text;
      var newTextReplace = newText.replace(/DIRECTION/g, dirArr[i]);
      output += newTextReplace;
    }
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