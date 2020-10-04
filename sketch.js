const { Engine, World, Bodies } = Matter;

var drawing = [];
var currentPath = [];
var isDrawing = false;

var clear, name, save;

let database;

let world, engine;
let body, heart, lung, vein, brain;
let bodyImg, lungImg, heartAnimation, arteryImg, brainImg, bgImg;

function preload() {
  bodyImg = loadImage('images/body.png');
  heartAnimation = loadAnimation(
    'images/heart.gif',
    'images/heart2.gif',
    'images/heart3.gif',
    'images/heart4.gif',
    'images/heart5.gif',
    'images/heart6.gif',
    'images/heart7.gif',
    'images/heart8.gif',
    'images/heart9.gif',
    'images/heart10.gif',
    'images/heart11.gif',
    'images/heart12.gif',
    'images/heart13.gif',
    'images/heart14.gif',
    'images/heart15.gif',
    'images/heart16.gif',
    'images/heart17.gif',
    'images/heart18.gif',
    'images/heart19.gif',
    'images/heart20.gif',
    'images/heart21.gif',
    'images/heart22.gif',
    'images/heart23.gif',
    'images/heart24.gif',
    'images/heart25.gif'
  );
  lungImg = loadImage('images/lung2.png');
  //   arteryImg = loadImage('images/vein.png');
  brainImg = loadImage('images/brain2.png');
  bgImg = loadImage('images/bg.png');
}

function startDrawing() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}
function endDrawing() {
  isDrawing = false;
}

function setup() {
  database = firebase.database();
  const canvas = createCanvas(500, 700);
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(endDrawing);

  //cretaing a button to clear the drawings
  clear = createButton('clear');
  clear.mousePressed(clearDrawing);

  //creating a save button to save the drawings to the database
  save = createButton('save');
  save.mousePressed(saveDrawing);

  //   vein = new Artery(240, 320, 50, 100);
  //   vein.vein.addAnimation('vein', arteryImg);
  //   vein.vein.scale = 1.5;

  body = new Body(240, 350, 50, 100);
  body.stick.addAnimation('body', bodyImg);
  body.stick.scale = 1.2;

  lung = new Lung(240, 230, 50, 100);
  lung.lung.addImage('lung', lungImg);
  lung.lung.scale = 0.2;

  heart = new Heart(270, 230, 50, 100);
  heart.heart.addAnimation('heart', heartAnimation);
  heart.heart.scale = 0.2;

  brain = new Brain(240, 80, 50, 100);
  brain.brain.addAnimation('brain', brainImg);
  brain.brain.scale = 0.1;
}

function draw() {
  background(0, 255, 0);
  body.display();
  heart.display();
  lung.display();
  //   vein.display();

  if (isDrawing !== false) {
    var point = {
      x: mouseX,
      y: mouseY,
    };
    currentPath.push(point);
  }
  stroke(255);
  strokeWeight(7);
  noFill(255, 0, 0);
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var r = 0; r < path.length; r++) {
      vertex(path[r].x, path[r].y);
    }
    endShape();
  }
}
function clearDrawing() {
  drawing = [];
}
function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    drawing: drawing,
    name: 'My Awesome Drawing',
  };
  ref.push(data);
}
