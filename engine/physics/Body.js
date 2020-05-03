/**
 * Represents the physical properties of a sprite (e.g. mass, velocity, friction)
 * @author niall mcguinness
 * @version 1.0
 * @class Body
 */
const FrictionType = Object.freeze({
    Low: 0.9,
    Normal: 0.7,
    High: 0.5
});
const GravityType = Object.freeze({
    Off: 0,
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
    get MaximumSpeed() {
        return this.maximumSpeed;
    }
    get Gravity() {
        return this.gravity;
    }
    get Friction() {
        return this.friction;
    }
    get VelocityX() {
        return this.velocityX;
    }
    get VelocityY() {
        return this.velocityY;
    }
    set MaximumSpeed(maximumSpeed) {
        this.maximumSpeed = maximumSpeed || Body.MAX_SPEED;
    }
    set Gravity(gravity) {
        this.gravity = gravity || GravityType.Normal;
    }
    set Friction(friction) {
        this.friction = friction || FrictionType.Normal;
    }
    //endregion 

    constructor(maximumSpeed, gravity, friction) {
        this.velocityX = 0;
        this.velocityY = 0;

        this.IsJumping = false;
        this.IsOnGround = false;

        this.MaximumSpeed = this.originalMaximumSpeed = maximumSpeed;
        this.Gravity = this.originalGravity = gravity;
        this.Friction = this.originalFriction = friction;
    }

    Reset(){
        this.velocityX = 0;
        this.velocityY = 0;

        this.IsJumping = false;
        this.IsOnGround = false;

        this.MaximumSpeed = this.originalMaximumSpeed;
        this.Gravity = this.originalGravity;
        this.Friction = this.originalFriction;
    }

    ApplyGravity() {
        this.velocityY += this.gravity;
    }

    ApplyFriction() {
        this.velocityX *= this.friction;
    }

    ApplyFrictionX() {
        this.velocityX *= this.friction;
    }

    ApplyFrictionY() {
        this.velocityY *= this.friction;
    }

    SetVelocity(velocity) {
        this.SetVelocityX(velocity.x);
        this.SetVelocityY(velocity.y);
    }

    SetVelocityX(velocityX) {
        if (velocityX <= this.maximumSpeed)
            this.velocityX = velocityX;
    }

    SetVelocityY(velocityY) {
        if (velocityY <= this.maximumSpeed)
            this.velocityY = velocityY;
    }

    AddVelocity(velocity) {
        this.AddVelocityX(velocity.x);
        this.AddVelocityY(velocity.y);
    }

    AddVelocityX(deltaVelocityX) {
        if (Math.abs(this.velocityX + deltaVelocityX) <= this.maximumSpeed)
            this.velocityX += deltaVelocityX;
    }

    AddVelocityY(deltaVelocityY) {
        if (Math.abs(this.velocityY + deltaVelocityY) <= this.maximumSpeed)
            this.velocityY += deltaVelocityY;
    }

    //#region Common Methods - Equals, ToString, Clone
    Equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other) && this.maximumSpeed === other.MaximumSpeed && this.gravity === other.Gravity && this.friction === other.Friction;
    }

    ToString() {
        return "[" + this.maximumSpeed + ", " + this.gravity + +", " + this.friction + ", " + this.velocityX + ", " + this.velocityY + "]";
    }


    Clone() {
        return new Body(this.maximumSpeed, this.gravity, this.friction);
    }
    //#endregion
}