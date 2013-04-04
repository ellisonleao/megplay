// core file
var stage = new Kinetic.Stage({
  container: 'container',
  width: 1024,
  height: 400 
});
var layer = new Kinetic.Layer();  
var bandAids = [];
var bandAidsAux = [];
var postIts = [];
// ordem dos postIts do usuario
var userOrder = [];
var rightOrder = ["7", "2", "0", "4", "1", "6", "3", "5"];
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
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
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
    images[key] = new Image();
    images[key].onload = function() {
      if(++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[key].src = obj.src;
    images[key].text = obj.text;
    images[key].title = obj.title;
    images[key].id = i;
  }
}

function generateBandAids(){
  var quantity = 8;
  var padding_left = 200;
  var padding_top = 150;
  var img = new Image();

  img.src = 'img/bandaid.png';
  img.onload = function(){
    var posY = 60;
    for (var i = 0; i < quantity; i++){
      var posX;  
      posX = (i % 4) * img.width * quantity + padding_left;
      if ( i % 4 == 0 && i > 0 ){
        posY += img.height + padding_top;
      }
      var bandAid = new Kinetic.Image({
        x: posX,
        y: posY,
        image: img,
        draggable: false
      });
      bandAid.createImageHitRegion(function(){})
      layer.add(bandAid);
      stage.add(layer);
      bandAids.push(bandAid);
    }
  }
}


function checkCollision(postIt) {
  var bLength = bandAids.length;
  //colisao entre o bandaid e o postit 
  for (var i = 0 ; i < bLength; i++){
    var rect2 = bandAids[i];
    collided = !(rect2.getX() > postIt.getX() + postIt.getWidth() || 
                 rect2.getX() + rect2.getWidth() < postIt.getX() || 
                 rect2.getY() > postIt.getY() + postIt.getHeight() ||
                 rect2.getY() + rect2.getHeight() < postIt.getY());
    // se colidiu retorna a posicao do bandaid
    // remove o bandaid da lista e tira o draggable do postit
    if (collided) {
      postIt.setDraggable(false);
      userOrder.push(postIt.getImage().id);
      bandAidsAux.push(bandAids[i]);
      bandAids.remove(i); 
      if (bandAids.length == 0){
        //NAO EH a MAIS RAPIDA COMPARAÇÃO :(
        if (userOrder.toString() == rightOrder.toString()){
          alert('Parabéns, você acertou!');
        }else{
          alert('Tente Novamente');
          //reinicia tudo
          userOrder = [];
          bandAids = bandAidsAux;
          bandAidsAux = [];
          for(var i = 0; i < postIts.length ; i++){
            var postit = postIts[i];
            postit.setDraggable(true);
            postit.transitionTo({
              x: Math.random() * stage.getWidth(),
              y: stage.getHeight() - postit.getHeight() - 10,
              duration: 1,
              easing: 'ease-in-out' 
            });
          }
        }
      }
      return true;
    }
      
  }
  return false;
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
    img.createImageHitRegion(function(){})
    img.on('mouseover', function(){
      document.body.style.cursor = 'pointer';
    });
    img.on('mouseout', function(){
      document.body.style.cursor = 'default';
    });
    img.on('dragend', function(evt){
      //colisao
      checkCollision(this);
    });
  
    img.on('click', function(evt){
      var image = this.getImage();
      var div = $('#info-box');
      div.fadeOut('fast');
      div.children('h2').html(image.title);
      div.children('p').html(image.text);
      div.fadeIn();
    });
    postIts.push(img);
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