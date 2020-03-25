/**
 * Move gun sprite, test for collisions etc.
 * @author
 * @version 1.0
 * @class GunBehavior
 */
class GunBehavior {
    constructor(keyboardManager, objectManager, actionKeys, rotateRate) {
        this.keyboardManager = keyboardManager;
        this.objectManager = objectManager;
        this.actionKeys = actionKeys;
        this.rotateRate = rotateRate;
    }

    Execute(gameTime, parent) {
        this.HandleInput(gameTime, parent);
        this.CheckCollisions(parent);
        this.ApplyInput(parent);
    }

    //#region Your Game Specific Methods 
    HandleInput(gameTime, parent) {
        this.HandleMove(gameTime, parent);
    }

    HandleMove(gameTime, parent) {
        //turn left
        if (this.keyboardManager.IsKeyDown(this.actionKeys[0])) {
            parent.Transform2D.RotateBy(-this.rotateRate * gameTime.ElapsedTimeInMs);
        }
        //turn right
        else if (this.keyboardManager.IsKeyDown(this.actionKeys[1])) {
            parent.Transform2D.RotateBy(this.rotateRate * gameTime.ElapsedTimeInMs);
        }
    }

    CheckCollisions(parent) {
        //add code here...
    }

    ApplyInput(parent) {}

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