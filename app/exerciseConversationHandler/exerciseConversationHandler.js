// Should get the application exercise step
// and return the correct text.

const exerciseStore = require('./../exerciseStore');
const { exerciseMethods } = require('./../utils');

exports.exerciseConversationHandler = ({ state=null }) => {

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
      // E.g. exerciseMethods['leftAndRight'](data);
      var outputText = exerciseMethods[responseData.config.method](responseData.config);      
      return {
        responseType: responseData.config.responseType,
        text: outputText
      }
    default:
      return 'I need to work out which exercise you are doing to ensure I give you the correct routine'
  }
}
