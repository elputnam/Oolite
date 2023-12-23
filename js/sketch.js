//Experimenting with circle packing algorithms to create a geological animation
// Uses code by Dan Shiffman: https://codepen.io/shiffman/pres/rjBaLp/top/

// All the circles
var circles = [];
let colour1;
let colour2;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB, 360, 100, 100, 100);
  // circles.push(new Circle(width / 2, height / 2, min(width, height) / 20));
  circles.push(new Circle(width / 2, height / 2, 30));
  frameRate(10);
  colour1 = color(0, 0, 0, 10);
  colour2 = color(50, 100, 100)
  background(0);
  
}

function draw() {
  
  if (frameCount%int(random(10))==0){
    background(random(0,50), 100, 60, 10);
    colour1 = color(30,100,70,10);
    colour2 = color(0);
  }

  // All the circles
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.show();
    if (frameCount%10==0){
      c.change();
    }
  
    
    // Is it a growing one?
    if (c.growing) {
      c.grow();
      // Does it overlap any previous circles?
      for (var j = 0; j < circles.length; j++) {
        var other = circles[j];
        if (other != c) {
          var d = dist(c.x, c.y, other.x, other.y);
          if (d - 1 < c.r + other.r) {
            c.growing = false;
          }
        }
      }
      
      // Is it stuck to an edge?
      if (c.growing) {
        c.growing = !c.edges();
      }
    }
  }
  
  // Let's try to make a certain number of new circles each frame
  // More later
  var target = 1 + constrain(floor(frameCount / 120), 0, 10);
  // How many
  var count = 0;
  // Try N times
  for (var i = 0; i < 1000; i++) {
    if (addCircle()) {
      count++;
    }
    // We made enough
    if (count == target) {
      break;
    }
  }
  
  // We can't make any more
  if (count < 1) {
    background(0);
    for (let j = 0; j < circles.length; j++){
      circles.splice([j], circles.length);
    }
    //noLoop();
    // textAlign(CENTER);
    // textSize(random(50,100));
    // fill(255);
    // stroke(0);
    // for (let i = 0; i < 50; i++){
    //   text("DONE", random(width), random(height));
    // }
    // console.log("finished");

  }
}

// Add one circle
function addCircle() {
  // Here's a new circle
  var newCircle = new Circle(random(width), random(height), 1);
  // Is it in an ok spot?
  for (var i = 0; i < circles.length; i++) {
    var other = circles[i];
    var d = dist(newCircle.x, newCircle.y, other.x, other.y);
    if (d < other.r + 4) {
      newCircle = undefined;
      break;
    }
  }
  // If it is, add it
  if (newCircle) {
    circles.push(newCircle);
    return true;
  } else {
    return false;
  }
}

// Circle object
class Circle{
  constructor(x, y, r){
  this.growing = true;
  this.x = x;
  this.y = y;
  this.r = r;
}

// Check stuck to an edge
edges = function() {
  return (this.r > width - this.x || this.r > this.x || this.r > height - this.y || this.r > this.y);
}

// Grow
grow = function() {
  this.r += random(2);
}

//changeColour
change = function(){
    colour1 = color(random(20, 50), random(100), random(100), 30);
    colour2 = color(random(20, 50), random(100), random(100));
}

// Show
show = function() {

  fill(colour1);
  stroke(colour2)
  for (let i = 0; i < 8; i++){
    ellipse(this.x + random(-2, 2), this.y + random(-2, 2), this.r * 2 - i*5);
  }
  }
}

// function mousePressed(){
//   background(random(310, 340), 100, 10);
//   colour1 = color(0);
//   colour2 = color(0);
//   textAlign(CENTER);
//     textSize(50);
//     fill(255);
//     stroke(0);
//     for (let i = 0; i < 50; i++){
//       text("NO.", random(width), random(height));
//     }
//      for (let j = 0; j < circles.length; j++){
//       circles.splice([j], circles.length);
//     }
// }

