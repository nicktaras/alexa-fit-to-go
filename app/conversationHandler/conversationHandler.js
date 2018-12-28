// Should get the application exercise step
// and return the correct text.

const exerciseStore = require('./../exerciseStore');
const { getRandomItemFromArr, exerciseMethods } = require('./../utils');

// TODO as the app scales look to break this into seperate functions
// e.g. conversation, exercise, activity...
// TODO Rename this as exerciseConversationHandler
exports.conversationHandler = ({ state=null }) => {

  const responseData = exerciseStore[state.exerciseState.type];
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
      return {
        responseType: responseData.config.responseType,
        text: outputText
      }
    default:
      return 'I need to work out which exercise you are doing to ensure I give you the correct routine'
  }
}
