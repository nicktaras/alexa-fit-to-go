var applicationStateModel = {
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

// push new state (side effect to update store)
const pushNewState = (newState) => {
  applicationStateModel.stateArray.push(newState);  
};

// Update the applications main state - e.g. 'ACTIVITY'
exports.updateState = ({ state=undefined, stateName=undefined, update=this.pushNewState }) => {
  if (state && stateName) {
    var newState = JSON.parse(JSON.stringify(state));
    newState.state.type = stateName;
    update(newState);
    return newState;
  }
  console.warn('updateState: state or stateName were missing');
  return;
};

// Assigns and returns the routine state - e.g. 'JOG_LIGHT'
exports.updateRoutineState = ({ state=null, data={}, update=this.pushNewState }) => {
  if (state && data.activity && data.difficulty) {
    var newState = JSON.parse(JSON.stringify(state));
    newState.routineState.data = data;
    newState.routineState.type = data.activity + '_' + data.difficulty;
    update(newState);
    return newState;
  }
  console.warn('updateRoutineState: data was missing', data);
  return;
};

// Assigns and returns the exercise state - e.g. 'STEP_UPS_INIT'
exports.updateExerciseState = ({ state=null, exerciseStateName=undefined, update=this.pushNewState }) => {
  if (state && exerciseStateName) {
    var newState = JSON.parse(JSON.stringify(state));
    newState.exerciseState.type = exerciseStateName;
    update(newState);
    return newState;
  } else {
    console.warn('updateExerciseState: state or exerciseStateName were missing');
  }
  return;
};
  // a helper method to find the next routine exercise step from store
exports.getNextExerciseState = ({ state=null, routineStore=undefined }) => {
  if (state && routineStore) {
    // find the list of steps within the current exercise
    var currentRoutineSteps = routineStore[state.routineState.type];
    // find out which step in the routine they have reached
    var currentExerciseStateIndex = currentRoutineSteps.indexOf(state.exerciseState.type);
    // return exercise state if it exists, else return the first in the routine.
    // e.g. 'STEP_UPS_INIT'
    if (currentExerciseStateIndex > -1) {
      return currentRoutineSteps[currentExerciseStateIndex + 1];
    } else {
      return currentRoutineSteps[0];
    }
  } 
  console.warn('getNextExerciseState: state or routineStore were missing');
  return;
};
// returns the last application state object
exports.getApplicationState = () => {
  return applicationStateModel.stateArray[applicationStateModel.stateArray.length -1];
};
