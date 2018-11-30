
const exerciseHandler = () => {
  let currExerciseState = getExerciseState(); 
  let responseData = exerciseStore[currExerciseState];
  if (responseData.type === 'text'){
    /*
      returns:
      {
        responseType: (string),
        text: (string) 
      }
    */
    return responseData.config;
  }
  if (responseData.type === 'syncMethod'){
    return exerciseMethods[responseData.config.method](responseData.config.params);
  }
}

module.exports = exerciseHandler;