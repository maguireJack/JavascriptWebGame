/**
 * Move tank sprite, test for collisions etc.
 * @author
 * @version 1.0
 * @class TankBehavior
 */
class TankBehavior {
    constructor(keyboardManager, objectManager, actionKeys, moveSpeed, initialLookDirection, rotateRate) {
        this.keyboardManager = keyboardManager;
        this.objectManager = objectManager;
        this.actionKeys = actionKeys;
        this.moveSpeed = moveSpeed;
        this.initialLookDirection = initialLookDirection;
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
        //forward
        if (this.keyboardManager.IsKeyDown(this.actionKeys[0])) {
            parent.Transform2D.TranslateBy(Vector2.MultiplyScalar(this.initialLookDirection, -1*this.moveSpeed * gameTime.ElapsedTimeInMs));
        }
        //backward
        else if (this.keyboardManager.IsKeyDown(this.actionKeys[1])) {
            parent.Transform2D.TranslateBy(Vector2.MultiplyScalar(this.initialLookDirection, this.moveSpeed * gameTime.ElapsedTimeInMs));
        }

        //turn left
        if (this.keyboardManager.IsKeyDown(this.actionKeys[2])) {
            parent.Transform2D.RotateBy(-this.rotateRate * gameTime.ElapsedTimeInMs);
        }
        //turn right
        else if (this.keyboardManager.IsKeyDown(this.actionKeys[3])) {
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