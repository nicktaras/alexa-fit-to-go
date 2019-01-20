/*
  Alexa-Fit-To-Go Emulate Lambda / Alexa.
  author: Nick Taras
  For more infromation please visit: 
  https://github.com/nicktaras/alexa-fit-to-go
*/

const appPath = './../app/';
const { exerciseConversationHandler } = require(appPath + 'exerciseConversationHandler/exerciseConversationHandler');
const routineStore = require(appPath + 'routineStore');
const ApplicationStateModelStore = require(appPath + 'applicationState/applicationState');
var applicationStateModelStore = new ApplicationStateModelStore();
var applicationState = applicationStateModelStore.getApplicationState();

// Test to ensure the applicationState is correct.
applicationState = applicationStateModelStore.updateState({ 
  state: applicationState, 
  stateName: 'ACTIVITY'
});
console.log('applicationState', applicationState);

// Test to ensure updateRoutineState is functioning correctly.
applicationState = applicationStateModelStore.updateRoutineState({ 
  state: applicationState, 
  difficulty: 'LIGHT',
  activity: 'JOG'
});
console.log('applicationState', applicationState);

// Test to ensure getNextExerciseState returns the correct next state
applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});
console.log('applicationState', applicationState);

// Test that conversation handler can return the correct text.
console.log(exerciseConversationHandler({ state: applicationState }));

// Test to ensure getNextExerciseState returns the correct next state
applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});
console.log(exerciseConversationHandler({ state: applicationState }));

// Test to ensure getNextExerciseState returns the correct next state
applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});
console.log(exerciseConversationHandler({ state: applicationState }));

// Test to ensure getNextExerciseState returns the correct next state
applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});
console.log(exerciseConversationHandler({ state: applicationState }));

// Test to ensure getNextExerciseState returns the correct next state
applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});
console.log(exerciseConversationHandler({ state: applicationState }));

applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});
console.log(exerciseConversationHandler({ state: applicationState }));

var isLastExercise = applicationStateModelStore.isLastExercise({
  state: applicationState,
  routineStore: routineStore
});

console.log(isLastExercise);

applicationState = applicationStateModelStore.getNextExerciseState({
  state: applicationState,
  routineStore: routineStore
});
console.log(exerciseConversationHandler({ state: applicationState }));

var isLastExercise = applicationStateModelStore.isLastExercise({
  state: applicationState,
  routineStore: routineStore
});

console.log(isLastExercise);

// applicationState = applicationStateModelStore.getNextExerciseState({
//   state: applicationState,
//   routineStore: routineStore
// });

// applicationState = applicationStateModelStore.getNextExerciseState({
//   state: applicationState,
//   routineStore: routineStore
// });

// applicationState = applicationStateModelStore.getNextExerciseState({
//   state: applicationState,
//   routineStore: routineStore
// });

// applicationState = applicationStateModelStore.getNextExerciseState({
//   state: applicationState,
//   routineStore: routineStore
// });

// console.log(exerciseConversationHandler({ state: applicationState }));
