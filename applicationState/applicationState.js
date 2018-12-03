// A state machine for the application.
exports.applicationState = {
  stateArray: [
    {
      state: {
        type: 'ACTIVITY',
        data: null
      },
      routineState: {
        type: 'JOG_LIGHT',
        data: {
          difficulty: undefined,
          activity: undefined,
          sport: undefined
        },
        completed: []  
      },
      exerciseState: {
        type: 'INTRO_JOG_LIGHT',
        data: null
      }
    }
  ]
};

// update and return new state
exports.setNextExerciseState = (appState={}, nextExerciseState=undefined) => {
  const copyOfAppState = JSON.parse(JSON.stringify(appState.stateArray[appState.stateArray.length -1]));
  copyOfAppState.exerciseState.type = nextExerciseState;
  appState.stateArray.push(copyOfAppState);
  return appState;
};

// get next exercise state
// currentState: current application state {}
// exerciseStates: list of object keys {}
exports.getNextExerciseState = (currentState, exerciseStates) => {
  // find the list of steps within the current exercise
  const currentRoutineSteps = exerciseStates[currentState.routineState.type];
  // find out which step in the routine they have reached
  const currentExerciseStateIndex = currentRoutineSteps.indexOf(currentState.exerciseState.type);
  // return state
  return currentRoutineSteps[currentExerciseStateIndex + 1] || undefined;
};

// get most recent state
exports.getApplicationState = () => {
  return applicationState.stateArray[applicationState.stateArray.length-1];
};