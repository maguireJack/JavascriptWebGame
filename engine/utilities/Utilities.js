/**
 * Provides common math related functions.
 * @author
 * @version 1.0
 * @class GDMath
 */
class GDMath {
    static ToRadians(degrees) {
        degrees %= 360;
        return degrees * (Math.PI / 180);
    }

    static ToDegrees(radians) {
        return Math.fround(radians * (180 / Math.PI));
    }

    static ToFixed(number, precision, base){
        if(number == 0)
            return 0;
            
        let pow = Math.pow(base||10, precision);
        return Math.round(number*pow) / pow;
    }
}

/**
 * Provides common un-related utility functions.
 * @author
 * @version 1.0
 * @class GDUtility
 */
class GDUtility{

    /**
     * Returns true if "other" is non-null, not undefined and of type "target".
     *
     * @static
     * @param {JS/user-defined data type} target
     * @param {JS/user-defined data type} other
     * @returns True if target and other are the same data type, otherwise false
     * @memberof GDUtility
     */
    static IsSameTypeAsTarget(target, other){

        if (other == null ||other == undefined)
            throw "Error: Other object is null or undefined";

        if(other.constructor.name != target.constructor.name)
            throw "Error: Other object is type " + other.constructor.name + " and should be type " + target.constructor.name;

        //returns false if both point to the same object in RAM i.e. a shallow copy
        return target != other;
    }
}

class GDGraphics{


    /**
     * Returns an object representing all the information related to a game canvas (e.g. cvs, ctx, width, height, parent enclosing DIV).
     * Notice that this method includes translate() which is used to move the start camera position for a 2nd (or 3rd etc) screen.
     *
     * @static
     * @param {String} parentDivID      ID of the parent DIV which encloses the canvas in the HTML file (e.g. <div id="parent-top">...<canvas id=...></div>) or when creating the div and enclosed canvas using DOM manipulation
     * @param {String} canvasID ID      Used when adding the canvas to the HTML file (e.g. <canvas id=...>) or when creat using DOM manipulation
     * @param {String} description      Friendly description of the object (e.g. used to draw left/top/bottom game screen)
     * @param {Vector2} topLeft         A Vector2 representing the screen-space coordinates of the top left corner of the canvas
     * @returns                         Object of canvas related data.
     * @memberof GDGraphics
     */
    static GetScreenObject(playerID, cameraID, parentDivID, canvasID, introID, uiID, topLeft, dimensions, clearScreenColor){
        //get handles
        let cvs_ref = document.getElementById(canvasID);
        let ctx_ref = cvs_ref.getContext("2d");

        return {
            //attrib name: variable name (dont confuse the two, or change attribute name to something like "parent")
            playerID: playerID, //e.g. "player1" (unique ID specified when we create player Sprite)
            cameraID: cameraID, //e.g. the ID used when creating the camera for this screen
            parentDivID: parentDivID, //e.g. parent-top (see HTML file for the values of these IDs)
            canvasID: canvasID, //e.g. canvas-top
            introID: introID,
            uiID: uiID, //e.g. player-ui-top
            cvs: cvs_ref,
            ctx: ctx_ref,
            topLeft: topLeft,
            dimensions: dimensions,
            origin: Vector2.Zero,
            clearScreenColor: clearScreenColor
        };
      }
}
