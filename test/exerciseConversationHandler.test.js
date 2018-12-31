const { exerciseConversationHandler } = require('./../app/exerciseConversationHandler/exerciseConversationHandler');

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
    "text": "We are going to do a few leg exercises to get you warmed up. Lets start by doing some heal lifts. Just tell me when you are ready. "
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
    "text": "With your legs inline with your hips in a standing position, Slowly raise both your heals. <break time=\"1s\"/> Hold for one <break time=\"1s\"/> two <break time=\"1s\"/> three <break time=\"1s\"/> now lower your heals slowly so they are almost touching the ground and hold. rest. Nice work. To continue say next or repeat to do the step again. "
  });
});