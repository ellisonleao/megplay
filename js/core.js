// core file
var stage = new Kinetic.Stage({
  container: 'container',
  width: window.innerWidth,
  height: 400 
});

var layer = new Kinetic.Layer();  
/* TODO: Separar as funcoes em outro arquivo */
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
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


function bandAids(){
  var quantity = 8;
  var padding = 40;
  var img = new Image();
  img.src = 'img/bandaid.png';
  img.onload = function(){
    for (var i = 0; i < quantity; i++){
      posX = (quantity * i * img.width) + padding; 
      posX = posX.clamp(100, stage.getWidth() - 140);
      var bandAid = new Kinetic.Image({
        x: posX,
        y: 10,
        image: img,
        draggable: false
      });
      bandAid.createImageHitRegion(function(){
        console.log('region created');
      })
      layer.add(bandAid);
      stage.add(layer);
    }
    //listener
    bandAid.on('', function(){
      console.log('entrou');
    })
  }
}

function draw(images){
  var _posY = stage.getHeight() - 163; // altura da img
  for(var image in images){
    var _posX = Math.floor(Math.random() * stage.getWidth());
    _posX = _posX.clamp(
        images[image].width, stage.getWidth() - images[image].width
    );
    var img = new Kinetic.Image({
      x: _posX,
      y: _posY,
      image: images[image],
      draggable: true,
      dragBoundFunc: function(pos){
        return {
          x: pos.x.clamp(10, stage.getWidth() - img.getWidth() - 20),
          y: pos.y.clamp(10, stage.getHeight() - img.getHeight())
        }
      }
    });
    img.createImageHitRegion(function(){
      console.log('regiao da imagem criada');
    })
    img.on('mouseover', function(){
      document.body.style.cursor = 'pointer';
    });
    img.on('mouseout', function(){
      document.body.style.cursor = 'default';
    });
    layer.add(img);
    //transicao
    img.transitionTo({
      x: Math.random() * stage.getWidth(),
      y: stage.getHeight() - img.getHeight() - 10,
      duration: 1,
      easing: 'ease-in-out' 
    });
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

bandAids();
loadImages(sources, function(images) {
  draw(images);
});