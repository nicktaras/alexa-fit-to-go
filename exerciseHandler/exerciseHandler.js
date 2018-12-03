// Should get the application exercise step
// and return the correct text.

const exerciseStore = require('./../exerciseStore');

const exerciseHandler = (applicationState) => {
  const responseData = exerciseStore[applicationState.exerciseState.type];
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
}

module.exports = exerciseHandler;