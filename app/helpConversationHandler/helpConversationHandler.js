
exports.helpConversationHandler = ({ applicationState=null }) => {
  var defaultSpeech = "How can I help you, ask me, how do I use this App?, what are the terms of using this App?, What does this Application do?, tell me a joke, give me a tip, or tell me an exercise you are doing today for example, a jog.";
  return {
    responseType: ':ask',
    text: defaultSpeech
  } 
}
