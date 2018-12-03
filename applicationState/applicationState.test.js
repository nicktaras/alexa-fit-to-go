const { getNextExerciseState, setNextExerciseState } = require('./applicationState');
const routineStore = require('./../routineStore');

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

test('ensures application can locate and return next routine exercise state from array of steps', () => { 
  const nextExercise = getNextExerciseState(mockState.stateArray[0], routineStore);
  expect(nextExercise).toBe("DOUBLE_HEAL_LIFTS_INIT");
});

test('ensures application can get the next state name and apply the new state to the application state with no mutation of other properties', () => {
  const nextExercise = getNextExerciseState(mockState.stateArray[0], routineStore);
  const updatedState = setNextExerciseState(mockState, nextExercise);
  expect(updatedState.stateArray).toEqual([
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
    },
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
        type: 'DOUBLE_HEAL_LIFTS_INIT',
        data: null
      }
    }
  ]);
});
