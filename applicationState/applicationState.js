// A state machine for the application.
// There are 3 levels of state in the app currently.
// state: this is the top level state of the application // 'INIT', 'ACTIVITY', 'SPORT', 'EXERCISE'
// routineState: this is the state of the routine the customer is doing 'JOG_LIGHT'
// exerciseState: this is the state of the exercise the customer is doing within a routine

const applicationState = {
  stateArray: [
    {
      state: {
        type: 'INIT', // 'ACTIVITY'
        data: {
          difficulty: undefined, // 'LIGHT', 'MEDIUM', 'HARD'
          activity: undefined, // 'JOG'
        }
      },
      routineState: {
        type: undefined, // 'JOG_LIGHT'
        completed: []  
      },
      exerciseState: {
        type: undefined, // 'JOG_LIGHT_INIT'
        data: null
      }
    }
  ]
};

// Set top level app state 'ACTIVITY', 'EXERCISE'
exports.setState = (appState={}, state=undefined, data) => {
  const copyOfAppState = JSON.parse(JSON.stringify(appState.stateArray[appState.stateArray.length -1]));
  copyOfAppState.state.type = state;
  copyOfAppState.state.data = data;
  if (data.difficulty && data.activity) {
    copyOfAppState.routineState.type = data.activity + '_' + data.difficulty;
  }
  console.log('routine state type: ', copyOfAppState.routineState.type);
  appState.stateArray.push(copyOfAppState);
  applicationState = appState;
};

// update and return new exercise state
exports.setNextExerciseState = (appState={}, nextExerciseState=undefined) => {
  const copyOfAppState = JSON.parse(JSON.stringify(appState.stateArray[appState.stateArray.length -1]));
  copyOfAppState.exerciseState.type = nextExerciseState;
  appState.stateArray.push(copyOfAppState);
  applicationState = appState;
};

// get next exercise state
// currentState: current application state {}
// exerciseStates: list of object keys {}
exports.getNextExerciseState = (currentState, routineStore) => {
  // find the list of steps within the current exercise
  const currentRoutineSteps = routineStore[currentState.routineState.type];
  // find out which step in the routine they have reached
  const currentExerciseStateIndex = currentRoutineSteps.indexOf(currentState.exerciseState.type);
  // return state
  return currentRoutineSteps[currentExerciseStateIndex + 1] || undefined;
};

// get most recent state
exports.getApplicationState = () => {
  return applicationState.stateArray[applicationState.stateArray.length-1];
};