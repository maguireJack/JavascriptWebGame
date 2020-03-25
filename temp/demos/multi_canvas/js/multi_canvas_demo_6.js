
/************************************* Core Functions *************************************/

function Animate() {
    //clear left
    ctx_left.clearRect(0, 0, cvs_left.width, cvs_left.height);
    //draw both rectangles in left
    rectA.Draw(ctx_left);

    //clear right - why do we clear 2x the width?
    ctx_right.clearRect(cvs_right.width, 0, cvs_right.width, cvs_right.height);
    //draw both rectangles in right
    rectA.Draw(ctx_right);

    //uncomment this to add a rotation to the moving rect
    rectA.rotationInDegrees += 5;
}


/************************************* Core Code *************************************/
//register for key event to move primitive
window.addEventListener("keydown", function (event) {
    if (event.key === "a") {
        rectA.x -= 5;
    }
    else if (event.key === "d") {
        rectA.x += 5;
    }

    if (event.key === "w") {
        rectA.y -= 5;
    }
    else if (event.key === "s") {
        rectA.y += 5;
    }

    if (event.key === "r") //reset
    {
        rectA.x = 100;
        rectA.y = 200;
    }
});

//canvas and context
let cvs_left = document.getElementById("game-canvas-left");
let ctx_left = cvs_left.getContext("2d");

let cvs_right = document.getElementById("game-canvas-right");
let ctx_right = cvs_right.getContext("2d");

//pre-translate (i.e. before the animation loop) the canvas to its new position shifted right with origin (400, cvs_right.width)
ctx_right.translate(-cvs_right.width, 0);

//rectangles
let rectA = new GDRect(100, 200, 80, 80, 40, 40,
    0, "rgb(0, 0, 0)", 1);
  
//start loop
let timeBetweenAnimateInMs = 100;
let fps = 1/timeBetweenAnimateInMs;  //may we might want to display FPS at some point
let loop = setInterval(Animate, timeBetweenAnimateInMs);