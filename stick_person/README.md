// TODO's

TOuch toes...
Stretch Your Hamstrings and Back. The classic, standing toe-touch exercise primarily stretches your hamstrings, the four-muscle group in the back of each thigh. This exercise also works the erector-spinae muscles in your lower back. Do the exercise by standing with your legs straight and your feet together.

// Test video / gif via Alexa
// Update design to look good on all devices
// Add logo, move stickperson etc

// Set up recorder to record the correct length of time
// and export the video automatically

// Add timings to stick person animation
// for recording and sync with voice
 
// test anim sync with voice (not so important if we cannot do this for mvp)

// Build out routines and exercises - anims and voice.

// Make logo

// Submit to store

// How to add the logo:

var canvas = new fabric.Canvas('c');
canvas.backgroundColor = 'yellow';

fabric.Image.fromURL('http://fabricjs.com/assets/pug_small.jpg', function(myImg) {
 //i create an extra var for to change some image properties
 var img1 = myImg.set({ left: 0, top: 0 ,width:150,height:150});
 canvas.add(img1); 
});

canvas.on('mouse:down',function(event){
  if(canvas.getActiveObject()){
    alert(event.target);
  }

})

// How to add a gradient:

// initialize fabric canvas and assign to global windows object for debug
var canvas = window._canvas = new fabric.Canvas('c');

// Do some initializing stuff
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: 'rgba(102,153,255,0.5)',
    cornerSize: 12,
    padding: 5
});

// Initialze the example
var rect1 = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: '#ffda4f'
});
var rect2 = new fabric.Rect({
    left: 250,
    top: 100,
    width: 100,
    height: 100,
    fill: 'rgb(111,154,211)'
});
var rect3 = new fabric.Rect({
    left: 400,
    top: 100,
    width: 100,
    height: 100,
    fill: 'rgb(166,111,213)'
});
var rect4 = new fabric.Rect({
    left: 100,
    top: 400,
    width: 100,
    height: 100,
    fill: '#ffda4f'
});
var rect5 = new fabric.Rect({
    left: 250,
    top: 400,
    width: 100,
    height: 100,
    fill: 'rgb(111,154,211)'
});
var rect6 = new fabric.Rect({
    left: 400,
    top: 400,
    width: 100,
    height: 100,
    fill: 'rgb(166,111,213)'
});
canvas.add(rect1, rect2, rect3, rect4, rect5, rect6);

/**
 * setGradient linear gradients example
 */

// horizontal linear gradient
rect1.setGradient('fill', {
    type: 'linear',
    x1: -rect1.width / 2,
    y1: 0,
    x2: rect1.width / 2,
    y2: 0,
    colorStops: {
        0: '#ffe47b',
        1: 'rgb(111,154,211)'
    }
});

// vertical linear gradient
rect2.setGradient('fill', {
    type: 'linear',
    x1: 0,
    y1: -rect2.height / 2,
    x2: 0,
    y2: rect2.height / 2,
    colorStops: {
        0: '#ff4040',
        1: '#e6399b'
    }
});

// diagonal linear gradient
rect3.setGradient('fill', {
    type: 'linear',
    x1: -rect3.width / 2,
    y1: -rect3.height / 2,
    x2: rect3.width / 2,
    y2: rect3.height / 2,
    colorStops: {
        0: 'rgb(166,111,213)',
        0.5: 'rgba(106, 72, 215, 0.5)',
        1: '#200772'
    }
});

/**
 * setGradient radial gradients example
 */

// radial gradient
rect4.setGradient('fill', {
    type: 'radial',
    r1: rect4.width / 2,
    r2: 10,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    colorStops: {
        0: '#FF4F4F',
        1: 'rgb(255, 239, 64)'
    }
});

// radial gradient
rect5.setGradient('fill', {
    type: 'radial',
    r1: rect5.width / 2,
    r2: 10,
    x1: 0,
    y1: 0,
    x2: rect4.width / 4,
    y2: rect4.height / 4,
    colorStops: {
        0: '#ffe47b',
        0.5: 'rgb(111,154,211)',
        1: 'rgb(166,111,213)'
    }
});

// radial gradient
rect6.setGradient('fill', {
    type: 'radial',
    r1: 50,
    r2: 80,
    x1: 45,
    y1: 45,
    x2: 52,
    y2: 50,
    colorStops: {
        0: 'rgb(155, 237, 0)',
        1: 'rgba(0, 164, 128,0.4)'
    }
});

canvas.renderAll();
