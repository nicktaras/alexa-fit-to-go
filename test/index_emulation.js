/*
  Alexa-Fit-To-Go Emulate Lambda / Alexa.
  author: Nick Taras
  For more infromation please visit: 
  https://github.com/nicktaras/alexa-fit-to-go
*/

const appPath = './../app/';
const { conversationHandler } = require(appPath + 'conversationHandler/conversationHandler');
const routineStore = require(appPath + 'routineStore');
const ApplicationStateModelStore = require(appPath + 'applicationState/applicationState');
var applicationStateModelStore = new ApplicationStateModelStore();
var applicationState = applicationStateModelStore.getApplicationState();

// Test to ensure the applicationState is correct.
applicationState = applicationStateModelStore.updateState({ 
  state: applicationState, 
  stateName: 'ACTIVITY'
});
// console.log('applicationState', applicationState);

// Test to ensure updateRoutineState is functioning correctly.
applicationState = applicationStateModelStore.updateRoutineState({ 
  state: applicationState, 
  difficulty: 'LIGHT',
  activity: 'JOG'
});
// console.log('applicationState', applicationState);

// Test to ensure getNextExerciseState returns the correct next state
// applicationState = applicationStateModelStore.getNextExerciseState({
//   state: applicationState,
//   routineStore: routineStore
// });
// console.log('applicationState', applicationState);

// Test that conversation handler can return the correct text.
// console.log(conversationHandler({ state: applicationState }));

// Test to ensure getNextExerciseState returns the correct next state
// applicationState = applicationStateModelStore.getNextExerciseState({
//   state: applicationState,
//   routineStore: routineStore
// });
// console.log(conversationHandler({ state: applicationState }));

// Test to ensure getNextExerciseState returns the correct next state
// applicationState = applicationStateModelStore.getNextExerciseState({
//   state: applicationState,
//   routineStore: routineStore
// });
// console.log(conversationHandler({ state: applicationState }));

// Test to ensure getNextExerciseState returns the correct next state
// applicationState = applicationStateModelStore.getNextExerciseState({
//   state: applicationState,
//   routineStore: routineStore
// });
// console.log(conversationHandler({ state: applicationState }));

// Test to ensure getNextExerciseState returns the correct next state
applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});

applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});

applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});

applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});

applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});

applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});

console.log(conversationHandler({ state: applicationState }));
