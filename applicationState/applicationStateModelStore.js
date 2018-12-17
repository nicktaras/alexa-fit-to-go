// Stores the application state model
// during the course of the applications lifecycle.

const initialState = {
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
};

module.exports = class ApplicationStateModelStore {
  constructor(stateArray=initialState) {
    this.stateArray = stateArray;
  }
  getState() {
    return this.stateArray
  }
}


