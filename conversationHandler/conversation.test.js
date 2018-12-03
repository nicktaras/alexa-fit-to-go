const conversationHandler = require('./conversationHandler');

test('ensures application can locate the correct text for a simple response', () => { 
  var mockState = {
    stateArray: [
      {
        state: {  
          type: 'EXERCISE',
          data: null
        },
        routineState: {
          type: 'JOG_LIGHT',
          data: null,
          completed: []  
        },
        exerciseState: {
          type: 'INTRO_JOG_LIGHT',
          data: null
        }
      }
    ]
  };
  const output = conversationHandler(mockState.stateArray[0]);
  expect(output).toEqual({
    "responseType": ":ask", 
    "text": "We're going to start by doing some heal lifts. Just tell me when you're ready."
  });
});

test('ensures application can locate the correct text for a compicated exercise response', () => { 
  var mockState = {
    stateArray: [
      {
        state: {  
          type: 'EXERCISE',
          data: null
        },
        routineState: {
          type: 'JOG_LIGHT',
          data: null,
          completed: []  
        },
        exerciseState: {
          type: 'DOUBLE_HEAL_LIFTS',
          data: null
        }
      }
    ]
  };
  const output = conversationHandler(mockState.stateArray[0]);
  expect(output).toEqual({
    "responseType": ":ask",
    "text": "With your legs inline with your hips in a standing position, slowly raise both your heals. Hold for one, two, three, seconds. Now raise both heals again. Hold for one, two, three, seconds. Then lower them to the ground. And rest. Well done! To continue to the next exercise, please tell me when you are ready. Or to re do this exercise say repeat and the number of times you would like to do the exercise. "
  });
});