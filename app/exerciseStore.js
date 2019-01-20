// Stores all exercise types

// Add intitial steps,
// Do you want to an exercise warm up, warm down, hear some tips or maybe a joke?

// images to recreate:
// https://www.swimoutlet.com/guides/stretches-for-swimming

// E2E workflow.
// Download

// TODO:
// Add moves for more activities.
// Add background music during each workout to make it more fun, or use spotify?
// Work out how we can add images for each exercise, maybe static for first release?
// We need to make a nice look and feel to them etc.

// Exercises in Stick person.
// LUNGING_HIP_FLEXER
// STANDING_QUAD_STRETCH
// KNEE_TO_CHEST
// BUTTERFLY_STRETCH
// SQUAT
// SQUAT_EASY
// PUSH_UP
// PUSH_UP_BEGINNER
// TWIST (WAIST)
// SIT_UP
// ARM_RAISE ?
// BOLT (MOVE)
// HULK
// FREDDIE
// SUPERMAN
// MICHEALJACKSON
// JACKIECHAN
// KARATEKID 
// JEDI_3
// HEAL_LIFT_LEFT_UP
// DOUBLE_HEAL_LIFT
// HEAL_DOWN_CALF_STRETCH_RIGHT

// This is where we should add the APL data etc.
// maybe audio one day too?

const exerciseStore = {
  'TOUCH_TOES_EASY_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "In this exercise we are going to try to touch our toes, which will help to stretch your hamstrings and back. Don't worry if you can't reach your toes yet, we'll work on it over time. Tell me when you're ready to start.",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'TOUCH_TOES_EASY': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      responseType: ':ask',
      repetitions: 2,
      initialInstruction: "",
      repeatedInstruction: "From a standing position. Slowly reach towards your toes. When you can't go any further hold for a second <break time='2s'/> see if you can push a tiny bit further, just so you can feel a slight strain on the back of your legs. <break time='3s'/> That's the spot ",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'HEAL_DOWN_CALF_STRETCH_RIGHT_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "We're going to do the heal down calf stretch. This will help stretch your calf muscles. To get in to position, stand straight and place your hands on your hips, ensuring you have good balance. ",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    } 
  },
  'HEAL_DOWN_CALF_STRETCH_RIGHT': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: "leftAndRight",
      responseType: ':ask',
      text: "Take a step forward with your DIRECTION leg, keeping your back leg straight and entire foot firmly on the ground. Bend your front leg forwars slightly so you can feel the stretch. <break time='5s'/> Then move back to the standing position. ",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'BUTTERFLY_GROIN_STRETCH_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "We're going to do a butterfly groin stretch. Let's get into position, first, sit up tall on the floor. Let me know when you're ready.",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'BUTTERFLY_GROIN_STRETCH': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      responseType: ':ask',
      repetitions: 3,
      initialInstruction: "Bend your knees and relax your calves against the floor, then press the soles of your feet together. For a deeper stretch, push down on your knees. ",
      repeatedInstruction: "Hold your feet so that they remain touching for 5 seconds, <break time='5s'/>. Now lift your knees so they are no longer stretched. Then ",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'ARCHING_ARM_STRETCH': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: "leftAndRight",
      responseType: ':ask',
      text: "Start by lifting you DIRECTION arm up above your head, curve this arm towards the OPPOSITE side of your body. Keeing your feet in position, allow your waist to stretch to your OPPOSITE side. ",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'ARCHING_ARM_STRETCH_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "We're going to do some arching arm stretches. Stand in a balanced up right position with your arms to your side. Tell me when youre ready. ",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'ELBOW_PULL': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      responseType: ':ask',
      method: "leftAndRight",
      text: "Place your DIRECTION hand behind your head, and point your elbow straight up. Gently pull your DIRECTION elbow inward with your OPPOSITE hand so you feel a slight stretch in your arm. Now lets hold this position for 15 seconds, I'll count us down. 15. <break time='5s'/> 10. <break time='5s'/> 5. <break time='5s'/> ",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'ELBOW_PULL_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "For this exercise, stand in a balanced, upright position with your hands to your sides. Tell me when you're ready. ",
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'INTRO_SWIM_LIGHT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'Swimming utilises the entire body, where stretching is important. The following exercises will focus on the arms, back, and legs. Make sure you have enough space around you before commencing each exercise. Tell me when you are ready to begin. ',
      about: 'HEAL_LIFTS',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'INTRO_JOG_LIGHT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'We are going to do a few leg exercises to get you warmed up. Lets start by doing some heal lifts. Just tell me when you are ready. ',
      about: 'HEAL_LIFTS',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'DOUBLE_HEAL_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Ok first, find something you can gently place your hands on whilst standing. For example a kitchen side or work top. Tell me when you are ready. ',
      about: 'HEAL_LIFTS',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'DOUBLE_HEAL_LIFTS': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'repeatedMiddleStep',
      responseType: ':ask',
      repetitions: 3,
      initialInstruction: 'With your legs inline with your hips in a standing position, ',
      repeatedInstruction: 'Slowly raise both your heals for five seconds <break time="1s"/> one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> four <break time="1s"/> five <break time="1s"/> now lower them over 5 seconds so they are almost touhcing the ground <break time="1s"/> 5 <break time="1s"/> 4 <break time="1s"/> 3 <break time="1s"/> 2 <break time="1s"/> 1. ' ,
      about: 'HEAL_LIFTS',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'LEG_RAISES_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Ok lets do some leg lifts. First find a bit of space where you can lift your legs in front of you. Place your legs inline with your hips, with your arms by your side.<break time="1s"/> Tell me when you are ready.',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'LEG_RAISES': {
    type: 'exerciseMethod',
    config: {
      type: "SSML",
      method: 'leftAndRight',
      responseType: ':ask',
      text: 'Over the span of 5 around seconds, slowly start to lift your DIRECTION leg from the floor, this until your thigh is parellel to your hip and hold <break time="3s"/>. Keeping holding for, one <break time="1s"/> two <break time="1s"/> three <break time="1s"/> seconds, then slowly bring your DIRECTION leg down to the floor. Then ',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }    
  },
  'SINGLE_HEAL_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'Choose either your left or right heal for this exercise. Before we start, lets get some balance. Find something you can gently place your hands on whilst standing. For example a kitchen side or work top. Tell me when you are ready.',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
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
        repeatedInstruction: 'Using your foot on the floor, slowly raise your heal. Hold for one, two, three, seconds. Then bring it down close to the floor over one, two, three seconds. Now raise the heal again, and Hold for one, two, three, seconds. ',
        animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
      }
    }
  },
  'BOTTOM_LIFTS_INIT': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: 'For this exercise, find some space to lay down on the floor with your back and head to the ground. Before we begin, raise your knees half way towards you. Then lower them back downwards slightly. When you are in position, just say ready.',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
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
      repeatedInstruction: 'Slowly raise your bottom off the ground, towards the level of your knees. Holding. For three, two, one seconds. Ok, now lower your bottom to the ground over the span of three seconds, three, two and one. ',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/Fit_to_Go_Init_Screen.png'
    }
  },
  'END': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask', 
      text: 'Great work, you have completed this routine. Would you like to repeat this or try something else?',
      animationURL: 'https://raw.githubusercontent.com/nicktaras/alexa-physio-me/master/assets/ARMS_UP_CELEBRATION.gif'
    }
  }
}

module.exports = exerciseStore;
