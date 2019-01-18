var canvas = this.__canvas = new fabric.Canvas('c', { selection: false, backgroundColor : "white" } );

fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

var fillColor = 'white';
var lineColor = 'black'; //['pink', 'red', 'blue', 'green', 'orange', 'purple', 'grey', 'red', 'brown', 'blue', 'pink', 'purple', 'red'];

function makeCircle(uid, left, top, line1, line2, line3, line4, radius=5) {

  if(radius > 4) {
    var fill = 'none';
    var strokeWidth = 4;
  }

  var c = new fabric.Circle({
    left: left,
    top: top,
    strokeWidth: strokeWidth || 0,
    radius: radius || 0,
    fill: fillColor,
    stroke: lineColor
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
  return new fabric.Line(coords, {
    fill: fillColor,
    stroke: lineColor,
    strokeWidth: 4,
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
  headCircle: makeCircle('headCircle', lines.head.get('x1'), lines.head.get('y1'), null, lines.head, null, null, 24),
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
  circles.shoulderCircle,
  circles.hipsCircle,
  circles.rightKneeCircle,
  circles.rightAnkleCircle,
  circles.rightFootCircle,
  circles.rightElbowCircle,
  circles.rightHandCircle,
  circles.leftHandCircle,
  circles.headCircle,
  circles.leftElbowCircle,
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

var cSize = 550;
var imgURL = 'logo.svg';
var logoImg = new Image();
logoImg.onload = function (img) {    
    var logo = new fabric.Image(logoImg, {
        angle: 0,
        width: 1800,
        height: 550,
        left: cSize / 2 + 27,
        top: 60,
        scaleX: .08,
        scaleY: .08
    });
    canvas.add(logo);
};
logoImg.src = imgURL;

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
    'y2': circles.leftElbowCircle.to
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

  canvas.bringToFront(circles.headCircle);

  // render
  canvas.renderAll();

}

// Exercises:
// LUNGING_HIP_FLEXER
// STANDING_QUAD_STRETCH
// KNEE_TO_CHEST
// BUTTERFLY_STRETCH
// SQUAT
// SQUAT_EASY
// PUSH_UP
// PUSH_UP_BEGINNER
// TWIST (WAIST)
// SIT_UP
// ARM_RAISE ?
// BOLT (MOVE)
// HULK
// FREDDIE
// SUPERMAN
// MICHEALJACKSON
// JACKIECHAN
// KARATEKID 
// JEDI_3
// HEAL_LIFT_LEFT_UP
// DOUBLE_HEAL_LIFT

var positionStateStore = {
  STAR_JUMP_LAND: {
    speed: 1500,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 283,
        "top": 152
      },
      {
        "ref": "rightHandCircle",
        "left": 327,
        "top": 115
      },
      {
        "ref": "leftElbowCircle",
        "left": 208,
        "top": 145
      },
      {
        "ref": "leftHandCircle",
        "left": 174,
        "top": 115
      },
      {
        "ref": "rightKneeCircle",
        "left": 270,
        "top": 280
      },
      {
        "ref": "rightAnkleCircle",
        "left": 293,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 317,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 224,
        "top": 283
      },
      {
        "ref": "leftAnkleCircle",
        "left": 199,
        "top": 316
      },
      {
        "ref": "leftFootCircle",
        "left": 180,
        "top": 316
      }
    ]
  },
  HALFWAY_STAR_JUMP: {
    speed: 1500,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 174
      },
      {
        "ref": "hipsCircle",
        "left": 251,
        "top": 239
      },
      {
        "ref": "rightElbowCircle",
        "left": 287,
        "top": 173
      },
      {
        "ref": "rightHandCircle",
        "left": 340,
        "top": 173
      },
      {
        "ref": "leftElbowCircle",
        "left": 209,
        "top": 173
      },
      {
        "ref": "leftHandCircle",
        "left": 165,
        "top": 173
      },
      {
        "ref": "rightKneeCircle",
        "left": 267,
        "top": 272
      },
      {
        "ref": "rightAnkleCircle",
        "left": 278,
        "top": 304
      },
      {
        "ref": "rightFootCircle",
        "left": 299,
        "top": 308
      },
      {
        "ref": "leftKneeCircle",
        "left": 228,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 213,
        "top": 303
      },
      {
        "ref": "leftFootCircle",
        "left": 193,
        "top": 307
      }
    ]
  },
  STANDING_STRAIGHT: {
    speed: 1500,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 271,
        "top": 209
      },
      {
        "ref": "rightHandCircle",
        "left": 274,
        "top": 250
      },
      {
        "ref": "leftElbowCircle",
        "left": 227,
        "top": 205
      },
      {
        "ref": "leftHandCircle",
        "left": 225,
        "top": 252
      },
      {
        "ref": "rightKneeCircle",
        "left": 260,
        "top": 277
      },
      {
        "ref": "rightAnkleCircle",
        "left": 263,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 280,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 240,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 242,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 222,
        "top": 315
      }
    ]
  },
  DOUBLE_HEAL_LIFT_UP: {
    speed: 1000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 124
      },
      {
        "ref": "shoulderCircle",
        "left": 249,
        "top": 170
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 238
      },
      {
        "ref": "rightElbowCircle",
        "left": 284,
        "top": 198
      },
      {
        "ref": "rightHandCircle",
        "left": 320,
        "top": 225
      },
      {
        "ref": "leftElbowCircle",
        "left": 217,
        "top": 195
      },
      {
        "ref": "leftHandCircle",
        "left": 180,
        "top": 225
      },
      {
        "ref": "rightKneeCircle",
        "left": 261,
        "top": 263
      },
      {
        "ref": "rightAnkleCircle",
        "left": 263,
        "top": 298
      },
      {
        "ref": "rightFootCircle",
        "left": 274,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 237,
        "top": 264
      },
      {
        "ref": "leftAnkleCircle",
        "left": 236,
        "top": 298
      },
      {
        "ref": "leftFootCircle",
        "left": 225,
        "top": 315
      }
    ]
  },
  DOUBLE_HEAL_LIFT_ALMOST_DOWN: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 124
      },
      {
        "ref": "shoulderCircle",
        "left": 251,
        "top": 174
      },
      {
        "ref": "hipsCircle",
        "left": 249,
        "top": 241
      },
      {
        "ref": "rightElbowCircle",
        "left": 284,
        "top": 198
      },
      {
        "ref": "rightHandCircle",
        "left": 320,
        "top": 225
      },
      {
        "ref": "leftElbowCircle",
        "left": 217,
        "top": 195
      },
      {
        "ref": "leftHandCircle",
        "left": 180,
        "top": 225
      },
      {
        "ref": "rightKneeCircle",
        "left": 261,
        "top": 270
      },
      {
        "ref": "rightAnkleCircle",
        "left": 261,
        "top": 306
      },
      {
        "ref": "rightFootCircle",
        "left": 274,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 237,
        "top": 269
      },
      {
        "ref": "leftAnkleCircle",
        "left": 237,
        "top": 308
      },
      {
        "ref": "leftFootCircle",
        "left": 225,
        "top": 315
      }
    ]
  },
  DOUBLE_HEAL_LIFT_DOWN: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 285,
        "top": 200
      },
      {
        "ref": "rightHandCircle",
        "left": 320,
        "top": 225
      },
      {
        "ref": "leftElbowCircle",
        "left": 215,
        "top": 200
      },
      {
        "ref": "leftHandCircle",
        "left": 180,
        "top": 225
      },
      {
        "ref": "rightKneeCircle",
        "left": 261,
        "top": 273
      },
      {
        "ref": "rightAnkleCircle",
        "left": 263,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 274,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 237,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 237,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 225,
        "top": 315
      }
    ]
  },
  HEAL_LIFT_LEFT_DOWN: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 243
      },
      {
        "ref": "rightElbowCircle",
        "left": 285,
        "top": 200
      },
      {
        "ref": "rightHandCircle",
        "left": 320,
        "top": 225
      },
      {
        "ref": "leftElbowCircle",
        "left": 215,
        "top": 200
      },
      {
        "ref": "leftHandCircle",
        "left": 180,
        "top": 225
      },
      {
        "ref": "rightKneeCircle",
        "left": 268,
        "top": 261
      },
      {
        "ref": "rightAnkleCircle",
        "left": 268,
        "top": 302
      },
      {
        "ref": "rightFootCircle",
        "left": 284,
        "top": 303
      },
      {
        "ref": "leftKneeCircle",
        "left": 249,
        "top": 276
      },
      {
        "ref": "leftAnkleCircle",
        "left": 249,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 234,
        "top": 315
      }
    ]
  },
  HEAL_LIFT_LEFT_UP: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 115
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 165
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 233
      },
      {
        "ref": "rightElbowCircle",
        "left": 285,
        "top": 190
      },
      {
        "ref": "rightHandCircle",
        "left": 320,
        "top": 215
      },
      {
        "ref": "leftElbowCircle",
        "left": 215,
        "top": 190
      },
      {
        "ref": "leftHandCircle",
        "left": 180,
        "top": 215
      },
      {
        "ref": "rightKneeCircle",
        "left": 268,
        "top": 251
      },
      {
        "ref": "rightAnkleCircle",
        "left": 268,
        "top": 292
      },
      {
        "ref": "rightFootCircle",
        "left": 284,
        "top": 293
      },
      {
        "ref": "leftKneeCircle",
        "left": 249,
        "top": 266
      },
      {
        "ref": "leftAnkleCircle",
        "left": 249,
        "top": 305
      },
      {
        "ref": "leftFootCircle",
        "left": 234,
        "top": 315
      }
    ]
  },
  JEDI_1: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 229,
        "top": 158
      },
      {
        "ref": "shoulderCircle",
        "left": 233,
        "top": 186
      },
      {
        "ref": "hipsCircle",
        "left": 217,
        "top": 253
      },
      {
        "ref": "rightElbowCircle",
        "left": 169,
        "top": 169
      },
      {
        "ref": "rightHandCircle",
        "left": 202,
        "top": 143
      },
      {
        "ref": "leftElbowCircle",
        "left": 180,
        "top": 164
      },
      {
        "ref": "leftHandCircle",
        "left": 201,
        "top": 142
      },
      {
        "ref": "rightKneeCircle",
        "left": 242,
        "top": 291
      },
      {
        "ref": "rightAnkleCircle",
        "left": 279,
        "top": 321
      },
      {
        "ref": "rightFootCircle",
        "left": 260,
        "top": 325
      },
      {
        "ref": "leftKneeCircle",
        "left": 179,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 189,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 171,
        "top": 322
      }
    ]
  },
  JEDI_2: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 234,
        "top": 155
      },
      {
        "ref": "shoulderCircle",
        "left": 233,
        "top": 186
      },
      {
        "ref": "hipsCircle",
        "left": 239,
        "top": 239
      },
      {
        "ref": "rightElbowCircle",
        "left": 276,
        "top": 160
      },
      {
        "ref": "rightHandCircle",
        "left": 307,
        "top": 142
      },
      {
        "ref": "leftElbowCircle",
        "left": 291,
        "top": 179
      },
      {
        "ref": "leftHandCircle",
        "left": 307,
        "top": 143
      },
      {
        "ref": "rightKneeCircle",
        "left": 279,
        "top": 264
      },
      {
        "ref": "rightAnkleCircle",
        "left": 286,
        "top": 311
      },
      {
        "ref": "rightFootCircle",
        "left": 300,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 232,
        "top": 283
      },
      {
        "ref": "leftAnkleCircle",
        "left": 203,
        "top": 308
      },
      {
        "ref": "leftFootCircle",
        "left": 213,
        "top": 324
      }
    ]
  },   
  JEDI_3: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 234,
        "top": 155
      },
      {
        "ref": "shoulderCircle",
        "left": 233,
        "top": 186
      },
      {
        "ref": "hipsCircle",
        "left": 239,
        "top": 239
      },
      {
        "ref": "rightElbowCircle",
        "left": 209,
        "top": 218
      },
      {
        "ref": "rightHandCircle",
        "left": 175,
        "top": 226
      },
      {
        "ref": "leftElbowCircle",
        "left": 183,
        "top": 202
      },
      {
        "ref": "leftHandCircle",
        "left": 173,
        "top": 226
      },
      {
        "ref": "rightKneeCircle",
        "left": 276,
        "top": 273
      },
      {
        "ref": "rightAnkleCircle",
        "left": 277,
        "top": 316
      },
      {
        "ref": "rightFootCircle",
        "left": 300,
        "top": 322
      },
      {
        "ref": "leftKneeCircle",
        "left": 196,
        "top": 282
      },
      {
        "ref": "leftAnkleCircle",
        "left": 194,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 180,
        "top": 326
      }
    ]
  },
  KARATEKID: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 251,
        "top": 233
      },
      {
        "ref": "rightElbowCircle",
        "left": 290,
        "top": 111
      },
      {
        "ref": "rightHandCircle",
        "left": 304,
        "top": 120
      },
      {
        "ref": "leftElbowCircle",
        "left": 209,
        "top": 107
      },
      {
        "ref": "leftHandCircle",
        "left": 195,
        "top": 121
      },
      {
        "ref": "rightKneeCircle",
        "left": 251,
        "top": 283
      },
      {
        "ref": "rightAnkleCircle",
        "left": 251,
        "top": 316
      },
      {
        "ref": "rightFootCircle",
        "left": 262,
        "top": 317
      },
      {
        "ref": "leftKneeCircle",
        "left": 226,
        "top": 222
      },
      {
        "ref": "leftAnkleCircle",
        "left": 220,
        "top": 257
      },
      {
        "ref": "leftFootCircle",
        "left": 213,
        "top": 270
      }
    ]
  },
  JACKIECHAN: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 240,
        "top": 144
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 240,
        "top": 245
      },
      {
        "ref": "rightElbowCircle",
        "left": 290,
        "top": 200
      },
      {
        "ref": "rightHandCircle",
        "left": 271,
        "top": 194
      },
      {
        "ref": "leftElbowCircle",
        "left": 195,
        "top": 198
      },
      {
        "ref": "leftHandCircle",
        "left": 163,
        "top": 185
      },
      {
        "ref": "rightKneeCircle",
        "left": 281,
        "top": 274
      },
      {
        "ref": "rightAnkleCircle",
        "left": 274,
        "top": 307
      },
      {
        "ref": "rightFootCircle",
        "left": 289,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 205,
        "top": 279
      },
      {
        "ref": "leftAnkleCircle",
        "left": 183,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 165,
        "top": 316
      }
    ]
  },
  MICHEALJACKSON: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 234,
        "top": 148
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 242,
        "top": 254
      },
      {
        "ref": "rightElbowCircle",
        "left": 285,
        "top": 207
      },
      {
        "ref": "rightHandCircle",
        "left": 320,
        "top": 225
      },
      {
        "ref": "leftElbowCircle",
        "left": 196,
        "top": 174
      },
      {
        "ref": "leftHandCircle",
        "left": 224,
        "top": 137
      },
      {
        "ref": "rightKneeCircle",
        "left": 214,
        "top": 278
      },
      {
        "ref": "rightAnkleCircle",
        "left": 237,
        "top": 321
      },
      {
        "ref": "rightFootCircle",
        "left": 230,
        "top": 343
      },
      {
        "ref": "leftKneeCircle",
        "left": 202,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 223,
        "top": 321
      },
      {
        "ref": "leftFootCircle",
        "left": 217,
        "top": 342
      }
    ]
  },
  SUPERMAN: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 249,
        "top": 135
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 237
      },
      {
        "ref": "rightElbowCircle",
        "left": 274,
        "top": 187
      },
      {
        "ref": "rightHandCircle",
        "left": 274,
        "top": 214
      },
      {
        "ref": "leftElbowCircle",
        "left": 219,
        "top": 137
      },
      {
        "ref": "leftHandCircle",
        "left": 222,
        "top": 95
      },
      {
        "ref": "rightKneeCircle",
        "left": 272,
        "top": 238
      },
      {
        "ref": "rightAnkleCircle",
        "left": 272,
        "top": 282
      },
      {
        "ref": "rightFootCircle",
        "left": 279,
        "top": 300
      },
      {
        "ref": "leftKneeCircle",
        "left": 249,
        "top": 276
      },
      {
        "ref": "leftAnkleCircle",
        "left": 247,
        "top": 317
      },
      {
        "ref": "leftFootCircle",
        "left": 230,
        "top": 318
      }
    ]
  },
  FREDDIE: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 263,
        "top": 154
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 246,
        "top": 232
      },
      {
        "ref": "rightElbowCircle",
        "left": 270,
        "top": 222
      },
      {
        "ref": "rightHandCircle",
        "left": 289,
        "top": 248
      },
      {
        "ref": "leftElbowCircle",
        "left": 225,
        "top": 146
      },
      {
        "ref": "leftHandCircle",
        "left": 209,
        "top": 100
      },
      {
        "ref": "rightKneeCircle",
        "left": 283,
        "top": 280
      },
      {
        "ref": "rightAnkleCircle",
        "left": 306,
        "top": 316
      },
      {
        "ref": "rightFootCircle",
        "left": 316,
        "top": 317
      },
      {
        "ref": "leftKneeCircle",
        "left": 225,
        "top": 277
      },
      {
        "ref": "leftAnkleCircle",
        "left": 208,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 193,
        "top": 315
      }
    ]
  },
  HULK: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 225,
        "top": 159
      },
      {
        "ref": "shoulderCircle",
        "left": 231,
        "top": 197
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 276,
        "top": 173
      },
      {
        "ref": "rightHandCircle",
        "left": 309,
        "top": 154
      },
      {
        "ref": "leftElbowCircle",
        "left": 189,
        "top": 196
      },
      {
        "ref": "leftHandCircle",
        "left": 199,
        "top": 177
      },
      {
        "ref": "rightKneeCircle",
        "left": 270,
        "top": 280
      },
      {
        "ref": "rightAnkleCircle",
        "left": 280,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 300,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 235,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 220,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 200,
        "top": 315
      }
    ]
  },
  LAYING_FLAT_INIT: {
    speed: 10, 
    coords: [
      {
        "ref": "headCircle",
        "left": 358,
        "top": 302
      },
      {
        "ref": "shoulderCircle",
        "left": 311,
        "top": 303
      },
      {
        "ref": "hipsCircle",
        "left": 215,
        "top": 305
      },
      {
        "ref": "rightElbowCircle",
        "left": 343,
        "top": 326
      },
      {
        "ref": "rightHandCircle",
        "left": 402,
        "top": 327
      },
      {
        "ref": "leftElbowCircle",
        "left": 345,
        "top": 278
      },
      {
        "ref": "leftHandCircle",
        "left": 400,
        "top": 278
      },
      {
        "ref": "rightKneeCircle",
        "left": 175,
        "top": 301
      },
      {
        "ref": "rightAnkleCircle",
        "left": 115,
        "top": 301
      },
      {
        "ref": "rightFootCircle",
        "left": 105,
        "top": 285
      },
      {
        "ref": "leftKneeCircle",
        "left": 175,
        "top": 316
      },
      {
        "ref": "leftAnkleCircle",
        "left": 111,
        "top": 319
      },
      {
        "ref": "leftFootCircle",
        "left": 98,
        "top": 336
      }
    ]
  },
  LAYING: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 125,
        "top": 253
      },
      {
        "ref": "shoulderCircle",
        "left": 157,
        "top": 262
      },
      {
        "ref": "hipsCircle",
        "left": 248,
        "top": 263
      },
      {
        "ref": "rightElbowCircle",
        "left": 178,
        "top": 247
      },
      {
        "ref": "rightHandCircle",
        "left": 230,
        "top": 247
      },
      {
        "ref": "leftElbowCircle",
        "left": 184,
        "top": 280
      },
      {
        "ref": "leftHandCircle",
        "left": 235,
        "top": 281
      },
      {
        "ref": "rightKneeCircle",
        "left": 296,
        "top": 229
      },
      {
        "ref": "rightAnkleCircle",
        "left": 332,
        "top": 265
      },
      {
        "ref": "rightFootCircle",
        "left": 353,
        "top": 265
      },
      {
        "ref": "leftKneeCircle",
        "left": 296,
        "top": 229
      },
      {
        "ref": "leftAnkleCircle",
        "left": 331,
        "top": 263
      },
      {
        "ref": "leftFootCircle",
        "left": 351,
        "top": 264
      }
    ]
  },
  BOLT: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 237,
        "top": 140
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 271,
        "top": 248
      },
      {
        "ref": "rightElbowCircle",
        "left": 290,
        "top": 139
      },
      {
        "ref": "rightHandCircle",
        "left": 314,
        "top": 117
      },
      {
        "ref": "leftElbowCircle",
        "left": 214,
        "top": 199
      },
      {
        "ref": "leftHandCircle",
        "left": 272,
        "top": 181
      },
      {
        "ref": "rightKneeCircle",
        "left": 293,
        "top": 265
      },
      {
        "ref": "rightAnkleCircle",
        "left": 305,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 321,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 235,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 235,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 219,
        "top": 317
      }
    ]
  },
  ARM_RAISE: {
    speed: 2000,
    coords: [
      {
        ref: 'leftElbowCircle',
        top: 152,
        left: 206
      },
      {
        ref: 'rightElbowCircle',
        top: 158,
        left: 286
      },
      {
        ref: 'rightHandCircle',
        top: 110,
        left: 309
      },
      {
        ref: 'leftHandCircle',
        top: 111,
        left: 191
      }
    ]
  },
  HEAL_LIFT: {
    speed: 2000,
    coords: [
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
    ]
  },
  SIT_UP: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 197,
        "top": 170
      },
      {
        "ref": "shoulderCircle",
        "left": 193,
        "top": 209
      },
      {
        "ref": "hipsCircle",
        "left": 248,
        "top": 263
      },
      {
        "ref": "rightElbowCircle",
        "left": 244,
        "top": 218
      },
      {
        "ref": "rightHandCircle",
        "left": 283,
        "top": 212
      },
      {
        "ref": "leftElbowCircle",
        "left": 243,
        "top": 219
      },
      {
        "ref": "leftHandCircle",
        "left": 286,
        "top": 215
      },
      {
        "ref": "rightKneeCircle",
        "left": 296,
        "top": 229
      },
      {
        "ref": "rightAnkleCircle",
        "left": 332,
        "top": 265
      },
      {
        "ref": "rightFootCircle",
        "left": 353,
        "top": 265
      },
      {
        "ref": "leftKneeCircle",
        "left": 296,
        "top": 229
      },
      {
        "ref": "leftAnkleCircle",
        "left": 331,
        "top": 263
      },
      {
        "ref": "leftFootCircle",
        "left": 351,
        "top": 264
      }
    ]
  },
  PUSH_UP_UP_BEGINNER: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 332,
        "top": 233
      },
      {
        "ref": "shoulderCircle",
        "left": 300,
        "top": 246
      },
      {
        "ref": "hipsCircle",
        "left": 211,
        "top": 274
      },
      {
        "ref": "rightElbowCircle",
        "left": 316,
        "top": 275
      },
      {
        "ref": "rightHandCircle",
        "left": 329,
        "top": 309
      },
      {
        "ref": "leftElbowCircle",
        "left": 292,
        "top": 274
      },
      {
        "ref": "leftHandCircle",
        "left": 290,
        "top": 308
      },
      {
        "ref": "rightKneeCircle",
        "left": 175,
        "top": 309
      },
      {
        "ref": "rightAnkleCircle",
        "left": 155,
        "top": 251
      },
      {
        "ref": "rightFootCircle",
        "left": 143,
        "top": 262
      },
      {
        "ref": "leftKneeCircle",
        "left": 175,
        "top": 309
      },
      {
        "ref": "leftAnkleCircle",
        "left": 135,
        "top": 245
      },
      {
        "ref": "leftFootCircle",
        "left": 123,
        "top": 254
      }
    ]
  },
  PUSH_UP_DOWN_BEGINNER: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 355,
        "top": 281
      },
      {
        "ref": "shoulderCircle",
        "left": 309,
        "top": 283
      },
      {
        "ref": "hipsCircle",
        "left": 225,
        "top": 283
      },
      {
        "ref": "rightElbowCircle",
        "left": 330,
        "top": 259
      },
      {
        "ref": "rightHandCircle",
        "left": 329,
        "top": 309
      },
      {
        "ref": "leftElbowCircle",
        "left": 289,
        "top": 262
      },
      {
        "ref": "leftHandCircle",
        "left": 290,
        "top": 308
      },
      {
        "ref": "rightKneeCircle",
        "left": 175,
        "top": 309
      },
      {
        "ref": "rightAnkleCircle",
        "left": 155,
        "top": 251
      },
      {
        "ref": "rightFootCircle",
        "left": 143,
        "top": 262
      },
      {
        "ref": "leftKneeCircle",
        "left": 175,
        "top": 309
      },
      {
        "ref": "leftAnkleCircle",
        "left": 135,
        "top": 245
      },
      {
        "ref": "leftFootCircle",
        "left": 123,
        "top": 254
      }
    ]
  },
  PUSH_UP_UP: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 336,
        "top": 212
      },
      {
        "ref": "shoulderCircle",
        "left": 294,
        "top": 239
      },
      {
        "ref": "hipsCircle",
        "left": 211,
        "top": 259
      },
      {
        "ref": "rightElbowCircle",
        "left": 319,
        "top": 269
      },
      {
        "ref": "rightHandCircle",
        "left": 335,
        "top": 303
      },
      {
        "ref": "leftElbowCircle",
        "left": 298,
        "top": 266
      },
      {
        "ref": "leftHandCircle",
        "left": 306,
        "top": 307
      },
      {
        "ref": "rightKneeCircle",
        "left": 158,
        "top": 276
      },
      {
        "ref": "rightAnkleCircle",
        "left": 122,
        "top": 288
      },
      {
        "ref": "rightFootCircle",
        "left": 129,
        "top": 310
      },
      {
        "ref": "leftKneeCircle",
        "left": 162,
        "top": 274
      },
      {
        "ref": "leftAnkleCircle",
        "left": 120,
        "top": 287
      },
      {
        "ref": "leftFootCircle",
        "left": 128,
        "top": 312
      }
    ]
  },
  TWIST_SIDE: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 252,
        "top": 177
      },
      {
        "ref": "rightHandCircle",
        "left": 247,
        "top": 177
      },
      {
        "ref": "leftElbowCircle",
        "left": 248,
        "top": 176
      },
      {
        "ref": "leftHandCircle",
        "left": 249,
        "top": 175
      },
      {
        "ref": "rightKneeCircle",
        "left": 262,
        "top": 275
      },
      {
        "ref": "rightAnkleCircle",
        "left": 267,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 281,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 235,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 233,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 215,
        "top": 315
      }
    ]
  },
  TWIST_FRONT: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 296,
        "top": 175
      },
      {
        "ref": "rightHandCircle",
        "left": 347,
        "top": 175
      },
      {
        "ref": "leftElbowCircle",
        "left": 205,
        "top": 176
      },
      {
        "ref": "leftHandCircle",
        "left": 164,
        "top": 176
      },
      {
        "ref": "rightKneeCircle",
        "left": 262,
        "top": 275
      },
      {
        "ref": "rightAnkleCircle",
        "left": 267,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 281,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 235,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 233,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 215,
        "top": 315
      }
    ]
  },
  PUSH_UP_DOWN: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 352,
        "top": 275
      },
      {
        "ref": "shoulderCircle",
        "left": 313,
        "top": 283
      },
      {
        "ref": "hipsCircle",
        "left": 233,
        "top": 285
      },
      {
        "ref": "rightElbowCircle",
        "left": 328,
        "top": 252
      },
      {
        "ref": "rightHandCircle",
        "left": 338,
        "top": 304
      },
      {
        "ref": "leftElbowCircle",
        "left": 289,
        "top": 262
      },
      {
        "ref": "leftHandCircle",
        "left": 306,
        "top": 307
      },
      {
        "ref": "rightKneeCircle",
        "left": 173,
        "top": 287
      },
      {
        "ref": "rightAnkleCircle",
        "left": 122,
        "top": 288
      },
      {
        "ref": "rightFootCircle",
        "left": 129,
        "top": 310
      },
      {
        "ref": "leftKneeCircle",
        "left": 173,
        "top": 284
      },
      {
        "ref": "leftAnkleCircle",
        "left": 120,
        "top": 287
      },
      {
        "ref": "leftFootCircle",
        "left": 128,
        "top": 312
      }
    ]
  },
  SQUAT_POSITION_EASY: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 263,
        "top": 162
      },
      {
        "ref": "shoulderCircle",
        "left": 254,
        "top": 198
      },
      {
        "ref": "hipsCircle",
        "left": 213,
        "top": 264
      },
      {
        "ref": "rightElbowCircle",
        "left": 291,
        "top": 199
      },
      {
        "ref": "rightHandCircle",
        "left": 329,
        "top": 199
      },
      {
        "ref": "leftElbowCircle",
        "left": 291,
        "top": 198
      },
      {
        "ref": "leftHandCircle",
        "left": 326,
        "top": 198
      },
      {
        "ref": "rightKneeCircle",
        "left": 256,
        "top": 267
      },
      {
        "ref": "rightAnkleCircle",
        "left": 249,
        "top": 316
      },
      {
        "ref": "rightFootCircle",
        "left": 270,
        "top": 316
      },
      {
        "ref": "leftKneeCircle",
        "left": 250,
        "top": 273
      },
      {
        "ref": "leftAnkleCircle",
        "left": 250,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 272,
        "top": 316
      }
    ]
  },
  SQUAT_STANDING: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 285,
        "top": 176
      },
      {
        "ref": "rightHandCircle",
        "left": 320,
        "top": 178
      },
      {
        "ref": "leftElbowCircle",
        "left": 288,
        "top": 177
      },
      {
        "ref": "leftHandCircle",
        "left": 320,
        "top": 178
      },
      {
        "ref": "rightKneeCircle",
        "left": 249,
        "top": 281
      },
      {
        "ref": "rightAnkleCircle",
        "left": 249,
        "top": 316
      },
      {
        "ref": "rightFootCircle",
        "left": 270,
        "top": 316
      },
      {
        "ref": "leftKneeCircle",
        "left": 249,
        "top": 282
      },
      {
        "ref": "leftAnkleCircle",
        "left": 250,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 269,
        "top": 318
      }
    ]
  },
  BUTTERFLY_STRETCH: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 264,
        "top": 218
      },
      {
        "ref": "rightHandCircle",
        "left": 258,
        "top": 284
      },
      {
        "ref": "leftElbowCircle",
        "left": 235,
        "top": 215
      },
      {
        "ref": "leftHandCircle",
        "left": 242,
        "top": 282
      },
      {
        "ref": "rightKneeCircle",
        "left": 308,
        "top": 248
      },
      {
        "ref": "rightAnkleCircle",
        "left": 259,
        "top": 283
      },
      {
        "ref": "rightFootCircle",
        "left": 258,
        "top": 304
      },
      {
        "ref": "leftKneeCircle",
        "left": 194,
        "top": 249
      },
      {
        "ref": "leftAnkleCircle",
        "left": 242,
        "top": 284
      },
      {
        "ref": "leftFootCircle",
        "left": 243,
        "top": 305
      }
    ]
  },
  BUTTERFLY_INIT: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 264,
        "top": 218
      },
      {
        "ref": "rightHandCircle",
        "left": 258,
        "top": 284
      },
      {
        "ref": "leftElbowCircle",
        "left": 235,
        "top": 215
      },
      {
        "ref": "leftHandCircle",
        "left": 242,
        "top": 282
      },
      {
        "ref": "rightKneeCircle",
        "left": 301,
        "top": 232
      },
      {
        "ref": "rightAnkleCircle",
        "left": 259,
        "top": 283
      },
      {
        "ref": "rightFootCircle",
        "left": 258,
        "top": 304
      },
      {
        "ref": "leftKneeCircle",
        "left": 201,
        "top": 233
      },
      {
        "ref": "leftAnkleCircle",
        "left": 242,
        "top": 284
      },
      {
        "ref": "leftFootCircle",
        "left": 243,
        "top": 305
      }
    ]
  },
  KNEE_TO_CHEST: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 125,
        "top": 253
      },
      {
        "ref": "shoulderCircle",
        "left": 157,
        "top": 262
      },
      {
        "ref": "hipsCircle",
        "left": 248,
        "top": 263
      },
      {
        "ref": "rightElbowCircle",
        "left": 183,
        "top": 236
      },
      {
        "ref": "rightHandCircle",
        "left": 217,
        "top": 217
      },
      {
        "ref": "leftElbowCircle",
        "left": 206,
        "top": 256
      },
      {
        "ref": "leftHandCircle",
        "left": 218,
        "top": 217
      },
      {
        "ref": "rightKneeCircle",
        "left": 296,
        "top": 229
      },
      {
        "ref": "rightAnkleCircle",
        "left": 332,
        "top": 265
      },
      {
        "ref": "rightFootCircle",
        "left": 353,
        "top": 265
      },
      {
        "ref": "leftKneeCircle",
        "left": 217,
        "top": 217
      },
      {
        "ref": "leftAnkleCircle",
        "left": 248,
        "top": 216
      },
      {
        "ref": "leftFootCircle",
        "left": 255,
        "top": 197
      }
    ]
  },
  STANDING_LEFT: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 252,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 230,
        "top": 203
      },
      {
        "ref": "rightHandCircle",
        "left": 220,
        "top": 250
      },
      {
        "ref": "leftElbowCircle",
        "left": 243,
        "top": 204
      },
      {
        "ref": "leftHandCircle",
        "left": 234,
        "top": 252
      },
      {
        "ref": "rightKneeCircle",
        "left": 252,
        "top": 276
      },
      {
        "ref": "rightAnkleCircle",
        "left": 254,
        "top": 316
      },
      {
        "ref": "rightFootCircle",
        "left": 238,
        "top": 316
      },
      {
        "ref": "leftKneeCircle",
        "left": 252,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 253,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 237,
        "top": 316
      }
    ]
  },
  STANDING_QUAD_STRETCH: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 245,
        "top": 128
      },
      {
        "ref": "shoulderCircle",
        "left": 242,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 242,
        "top": 247
      },
      {
        "ref": "rightElbowCircle",
        "left": 274,
        "top": 171
      },
      {
        "ref": "rightHandCircle",
        "left": 296,
        "top": 222
      },
      {
        "ref": "leftElbowCircle",
        "left": 220,
        "top": 205
      },
      {
        "ref": "leftHandCircle",
        "left": 208,
        "top": 239
      },
      {
        "ref": "rightKneeCircle",
        "left": 263,
        "top": 274
      },
      {
        "ref": "rightAnkleCircle",
        "left": 283,
        "top": 237
      },
      {
        "ref": "rightFootCircle",
        "left": 295,
        "top": 221
      },
      {
        "ref": "leftKneeCircle",
        "left": 240,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 242,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 222,
        "top": 315
      }
    ]
  },
  LUNGING_HIP_FLEXER_DEEPER: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 235,
        "top": 143
      },
      {
        "ref": "shoulderCircle",
        "left": 230,
        "top": 186
      },
      {
        "ref": "hipsCircle",
        "left": 224,
        "top": 264
      },
      {
        "ref": "rightElbowCircle",
        "left": 221,
        "top": 228
      },
      {
        "ref": "rightHandCircle",
        "left": 172,
        "top": 256
      },
      {
        "ref": "leftElbowCircle",
        "left": 190,
        "top": 220
      },
      {
        "ref": "leftHandCircle",
        "left": 172,
        "top": 256
      },
      {
        "ref": "rightKneeCircle",
        "left": 279,
        "top": 314
      },
      {
        "ref": "rightAnkleCircle",
        "left": 309,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 325,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 172,
        "top": 256
      },
      {
        "ref": "leftAnkleCircle",
        "left": 190,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 169,
        "top": 315
      }
    ]
  },
  LUNGING_HIP_FLEXER: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 235,
        "top": 143
      },
      {
        "ref": "shoulderCircle",
        "left": 230,
        "top": 186
      },
      {
        "ref": "hipsCircle",
        "left": 231,
        "top": 264
      },
      {
        "ref": "rightElbowCircle",
        "left": 221,
        "top": 228
      },
      {
        "ref": "rightHandCircle",
        "left": 178,
        "top": 255
      },
      {
        "ref": "leftElbowCircle",
        "left": 190,
        "top": 220
      },
      {
        "ref": "leftHandCircle",
        "left": 180,
        "top": 255 
      },
      {
        "ref": "rightKneeCircle",
        "left": 279,
        "top": 314
      },
      {
        "ref": "rightAnkleCircle",
        "left": 309,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 325,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 180,
        "top": 257
      },
      {
        "ref": "leftAnkleCircle",
        "left": 190,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 169,
        "top": 315
      }
    ]
  },
  IDLE: {
    speed: 2000,
    coords: [
      {
        "ref": "headCircle",
        "left": 250,
        "top": 125
      },
      {
        "ref": "shoulderCircle",
        "left": 250,
        "top": 175
      },
      {
        "ref": "hipsCircle",
        "left": 250,
        "top": 250
      },
      {
        "ref": "rightElbowCircle",
        "left": 285,
        "top": 200
      },
      {
        "ref": "rightHandCircle",
        "left": 320,
        "top": 225
      },
      {
        "ref": "leftElbowCircle",
        "left": 215,
        "top": 200
      },
      {
        "ref": "leftHandCircle",
        "left": 180,
        "top": 225
      },
      {
        "ref": "rightKneeCircle",
        "left": 266,
        "top": 273
      },
      {
        "ref": "rightAnkleCircle",
        "left": 280,
        "top": 315
      },
      {
        "ref": "rightFootCircle",
        "left": 300,
        "top": 315
      },
      {
        "ref": "leftKneeCircle",
        "left": 235,
        "top": 275
      },
      {
        "ref": "leftAnkleCircle",
        "left": 220,
        "top": 315
      },
      {
        "ref": "leftFootCircle",
        "left": 200,
        "top": 315
      }
    ]
  }
};

// 37 Moves.

function ani(state) {
  var objList = positionStateStore[state];
  for (var i = 0; i < objList.coords.length; i++) {
    var obj = positionStateStore[state].coords[i];
    var speed = positionStateStore[state].speed;
    var ref = circles[obj.ref];
    ref.animate('top', obj.top, {
      duration: speed,
      easing: undefined,
      onChange: function (){ animLines(ref); }
    }).animate('left', obj.left, {
      duration: speed,
      easing: undefined,
      onChange: function (){
        animLines(ref);
      },
      onComplete: function() {
        if (i < objList.coords.length -1){ 
          i++;
          ani(state);
        }
      }
    });
  }
}

// -- LEGS:
// LUNGES
// STANDING_QUAD_STRETCH
// BUTTERFLY_INIT
// DOUBLE_HEAL_LIFT_DOWN
// SINGLE HEALS - TODO!
// -- ARMS:
// PUSH_UP_UP
// EASY PUSH UP - TODO!
// ARM_TEST - TODO!
// -- STOMACH:
// TWIST_FRONT
// SIT_UP
// SEMI_SIT_UP - TODO!
// -- BACK:
// SQUAT
// TOUCH TOES - TODO!
// LAYING - TODO!
// PLANKING - TODO!
// AEROBIC
// STAR_JUMPS - TODO fix up

// EXERCISE TOTAL: 45

// STANDING_QUAD_STRETCH tells us what mustlces are being used
// https://www.self.com/gallery/essential-stretches-slideshow

// setTimeout(() => {
//   ani('LAYING_FLAT_INIT');
// }, 0);
// setTimeout(() => {
//   ani('PUSH_UP_DOWN_BEGINNER');
// }, 2000);
// setTimeout(() => {
//   ani('PUSH_UP_UP_BEGINNER');
// }, 5000);
// setTimeout(() => {
//   ani('PUSH_UP_DOWN_BEGINNER');
// }, 7000);
// setTimeout(() => {
//   ani('PUSH_UP_UP_BEGINNER');
// }, 10000);

// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER'); 
// }, 0);
// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER_DEEPER');
// }, 2000);
// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER');
// }, 5000);
// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER_DEEPER');
// }, 7000);
// setTimeout(() => {
//   ani('LUNGING_HIP_FLEXER');
// }, 10000);

// setTimeout(() => {
//   ani('STANDING_STRAIGHT'); 
// }, 0);
// setTimeout(() => {
//   ani('STANDING_QUAD_STRETCH');
// }, 2000);
// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 5000);
// setTimeout(() => {
//   ani('STANDING_QUAD_STRETCH');
// }, 7000);
// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 10000);

// Hamstrings

setTimeout(() => {
  ani('BUTTERFLY_INIT'); 
}, 0);
setTimeout(() => {
  ani('BUTTERFLY_STRETCH');
}, 2000);
setTimeout(() => {
  ani('BUTTERFLY_INIT');
}, 5000);
setTimeout(() => {
  ani('BUTTERFLY_STRETCH');
}, 7000);
setTimeout(() => {
  ani('BUTTERFLY_INIT');
}, 10000);

// squat
// setTimeout(() => {
//   ani('SQUAT_STANDING'); 
// }, 0);
// setTimeout(() => {
//   ani('SQUAT_POSITION_EASY');
// }, 2000);
// setTimeout(() => {
//   ani('SQUAT_STANDING');
// }, 5000);
// setTimeout(() => {
//   ani('SQUAT_POSITION_EASY');
// }, 7000);
// setTimeout(() => {
//   ani('SQUAT_STANDING');
// }, 10000);

// twist
// setTimeout(() => {
//   ani('TWIST_FRONT'); 
// }, 0);
// setTimeout(() => {
//   ani('TWIST_SIDE');
// }, 2000);
// setTimeout(() => {
//   ani('TWIST_FRONT');
// }, 4000);
// setTimeout(() => {
//   ani('TWIST_SIDE');
// }, 6000);
// setTimeout(() => {
//   ani('TWIST_FRONT');
// }, 8000);

//push ups Fix this up a bit.
// setTimeout(() => {
//   ani('PUSH_UP_UP');
// }, 0);
// setTimeout(() => {
//   ani('PUSH_UP_DOWN');
// }, 2000);
// setTimeout(() => {
//   ani('PUSH_UP_UP');
// }, 4000);
// setTimeout(() => {
//   ani('PUSH_UP_UP');
// }, 6000);
// setTimeout(() => {
//   ani('PUSH_UP_DOWN');
// }, 8000);

// Situps
// setTimeout(() => {
//   ani('LAYING');
// }, 0);
// setTimeout(() => {
//   ani('SIT_UP');
// }, 2000);
// setTimeout(() => {
//   ani('LAYING');
// }, 4000);
// setTimeout(() => {
//   ani('SIT_UP');
// }, 6000);
// setTimeout(() => {
//   ani('LAYING');
// }, 8000);

// Star jumps
// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 0);
// setTimeout(() => {
//   ani('HALFWAY_STAR_JUMP');
// }, 1500);
// setTimeout(() => {
//   ani('STAR_JUMP_LAND');
// }, 3000);
// setTimeout(() => {
//   ani('HALFWAY_STAR_JUMP');
// }, 4500);
// setTimeout(() => {
//   ani('STANDING_STRAIGHT');
// }, 6000);

// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_DOWN');
// }, 0);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_DOWN');
// }, 3000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_UP');
// }, 5000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_UP');
// }, 10000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_ALMOST_DOWN');
// }, 12000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_ALMOST_DOWN');
// }, 14000);
// setTimeout(() => {
//   ani('DOUBLE_HEAL_LIFT_DOWN');
// }, 16000);
// setTimeout(() => {
//   ani('HEAL_LIFT_LEFT_UP');
// }, 2000);
// setTimeout(() => {
//   ani('HEAL_LIFT_LEFT_DOWN');
// }, 4000);
// setTimeout(() => {
//   ani('HEAL_LIFT_LEFT_UP');
// }, 6000);

// setTimeout(() => {
//   stopRecording();
// }, 20000);

// setTimeout(() => {
//   ani('BOLT');
// }, 0);
// setTimeout(() => {
//   ani('MICHEALJACKSON');
// }, 2000);
// setTimeout(() => {
//   ani('LEG_STAND');
// }, 4000);
// setTimeout(() => {
//   ani('JACKIECHAN');
// }, 8000);
// setTimeout(() => {
//   ani('KARATEKID');
// }, 10000);
// setTimeout(() => {
//   ani('JEDI_1');
// }, 12000);
// setTimeout(() => {
//   ani('JEDI_2');
// }, 14000);
// setTimeout(() => {
//   ani('JEDI_3');
// }, 16000);
// setTimeout(() => {
//   ani('IDLE');
// }, 18000);

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
