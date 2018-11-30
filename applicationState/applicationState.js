// A state machine for the application.
exports.applicationState = {
  stateArray: [
    { state: 'INIT', subState: undefined }
  ]
};

// TODO - consider how this should be best done
exports.restoreApplicationState = (stateArray) => {
  applicationState.stateArray = stateArray;
};

// add new state
exports.setApplicationState = (state) => {
  applicationState.stateArray.push(state);
};

// Update the substate to next state.
exports.setToNextSubState = (substates) => {
  var currentState = applicationState.stateArray[applicationState.stateArray.length-1];
  var currentSubStateIndex = substates.indexOf(currentState.subState);
  var state = currentState;
  state.subState = substates[currentSubStateIndex + 1];
  applicationState.stateArray.push(state);
};

// get most recent state
exports.getApplicationState = () => {
  return applicationState.stateArray[applicationState.stateArray.length-1];
};