const exerciseStore = {
  'TOUCH_TOES_EASY_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "In this exercise we are going to try to touch our toes, which will help to stretch your hamstrings and back. Don't worry if you can't reach your toes yet, we'll work on it over time. Tell me when you're ready to start.",
    }
  },
  'TOUCH_TOES_EASY': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      responseType: ':ask',
      repetitions: 1,
      initialInstruction: "",
      repeatedInstruction: "From a standing position. Slowly reach towards your toes. When you can't go any further without any strain, hold your position. <break time='2s'/> try to reach a tiny bit further, until you can feel a bit of strain on the back of your legs. <break time='3s'/> That's the spot, hold there for a second <break time='3s'/> ",
      APL: 'TOUCH_TOES'
    }
  },
  'HEAL_DOWN_CALF_STRETCH_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "We're going to do the heal down calf stretch. This will help stretch your calf muscles. To get in to position, stand straight and place your hands on your hips, ensuring you have good balance. Let me know when your ready.",
    } 
  },
  'HEAL_DOWN_CALF_STRETCH': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: "leftAndRight",
      responseType: ':ask',
      text: "From your standing position, take a step forward with your DIRECTION leg, <break time='1s'/> try to keep your back leg straight and with your back foot flat on the ground. <break time='1s'/> To give your calf a bit more of a stretch, bend your front knee forwards slightly. Hold it there for a few seconds <break time='4s'/>. Then move back to a standing position. ",
      APL: 'HEEL_DOWN_CALF_STRETCH'
    }
  },
  'BUTTERFLY_GROIN_STRETCH_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "We're going to do a butterfly groin stretch. Let's get into position, first, sit up tall on the floor, bend your knees and relax your calves against the floor. Let me know when you're ready for the next move.",
    }
  },
  'BUTTERFLY_GROIN_STRETCH': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      responseType: ':ask',
      repetitions: 3,
      initialInstruction: "",
      repeatedInstruction: "Press the soles of your feet together, and start to lower your knees to the floor. When you feel a bit of strain, hold the position for 5 seconds. <break time='5s'/> Now lift your knees so they are no longer stretched. ",
    }
  },
  'ARCHING_ARM_STRETCH': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: "leftAndRight",
      responseType: ':ask',
      text: "Start by lifting you DIRECTION arm up above your head, curve this arm towards the OPPOSITE side of your body. Keeing your feet in position, allow your waist to stretch to your OPPOSITE side. ",
    }
  },
  'ARCHING_ARM_STRETCH_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "We're going to do some arching arm stretches. Stand in a balanced up right position with your arms to your side. Tell me when youre ready. ",
    }
  },
  'ELBOW_PULL': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      responseType: ':ask',
      method: "leftAndRight",
      text: "Place your DIRECTION hand behind your head, and point your elbow straight up. Gently pull your DIRECTION elbow inward with your OPPOSITE hand so you feel a slight stretch in your arm. Now lets hold this position for 15 seconds, I'll count us down. 15. <break time='5s'/> 10. <break time='5s'/> 5. <break time='5s'/> ",
    }
  },
  'ELBOW_PULL_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "For this exercise, stand in a balanced, upright position with your hands to your sides. Tell me when you're ready. ",
    }
  },
  'INTRO_SWIM_LIGHT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'Swimming utilises the entire body, where stretching is important. The following exercises will focus on the arms, back, and legs. Make sure you have enough space around you before commencing each exercise. Tell me when you are ready to begin. ',
      about: 'HEAL_LIFTS',
    }
  },
  'INTRO_JOG_LIGHT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "Right, let's do a few leg exercises to get you warmed up. Just tell me when you are ready. ",
      about: 'HEAL_LIFTS',
    }
  },
  'DOUBLE_HEAL_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: "We're going to do some heal lifts, which will help strengthen you're calf muscles. First, find something you can gently place your hands on whilst standing. For example a kitchen side or work top. Tell me when you are ready. ",
      about: 'HEAL_LIFTS',
    }
  },
  'DOUBLE_HEAL_LIFTS': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      responseType: ':ask',
      repetitions: 2,
      initialInstruction: '',
      repeatedInstruction: 'Slowly raise both your heals for five seconds <break time="1s"/> one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> four <break time="1s"/> five <break time="1s"/> now hold them over 5 seconds so they are almost touching the ground <break time="1s"/> 5 <break time="1s"/> 4 <break time="1s"/> 3 <break time="1s"/> 2 <break time="1s"/> 1. ' ,
      about: 'HEAL_LIFTS',
      APL: 'DOUBLE_HEEL_LIFTS'
    }
  },
  'LEG_RAISES_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Ok lets do some leg lifts. First find a bit of space where you can lift your legs in front of you. Place your legs inline with your hips, with your arms by your side.<break time="1s"/> Tell me when you are ready.',
    }
  },
  'LEG_RAISES': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'leftAndRight',
      responseType: ':ask',
      text: 'Over the span of 5 around seconds, slowly start to lift your DIRECTION leg from the floor, this until your thigh is parellel to your hip and hold <break time="3s"/>. Keeping holding for, one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> seconds, then slowly bring your DIRECTION leg down to the floor. Then ',
    }    
  },
  'SINGLE_HEAL_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'Before we start, lets get some balance. Find something you can gently place your hands on whilst standing. For example a kitchen side or work top. Tell me when you are ready.',
    }
  },
  'SINGLE_HEAL_LIFTS': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'leftAndRight',
      responseType: ':ask',
      text: "Lift your OPPOSTITE foot off the floor. <break time='1s'/> Now with your DIRECTION on the floor, slowly raise your heal. Hold for one <break time='1s'/> two <break time='1s'/> three <break time='1s'/> seconds. Then gradually bring it to the floor <break time='3s'/>. Slowly raise the heal again, <break time='3s'/> and Hold for one <break time='1s'/> two <break time='1s'/> three <break time='1s'/> seconds. ",
    }    
  },
  'BOTTOM_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'For this exercise, find some space to lay down on the floor with your back and head to the ground. Before we begin, raise your knees half way towards you. Then lower them back downwards slightly. When you are in position, just say ready.',
    }
  },
  'BOTTOM_LIFTS': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      repetitions: 1,
      responseType: ':ask',
      initialInstruction: '',
      repeatedInstruction: 'Slowly raise your bottom off the ground, towards the level of your knees. Holding. For three, two, one seconds. Ok, now lower your bottom to the ground over the span of three seconds, three, two and one. ',
    }
  },
  'END': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Great work, you have completed this routine. If you want to do this routine from the top, say next. Otherwise, I hope you enjoy the rest of your day.',
      APL: 'ARMS_UP_CELEBRATION'
    }
  }
}

module.exports = exerciseStore;
