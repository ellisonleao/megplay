// core file
var stage = new Kinetic.Stage({
  container: 'container',
  width: 1024,
  height: 400 
});
var layer = new Kinetic.Layer();  
var bandAids = [];
/* TODO: Separar as funcoes em outro arquivo */
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  var i = 0; 
  // get num of sources
  for(i = 0; i < Object.size(sources); i++) {
    numImages++;
  }
  var keys = Object.keys(sources);
  var length = keys.length;
  for(i = 0; i < length; i++) {
    var key = keys[i];
    var obj = sources[key];
    console.log(obj);
    images[key] = new Image();
    images[key].onload = function() {
      if(++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[key].src = obj.src;
    images[key].text = obj.text;
    images[key].title = obj.title;
  }
}

function generateBandAids(){
  var quantity = 8;
  var padding = 40;
  var img = new Image();

  img.src = 'img/bandaid.png';
  img.onload = function(){
    for (var i = 0; i < quantity; i++){
      posX = (quantity * i * img.width) + padding; 
      posX = posX % stage.getWidth() - img.width;
      console.log(posX);
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
      bandAids.push(bandAid);
    }
  }
}


function collided(postIt) {
  var bLength = bandAids.length;
  var collided = false;
  var top = postIt.getX();
  var right = postIt.getX() + postIt.getWidth();
  var bottomLeft = postIt.getY() + postIt.getHeight();
  var bottomRight = bottomLeft + postIt.getWidth();
   
  for (var i = 0 ; i < bLength; i++){
    if (!bandAids[i].getX() > right || 
        !bandAids[i].getX() + bandAids[i].getWidth() < top ||  
        !bandAids[i].getY() > bottomLeft || 
        !bandAids[i].getY() + bandAids[i].getHeight() < postIt.getY()) { 
      collided = true;
      break;
    }
  }
  return collided;
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
    img.on('dragend', function(evt){
      //colisao
      console.log(evt.x, evt.y);
      console.log(collided(this));
    });
  
    img.on('click', function(evt){
      var image = this.getImage();
      var div = $('#info-box');
      div.fadeOut('fast');
      div.children('h2').html(image.title);
      div.children('p').html(image.text);
      div.fadeIn();
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
  clientes: { 
    src: 'img/clientes.png',
    title: 'Clientes',
    text: 'Clientes aqui'
  },
  estrategiasplanos: { 
    src: 'img/estrategiasplanos.png', 
    title: 'Estratégias e Planos',
    text: 'Aqui as estratégias e planos'
  },
  informacaoconhecimento: { 
    src: 'img/informacaoconhecimento.png', 
    title: 'Informação e Conhecimento',
    text: 'Aqui informação e conhecimento',
  },
  lideranca: { 
    src: 'img/lideranca.png' ,
    title: 'Liderança',
    text: 'Liderança aqui'
  },
  pessoas: {
    src: 'img/pessoas.png',
    title: 'Pessoas',
    text: 'Pessoas aqui'
  },
  processos: { 
    src:'img/processos.png',
    title: 'Processos',
    text: 'Processos aqui',
  },
  resultados: { 
    src: 'img/resultados.png',
    title: 'Resultados',
    text: 'Resultados aqui'
  },
  sociedade: { 
    src: 'img/sociedade.png',
    title: 'Sociedade',
    text: 'Sociedade aqui'
  }
};

generateBandAids();
loadImages(sources, function(images) {
  draw(images);
});