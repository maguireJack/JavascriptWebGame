/**
 * Renders multiple (left, centre, right) copies of an image that enable HORIZONTAL scrolling
 * @author
 * @version 1.0
 * @class ScrollingSpriteArtist
 */
class ScrollingSpriteArtist extends Artist {

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
        sourcePosition, sourceDimensions, alpha = 1,
        screenWidth, screenHeight) {
        super(alpha);

        this.spritesheet = spritesheet;
        this.sourcePosition = sourcePosition;
        this.sourceDimensions = sourceDimensions;

        //allows us to know when we have scrolled past the LEFT/RIGHT of the centre image.
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    /**
     * Resets the translation offset on the parent so that when the user passes to the LEFT/RIGHT of the centre image
     * the parentTranslationOffsetX (in the case of horizontal scrolling) is reset. If we did not reset this value
     * then we when we pass to the LEFT/RIGHT we would see the edge of the LEFT/RIGHT image.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @memberof ScrollingSpriteArtist
     */
    Update(gameTime, parent, activeCamera) {
        this.UpdateHorizontalScrolling(parent, activeCamera);

        //if we have also include vertical scrolling then we need to complete the method below
        //this.UpdateVerticalScrolling(parent);
    }

    /**
     * Checks if the player has scrolled HORIZONTALLY more than 1 complete SCALED sprite WIDTH and, if true, resets the translation offset.
     * The effect of this is to allow the background to scroll infinitely along the horizontal.
     *
     * @param {Sprite} parent
     * @memberof ScrollingSpriteArtist
     */
    UpdateHorizontalScrolling(parent, activeCamera) {
        let parentTranslationOffsetX = Math.abs(-activeCamera.Transform2D.Translation.X);
        let resetScreenWidth = Math.ceil(this.screenWidth * parent.Transform2D.Scale.X / parent.ScrollSpeedMultiplier);

        //if we have moved across one complete canvas width, either left or right, then reset the offset to initial position
        if (parentTranslationOffsetX >= resetScreenWidth)
            parent.Transform2D.Translation = new Vector2(0,0);
    }

    /**
     * Checks if the player has scrolled VERTICALLY more than 1 complete SCALED sprite HEIGHT and, if true, resets the translation offset.
     * The effect of this is to allow the background to scroll infinitely along the horizontal.
     *
     * @param {Sprite} parent
     * @memberof ScrollingSpriteArtist
     */
    UpdateVerticalScrolling(parent) {
        //to do...
    }

    /**
     * Renders the pixel data from spritesheet THREE times to allow left and right HORIZONTAL scrolling.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @param {Camera2D} activeCamera 
     * @memberof ScrollingSpriteArtist
     */
    Draw(gameTime, parent, activeCamera) {
        //save whatever context settings were used before this (color, line, text styles)
        activeCamera.Context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();
        //access the transform for the parent that this artist is attached to
        let transform = parent.Transform2D;

        //add additional translation to create parallax effect across background layers (hint: use scroll speed multiplier from 0.01 - 0.2 - see MyConstants::BACKGROUND_DATA)
        activeCamera.Context.translate(-activeCamera.Transform2D.Translation.X * parent.ScrollSpeedMultiplier,
            -activeCamera.Transform2D.Translation.Y * parent.ScrollSpeedMultiplier);

        //allows us to run left
        activeCamera.Context.drawImage(this.spritesheet,
            this.sourcePosition.X, this.sourcePosition.Y,
            this.sourceDimensions.X, this.sourceDimensions.Y,
            transform.Translation.X - transform.Dimensions.X,
            transform.Translation.Y,
            transform.Dimensions.X * transform.Scale.X, transform.Dimensions.Y * transform.Scale.Y);

        activeCamera.Context.drawImage(this.spritesheet,
            this.sourcePosition.X, this.sourcePosition.Y,
            this.sourceDimensions.X, this.sourceDimensions.Y,
            transform.Translation.X, transform.Translation.Y,
            transform.Dimensions.X * transform.Scale.X, transform.Dimensions.Y * transform.Scale.Y);

        //allows us to run right
        activeCamera.Context.drawImage(this.spritesheet,
            this.sourcePosition.X, this.sourcePosition.Y,
            this.sourceDimensions.X, this.sourceDimensions.Y,
            transform.Translation.X + transform.Dimensions.X,
            transform.Translation.Y,
            transform.Dimensions.X * transform.Scale.X, transform.Dimensions.Y * transform.Scale.Y);

        activeCamera.Context.restore();
    }

    //#region Equals, Clone, ToString 

    Equals(other) {
        return super.Equals(other) && this.spritesheet === other.Spritesheet && this.sourcePosition === other.SourcePosition && this.sourceDimensions === other.SourceDimensions;
    }

    Clone() {
        return new ScrollingSpriteArtist(this.context, this.spritesheet, this.sourcePosition.Clone(), this.sourceDimensions.Clone(), this.Alpha, this.screenWidth, this.screenHeight);
    }

    ToString() {
        return "[" + this.spritesheet + "," + this.sourcePosition + "," + this.sourceDimensions + "]";
    }

    //#endregion
}