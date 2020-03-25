/*
Exercise: 
a) Pick a tank from the assets provided and draw the three elements of the tank (i.e. base, turret, tracks).
b) Add code to get the mouse position and determine the angle of rotation to be applied to the turret (hint: vector, dot product)
c) Rotate the turret to always face the mouse position.

Note:
1) You will need to add HTML code and JS code in the respective files to load the source image(s).
*/

/************************************* Core Functions *************************************/

function Animate() {

    //clear the screen after each draw
    ctx_left.fillStyle = "#edc9af"; //desert sand!
    ctx_left.fillRect(0, 0, cvs_left.width, cvs_left.height);
  
  
    //draw the tracks
    this.leftTrackSprite.Draw(ctx_left);
    this.rightTrackSprite.Draw(ctx_left);
  
    //draw body
    this.bodySprite.Draw(ctx_left);
  
    //draw gun
    this.gunSprite.Draw(ctx_left);
  
    //rotate the turret - just for fun
    this.gunSprite.rotationInDegrees += 1;
  }
  
  function InstanciateImages(){
    //load the sprite data
    let tracks = document.getElementById("sprite_tank_tracks");
    let body = document.getElementById("sprite_tank_body");
    let gun = document.getElementById("sprite_tank_gun");
  
  //#region Tracks
    this.leftTrackSprite = new GDSprite(tracks, 
      150, 200, //eyeballed value
      tracks.width, tracks.height, 
      0, 0, tracks.width, tracks.height, 
      tracks.width/2, tracks.height/2, //origin
      0, 1);
  
    //Copy the sprite and move the right track by the width of the body on the x-axis
  
    this.rightTrackSprite = leftTrackSprite.Clone();
    rightTrackSprite.x += 150; //eyeballed value
  
  //#endregion
  
  //#region Body
  this.bodySprite = new GDSprite(body, 
    120, 200, //eyeballed value
    body.width, body.height, 
    0, 0, body.width, body.height, 
    body.width/2, body.height/2, //origin
    0, 1);
  
  //#endregion
  
  //#region Gun
  this.gunSprite = new GDSprite(gun, 
    210, 220, //eyeballed value
    gun.width, gun.height, 
    0, 0, gun.width, gun.height, 
    38, 124, //origin calculated by opening image in Paint and roughly determining desired centre of rotation
    0, 1);
  
  
  //#endregion
  
  
  }
  /************************************* Core Code *************************************/
  
  //canvas and context
  let cvs_left = document.getElementById("game-canvas-left");
  let ctx_left = cvs_left.getContext("2d");
  
  //create the GDSprite primitives representing the tank parts
  InstanciateImages();
  
  //start loop
  let timeBetweenAnimateInMs = 16;
  let fps = 1/timeBetweenAnimateInMs;  //may we might want to display FPS at some point
  let loop = setInterval(Animate, timeBetweenAnimateInMs);