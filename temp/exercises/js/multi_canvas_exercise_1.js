/*
Exercise: 
a) Create a 2x2 canvas setup to allow the user to drive the rectangle across all 4 canvases.

*/

/************************************* Core Functions *************************************/

function Animate() {
  ctx_left.clearRect(0, 0, 400, 400);
  rect.Draw(ctx_left);

  ctx_right.clearRect(400, 0, 400, 400);
  rect.Draw(ctx_right);

  ctx_bottom_left.clearRect(0, 400, 400, 400);
  rect.Draw(ctx_bottom_left);

  ctx_bottom_right.clearRect(400, 400, 400, 400);
  rect.Draw(ctx_bottom_right);

  //animate the rectangle by rotating +5 every time Animate() is called i.e. every timeBetweenAnimateInMs - see setInterval() below
  rect.rotationInDegrees += 5;
}
/************************************* Core Code *************************************/
//#region canvas and context
let cvs_left = document.getElementById("game-canvas-left");
let ctx_left = cvs_left.getContext("2d");
let cvs_right = document.getElementById("game-canvas-right");
let ctx_right = cvs_right.getContext("2d");
let cvs_bottom_left = document.getElementById("canvas-bottomleft");
let ctx_bottom_left = cvs_bottom_left.getContext("2d");
let cvs_bottom_right = document.getElementById("canvas-bottomright");
let ctx_bottom_right = cvs_bottom_right.getContext("2d");
//#endregion

//#region SETTING OVERLAP - Here is where we sent the AMOUNT of overlap (in this case none) across the 4 canvases.
//pre-translations (i.e. moving the three cameras from default (0,0) to look at that part of the larger game world)
ctx_right.translate(-400, 0);
ctx_bottom_left.translate(0, -400);
ctx_bottom_right.translate(-400, -400);
//#endregion

//create the rectangle object as defined by GDRect in gdtypes.js
let rect = new GDRect(200, 200, 200, 200, 100, 100, 0, "rgb(0,0,0)", 0.75);

//register for key event to move primitive
window.addEventListener("keydown", function (event) {
    if (event.key === "a") {
        rect.x -= 5;
    }
    else if (event.key === "d") {
        rect.x += 5;
    }

    if (event.key === "w") {
        rect.y -= 5;
    }
    else if (event.key === "s") {
        rect.y += 5;
    }

    if (event.key === "r") //reset
    {
        rect.x = 200;
        rect.y = 200;
    }
});

//start loop
let timeBetweenAnimateInMs = 100;
let fps = 1/timeBetweenAnimateInMs;  //may we might want to display FPS at some point
let loop = setInterval(Animate, timeBetweenAnimateInMs);