/*
Exercise: 
a) Improve the solution (2) by adding rotation of the Earth around the Sun.

Note:
1) You will need to add HTML code and JS code in the respective files to load the source image(s).
2) Your orbit does not need to be elliptical.
*/


/************************************* Core Functions *************************************/
function CustomOrbitalDraw(context, sprite, orbitAroundPositionX, orbitAroundPositionY, totalOrbitalRotationInDegrees)
{
    context.save();
  
    //orbital rotation around an exterior (i.e. sun) position
     context.translate(orbitAroundPositionX, orbitAroundPositionY);
     context.rotate(Math.PI * totalOrbitalRotationInDegrees/180);
     context.translate(-orbitAroundPositionX, -orbitAroundPositionY);

    //rotate around sprites origin
    context.translate(sprite.x + sprite.originX, sprite.y + sprite.originY);
    context.rotate(sprite.GetRotationInRadians());
    context.translate(-1 * (sprite.x + sprite.originX), -1 * (sprite.y + sprite.originY));

    //reset the origin
    context.translate(0,0);

    //set alpha and draw sprite
    context.globalAlpha = sprite.alpha;
    context.drawImage(sprite.spritesheet,sprite.sX, sprite.sY, 
        sprite.sWidth, sprite.sHeight,
        sprite.x, sprite.y, 
        sprite.width, sprite.height);

    context.restore();
}

function Animate() {

  //clear the screen after each draw
  ctx_left.fillStyle = "black";
  ctx_left.fillRect(0, 0, cvs_left.width, cvs_left.height);


  //draw the sprites
  this.sunSprite.Draw(ctx_left);

  //since we need Earth to rotate around its own axis AND the sun we need a more complex draw
  CustomOrbitalDraw(ctx_left, earthSprite, 
    sunSprite.x + sunSprite.originX, sunSprite.y + sunSprite.originY, 
    this.totalOrbitalRotationInDegrees);

  //update individual rotation values so they rotate around their individual origins
  this.sunSprite.rotationInDegrees += 0.05;

  //rotate Earth around its own axis
  let axialRotationIncrement = 5;
  this.earthSprite.rotationInDegrees -= axialRotationIncrement;

  //increment the orbital rotation value for the Earth's rotation around the sun
  this.totalOrbitalRotationInDegrees += axialRotationIncrement/36.525; //36.525 days for a full Sun rotation (a rough approximation that we speed up to see the movement)
}

function InstanciateImages(){
    //load the sprite data
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

    //defines how much rotation to apply to the Earth around the sun
    this.totalOrbitalRotationInDegrees = 0;

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

//create the GDSprite primitives representing the sun and earth
InstanciateImages();

//start loop
let timeBetweenAnimateInMs = 16;
let fps = 1/timeBetweenAnimateInMs;  //may we might want to display FPS at some point
let loop = setInterval(Animate, timeBetweenAnimateInMs);