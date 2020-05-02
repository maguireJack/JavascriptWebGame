/**
 * Provides common math related functions.
 * @author niall mcguinness
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

    static ToFixed(number, precision, base) {
        if (number == 0)
            return 0;

        let pow = Math.pow(base || 10, precision);
        return Math.round(number * pow) / pow;
    }
}

/**
 * Provides common un-related utility functions.
 * @author niall mcguinness
 * @version 1.0
 * @class GDUtility
 */
class GDUtility {

    /**
     * Returns true if "other" is non-null, not undefined and of type "target".
     *
     * @static
     * @param {JS/user-defined data type} target
     * @param {JS/user-defined data type} other
     * @returns True if target and other are the same data type, otherwise false
     * @memberof GDUtility
     */
    static IsSameTypeAsTarget(target, other) {

        if (other == null || other == undefined)
            throw "Error: Other object is null or undefined";

        if (other.constructor.name != target.constructor.name)
            throw "Error: Other object is type " + other.constructor.name + " and should be type " + target.constructor.name;

        //returns false if both point to the same object in RAM i.e. a shallow copy
        return target != other;
    }
}

/**
 * Provides method to bundle all HTML elements, dimensions, and clear color related to a game canvas into an object.
 * @author niall mcguinness
 * @version 1.0
 * @class GDGraphics
 */
class GDGraphics {


    /**
     * Returns an object representing all the information related to a game canvas (e.g. cvs, ctx, width, height, parent enclosing DIV).
     * Notice that this method includes translate() which is used to move the start camera position for a 2nd (or 3rd etc) screen.
     *
     * @static
     * @param {string} playerID         Unique string to identify the player (i.e. same as ID used when constructing the player Sprite) (see Game.js where player is initialised)
     * @param {string} cameraID         Unique string to identify the camera (i.e. same as ID used when constructing the camera Actor) (see Game.js where camera is initialised)
     * @param {string} parentDivID      Unique ID of the parent DIV which encloses the canvas in the HTML file (e.g. <div id="parent-top">...<canvas id=...></div>) or when creating the div and enclosed canvas using DOM manipulation
     * @param {string} canvasID ID      Unique ID of the canvas for the screen object (specified in HTML file) 
     * @param {string} introID ID       Unique ID of the intro DIV for the screen object (specified in HTML file) used when drawing intro countdown HTML elements
     * @param {string} uiID ID          Unique ID of the ui DIV for the screen object (specified in HTML file) used when drawing UI HTML elements
     * @param {Vector2} topLeft         A Vector2 representing the screen-space coordinates of the top left corner of the canvas    
     * @param {Vector2} dimensions      A Vector2 representing width and height of the canvas (see HTML e.g. 840x346) used to calculate the bounding box for the camera for the canvas
     * @param {string} clearScreenColor String defining the color (e.g. "red", "rgb(255, 0, 0), #ff0000") used when clearing the associated canvas
     * @returns                         Object of canvas-player related data.
     * @memberof GDGraphics
     */
    static GetScreenObject(playerID, cameraID, parentDivID, canvasID, introID, uiID, topLeft, dimensions, clearScreenColor) {
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


/**
 * Provides DOM related functions including the following:
 * - Functions to add HTML elements that will be drawn based on a single timer or until the Value getter of a boolean (BooleanSentinel) or numeric (NumberSentinel) sentinel object returns true.
 * - Function to get the dimensions (w, h) or text drawn to screen in a user-specified font
 * @author niall mcguinness
 * @version 1.0
 * @class GDDOM
 */
class GDDOM {

    /**
     * Adds an array of HTML elements to a parent element for a duration of time in ms.
     *
     * @param {HTMLElement} parentElement Parent HTML element into which the childElement is added 
     * @param {HTMLElement} childElementArray Array of child elements added to the parent
     * @param {number} delayTimeInMs Delay in ms before adding the child element to the parent
     * @param {number} timeToLiveInMs Time in ms after which the child is removed from the parent
     * @returns Promise which allows calling code to attach a resolve callback function
     * @author niall mcguinness
     * @see https://javascript.info/promise-basics
     * @see https://www.w3schools.com/jsref/met_win_settimeout.asp
     */
    static ShowElementsFor(parentElement, childElementArray, delayTimeInMs, timeToLiveInMs) {

        //if delay is set then start timer
        if (delayTimeInMs > 0) {
            setTimeout(() => {
                for (let element of childElementArray)
                    parentElement.appendChild(element);
            }, delayTimeInMs); //start timer to add elements to parent after delayTimeInMs
        } else {
            for (let element of childElementArray)
                parentElement.appendChild(element);
        }

        return new Promise(resolve => { //return Promise and start timer for removal
            setTimeout(() => {
                    for (let element of childElementArray)
                        parentElement.removeChild(element);
                    resolve();
                },
                timeToLiveInMs)
        });
    }

    /**
     * Adds an array of HTML elements to a parent element until a sentinel getter returns false.
     *
     * @param {HTMLElement} parentElement Parent HTML element into which the childElement is added 
     * @param {HTMLElement} childElementArray Array of child elements added to the parent
     * @param {Sentinel} sentinel Instance of a class which provides a getter (i.e. Value) on boolean flag
     * @param {number} delayTimeInMs Delay in ms before adding the child element to the parent
     * @param {number} repeatIntervalInMs Delay in ms before repeating the interval timer
     * @param {number} maxRepeatCount Maximum number of times the interval timer will loop, -1 to loop infinitely
     * @returns Promise which allows calling code to attach a resolve callback function
     * @author niall mcguinness
     * @see https://javascript.info/promise-basics
     * @see https://www.w3schools.com/jsref/met_win_setinterval.asp
     */
    static ShowElementsWhile(parentElement, childElementArray, sentinel,
        delayTimeInMs, repeatIntervalInMs, maxRepeatCount) {

        let executionCount = 0; //if sentinel is false OR we have exceeded the maximum number of repeats (excluding -1 which means loop forever) then remove child, stop interval timer and call resolve callback
        let timer = null;
        return new Promise(function (resolve) { //return Promise and start timer for checking sentinel
            if (sentinel.Value) { //does the sentinel flag allow us to start?  

                //if delay is set then start timer
                if (delayTimeInMs > 0) {
                    setTimeout(() => {
                        for (let element of childElementArray)
                            parentElement.appendChild(element);
                    }, delayTimeInMs); //start timer to add elements to parent after delayTimeInMs
                } else {
                    for (let element of childElementArray)
                        parentElement.appendChild(element);
                }

                timer = setInterval(() => { //start a repeating timer to check if sentinel is still true
                    if (!sentinel.Value || (maxRepeatCount != -1 && executionCount >= maxRepeatCount)) { //if sentinel is false OR we have exceeded the maximum number of repeats (excluding -1 which means loop forever) then remove child, stop interval timer and call resolve callback
                        for (let element of childElementArray)
                            parentElement.removeChild(element);
                        clearInterval(timer);
                        resolve();
                    } else //if we are not finishing then increment the executionCount which is used to prevent us from running indefinitely
                        executionCount++;
                }, repeatIntervalInMs);

            }
        });
    }

    /**
     * Returns the dimensions of text when drawn to a specified context (i.e. a canvas)
     *
     * @param {Context} context Context on which the text will be rendered
     * @param {HTMLElement} element HTML element containing text (e.g. div, b, p)
     * @param {string} textBaseline Indicates the horizontal line where text is vertically aligned with the canvas (e.g. top, hanging, middle, alphabetic, ideographic, and bottom)
     * @returns Object containing width and height of the text when rendered to the context
     * @see https://www.w3schools.com/tags/canvas_textbaseline.asp
     * @author niall mcguinness
     */
    static GetTextDimensions(context, element, textBaseline) {
        if (element.font)
            context.font = element.font;
        else
            throw "Error: element has no specified font!";

        context.textBaseline = textBaseline;
        let dimensions = context.measureText(element.innerHTML || element.innerText);
        return {
            width: Math.ceil(dimensions.width),
            height: Math.ceil(dimensions.actualBoundingBoxAscent - dimensions.actualBoundingBoxDescent)
        };
    }

    /**
     * Returns the dimensions of text when drawn to a dynamially generated context (i.e. a canvas)
     *
     * @param {HTMLElement} element HTML element containing text (e.g. div, b, p)
     * @param {string} font Font string indicating the size and font family (e.g. "12pt Arial, sans serif")
     * @returns Object containing width and height of the text when rendered to the context
     * @see https://www.w3schools.com/tags/canvas_textbaseline.asp
     * @author niall mcguinness
     */
    static GetTextDimensions(element, font) {
        let context = document.createElement("canvas").getContext("2d");
        context.font = font;
        let dimensions = context.measureText(element.innerHTML || element.innerText);
        return {
            width: Math.ceil(dimensions.width),
            height: Math.ceil(dimensions.actualBoundingBoxAscent - dimensions.actualBoundingBoxDescent)
        };
    }
}

/**
 * Used to pass to objects that then check the boolean value to signal an event has occured.
 *
 * @author niall mcguinness
 * @version 1.0
 * @class BooleanSentinel
 */
class BooleanSentinel {

    static Infinite = -1;

    constructor(initialValue) {
        this.value = initialValue;
    }

    set Value(value) {
        this.value = value;
    }

    get Value() {
        return this.value;
    }
}

/**
 * Used to pass to objects that then check the boolean value to signal an event has occured.
 * Will only return false when the target number has been reached. 
 * @see game::LoadAllOtherManagers() where MyMenuManager(s) are instanciated
 * @author niall mcguinness
 * @version 1.0
 * @class NumericSentinel
 */
class NumericSentinel {

    constructor(targetNumber) {
        this.currentNumber = 0;
        this.targetNumber = targetNumber;
    }

    Increment() {
        this.currentNumber++;
    }

    get Value() {
        return this.currentNumber < this.targetNumber;
    }
}

/**
 * Use to call REST API endpoints (e.g. for our leaderboard)
 * 
 * @author niall mcguinness
 * @version 1.0
 * @class GDREST
 */

class GDREST {

    constructor(){

    }
    
    /**
     * Gets options object passed to getData()
     * @param {} methodName 
     * @param {*} jsonObject 
     */
    getFetchOptions(methodName, jsonObject) {
        return {
            method: methodName.trim().toUpperCase(), //"POST", "GET", "UPDATE", "DELETE" and UPPERCASE only
            body: JSON.stringify(jsonObject) //{game: "sam", player: "jane doe", score: 123}
        };
    }

    /**
     * Gets data at the URL specified using the options supplied
     * @param {} url 
     * @param {*} options 
     */
    async getData(url, options) {
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    }
}