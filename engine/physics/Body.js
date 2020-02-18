/**
 * Represents the physical properties of a sprite (e.g. mass, velocity, friction)
 * @author
 * @version 1.0
 * @class Body
 */
const FrictionType = Object.freeze({
    Low: 0.9,
    Normal: 0.7,
    High: 0.5
});
const GravityType = Object.freeze({
    Weak: 0.2,
    Normal: 0.4,
    Strong: 0.7
});
class Body {

    //#region Static Fields
    static MAX_SPEED = 10;
    static MIN_SPEED = 0.01;
    //#endregion

    //#region Fields
    //#endregion 

    //#region Properties
    get MaximumSpeed() {return this.maximumSpeed;}
    get Gravity() {return this.gravity;}
    get Friction() {return this.friction;}
    set MaximumSpeed(maximumSpeed) {this.maximumSpeed = maximumSpeed || Body.MAX_SPEED;}
    set Gravity(gravity) {this.gravity = gravity || GravityType.Normal;}
    set Friction(friction) {this.friction = friction || FrictionType.Normal;}
    //endregion 

    constructor(maximumSpeed, gravity, friction) {
        this.velocityX = 0;
        this.velocityY = 0;

        this.IsJumping = false;
        this.IsOnGround = false;

        this.MaximumSpeed = maximumSpeed;
        this.Gravity = gravity;
        this.Friction = friction;
    }

    ApplyGravity() {
        this.velocityY += this.gravity;
    }

    ApplyFriction() {
        this.velocityX *= this.friction;
    }

    SetVelocityX(velocityX) {
        if (velocityX <= this.maximumSpeed)
            this.velocityX = velocityX;
    }

    SetVelocityY(velocityY) {
        this.velocityY = velocityY;
    }

    AddVelocityX(deltaVelocityX) {
        if (Math.abs(this.velocityX + deltaVelocityX) <= this.maximumSpeed)
            this.velocityX += deltaVelocityX;
    }

    AddVelocityY(deltaVelocityY) {
        this.velocityY += deltaVelocityY;
    }

    //#region Common Methods - Equals, ToString, Clone
    Equals(other) {
        //to do...  
        throw "Not Yet Implemented";
    }

    ToString() {
        return "[" + this.velocityX + ", " + this.velocityY + "]";
    }


    Clone() {
        //to do...
        throw "Not Yet Implemented";

    }
    //#endregion
}