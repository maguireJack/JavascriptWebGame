/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, heigth) stored in sourcePosition.
 * @author
 * @version 1.0
 * @class SpriteArtist
 */
class SpriteArtist 
{
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

    constructor(context, spritesheet, 
        sourcePosition, sourceDimensions)
    {
        this.context = context;
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
    Update(gameTime, parent)
    {

    }

     /**
     * Renders pixel data from spritesheet to canvas
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @memberof SpriteArtist
     */
    Draw(gameTime, parent)
    {
        this.context.save();
        var transform = parent.Transform2D;
        this.context.translate(
            transform.TranslationOffset.X, 
            transform.TranslationOffset.Y);
        this.context.scale(transform.Scale.X, transform.Scale.Y);

        this.context.drawImage(this.spritesheet, 
            this.sourcePosition.X, this.sourcePosition.Y, 
            this.sourceDimensions.X, this.sourceDimensions.Y, 
            transform.Translation.X, transform.Translation.Y, //0, 0
            transform.Dimensions.X, transform.Dimensions.Y);
        this.context.restore();
    }

    //#region Equals, Clone, ToString 

    Equals(other) {
        if (other == null || other == undefined || !other instanceof SpriteArtist)
            throw 'Error: One or more objects is null, undefined, or not type ' + this.constructor.name;

        return this.spritesheet === other.Spritesheet && this.sourcePosition === other.SourcePosition && this.sourceDimensions === other.SourceDimensions;
    }

    Clone()
    {
        return new SpriteArtist(this.context, this.spritesheet, this.sourcePosition.Clone(), this.sourceDimensions.Clone());
    }

    ToString()
    {
        return "[" + this.spritesheet + "," + this.sourcePosition.ToString() + "," + this.sourceDimensions.ToString() +"]";
    }
      //#endregion
}