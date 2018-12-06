exports.getRandomItemFromArr = (list) => {
  return list[Math.floor((Math.random() * list.length) + 0)];
}

// A string building technique to add repeated steps.
exports.exerciseMethods = {
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