
var canvas = this.__canvas = new fabric.Canvas('c', { selection: false });
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

var colour = '#457870';
var stroke = '#457879';
var lineColor = 'purple';

var colourIndex = 0;
var colorArr = ['pink', 'red', 'blue', 'green', 'orange', 'black', 'grey', 'red', 'brown', 'blue', 'pink', 'purple', 'red'];

function makeCircle(uid, left, top, line1, line2, line3, line4, radius=5) {
  var c = new fabric.Circle({
    left: left,
    top: top,
    strokeWidth: 2,
    radius: radius,
    fill: '#fff',
    stroke: colour
  });
  c.hasControls = c.hasBorders = false;
  c.line1 = line1;
  c.line2 = line2;
  c.line3 = line3;
  c.line4 = line4;
  c.uid = uid;
  assignDebugCoords({ uid: uid, left: left, top: top });
  return c;
}

function makeLine(coords) {
  colourIndex++;
  return new fabric.Line(coords, {
    fill: 'green',
    stroke: colorArr[colourIndex],
    strokeWidth: 5,
    selectable: false,
    evented: false,
  });
}

//                   sx   sy  ex    ey
var lines = {
  head: makeLine([ 250, 125, 250, 175 ]),
  hips: makeLine([ 250, 175, 250, 250 ]),
  rightElbow: makeLine([ 250, 175, 285, 200 ]),
  rightHand: makeLine([ 285, 200, 320, 225 ]),
  leftElbow: makeLine([ 250, 175, 215, 200 ]),
  leftHand: makeLine([ 215, 200, 180, 225 ]),
  rightKnee: makeLine([ 250, 250, 270, 280]),
  rightAnkle: makeLine([ 270, 280, 280, 315]),
  rightFoot: makeLine([ 280, 315, 300, 315]),
  leftKnee: makeLine([ 250, 250, 235, 275]),
  leftAnkle: makeLine([ 235, 275, 220, 315]),
  leftFoot: makeLine([ 220, 315, 200, 315])
}
    
canvas.add(
  lines.head, 
  lines.hips, 
  lines.rightElbow, 
  lines.rightHand, 
  lines.leftElbow,
  lines.leftHand,
  lines.rightKnee,
  lines.rightAnkle, 
  lines.rightFoot,
  lines.leftKnee,
  lines.leftAnkle,
  lines.leftFoot
);

var circles = {
  headCircle: makeCircle('headCircle', lines.head.get('x1'), lines.head.get('y1'), null, lines.head, null, null, 16),
  shoulderCircle: makeCircle('shoulderCircle', lines.head.get('x2'), lines.head.get('y2'), lines.head, lines.hips, lines.rightElbow, lines.leftElbow),
  hipsCircle: makeCircle('hipsCircle', lines.hips.get('x2'), lines.hips.get('y2'), lines.hips, lines.rightKnee, lines.leftKnee),
  rightElbowCircle: makeCircle('rightElbowCircle', lines.rightElbow.get('x2'), lines.rightElbow.get('y2'), lines.rightElbow, lines.rightHand),
  rightHandCircle: makeCircle('rightHandCircle', lines.rightHand.get('x2'), lines.rightHand.get('y2'), lines.rightHand),
  leftElbowCircle: makeCircle('leftElbowCircle' , lines.leftElbow.get('x2'), lines.leftElbow.get('y2'), lines.leftElbow, lines.leftHand),
  leftHandCircle: makeCircle('leftHandCircle', lines.leftHand.get('x2'), lines.leftHand.get('y2'), lines.leftHand),
  rightKneeCircle: makeCircle('rightKneeCircle', lines.rightKnee.get('x2'), lines.rightKnee.get('y2'), lines.rightKnee, lines.rightAnkle),
  rightAnkleCircle: makeCircle('rightAnkleCircle', lines.rightAnkle.get('x2'), lines.rightAnkle.get('y2'), lines.rightAnkle, lines.rightFoot),
  rightFootCircle: makeCircle('rightFootCircle', lines.rightFoot.get('x2'), lines.rightFoot.get('y2'), lines.rightFoot),
  leftKneeCircle: makeCircle('leftKneeCircle', lines.leftKnee.get('x2'), lines.leftKnee.get('y2'), lines.leftKnee, lines.leftAnkle),
  leftAnkleCircle: makeCircle('leftAnkleCircle', lines.leftAnkle.get('x2'), lines.leftAnkle.get('y2'), lines.leftAnkle, lines.leftFoot),
  leftFootCircle: makeCircle('leftFootCircle', lines.leftFoot.get('x2'), lines.leftFoot.get('y2'), lines.leftFoot)
}

canvas.add(
  circles.headCircle,
  circles.shoulderCircle,
  circles.hipsCircle,
  circles.rightElbowCircle,
  circles.rightHandCircle,
  circles.leftElbowCircle,
  circles.leftHandCircle,
  circles.rightKneeCircle,
  circles.rightAnkleCircle,
  circles.rightFootCircle,
  circles.leftKneeCircle,
  circles.leftAnkleCircle,
  circles.leftFootCircle
);

function assignDebugCoords(p){
  var el = document.getElementById(p.uid);
  if(el) el.innerHTML = " Top: " + Math.round(p.top) + " Left: " + Math.round(p.left);
}

canvas.on('object:moving', function(e) {
  animLines(e.target);
});

function animLines (target){
  var p = target;
  // Set lines to meet the circles.
  if (p.line1) {
    p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
  }
  if (p.line2) {
    p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
  }
  if (p.line3) {
    p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
  }
  if (p.line4) {
    p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
  }

  // make sure all the body parts are connected each render.
  // Head is connected to the shoulders.
  lines.head.set({ 
    'x1': circles.headCircle.left,
    'y1': circles.headCircle.top, 
    'x2': circles.shoulderCircle.left,
    'y2': circles.shoulderCircle.top
  });
  // Shoulders are connected to the head
  lines.hips.set({ 
    'x1': circles.shoulderCircle.left,
    'y1': circles.shoulderCircle.top,
    'x2': circles.hipsCircle.left,
    'y2': circles.hipsCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftElbow.set({ 
    'x1': circles.shoulderCircle.left,
    'y1': circles.shoulderCircle.top,
    'x2': circles.leftElbowCircle.left,
    'y2': circles.leftElbowCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightElbow.set({ 
    'x1': circles.shoulderCircle.left,
    'y1': circles.shoulderCircle.top,
    'x2': circles.rightElbowCircle.left,
    'y2': circles.rightElbowCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftHand.set({ 
    'x1': circles.leftElbowCircle.left,
    'y1': circles.leftElbowCircle.top,
    'x2': circles.leftHandCircle.left,
    'y2': circles.leftHandCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightHand.set({ 
    'x1': circles.rightElbowCircle.left,
    'y1': circles.rightElbowCircle.top,
    'x2': circles.rightHandCircle.left,
    'y2': circles.rightHandCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftKnee.set({ 
    'x1': circles.hipsCircle.left,
    'y1': circles.hipsCircle.top,
    'x2': circles.leftKneeCircle.left,
    'y2': circles.leftKneeCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightKnee.set({ 
    'x1': circles.hipsCircle.left,
    'y1': circles.hipsCircle.top,
    'x2': circles.rightKneeCircle.left,
    'y2': circles.rightKneeCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftAnkle.set({ 
    'x1': circles.leftKneeCircle.left,
    'y1': circles.leftKneeCircle.top,
    'x2': circles.leftAnkleCircle.left,
    'y2': circles.leftAnkleCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightAnkle.set({ 
    'x1': circles.rightKneeCircle.left,
    'y1': circles.rightKneeCircle.top,
    'x2': circles.rightAnkleCircle.left,
    'y2': circles.rightAnkleCircle.top
  });
  // Left Elbow is connected to the 
  lines.leftFoot.set({ 
    'x1': circles.leftAnkleCircle.left,
    'y1': circles.leftAnkleCircle.top,
    'x2': circles.leftFootCircle.left,
    'y2': circles.leftFootCircle.top
  });
  // Right Elbow is connected to the 
  lines.rightFoot.set({ 
    'x1': circles.rightAnkleCircle.left,
    'y1': circles.rightAnkleCircle.top,
    'x2': circles.rightFootCircle.left,
    'y2': circles.rightFootCircle.top
  });

  assignDebugCoords(p);
  canvas.renderAll();
}

var positionStateStore = {
  ARM_RAISE: {
    keys: ['leftElbowCircle', 'rightElbowCircle', 'rightHandCircle', 'leftHandCircle'],
    leftElbowCircle: {
      ref: 'leftElbowCircle',
      top: 152,
      left: 206
    },
    rightElbowCircle: {
      ref: 'rightElbowCircle',
      top: 158,
      left: 286
    },
    rightHandCircle: {
      ref: 'rightHandCircle',
      top: 110,
      left: 309
    },
    leftHandCircle: {
      ref: 'leftHandCircle',
      top: 111,
      left: 191
    }
  },
  HEAL_LIFT: [
    {
      ref: 'headCircle',
      top: 115,
      left: 250
    },
    {
      ref: 'shoulderCircle',
      top: 165, 
      left: 250
    },
    {
      ref: 'hipsCircle',
      top: 240,
      left: 250
    },
    { 
      ref: 'rightKneeCircle', 
      top: 270,
      left: 270
    },
    { 
      ref: 'rightAnkleCircle',
      top: 305,
      left: 280
    },
    { 
      ref: 'rightFootCircle',
      top: 315,
      left: 300
    },
    { 
      ref: 'leftKneeCircle',
      top: 265,
      left: 235
    },
    { 
      ref: 'leftAnkleCircle',
      top: 305,
      left: 220
    },
    { 
      ref: 'leftFootCircle',
      top: 315,
      left: 200
    },
    {
      ref: 'leftElbowCircle',
      top: 190,
      left: 215
    },
    {
      ref: 'rightElbowCircle',
      top: 190,
      left: 285
    },
    {
      ref: 'rightHandCircle',
      top: 215,
      left: 320
    },
    {
      ref: 'leftHandCircle',
      top: 215,
      left: 180
    }
  ],
  IDLE: [
    {
      ref: 'headCircle',
      top: 125,
      left: 250
    },
    {
      ref: 'shoulderCircle',
      top: 175,
      left: 250
    },
    {
      ref: 'hipsCircle',
      top: 250,
      left: 250
    },
    { 
      ref: 'rightKneeCircle',
      left: 270, 
      top: 280
    },
    { 
      ref: 'rightAnkleCircle',
      left: 280, 
      top: 315
    },
    { 
      ref: 'rightFootCircle',
      left: 300, 
      top: 315
    },
    { 
      ref: 'leftKneeCircle',
      left: 235, 
      top: 275
    },
    { 
      ref: 'leftAnkleCircle',
      left: 220, 
      top: 315
    },
    { 
      ref: 'leftFootCircle',
      left: 200, 
      top: 315 
    },
    {
      ref: 'leftElbowCircle',
      top: 200,
      left: 215
    },
    {
      ref: 'rightElbowCircle',
      top: 200,
      left: 285
    },
    {
      ref: 'rightHandCircle',
      top: 225,
      left: 320
    },
    {
      ref: 'leftHandCircle',
      top: 225,
      left: 180
    }
  ]
};

function ani(state) {
  var objList = positionStateStore[state];
  for (var i = 0; i < objList.length; i++) {
    var obj = positionStateStore[state][i];
    var ref = circles[obj.ref];
    ref.animate('top', obj.top, {
      duration: 100,
      easing: undefined,
      onChange: function (){ animLines(ref); }
    }).animate('left', obj.left, {
      duration: 100,
      easing: undefined,
      onChange: function (){
        animLines(ref);
      },
      onComplete: function() {
        if (i < objList.length -1){ 
          i++;
          ani(state);
        }
      }
    });
  }
}

// Jerky version
// var i = 0;
// function ani(state) {
//   var objList = positionStateStore[state];
//   var obj = positionStateStore[state][i];
//   var ref = circles[obj.ref];
//   ref.animate('top', obj.top, {
//     duration: 100,
//     easing: undefined,
//     onChange: function (){ animLines(ref); }
//   }).animate('left', obj.left, {
//     duration: 100,
//     easing: undefined,
//     onChange: function (){
//       animLines(ref);
//     },
//     onComplete: function() {
//       if (i < objList.length -1){ 
//         i++;
//         ani(state);
//       }
//     }
//   });
// }

setTimeout(() => {
  i = 0;
  ani('HEAL_LIFT');
}, 0);
setTimeout(() => {
  i = 0;
  ani('IDLE');
}, 2000);
setTimeout(() => {
  i = 0;
  ani('HEAL_LIFT');
}, 4000);
setTimeout(() => {
  i = 0;
  ani('IDLE');
}, 6000);

var exportData = function () {
  var out = [];
  for (var key in circles) {
    out.push ({
      ref: circles[key].uid,
      left:  Math.round(circles[key].left),
      top:  Math.round(circles[key].top)
    })
  }
  console.log(out);
}

