/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, heigth) stored in sourcePosition.
 * @author
 * @version 1.0
 * @class SpriteArtist
 */
class SpriteArtist extends Artist {
    //#region  Fields 
    //#endregion 

    //#region  Properties
    get Spritesheet() {
        return this.spritesheet;
    }
    set Spritesheet(spritesheet) {
        this.spritesheet = spritesheet;
    }
    get SourcePosition() {
        return this.sourcePosition;
    }
    set SourcePosition(sourcePosition) {
        this.sourcePosition = sourcePosition;
    }
    get SourceDimensions() {
        return this.sourceDimensions;
    }
    set SourceDimensions(sourceDimensions) {
        this.sourceDimensions = sourceDimensions;
    }

    //#endregion

    constructor(spritesheet,
        sourcePosition, sourceDimensions, alpha = 1) {
        super(alpha);

        this.spritesheet = spritesheet;
        this.sourcePosition = sourcePosition;
        this.sourceDimensions = sourceDimensions;
    }

    /**
     * Currently unused as, unlike AnimatedSpriteArtist, we are drawing the same pixel data in each draw call.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @memberof SpriteArtist
     */
    Update(gameTime, parent, camera) {

    }

    /**
     * Renders pixel data from spritesheet to canvas
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @param {Camera2D} activeCamera 
     * @memberof SpriteArtist
     */
    Draw(gameTime, parent, activeCamera) {
        //save whatever context settings were used before this (color, line, text styles)
        activeCamera.Context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();
        //access the transform for the parent that this artist is attached to
        let transform = parent.Transform2D;

        activeCamera.Context.drawImage(this.spritesheet,
            this.sourcePosition.X, this.sourcePosition.Y,
            this.sourceDimensions.X, this.sourceDimensions.Y,
            transform.Translation.X, transform.Translation.Y,
            transform.Dimensions.X * transform.Scale.X, transform.Dimensions.Y * transform.Scale.Y);

        activeCamera.Context.restore();
    }

    //#region Equals, Clone, ToString 

    Equals(other) {
        return super.Equals(other) && this.spritesheet === other.Spritesheet && this.sourcePosition === other.SourcePosition && this.sourceDimensions === other.SourceDimensions;
    }

    Clone() {
        return new SpriteArtist(this.spritesheet, this.sourcePosition.Clone(), this.sourceDimensions.Clone(), this.Alpha);
    }

    ToString() {
        return "[" + this.spritesheet + "," + this.sourcePosition.ToString() + "," + this.sourceDimensions.ToString() + "]";
    }
    //#endregion
}