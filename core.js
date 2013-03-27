// core file

var stage = new Kinetic.Stage({
  container: 'container',
  width: 960,
  height: 400
});

var layer = new Kinetic.Layer();  
var rectX = stage.getWidth() / 2 - 50;
var rectY = stage.getHeight() / 2 - 25;

var box = new Kinetic.Rect({
  x: rectX,
  y: rectY,
  width: 220,
  height: 90,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true
});

var box2 = new Kinetic.Rect({
  x: rectX + 240,
  y: rectY,
  width: 220,
  height: 90,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true
});

// drag and drop
box.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});
box.on('mouseout', function() {
  document.body.style.cursor = 'default';
});

box2.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});
box2.on('mouseout', function() {
  document.body.style.cursor = 'default';
});

layer.add(box);
layer.add(box2);

stage.add(layer);