/************************************* Handles to Canvases and Associated Contexts *************************************/

var cvs_left = document.getElementById("game-canvas-left");
var ctx_left = cvs_left.getContext("2d");
var cvs_right = document.getElementById("game-canvas-right");
var ctx_right = cvs_right.getContext("2d");

/************************************* Get Rotation *************************************/
//get the preferred angle from the user
let rotationInDegrees = GetInteger("Enter rotation angle in degrees", "0");

/************************************* Left Canvas *************************************/

//perform -ve rotation around the canvas' origin in the top-left of the drawn canvas (i.e. (0,0))
ctx_left.rotate(-rotationInDegrees * Math.PI / 180);

//draw rect - note the height has been changed to visually differentiate w from h
ctx_left.beginPath();
ctx_left.lineWidth = 1;
ctx_left.strokeStyle = "rgb(0, 255, 0)";
ctx_left.strokeRect(200, 200, 50, 100);

/************************************* Right Canvas *************************************/

//perform +ve rotation around the canvas' origin in the top-left of the drawn canvas (i.e. (0,0))
ctx_right.rotate(rotationInDegrees * Math.PI / 180);

//draw rect - note the height has been changed to visually differentiate w from h
ctx_right.beginPath();
ctx_right.lineWidth = 1;
ctx_right.strokeStyle = "rgb(255, 0, 0)";
ctx_right.strokeRect(200, 200, 50, 100);

/************************************* Useful Functions *************************************/

function GetInteger(strPrompt, defaultValue) {
    let value = prompt(strPrompt, defaultValue);
    if (isNaN(value) || value == null || value == undefined)
        value = defaultValue;
    else
        value = Number.parseInt(value);

    return value;
}