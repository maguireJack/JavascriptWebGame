/************************************* Useful Classes *************************************/
/*
 * Notice that we had to manually move (or hoist) the class to the top of the file so 
 * that it would be defined BEFORE its use in the code. We only have to manually HOIST 
 * classes and not objects or functions.
 */
class GDRect {
  constructor(x, y, width, height, originX, originY, rotationInDegrees, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.originX = originX;
    this.originY = originY;
    this.rotationInDegrees = rotationInDegrees;
    this.color = color;
  }

  GetRotationInRadians() {
    return this.rotationInDegrees * Math.PI / 180;
  }
}

/************************************* Core Functions *************************************/
/*
 * I've moved these functions above where they are called not because it's necessary, 
 * since they will be automatically moved, or hoisted by the interpreter.
 * They were moved simply to make the code more readable.
 */
function DrawRect(context, rect) {
  context.save();
  //perform rotation around the rect's origin in co-ordinate space (i.e. the position relative to TLHC of canvas)
  context.translate(rect.x + rect.originX, rect.y + rect.originY);  //set canvas origin at rect origin
  context.rotate(rect.GetRotationInRadians());                      //rotate 
  context.translate(-1 * (rect.x + rect.originX), -1 * (rect.y + rect.originY));  //set canvas origin back to its start position (e.g. (0,0))
 
  context.lineWidth = 1;
  context.strokeStyle = rect.color;
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  context.restore();
}

function Animate() {
  //clear left
  ctx_left.clearRect(0, 0, cvs_left.width, cvs_left.height);
  //draw both rectangles in left
  DrawRect(ctx_left, rectA);
  DrawRect(ctx_left, rectB);

  //clear right
  ctx_right.clearRect(0, 0, cvs_right.width, cvs_right.height);
  //draw both rectangles in right
  DrawRect(ctx_right, rectA);
  DrawRect(ctx_right, rectB);

  //update rotation of rectangles to make them rotate over time
  rectA.rotationInDegrees += 5;
  //wrap angle when <360 or < -360 - prevents error if running for a VERY long time (i.e. > MAX_SAFE_INTEGER or < MIN_SAFE_INTEGER)
  rectA.rotationInDegrees%=360; 

  rectB.rotationInDegrees -= 10;
  //wrap angle when <360 or < -360 - prevents error if running for a VERY long time (i.e. > MAX_SAFE_INTEGER or < MIN_SAFE_INTEGER)
  rectA.rotationInDegrees%=360; 



}

/************************************* Core Code *************************************/

//canvas and context
let cvs_left = document.getElementById("game-canvas-left");
let ctx_left = cvs_left.getContext("2d");
let cvs_right = document.getElementById("game-canvas-right");
let ctx_right = cvs_right.getContext("2d");

//rectangles
let rectA = new GDRect(100, 200, 40, 40, 20, 20,
  0, "rgb(0, 255, 0)");
let rectB = new GDRect(200, 200, 60, 30, 30, 15,
  0, "rgb(255, 0, 0)");

//start loop
let loop = setInterval(Animate, 100);