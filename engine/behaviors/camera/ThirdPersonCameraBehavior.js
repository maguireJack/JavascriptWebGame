/**
 * Moves the camera based on the transform2D values of a target actor.
 * @author
 * @version 1.0
 * @class ThirdPersonCameraBehavior
 */
class ThirdPersonCameraBehavior {
    constructor(game) {
        this.game = game;
        this.targetActor = null;
    }

    Execute(gameTime, parent) {
        if(this.targetActor == null)
            this.targetActor = this.game.GetTarget();


            //to do...add code to move camera as player moves
    }
    //#endregion

    //#region Common Methods - Equals, ToString, Clone
    Equals(other) {
        //to do...
        throw "Not Yet Implemented";
    }
    ToString() {
        //to do...
        throw "Not Yet Implemented";
    }

    Clone() {
        //to do...
        throw "Not Yet Implemented";
    }
    //#endregion

}