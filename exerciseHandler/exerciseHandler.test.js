const exerciseHandler = require('./exerciseHandler');

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

test('ensures application can locate the correct text', () => { 
  const output = exerciseHandler(mockState.stateArray[0]);
  expect(output).toEqual({
    "responseType": ":ask", 
    "text": "We're going to start by doing some heal lifts. Just tell me when you're ready."
  });
});