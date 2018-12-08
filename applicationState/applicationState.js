// TODO dont forget to this.pushNewState(newState);
// https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know#undefined

exports.appStateMachine = {
  applicationStateModel: {
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
  },
  pushNewState: (newState) => {
    this.applicationStateModel.stateArray.push(newState);  
  },
  // Update the applications main state - e.g. 'ACTIVITY'
  updateState: ({ state=undefined, stateName=undefined }) => {
    if (state && stateName) {
      var newState = JSON.parse(JSON.stringify(state));
      newState.state.type = stateName;
      return newState;
    }
    console.warn('updateState: state or stateName were missing');
    return;
  },
  // Assigns and returns the routine state - e.g. 'JOG_LIGHT'
  updateRoutineState: ({ state=null, data=undefined }) => {
    if (state, data.activity && data.difficulty) {
      var newState = JSON.parse(JSON.stringify(state));
      newState.routineState.data = data;
      newState.routineState.type = data.activity + '_' + data.difficulty;
      return newState;
    }
    console.warn('updateRoutineState: data was missing', data);
    return;
  },
  // Assigns and returns the exercise state - e.g. 'STEP_UPS_INIT'
  updateExerciseState: ({state=null, exerciseStateName=undefined}) => {
    if (state && exerciseStateName) {
      var newState = JSON.parse(JSON.stringify(state));
      newState.exerciseState.type = exerciseStateName;
      return newState;
    } else {
      console.warn('updateExerciseState: state or exerciseStateName were missing');
    }
    return;
  },
  // a helper method to find the next routine exercise step from store
  getNextExerciseState: ({ state=null, routineStore=undefined }) => {
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
  },
  // returns the last application state object
  getApplicationState: () => {
    return this.applicationStateModel.stateArray[this.applicationStateModel.stateArray.length -1];
  }
};