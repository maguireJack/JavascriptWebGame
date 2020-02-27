/**
 * Represents a drawn player character or non-player character within a game with position information (e.g. player, enemy)
 * @author
 * @version 1.0
 * @class PlayerSprite
 */

class MoveableSprite extends Sprite {

    //#region  Fields 
    body = new Body();
    //#endregion 

    //#region  Properties
    get Body() {
        return this.body;
    }
    set Body(body) {
        this.body = body || new Body(); //set default if not defined
    }
    //#endregion 

    constructor(id, actorType, collisionType, transform2D, artist, statusType, scrollSpeedMultiplier, layerDepth) {
        super(id, actorType, collisionType, transform2D, artist, statusType, scrollSpeedMultiplier, layerDepth);
    }

    //#region Equals, Clone, ToString 
    Equals(other) {
        //to do...  
        throw "Not Yet Implemented";
    }

    ToString() {
        //to do...a lazy option is to call parent method, add a class specific method here later...
        return super.ToString();  
    }

    Clone() {
        //to do...
        throw "Not Yet Implemented";

    }
    //#endregion

}