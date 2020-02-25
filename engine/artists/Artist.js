/**
 * Base class for all artists.
 * @author
 * @version 1.0
 * @class Artist
 */
class Artist 
{
    //#region  Fields 
    //#endregion 

    //#region  Properties
    get Context() {
        return this.context;
    }
    set Context(context) {
        this.context = context;
    }
    //#endregion

    constructor(context)
    {
        this.context = context;
    }

    ApplyCamera(activeCamera)
    {
        let cameraTransform = activeCamera.Transform2D;
        this.context.translate(cameraTransform.Origin.X, cameraTransform.Origin.Y);
        this.context.scale(cameraTransform.Scale.X, cameraTransform.Scale.Y);
        this.context.rotate(cameraTransform.RotationInRadians);
        this.context.translate(-cameraTransform.Origin.X, -cameraTransform.Origin.Y);
        this.context.translate(-cameraTransform.X, -cameraTransform.Translation.Y);
    }

    /**
     * Currently unused.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @memberof Artist
     */
    Update(gameTime, parent, camera)
    {

    }

     /**
     * Currently unused.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @memberof Artist
     */
    Draw(gameTime, parent, camera)
    {

    }

    //#region Equals, Clone, ToString 
    Equals(other) {
        if (other == null || other == undefined || !other instanceof SpriteArtist)
            throw 'Error: One or more objects is null, undefined, or not type ' + this.constructor.name;

        return this.context === other.Context;
    }

    Clone()
    {
        return new Artist(this.context);
    }

    ToString()
    {
        return "[" + this.context + "]";
    }
      //#endregion
}