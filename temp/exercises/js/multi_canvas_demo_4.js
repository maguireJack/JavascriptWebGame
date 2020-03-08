/************************************* Handles to Canvases and Associated Contexts *************************************/

var cvs_left = document.getElementById("game-canvas-left")
var ctx_left = cvs_left.getContext("2d");
var cvs_right = document.getElementById("game-canvas-right")
var ctx_right = cvs_right.getContext("2d");

/************************************* Left Canvas *************************************/

//move the default origin of the canvas to the origin of the rect (200, 200), perform rotation, then reset canvas origin
ctx_left.translate(200, 200);
ctx_left.rotate(45 * Math.PI / 180);
ctx_left.translate(-200, -200);

//draw rect - note the height has been changed to visually differentiate w from h
ctx_left.beginPath();
ctx_left.lineWidth = 1;
ctx_left.strokeStyle = "rgb(0, 255, 0)";
ctx_left.strokeRect(200, 200, 50, 100);

/************************************* Right Canvas *************************************/

//move the default origin of the canvas to the origin of the rect (200, 200), perform rotation, then reset canvas origin
ctx_right.translate(200, 200);
ctx_right.rotate(45 * Math.PI / 180);
ctx_right.translate(-200, -200);

//draw rect - note the height has been changed to visually differentiate w from h
ctx_right.beginPath();
ctx_right.lineWidth = 1;
ctx_right.strokeStyle = "rgb(255, 0, 0)";
//notice how we offset (x, y) by subtracting the origin (x, y) values
ctx_right.strokeRect(200 - 25, 200 - 50, 50, 100);

