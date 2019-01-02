
const initialState = [{
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
}];

// Similar to a Redux pattern.
// All the methods return a new application state.
module.exports = class ApplicationStateModelStore {
  constructor(stateArray=initialState) {
    this.stateArray = stateArray;
  }
  getFullHistory() {
    return this.stateArray;
  }
  pushNewState(newState) {
    this.stateArray.push(newState);  
  }
  updateState({ state=undefined, stateName=undefined }) {
    if (state && stateName) {
      var newState = JSON.parse(JSON.stringify(state));
      newState.state.type = stateName;
      this.pushNewState(newState);
      return newState;
    }
    console.warn('updateState: state or stateName were missing');
    return null;
  }
  updateRoutineState({ state=null, activity=undefined, difficulty=undefined }) {
    if (state && activity && difficulty) {
      var newState = JSON.parse(JSON.stringify(state));
      newState.routineState.activity = activity;
      newState.routineState.difficulty = difficulty;
      newState.routineState.type = activity + '_' + difficulty;
      this.pushNewState(newState);
      return newState;
    }
    console.warn('updateRoutineState: data was missing', state, activity, difficulty);
    return;
  }
  updateExerciseState({ state=null, exerciseStateName=undefined }) {
    if (state && exerciseStateName) {
      var newState = JSON.parse(JSON.stringify(state));
      newState.exerciseState.type = exerciseStateName;
      this.pushNewState(newState);
      return newState;
    } else {
      console.warn('updateExerciseState: state or exerciseStateName were missing');
    }
    return;
  }
  isLastExercise({ state=null, routineStore=routineStore }){
    if (state && routineStore) {
      // find the list of steps within the current exercise
      var currentRoutineSteps = routineStore[state.routineState.type];
      // find out which step in the routine they have reached
      var currentExerciseStateIndex = currentRoutineSteps.indexOf(state.exerciseState.type) || 0;
      // return true or false
      if(currentExerciseStateIndex > -1 && currentExerciseStateIndex !== currentRoutineSteps.length -1) {
        return false;
      } else {
        return true;
      }
    } 
    console.warn('getNextExerciseState: state or routineStore were missing');
    return;
  }
  getNextExerciseState({ state=null, routineStore=routineStore }) {
    if (state && routineStore) {
      var exerciseStateName;
      // find the list of steps within the current exercise
      var currentRoutineSteps = routineStore[state.routineState.type];
      // find out which step in the routine they have reached
      var currentExerciseStateIndex = currentRoutineSteps.indexOf(state.exerciseState.type) || 0;
      // return exercise state if it exists, else return the first in the routine.
      // e.g. 'STEP_UPS_INIT'
      if (currentExerciseStateIndex > -1) {
        // If there is a next step, return it.
        if (currentRoutineSteps[currentExerciseStateIndex + 1]) {
          exerciseStateName = currentRoutineSteps[currentExerciseStateIndex + 1];
        } else { // Otherwise return the first step
          exerciseStateName = currentRoutineSteps[0];
        }
      } else {
        exerciseStateName = currentRoutineSteps[0];
      }
      return this.updateExerciseState({ 
        state: state, 
        exerciseStateName: exerciseStateName 
      });
    } 
    console.warn('getNextExerciseState: state or routineStore were missing');
    return;
  }
  getApplicationState() {
    return this.stateArray[this.stateArray.length -1];
  }
}

