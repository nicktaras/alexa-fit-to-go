exports.applicationStateModel = {
  stateArray: [
    {
      state: {
        type: 'INIT', 
        difficulty: 'LIGHT', 
        activity: undefined,
      },
      routineState: {
        type: undefined,
        completed: []  
      },
      exerciseState: {
        type: undefined,
        data: null
      }
    }
  ]
};

/*
  TODO:
  have a method called: updateState( { type: 'state' || 'routine' || 'exercise', data: { ... } } )
  this method will invoke sub functions to handle the updates of the state objects
  updateState will then merge and return the next state.
  TODO:
  Create a singleton Class to hold the state of the application.
*/

exports.updateState = (appState, state, data) => {
  // Apply difficulty and activity to state if available
  if (data.difficulty && data.activity && appState.stateArray) { 
    const newState = JSON.parse(JSON.stringify(appState.stateArray[appState.stateArray.length -1]));
    newState.state.type = state;
    newState.state.data = data;
    newState.routineState.type = data.activity + '_' + data.difficulty;
    appState.stateArray.push(newState);  
  }
  return appState;
};

exports.updateExerciseState = (appState, nextExerciseState=undefined) => {
  var newState = JSON.parse(JSON.stringify(appState.stateArray[appState.stateArray.length -1]));
  newState.exerciseState.type = nextExerciseState;
  appState.stateArray.push(newState);
  return appState;
};

exports.getNextExerciseState = (currentState, routineStore) => {
  // find the list of steps within the current exercise
  const currentRoutineSteps = routineStore[currentState.routineState.type];
  // find out which step in the routine they have reached
  const currentExerciseStateIndex = currentRoutineSteps.indexOf(currentState.exerciseState.type);
  // return state, if undefined return the first.
  if (currentExerciseStateIndex > -1) {
    return currentRoutineSteps[currentExerciseStateIndex + 1];
  } else {
    return currentRoutineSteps[0];
  }
};

exports.getApplicationState = (applicationStateModel) => {
  return applicationStateModel.stateArray[applicationStateModel.stateArray.length-1];
};