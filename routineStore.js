// Stores all routines of exercises

const routineStore = {
  JOG_LIGHT: [
    'INTRO_JOG_LIGHT',
    'DOUBLE_HEAL_LIFTS_INIT', 
    'DOUBLE_HEAL_LIFTS',
    'LEG_RAISES_INIT',
    'LEG_RAISES',
    'END'
  ],
  JOG_MEDIUM: [
    'INTRO_JOG_LIGHT',
    'SINGLE_HEAL_LIFTS_INIT',
    'SINGLE_HEAL_LIFTS',
    'LEG_RAISES_INIT',
    'LEG_RAISES',
    'END'
  ],
  JOG_HARD: [
    'INTRO_JOG_LIGHT',
    'DOUBLE_HEAL_LIFTS_INIT', 
    'DOUBLE_HEAL_LIFTS',
    'SINGLE_HEAL_LIFTS_INIT',
    'SINGLE_HEAL_LIFTS',
    'BOTTOM_LIFTS_INIT',
    'BOTTOM_LIFTS',
    'END'
  ],
};

module.exports = routineStore;