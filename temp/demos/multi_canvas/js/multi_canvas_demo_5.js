
/************************************* Core Functions *************************************/
/*
 * I've moved these functions above where they are called not because it's necessary, 
 * since they will be automatically moved, or hoisted by the interpreter.
 * They were moved simply to make the code more readable.
 */

function Animate() {
  //clear left
  ctx_left.clearRect(0, 0, cvs_left.width, cvs_left.height);
  //draw both rectangles in left
  rectA.Draw(ctx_left);
  rectB.Draw(ctx_left);

  //clear right
  ctx_right.clearRect(0, 0, cvs_right.width, cvs_right.height);
  //draw both rectangles in right
  rectA.Draw(ctx_right);
  rectB.Draw(ctx_right);

  //update rotation of rectangles to make them rotate over time
  rectA.rotationInDegrees += 1.44;
  rectB.rotationInDegrees -= 2.4;

}

/************************************* Core Code *************************************/

//canvas and context
let cvs_left = document.getElementById("game-canvas-left");
let ctx_left = cvs_left.getContext("2d");
let cvs_right = document.getElementById("game-canvas-right");
let ctx_right = cvs_right.getContext("2d");

//rectangles
let rectA = new GDRect(100, 200, 40, 40, 
  20, 20,
  0, "rgb(255, 0, 0)", 1);
let rectB = new GDRect(200, 200, 60, 30, 
  30,15,
  0, "rgb(0, 0, 255)", 1);

//start loop
let timeBetweenAnimateInMs = 20;
let fps = 1/timeBetweenAnimateInMs;  //may we might want to display FPS at some point
let loop = setInterval(Animate, timeBetweenAnimateInMs);