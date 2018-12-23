// Stores all exercise types

const exerciseStore = {
  'INTRO_JOG_LIGHT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'We are going to start by doing some heal lifts. Just tell me when you are ready.'
    }
  },
  'DOUBLE_HEAL_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Lets do this. Ok first, find something you can gently place your hands on whilst standing. For example a kitchen side or work top. Tell me when you are ready.'
    }
  },
  'DOUBLE_HEAL_LIFTS': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      responseType: ':ask',
      repetitions: 2,
      initialInstruction: 'With your legs inline with your hips in a standing position, slowly raise both your heals. <break time="1s"/>',
      repeatedInstruction: 'Hold for one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> Great, now lower your heals slowly so they are almost touching the ground. ',
      finalInstruction: 'Lastly, raise your heals one last time, and hold for one <break time="1s"/> two <break time="1s"/> three <break time="1s"/>. Then lower them to the ground <break time="500ms"/> And rest. ',
      congratulate: true
    }
  },
  'LEG_RAISES_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Ok lets do some leg lifts. First find a bit of space where you can lift your legs in front of you. Tell me when you are ready.'
    }
  },
  'LEG_RAISES': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      repetitions: 2,
      responseType: ':ask',
      initialInstruction: 'Firstly choose which leg you wish to use to do this exercise. With that decision made, lets do this. Place your legs inline with your hips, in a standing position. Now, ',
      repeatedInstruction: 'Slowly lift your chosen leg off the floor until your thigh is parellel to the ground. Hold for one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> seconds, Then bring your leg right down to the floor. Then ',
      finalInstruction: 'Let us do this one last time. Slowly lift your leg off the floor until your thigh is parellel to the ground. Hold for one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> seconds. Then bring it down to the floor. ',
      congratulate: true
    }    
  },
  'SINGLE_HEAL_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'Choose either your left or right heal for this exercise. Before we start, lets get some balance. Find something you can gently place your hands on whilst standing. For example a kitchen side or work top. Tell me when you are ready.'
    }
  },
  'SINGLE_HEAL_LIFTS': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      params: {
        repetitions: 2,
        responseType: ':ask',
        initialInstruction: 'With your legs inline with your hips in a standing position. Lift your foot off the floor, we will not be using this. Now, ',
        repeatedInstruction: 'Using your foot on the floor, slowly raise your heal. Hold for one, two, three, seconds. Then bring it down close to the floor over one, two, three seconds. Now raise the heal again, and Hold for one, two, three, seconds. ',
        finalInstruction: 'Lastly start to lower your heal to the ground over one, two, three seconds. And rest. ',
        congratulate: 'Well done! To continue to the next exercise, please tell me when you are ready. Or to re do this exercise say repeat and the number of times you would like to do the exercise. '
      }
    }
  },
  'BOTTOM_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'For this exercise, find some space to lay down on the floor with your back and head to the ground. Before we begin, raise your knees half way towards you. Then lower them back downwards slightly. When you are in position, just say ready.'
    }
  },
  'BOTTOM_LIFTS': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      repetitions: 2,
      responseType: ':ask',
      initialInstruction: 'Great, lets get going. If you can now ',
      repeatedInstruction: 'Slowly raise your bottom off the ground, towards the level of your knees. Holding. For three, two, one seconds. Ok, now lower your bottom to the ground over the span of three seconds, three, two and one. ',
      finalInstruction: 'Lastly start to lower your heal to the ground over one, two, three seconds. And rest. ',
      congratulate: 'Well done! To continue to the next exercise, please tell me when you are ready. Or to re do this exercise say repeat and the number of times you would like to do the exercise. '
    }
  },
  'END': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Great work, you have completed this routine. Would you like to repeat this or try something else?'
    }
  }
}

module.exports = exerciseStore;
