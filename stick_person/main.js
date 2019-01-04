(function() {
  var canvas = this.__canvas = new fabric.Canvas('c', { selection: false });
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

  var colour = '#457870';
  var stroke = '#457879';
  var lineColor = 'purple';

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
    return new fabric.Line(coords, {
      fill: stroke,
      stroke: lineColor,
      strokeWidth: 5,
      selectable: false,
      evented: false,
    });
  }

  //                         sx   sy  ex    ey
  var head = makeLine([ 250, 125, 250, 175 ])
      hips = makeLine([ 250, 175, 250, 250 ]),
      rightElbow = makeLine([ 250, 175, 285, 200 ]),
      rightHand = makeLine([ 285, 200, 320, 225 ]),
      leftElbow = makeLine([ 250, 175, 215, 200 ]),
      leftHand = makeLine([ 215, 200, 180, 225 ]),
      rightKnee = makeLine([ 250, 250, 280, 280]),
      rightAnkle = makeLine([ 280, 280, 320, 315]),
      rightFoot = makeLine([ 320, 315, 350, 315]),
      leftKnee = makeLine([ 250, 250, 225, 275]),
      leftAnkle = makeLine([ 225, 275, 180, 315]),
      leftFoot = makeLine([ 180, 315, 150, 315]),
      
  canvas.add(
    head, 
    hips, 
    rightElbow, 
    rightHand, 
    leftElbow,
    leftHand,
    rightKnee,
    rightAnkle, 
    rightFoot,
    leftKnee,
    leftAnkle,
    leftFoot
  );

  var circles = {
    headCircle: makeCircle('head', head.get('x1'), head.get('y1'), null, head, null, null, 16),
    shoulders: makeCircle('shoulders', head.get('x2'), head.get('y2'), head, hips, rightElbow, leftElbow),
    hipsCircle: makeCircle('hips', hips.get('x2'), hips.get('y2'), hips, rightKnee, leftKnee),
    rightElbowCircle: makeCircle('right-elbow', rightElbow.get('x2'), rightElbow.get('y2'), rightElbow, rightHand),
    rightHandCircle: makeCircle('right-hand', rightHand.get('x2'), rightHand.get('y2'), rightHand),
    leftElbowCircle: makeCircle('left-elbow' , leftElbow.get('x2'), leftElbow.get('y2'), leftElbow, leftHand),
    leftHandCircle: makeCircle('left-hand', leftHand.get('x2'), leftHand.get('y2'), leftHand),
    rightKneeCircle: makeCircle('right-knee', rightKnee.get('x2'), rightKnee.get('y2'), rightKnee, rightAnkle),
    rightAnkleCircle: makeCircle('right-ankle', rightAnkle.get('x2'), rightAnkle.get('y2'), rightAnkle, rightFoot),
    rightFootCircle: makeCircle('right-foot', rightFoot.get('x2'), rightFoot.get('y2'), rightFoot),
    leftKneeCircle: makeCircle('left-knee', leftKnee.get('x2'), leftKnee.get('y2'), leftKnee, leftAnkle),
    leftAnkleCircle: makeCircle('left-ankle', leftAnkle.get('x2'), leftAnkle.get('y2'), leftAnkle, leftFoot),
    leftFootCircle: makeCircle('left-foot', leftFoot.get('x2'), leftFoot.get('y2'), leftFoot)
  }

  canvas.add(
    circles.headCircle,
    circles.shoulders,
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
    animTest(e.target);
  });

  function animTest (target){
    var p = target;
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
    assignDebugCoords(p);
    canvas.renderAll();
  }

  var positionStateStore = {
    ARM_RAISE: {
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
    }
  };

  var _keys = ['leftElbowCircle', 'rightElbowCircle', 'rightHandCircle', 'leftHandCircle'];

  var i = 0;
  function ani() {
    var obj = positionStateStore.ARM_RAISE[_keys[i]];
    var ref = circles[_keys[i]];
    ref.animate('top', obj.top, {
      duration: 1000,
      onChange: function (){ animTest(ref); },
      onComplete: function() {}
    });
    ref.animate('left', obj.left, {
      duration: 100,
      onChange: function (){
        animTest(ref);
      },
      onComplete: function() {
        if (i < _keys.length -1){ 
          i++;
          ani();
        }
      }
    });
  }
  ani();

})();
