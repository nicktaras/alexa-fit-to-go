const routineStore = require('./../app/routineStore');
const ApplicationStateModelStore = require('./../app/applicationState');
var applicationStateModelStore = new ApplicationStateModelStore();

test('ensures application can get state', () => { 
  var appState = applicationStateModelStore.getApplicationState();
  expect(appState).toEqual(
    {
      state: {
        type: 'INIT'
      },
      routineState: {
        type: undefined, 
        difficulty: undefined,
        activity: undefined
      },
      exerciseState: {
        type: undefined
      }
    }
  );
});  

test('ensures application can update state', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'INIT'
        },
        routineState: {
          type: undefined, 
          difficulty: undefined,
          activity: undefined
        },
        exerciseState: {
          type: undefined
        }
      }
    ]
  };
  var nextState = applicationStateModelStore.updateState(
    {
      state: mockState.stateArray[0], 
      stateName: 'ACTIVITY'
    }
  );
  expect(nextState).toEqual(
    {
      state: {
        type: 'ACTIVITY'
      },
      routineState: {
        type: undefined, 
        difficulty: undefined,
        activity: undefined
      },
      exerciseState: {
        type: undefined
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
          difficulty: 'LIGHT',
          activity: 'JOG'
        },
        exerciseState: {
          type: undefined
        }
      }
    ]
  };
  var nextExercise = applicationStateModelStore.getNextExerciseState({ 
    state: mockState.stateArray[0], 
    routineStore: routineStore
  });
  expect(nextExercise).toEqual(
    {
      state: {
        type: 'ACTIVITY'
      },
      routineState: {
        type: 'JOG_LIGHT',
        difficulty: 'LIGHT',
        activity: 'JOG'
      },
      exerciseState: {
        type: "INTRO_JOG_LIGHT"
      }
    }
  );
});

test('ensures application can determine if we are at the last exercise in the routine', () => { 

  var mockState = {
    stateArray: [
       {
        state: {
          type: 'ACTIVITY'
        },
        routineState: {
          type: 'JOG_LIGHT',
          difficulty: 'LIGHT',
          activity: 'JOG'
        },
        exerciseState: {
          type: "INTRO_JOG_LIGHT"
        }
      }
    ]
  };

  var isLastExercise = applicationStateModelStore.isLastExercise({
    state: mockState.stateArray[0], 
    routineStore: routineStore
  });
  expect(isLastExercise).toEqual(false);
});

test('ensures application can locate and return next routine exercise state from array of steps', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'ACTIVITY'
        },
        routineState: {
          type: 'JOG_LIGHT', 
          difficulty: 'LIGHT',
          activity: 'JOG'
        },
        exerciseState: {
          type: 'INTRO_JOG_LIGHT'
        }
      }
    ]
  };
  var nextExercise = applicationStateModelStore.getNextExerciseState({
    state: mockState.stateArray[0], 
    routineStore: routineStore
  });
  expect(nextExercise).toEqual(
    {
      state: {
        type: 'ACTIVITY'
      },
      routineState: {
        type: 'JOG_LIGHT',
        difficulty: 'LIGHT',
        activity: 'JOG'
      },
      exerciseState: {
        type: "HEAL_DOWN_CALF_STRETCH_INIT"
      }
    });
});

test('ensures application can update routine state', () => { 

  var appState = applicationStateModelStore.updateRoutineState({
    state: {
      state: {
        type: 'ACTIVITY'
      },
      routineState: {
        type: undefined, 
        difficulty: undefined,
        activity: undefined
      },
      exerciseState: {
        type: undefined
      }
    },
    activity: 'JOG',
    difficulty: 'LIGHT'
  });
  expect(appState).toEqual(
    { 
      state: {  
        type: 'ACTIVITY'
      },
      routineState: {
        type: 'JOG_LIGHT',
        difficulty: 'LIGHT',
        activity: 'JOG'
      },
      exerciseState: {
        type: undefined
      }
    }
  );
});  

