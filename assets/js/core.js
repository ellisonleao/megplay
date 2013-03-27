// core file
var stage = new Kinetic.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
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
var boxes = [box, box2];

for(var i = 0; i < boxes.length; i++) {
  boxes[i].on('mouseover', function() {
    document.body.style.cursor = 'pointer';
  });
  
  layer.add(boxes[i]);
}

stage.add(layer);