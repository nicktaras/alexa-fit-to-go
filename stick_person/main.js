(function() {
  var canvas = this.__canvas = new fabric.Canvas('c', { selection: false });
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

  var colour = '#457870';
  var stroke = '#457879';
  var lineColor = 'purple'; // '#58adaf';

  function makeCircleHead(left, top, line1, line2) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 3,
      radius: 15,
      fill: '#fff',
      stroke: colour
    });
    c.hasControls = c.hasBorders = false;
    c.line1 = line1;
    c.line2 = line2;
    return c;
  }

  function makeCircle(left, top, line1, line2, line3, line4) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 2,
      radius: 5,
      fill: '#fff',
      stroke: colour
    });

    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;

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
  var headLine = makeLine([ 250, 125, 250, 175 ])
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
    headLine, 
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

  canvas.add(
    makeCircleHead(headLine.get('x1'), headLine.get('y1'), null, headLine),
    makeCircle(headLine.get('x2'), headLine.get('y2'), headLine, hips, rightElbow, leftElbow),
    makeCircle(hips.get('x2'), hips.get('y2'), hips, rightKnee, leftKnee),
    makeCircle(rightElbow.get('x2'), rightElbow.get('y2'), rightElbow, rightHand),
    makeCircle(rightHand.get('x2'), rightHand.get('y2'), rightHand),
    makeCircle(leftElbow.get('x2'), leftElbow.get('y2'), leftElbow, leftHand),
    makeCircle(leftHand.get('x2'), leftHand.get('y2'), leftHand),
    makeCircle(rightKnee.get('x2'), rightKnee.get('y2'), rightKnee, rightAnkle),
    makeCircle(rightAnkle.get('x2'), rightAnkle.get('y2'), rightAnkle, rightFoot),
    makeCircle(rightFoot.get('x2'), rightFoot.get('y2'), rightFoot),
    makeCircle(leftKnee.get('x2'), leftKnee.get('y2'), leftKnee, leftAnkle),
    makeCircle(leftAnkle.get('x2'), leftAnkle.get('y2'), leftAnkle, leftFoot),
    makeCircle(leftFoot.get('x2'), leftFoot.get('y2'), leftFoot),
  );

  canvas.on('object:moving', function(e) {
    var p = e.target;
    p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
    p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
    p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
    p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
    canvas.renderAll();
  });
})();