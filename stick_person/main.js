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

  // render
  canvas.renderAll();

  // $('#c').get(0).toBlob(function (blob) {
    // saveAs(blob, 'f.png');
  // }); 

}

// BOTTOM_LIFTS

var positionStateStore = {
  HEAL_LIFT_LEFT_DOWN: [
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
  ],
  HEAL_LIFT_LEFT_UP: [
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
  ],
  JEDI_1: [
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
  ],
  JEDI_2: [
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
  ],
  JEDI_3: [
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
  ],
  KARATEKID: [
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
  ],
  JACKIECHAN: [
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
  ],
  MICHEALJACKSON:[
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
  ],
  SUPERMAN: [
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
  ],
  FREDDIE: [
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
  ],
  HULK: [
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
  ],
  BOLT: [
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
  ],
  ARM_RAISE: [
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
  ],
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
      duration: 400,
      easing: undefined,
      onChange: function (){ animLines(ref); }
    }).animate('left', obj.left, {
      duration: 400,
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

setTimeout(() => {
  ani('HEAL_LIFT_LEFT_DOWN');
}, 0);
setTimeout(() => {
  ani('HEAL_LIFT_LEFT_UP');
}, 2000);
setTimeout(() => {
  ani('HEAL_LIFT_LEFT_DOWN');
}, 4000);
setTimeout(() => {
  ani('HEAL_LIFT_LEFT_UP');
}, 6000);

// setTimeout(() => {
//   ani('BOLT');
// }, 0);
// setTimeout(() => {
//   ani('MICHEALJACKSON');
// }, 2000);
// setTimeout(() => {
//   ani('SUPERMAN');
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
