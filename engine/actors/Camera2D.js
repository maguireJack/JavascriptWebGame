class Camera2D extends Actor2D {

    //#region Fields
    //#endregion 

    //#region Properties
    get Context()
    {
        return this.context;
    }
    //#endregion

    constructor(id, actorType, transform2D, statusType, context) {
        super(id, actorType, CollisionType.Collidable, transform2D, statusType);

        this.context = context;
    }

    /**
     * Updates state information and executes attached behavior(s)
     *
     * @param {GameTime} gameTime
     * @see Actor2D::Update()
     * @memberof Camera2D
     */
    Update(gameTime) {
        super.Update(gameTime); //call parent, do nothing else
    }

    /**
     * Allows the canvas to be transformed (i.e. translation, rotation, scale) based on the transform values of the camera.
     * 
     * @see DebugDrawer::DrawBoundingBox()
     * @memberof Camera2D
     */
    SetContext() {
        let transform = this.Transform2D;
        this.context.translate(transform.Origin.X, transform.Origin.Y);
        this.context.scale(transform.Scale.X, transform.Scale.Y);
        this.context.rotate(transform.RotationInRadians);
        this.context.translate(-transform.Origin.X, -transform.Origin.Y);
        this.context.translate(-transform.Translation.X, -transform.Translation.Y);
    }

    //#region Equals, Clone, ToString 
    Equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other) && this.context === other.Context; 
    }

    ToString() {
        return super.ToString() + "," + this.context;
    }

    Clone() {
        return new Camera2D(this.ID, this.ActorType, this.CollisionType, this.Transform2D, this.StatusType, this.context);

    }
    //#endregion


}