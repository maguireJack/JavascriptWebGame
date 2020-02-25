/**
 * Renders a rectangle primitive for the parent sprite
 * @author
 * @version 1.0
 * @class RectangleSpriteArtist
 */
class RectangleSpriteArtist extends Artist{
    //#region  Fields 
    //#endregion 

    //#region  Properties
    get LineWidth() {
        return this.lineWidth;
    }
    set LineWidth(lineWidth) {
        this.lineWidth = lineWidth;
    }
    get StrokeStyle() {
        return this.strokeStyle;
    }
    set StrokeStyle(strokeStyle) {
        this.strokeStyle = strokeStyle;
    }
    get FillStyle() {
        return this.fillStyle;
    }
    set FillStyle(fillStyle) {
        this.fillStyle = fillStyle;
    }
    get Alpha() {
        return this.alpha;
    }
    set Alpha(alpha) {
        this.alpha = alpha > 1 || alpha < 0 ? 1 : alpha;
    }
    //#endregion

    constructor(context, lineWidth, strokeStyle, fillStyle, alpha=1) {
        super(context, alpha);
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }

    /**
     * Currently unused as, unlike AnimatedSpriteArtist, we are drawing the same pixel data in each draw call.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @param {Camera2D} activeCamera 
     * @memberof RectangleSpriteArtist
     */
    Update(gameTime, parent, camera) {

    }

    /**
     * Renders rectangle to canvas
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @param {Camera2D} activeCamera 
     * @memberof RectangleSpriteArtist
     */
    Draw(gameTime, parent, activeCamera) {
        this.Context.save();

        super.SetContext(activeCamera);
        let transform = parent.Transform2D;

        this.Context.lineWidth = this.lineWidth;
        this.Context.strokeStyle = this.strokeStyle;
        this.Context.fillStyle = this.fillStyle;
        this.Context.strokeRect(transform.Translation.X, transform.Translation.Y, 
            transform.Dimensions.X * transform.Scale.X, transform.Dimensions.Y * transform.Scale.Y);
        this.Context.fillRect(transform.Translation.X, transform.Translation.Y, 
            transform.Dimensions.X * transform.Scale.X, transform.Dimensions.Y * transform.Scale.Y);
        this.Context.restore();
    }

    //#region Equals, Clone, ToString 

    Equals(other) {
        if (other == null || other == undefined || !other instanceof RectangleSpriteArtist)
            throw 'Error: One or more objects is null, undefined, or not type ' + this.constructor.name;

        return this.rect.Equals(other.Rect) && this.lineWidth === other.Cells &&
            this.strokeStyle === other.StrokeStyle && this.fillStyle === other.FillStyle &&
            this.alpha === other.Alpha;
    }

    Clone() {
        return new RectangleSpriteArtist(this.context, this.rect.Clone(), this.lineWidth, this.strokeStyle, this.fillStyle, this.Alpha);
    }

    ToString() {
        return "[" + this.rect + "," + this.lineWidth + "," + this.strokeStyle + "," + this.fillStyle + "," + this.alpha + "]";
    }

    //#endregion
}