/*
Exercise: 
a) Create a 2x2 canvas setup to allow the user to drive the rectangle across all 4 canvases.

Note:
1) You will need to add HTML and JS code in the respective files to load the source image(s).
2) You will need to add HTML, CSS, and JS code in the respective files to add the new canvases.
*/

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

class GDImage {
    constructor(spritesheet, x, y, width, height, sX, sY, sWidth, sHeight, 
                                    originX, originY, rotationInDegrees, color) {
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.sX = sX;
        this.sY = sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;

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

function DrawImage(context, image) {
    context.save();
    context.translate(image.x + image.originX, image.y + image.originY);
    context.rotate(image.GetRotationInRadians());
    context.translate(-1 * (image.x + image.originX), -1 * (image.y + image.originY));

    context.drawImage(image.spritesheet,image.sX, image.sY, image.sWidth, image.sHeight,
                                    image.x, image.y, image.width, image.height);

    context.restore();
}

function Animate() {
  //add code to draw the earth and moon here...
}

/************************************* Core Code *************************************/

//canvas and context
let cvs_left = document.getElementById("game-canvas-left");
let ctx_left = cvs_left.getContext("2d");
let cvs_right = document.getElementById("game-canvas-right");
let ctx_right = cvs_right.getContext("2d");


//start loop
let loop = setInterval(Animate, 100);