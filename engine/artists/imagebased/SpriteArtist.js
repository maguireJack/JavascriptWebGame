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
    Update(gameTime, parent) {

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
        activeCamera.context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();

        //apply the sprite transformations to the sprite 
        parent.SetContext(activeCamera.context);

        //access the transform for the parent that this artist is attached to
        let transform = parent.transform2D;

        activeCamera.context.globalAlpha = this.alpha;
        activeCamera.context.drawImage(this.spritesheet,
            this.sourcePosition.x, this.sourcePosition.y,
            this.sourceDimensions.x, this.sourceDimensions.y,
            transform.translation.x - transform.Origin.x, 
            transform.translation.y - transform.Origin.y,  
            transform.dimensions.x, transform.dimensions.y);

        activeCamera.context.restore();
    }

    DrawParented(gameTime, attached, parent, activeCamera) {
        //save whatever context settings were used before this (color, line, text styles)
        activeCamera.context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();

        activeCamera.context.translate(attached.transform2D.translation.x, attached.transform2D.translation.y);
        activeCamera.context.scale(attached.transform2D.scale.x * parent.transform2D.scale.x, 
            attached.transform2D.scale.y * parent.transform2D.scale.y);
        activeCamera.context.rotate(attached.transform2D.rotationInRadians);
        activeCamera.context.translate(-attached.transform2D.translation.x, -attached.transform2D.translation.y);

        activeCamera.context.translate(parent.transform2D.translation.x, parent.transform2D.translation.y);
        activeCamera.context.rotate(parent.transform2D.rotationInRadians);
        activeCamera.context.translate(-parent.transform2D.translation.x, -parent.transform2D.translation.y);

        //access the transform for the parent that this artist is attached to
        let transform = parent.transform2D;
        activeCamera.context.globalAlpha = this.alpha;
        activeCamera.Context.drawImage(this.spritesheet,
            this.sourcePosition.X, this.sourcePosition.Y,
            this.sourceDimensions.X, this.sourceDimensions.Y,
            transform.Translation.X - transform.Origin.X, 
            transform.Translation.Y - transform.Origin.Y,  
            transform.Dimensions.X, transform.Dimensions.Y);

        activeCamera.context.restore();
    }

    // DrawParented(gameTime, attached, parent, activeCamera) {
    //     //save whatever context settings were used before this (color, line, text styles)
    //     activeCamera.context.save();
    //     //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
    //     activeCamera.SetContext();

    //     //apply the transformations coming from the attached parent
    //     attached.SetContext(activeCamera.context);

    //     //apply the sprite transformations to the sprite 
    //     parent.SetContext(activeCamera.context);

    //     //access the transform for the parent that this artist is attached to
    //     let transform = parent.Transform2D;

    //     activeCamera.Context.drawImage(this.spritesheet,
    //         this.sourcePosition.X, this.sourcePosition.Y,
    //         this.sourceDimensions.X, this.sourceDimensions.Y,
    //         transform.Translation.X - transform.Origin.X, 
    //         transform.Translation.Y - transform.Origin.Y,  
    //         transform.Dimensions.X, transform.Dimensions.Y);

    //     activeCamera.context.restore();
    // }

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