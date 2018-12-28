// Stores all exercise types

// Add intitial steps,
// Do you want to an exercise warm up, warm down, hear some tips or maybe a joke?

// images to recreate:
// https://www.swimoutlet.com/guides/stretches-for-swimming

// WARM DOWN:
// Although many swimmers stretch before practice, it’s even more important to stretch afterward. When you’re done with your workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!

// Take your left hand and place it on your right elbow. 
// Pull your right elbow inward with your left hand. 
// Hold this position. Then switch arms, and repeat.

const exerciseStore = {
  'ELBOW_PULL': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      responseType: ':ask',
      method: "leftAndRight",
      text: 'Place your DIRECTION hand behind your head, and point your elbow straight up. Gently pull your DIRECTION elbow inward with your left hand.'
    }
  },
  'ELBOW_PULL_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'For this first exercise, all you need is a bit of room to be able to lift your arms. Tell me when youre ready.'
    }
  },
  'INTRO_SWIM_LIGHT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'Swimming utilises the entire body, where stretching is important. The following exercises will focus on the arms, back, and legs. Tell me when you are ready to begin.',
      about: 'HEAL_LIFTS'
    }
  },
  'INTRO_JOG_LIGHT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'We are going to do a few leg exercises to get you warmed up. Lets start by doing some heal lifts. Just tell me when you are ready.',
      about: 'HEAL_LIFTS'
    }
  },
  'DOUBLE_HEAL_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Lets do this. Ok first, find something you can gently place your hands on whilst standing. For example a kitchen side or work top. Tell me when you are ready.',
      about: 'HEAL_LIFTS'
    }
  },
  'DOUBLE_HEAL_LIFTS': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      responseType: ':ask',
      repetitions: 1,
      initialInstruction: 'With your legs inline with your hips in a standing position, ',
      repeatedInstruction: 'Slowly raise both your heals. <break time="1s"/> Hold for one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> now lower your heals slowly so they are almost touching the ground and hold. ',
      about: 'HEAL_LIFTS'
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
      repetitions: 1,
      responseType: ':ask',
      initialInstruction: 'Place your legs inline with your hips, with your arms by your side.<break time="1s"/> ',
      repeatedInstruction: 'Over the span of 5 around seconds, slowly start to lift your left leg from the floor, this until your thigh is parellel to your hip and hold <break time="3s"/>. Keeping holding for, one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> seconds, then slowly bring your left leg down to the floor<break time="2s"/>. Next slowly lift your right leg, until your thigh is parellel to your hip and hold <break time="2s"/>. Lets hold for 3 more seconds, one <break time="1s"/> two <break time="1s"/> three <break time="1s"/>, now bring your right leg slowly down to the floor. Then '
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
        repetitions: 1,
        responseType: ':ask',
        initialInstruction: 'With your legs inline with your hips in a standing position. Lift your foot off the floor, we will not be using this. Now, ',
        repeatedInstruction: 'Using your foot on the floor, slowly raise your heal. Hold for one, two, three, seconds. Then bring it down close to the floor over one, two, three seconds. Now raise the heal again, and Hold for one, two, three, seconds. '
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
      repetitions: 1,
      responseType: ':ask',
      initialInstruction: 'Great, lets get going. If you can now ',
      repeatedInstruction: 'Slowly raise your bottom off the ground, towards the level of your knees. Holding. For three, two, one seconds. Ok, now lower your bottom to the ground over the span of three seconds, three, two and one. '
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
