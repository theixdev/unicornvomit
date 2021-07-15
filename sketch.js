/*
  SKETCH NAME :  A Case for Unicorn Vomit.
  AUTHOR : Dale Chester   Student No: n10581618
  
  HOW TO USE :  Hold the mouse button down to trigger the unicorn vomit.
  While pressing the mouse down, move the cursor around and note the unicorns eyes.
  Hovering over the eyes, mane and horn sections with the mouse down can alter the vomit.

  BRIEF :  This sketch was to address Brief 2, as well as Brief 1.
  The image is used as a data input when the mouse is down over approved color areas, changing     the color of the vomit.
  The eyes of the unicorn are cirlces that are also used in combination with the image to create   the illusion of eye tracking.
*/

let uniSleep;
let uniAwake;
let newPointer;

let pukeHue = 45;
let pukeLevel = 0;

const imgX = 175;
const imgY = 0;

//These are the allowed mouse over colors from the image input.
// Prevents non unicorn colors from showing up in the vomit.
const allowedColors = [
  [237, 28, 36, 255],
  [243, 108, 33, 255],
  [247, 236, 0, 255],
  [0, 166, 81, 255],
  [0, 146, 200, 255],
  [235, 49, 146, 255],
  [226, 172, 202, 255],
];

function preload() {
  uniSleep = loadImage("uni-02.svg");
  uniAwake = loadImage("uni-01.svg");
  newPointer = loadImage('rainbowcursor.png');
}

function setup() {
  createCanvas(305, 320);
  colorMode(HSL, 360);
  noCursor();
}

function draw() {
  colorMode(HSL, 360);
  background("lightblue");
  strokeWeight(4);
  fill("yellow");
  stroke("black");
  circle(0, 0, 100);
  noFill();
  stroke("orange");
  circle(0, 0, 95);
  stroke("yellow");
  line(5, 64, 5, 85);
  line(47, 55, 60, 70);
  line(70, 25, 90, 30);

  //VOMIT CONTROL
  if (mouseIsPressed) {
    let pixColor = uniAwake.get(mouseX - imgX, mouseY);
    let isAllowedColor = JSON.stringify(allowedColors).includes(
      JSON.stringify(pixColor)
    );

    if (isAllowedColor) {
      unicornVomit(pixColor);
    } else {
      unicornVomit();
    }

    image(uniAwake, imgX, imgY);
    pukeLevel = pukeLevel <= height ? pukeLevel + 0.1 : height;
    pukeHue > 360 ? (pukeHue = 0) : pukeHue++;
  } else {
    image(uniSleep, imgX, imgY);
    pukeLevel > 0 ? (pukeLevel = pukeLevel - 1) : 0;
  }

  //MANAGE EYEBALLS
  if (mouseIsPressed) {
    stroke("black");
    let eyeVer = 80;
    let eyeHor = 220;
    strokeWeight(4);
    if (mouseX <= eyeHor && mouseY <= eyeVer) {
      circle(220, 68, 1);
    } else if (mouseX > eyeHor && mouseY <= eyeVer) {
      circle(225, 68, 1);
    } else if (mouseX <= eyeHor && mouseY > eyeVer) {
      circle(220, 72, 1);
    } else if (mouseX > eyeHor && mouseY > eyeVer) {
      circle(225, 72, 1);
    }
  }

  //Fill or Drain Vomit Rectangle. Drawn last as to submerge everything!
  noStroke();
  rect(-50, height - pukeLevel, width + 50, 700);
  
  image(newPointer, mouseX - 10, mouseY, 50, 50);
}

function mouseReleased() {
  pukeHue = 45;
}

function unicornVomit(rgb) {
  if (!rgb) {
    colorMode(HSL);
    stroke(pukeHue, 200, 200);
    fill(pukeHue, 200, 200);
  } else {
    colorMode(RGB);
    stroke(rgb[0], rgb[1], rgb[2], rgb[3]);
    fill(rgb[0], rgb[1], rgb[2], rgb[3]);
  }

  push();
  strokeWeight(20);
  noFill();
  beginShape();
  curveVertex(210, 110);
  curveVertex(210, 110);
  curveVertex(170, 175);
  curveVertex(140, 255);
  curveVertex(135, 325);
  curveVertex(135, 325);
  endShape();
  pop();
}
