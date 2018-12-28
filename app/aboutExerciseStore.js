// Stores all exercise types

const exerciseStore = {
  'HEAL_LIFTS': {
    type: 'text',
    config: {
      type: "SSML",
      responseType: ':ask',
      text: "The heel raise exercise works your calf muscles, which are two separate muscles. The first is the gastrocnemius muscle, which is the outermost calf muscle on the back of your lower leg. Your soleus muscle is the second part of your calf muscle and rests underneath the gastrocnemius."
    }
  },
}

module.exports = exerciseStore;
