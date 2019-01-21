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
        text: responseData.config.text,
        APL: responseData.config.APL
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
        text: outputText,
        APL: responseData.config.APL
      }
    default:
      return {
        responseType: ':ask',
        text: "Sorry, I've forgotten which exercise your doing. I could tell you to do do squats and lunges, when all you want to do is have a light jog. "
      }
  }
}
