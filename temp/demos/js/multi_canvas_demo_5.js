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
  context.translate(rect.x + rect.originX, rect.y + rect.originY);
  context.rotate(rect.GetRotationInRadians());
  context.translate(-1 * (rect.x + rect.originX), -1 * (rect.y + rect.originY));

  context.lineWidth = 1;
  context.strokeStyle = rect.color;
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);

  context.restore();
}

function Animate() {
  ctx_left.clearRect(0, 0, cvs_left.width, cvs_left.height);
  DrawRect(ctx_left, rectA);
  DrawRect(ctx_left, rectB);

  ctx_right.clearRect(0, 0, cvs_right.width, cvs_right.height);
  DrawRect(ctx_right, rectA);
  DrawRect(ctx_right, rectB);

  rectA.rotationInDegrees += 5;
  rectB.rotationInDegrees -= 10;

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