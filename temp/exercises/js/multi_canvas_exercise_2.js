/*
Exercise: 
a) Changes the dimensions of the canvas from 400x400 to 600x600
b) Use the Earth and Moon images provided to create a simple model of the Moon orbiting around the Earth on a single canvas.

Note:
1) You will need to add HTML code and JS code in the respective files to load the source image(s).
2) Your orbit does not need to be elliptical.
*/


/************************************* Core Functions *************************************/

function Animate() {

  //clear the screen after each draw
  ctx_left.fillStyle = "black";
  ctx_left.fillRect(0, 0, cvs_left.width, cvs_left.height);

  //draw the sprites
  this.sunSprite.Draw(ctx_left);
  this.earthSprite.Draw(ctx_left);

  //update individual rotation values so they rotate around their individual origins
  this.sunSprite.rotationInDegrees += 0.25;
  this.earthSprite.rotationInDegrees += 1;
}

function InstanciateImages(){
    let earth = document.getElementById("sprite_earth");
    let sun = document.getElementById("sprite_sun");

    let scaleX = 0.25, scaleY = 0.25;
    let width = scaleX * earth.width;
    let height = scaleY * earth.height;
    let originX = width/2;
    let originY = height/2;
    let distanceFromSun = 300;
    this.earthSprite = new GDSprite(earth, 
        cvs_left.width/2 - originX, cvs_left.height/2 - originY - distanceFromSun,                                  //drawn position 
        width, height,                          //drawn width, height
        0, 0, earth.width, earth.height,        //source rectangle (i.e. position and width, height in source image)
        originX, originY,                       //origin for point of rotation - note we need to take into account original dimensions and any scale
        0, 1                                    //rotation, opacity
        );



    scaleX = 0.5, scaleY = 0.5;
    width = scaleX * sun.width;
    height = scaleY * sun.height;
    originX = width/2;
    originY = height/2;
    this.sunSprite = new GDSprite(sun, 
        cvs_left.width/2 - originX, cvs_left.height/2 - originY,    //drawn position 
        width, height,                          //drawn width, height
        0, 0, sun.width, sun.height,            //source rectangle (i.e. position and width, height in source image)
        originX, originY,                       //origin for point of rotation - note we need to take into account original dimensions and any scale
        0, 1                                    //rotation, opacity
        );

}


/************************************* Core Code *************************************/

//canvas and context
let cvs_left = document.getElementById("game-canvas-left");
let ctx_left = cvs_left.getContext("2d");

//create the two GDSprite primitives representing the sun and earth
InstanciateImages();

//start loop
let timeBetweenAnimateInMs = 100;
let fps = 1/timeBetweenAnimateInMs;  //may we might want to display FPS at some point
let loop = setInterval(Animate, timeBetweenAnimateInMs);