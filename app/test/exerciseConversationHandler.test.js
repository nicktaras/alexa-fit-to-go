const { exerciseConversationHandler } = require('./../exerciseConversationHandler');

// Apply a constant math random value for the purpose of this test.
const mockMath = Object.create(global.Math);
mockMath.random = () => 0;
global.Math = mockMath;

test('ensures application can locate the correct text for a simple response', () => { 
  var mockState = {
    state: {
      type: 'EXERCISE',
      data: null
    },
    routineState: {
      type: 'JOG_LIGHT', 
      data: {
        difficulty: 'LIGHT',
        activity: 'JOG', 
      }
    },
    exerciseState: {
      type: 'INTRO_JOG_LIGHT',
      data: null
    }
  }
  const output = exerciseConversationHandler({ state: mockState });
  expect(output).toEqual({
    "responseType": ":ask", 
    "text": "Right, let's do a few leg exercises to get you warmed up. Just tell me when you are ready. ",
    "APL": undefined
  });
});

test('ensures application can locate the correct text for a compicated exercise response', () => { 
  var mockState = {
    state: {
      type: 'ACTIVITY',
      data: null
    },
    routineState: {
      type: 'JOG_LIGHT', 
      data: {
        difficulty: 'LIGHT',
        activity: 'JOG', 
      }
    },
    exerciseState: {
      type: 'DOUBLE_HEAL_LIFTS',
      data: null
    }
  }
  const output = exerciseConversationHandler({ state: mockState });
  expect(output).toEqual({
    "responseType": ":ask",
    "text": "Slowly raise both your heals for five seconds <break time=\"1s\"/> one <break time=\"1s\"/> two <break time=\"1s\"/> three <break time=\"1s\"/> four <break time=\"1s\"/> five <break time=\"1s\"/> now hold them over 5 seconds so they are almost touching the ground <break time=\"1s\"/> 5 <break time=\"1s\"/> 4 <break time=\"1s\"/> 3 <break time=\"1s\"/> 2 <break time=\"1s\"/> 1. You are doing great, keep going. Ok, next Slowly raise both your heals for five seconds <break time=\"1s\"/> one <break time=\"1s\"/> two <break time=\"1s\"/> three <break time=\"1s\"/> four <break time=\"1s\"/> five <break time=\"1s\"/> now hold them over 5 seconds so they are almost touching the ground <break time=\"1s\"/> 5 <break time=\"1s\"/> 4 <break time=\"1s\"/> 3 <break time=\"1s\"/> 2 <break time=\"1s\"/> 1. and rest. Kudos. To continue say next or repeat to do the step again. ",
    "APL": "DOUBLE_HEEL_LIFTS"
  });
});

test('ensures application can locate the correct text for a compicated exercise response for left and right exercise', () => { 
  var mockState = {
    state: {
      type: 'ACTIVITY',
      data: null
    },
    routineState: {
      type: 'JOG_LIGHT', 
      data: {
        difficulty: 'LIGHT',
        activity: 'JOG', 
      }
    },
    exerciseState: {
      type: 'HEAL_DOWN_CALF_STRETCH',
      data: null
    }
  }
  const output = exerciseConversationHandler({ state: mockState });
  expect(output).toEqual({
    "responseType": ":ask",
    "text": "From your standing position, take a step forward with your left leg, <break time='1s'/> try to keep your back leg straight and with your back foot flat on the ground. <break time='1s'/> To give your calf a bit more of a stretch, bend your front knee forwards slightly. Hold it there for a few seconds <break time='4s'/>. Then move back to a standing position. From your standing position, take a step forward with your right leg, <break time='1s'/> try to keep your back leg straight and with your back foot flat on the ground. <break time='1s'/> To give your calf a bit more of a stretch, bend your front knee forwards slightly. Hold it there for a few seconds <break time='4s'/>. Then move back to a standing position. and rest. Kudos. To continue say next or repeat to do the step again. ",
    "APL": "HEEL_DOWN_CALF_STRETCH"
  });
});

