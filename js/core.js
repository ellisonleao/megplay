// core file
var stage = new Kinetic.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

var layer = new Kinetic.Layer();  
/* TODO: Separar as funcoes em outro arquivo */
function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for(var src in sources) {
    numImages++;
  }
  for(var src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if(++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

function draw(images){
  for(var image in images){
    var _posX = Math.floor(Math.random() * stage.getWidth()) + 324; // largura da img
    var _posY = stage.getHeight() - 168; //TODO: alterar pela altura da img
    var img = new Kinetic.Image({
      x: _posX,
      y: _posY,
      image: images[image],
      draggable: true,
    });
    img.setDraggable(true);
    img.on('mouseover', function(){
      document.body.style.cursor = 'pointer';
    });
    img.on('mouseout', function(){
      document.body.style.cursor = 'default';
    });
    layer.add(img);
    stage.add(layer);
  }
}

var sources = {
  clientes: 'img/clientes.png',
  estrategiasplanos: 'img/estrategiasplanos.png',
  informacaoconhecimento: 'img/informacaoconhecimento.png',
  lideranca: 'img/lideranca.png',
  pessoas: 'img/pessoas.png',
  processos: 'img/processos.png',
  resultados: 'img/resultados.png',
  sociedade: 'img/sociedade.png',
};

loadImages(sources, function(images) {
  draw(images);
});
/*
var boxes = [box, box2];
for(var i = 0; i < boxes.length; i++) {
  boxes[i].on('mouseover', function() {
    document.body.style.cursor = 'pointer';
  });
  
  layer.add(boxes[i]);
}
*/