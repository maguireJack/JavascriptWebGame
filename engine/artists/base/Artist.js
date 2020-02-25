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
    get Alpha() {
        return this.alpha;
    }
    set Alpha(alpha) {
        this.alpha = alpha > 1 || alpha < 0 ? 1 : alpha;
    }
    //#endregion

    constructor(context, alpha)
    {
        this.context = context;
        this.Alpha = alpha;
    }

    SetContext(activeCamera)
    {
        let cameraTransform = activeCamera.Transform2D;
        this.context.translate(cameraTransform.Origin.X, cameraTransform.Origin.Y);
        this.context.scale(cameraTransform.Scale.X, cameraTransform.Scale.Y);
        this.context.rotate(cameraTransform.RotationInRadians);
        this.context.translate(-cameraTransform.Origin.X, -cameraTransform.Origin.Y);
        this.context.translate(-cameraTransform.Translation.X, -cameraTransform.Translation.Y);

        //add support for transparency
        this.context.globalAlpha = this.alpha;
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
     * @param {Camera2D} activeCamera 
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
        return new Artist(this.context, this.alpha);
    }

    ToString()
    {
        return "[" + this.context + "]";
    }
      //#endregion
}