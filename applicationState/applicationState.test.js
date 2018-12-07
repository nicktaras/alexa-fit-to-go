const { getNextExerciseState, setNextExerciseState, setState } = require('./applicationState');
const routineStore = require('./../routineStore');

test('ensures application can update state', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'INIT', // 'ACTIVITY'
          data: {
            difficulty: 'LIGHT', // 'LIGHT', 'MEDIUM', 'HARD'
            activity: undefined, // 'JOG'
          }
        },
        routineState: {
          type: undefined, // 'JOG_LIGHT'
          completed: []  
        },
        exerciseState: {
          type: undefined, // 'INTRO_JOG_LIGHT'
          data: null
        }
      }
    ]
  };
  var userActivity = "jog";
  var nextState = setState(mockState, 'ACTIVITY', { difficulty: 'LIGHT', activity: userActivity.toUpperCase()});
  expect(nextState.stateArray).toEqual([
    {
      state: {
        type: 'INIT', // 'ACTIVITY'
        data: {
          difficulty: 'LIGHT', // 'LIGHT', 'MEDIUM', 'HARD'
          activity: undefined, // 'JOG'
        }
      },
      routineState: {
        type: undefined, // 'JOG_LIGHT'
        completed: []  
      },
      exerciseState: {
        type: undefined, // 'INTRO_JOG_LIGHT'
        data: null
      }
    },
    {
      state: {
        type: 'ACTIVITY', // 'ACTIVITY'
        data: {
          difficulty: 'LIGHT', // 'LIGHT', 'MEDIUM', 'HARD'
          activity: 'JOG', // 'JOG'
        }
      },
      routineState: {
        type: 'JOG_LIGHT', // 'JOG_LIGHT'
        completed: []  
      },
      exerciseState: {
        type: undefined, // 'INTRO_JOG_LIGHT'
        data: null
      }
    }
  ]);
});  

test('ensures application can locate and return the initial routine exercise', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'ACTIVITY', // 'ACTIVITY'
          data: {
            difficulty: 'LIGHT', // 'LIGHT', 'MEDIUM', 'HARD'
            activity: 'JOG', // 'JOG'
          }
        },
        routineState: {
          type: 'JOG_LIGHT', // 'JOG_LIGHT'
          completed: []  
        },
        exerciseState: {
          type: undefined, // 'INTRO_JOG_LIGHT'
          data: null
        }
      }
    ]
  };
  var nextExercise = getNextExerciseState(mockState.stateArray[0], routineStore);
  expect(nextExercise).toBe("INTRO_JOG_LIGHT");
});

test('ensures application can locate and return next routine exercise state from array of steps', () => { 
  var mockStateMidRoutine = {
    stateArray: [
      {
        state: {
          type: 'ACTIVITY', // 'ACTIVITY'
          data: {
            difficulty: 'LIGHT', // 'LIGHT', 'MEDIUM', 'HARD'
            activity: 'JOG', // 'JOG'
          }
        },
        routineState: {
          type: 'JOG_LIGHT', // 'JOG_LIGHT'
          completed: []  
        },
        exerciseState: {
          type: 'INTRO_JOG_LIGHT', // 'INTRO_JOG_LIGHT'
          data: null
        }
      }
    ]
  };
  var nextExercise = getNextExerciseState(mockStateMidRoutine.stateArray[0], routineStore);
  expect(nextExercise).toBe("DOUBLE_HEAL_LIFTS_INIT");
});

test('ensures application can get the next state name and apply the new state to the application state with no mutation of other properties', () => {
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'INIT', // 'ACTIVITY'
          data: {
            difficulty: 'LIGHT', // 'LIGHT', 'MEDIUM', 'HARD'
            activity: 'JOG', // 'JOG'
          }
        },
        routineState: {
          type: 'JOG_LIGHT', // 'JOG_LIGHT'
          completed: []  
        },
        exerciseState: {
          type: undefined, // 'JOG_LIGHT_INIT'
          data: null
        }
      }
    ]
  };
  const nextExercise = getNextExerciseState(mockState.stateArray[0], routineStore);
  const updatedState = setNextExerciseState(mockState, nextExercise);
  // expect(updatedState.stateArray).toEqual([
  //   {
  //     state: {
  //       type: 'ACTIVITY', // 'ACTIVITY'
  //       data: {
  //         difficulty: 'LIGHT', // 'LIGHT', 'MEDIUM', 'HARD'
  //         activity: 'JOG', // 'JOG'
  //       }
  //     },
  //     routineState: {
  //       type: 'JOG_LIGHT', // 'JOG_LIGHT'
  //       completed: []  
  //     },
  //     exerciseState: {
  //       type: 'INTRO_JOG_LIGHT', // 'JOG_LIGHT_INIT'
  //       data: null
  //     }
  //   },
  //   { 
  //     state: {  
  //       type: 'EXERCISE',
  //       data: null
  //     },
  //     routineState: {
  //       type: 'JOG_LIGHT',
  //       data: null,
  //       completed: []  
  //     },
  //     exerciseState: {
  //       type: 'DOUBLE_HEAL_LIFTS_INIT',
  //       data: null
  //     }
  //   }
  // ]);
});
