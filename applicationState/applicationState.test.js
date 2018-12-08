// const { getNextExerciseState, updateExerciseState, updateState } = require('./applicationState');
const { appStateMachine } = require('./applicationState');
const routineStore = require('./../routineStore');

test('ensures application can update state', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'INIT', 
          data: null
        },
        routineState: {
          type: undefined, 
          data: {
            difficulty: undefined,
            activity: undefined
          }
        },
        exerciseState: {
          type: undefined,
          data: null
        }
      }
    ]
  };
  var nextState = appStateMachine.updateState(
    {
      state: mockState.stateArray[0], 
      stateName: 'ACTIVITY'
    }
  );
  expect(nextState).toEqual(
    {
      state: {
        type: 'ACTIVITY', 
        data: null
      },
      routineState: {
        type: undefined, 
        data: {
          difficulty: undefined,
          activity: undefined
        }
      },
      exerciseState: {
        type: undefined,
        data: null
      }
    }
  );
});  

test('ensures application can locate and return the initial routine exercise', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'ACTIVITY'
        },
        routineState: {
          type: 'JOG_LIGHT',
          data: {
            difficulty: 'LIGHT',
            activity: 'JOG',
          }
        },
        exerciseState: {
          type: undefined,
          data: null
        }
      }
    ]
  };
  var nextExercise = appStateMachine.getNextExerciseState({ 
    state: mockState.stateArray[0], 
    routineStore: routineStore } 
  );
  expect(nextExercise).toBe("INTRO_JOG_LIGHT");
});

test('ensures application can locate and return next routine exercise state from array of steps', () => { 
  var mockState = {
    stateArray: [
      {
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
          type: 'INTRO_JOG_LIGHT',
          data: null
        }
      }
    ]
  };
  var nextExercise = appStateMachine.getNextExerciseState({
    state: mockState.stateArray[0], 
    routineStore: routineStore
  });
  expect(nextExercise).toBe("DOUBLE_HEAL_LIFTS_INIT");
});

test('ensures application can get the next state name and apply the new state to the application state with no mutation of other properties', () => {
  var mockState = {
    stateArray: [
      {
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
          type: undefined,
          data: null
        }
      }
    ]
  };
  const nextExercise = appStateMachine.getNextExerciseState({
    state: mockState.stateArray[0], 
    routineStore: routineStore
  });
  const updatedState = appStateMachine.updateExerciseState({
    state: mockState.stateArray[0], 
    exerciseStateName: nextExercise
  });
  expect(updatedState).toEqual(
    { 
      state: {  
        type: 'ACTIVITY',
        data: null,
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
  );
});
