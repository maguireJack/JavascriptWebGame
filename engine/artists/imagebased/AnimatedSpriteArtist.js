/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, heigth) stored in the current cell index of an array of cells.
 * The array of cells indicate the (x, y, width, height) data for each cell in the animation.
 * @author NMCG
 * @version 1.0
 * @class AnimatedSpriteArtist
 */

class AnimatedSpriteArtist extends Artist {

    //#region  Fields
    //#endregion 

    //#region  Properties
    get AnimationData() {
        return this.animationData;
    }
    set AnimationData(animationData) {
        this.animationData = animationData;
    }
    //#endregion

    constructor(alpha = 1, animationData) {
        super(alpha);

        this.animationData = animationData;
        this.frameRatePerSec = 0;
        this.frameIntervalInMs = 0;
        this.cells = [];
        this.startCellIndex = 0;
        this.endCellIndex = 0;
        this.currentCellIndex = 0;
        this.currentTakeName = "";
    }

    SetTake(takeName) {
        if (this.animationData.takes[takeName]) {
            if (takeName != this.currentTakeName) {
                let take = this.animationData.takes[takeName];
                this.currentTakeName = takeName;
                this.timeSinceLastFrameInMs = 0;
                this.frameRatePerSec = take.fps;
                this.frameIntervalInMs = 1000.0 / this.frameRatePerSec;
                this.cells = take.cellData;
                this.startCellIndex = take.startCellIndex;
                this.endCellIndex = take.endCellIndex;
                this.maxLoopCount = take.maxLoopCount;
                this.currentCellIndex = this.startCellIndex;
            }
        } else
            throw takeName + " does not exist!";
    }

    GetBoundingBoxByTakeName(takeName) {
        if (this.animationData.takes[takeName]) {
            return this.animationData.takes[takeName].boundingBoxDimensions;
        } else
            throw takeName + " does not exist!";
    }

    /**
     * Pauses animation
     *
     * @memberof AnimatedSpriteArtist
     */
    Pause() {
        this.paused = true;
    }

    /**
     * Unpauses animation
     *
     * @memberof AnimatedSpriteArtist
     */
    Unpause() {
        this.paused = false;
    }

    /**
     * Resets animation
     *
     * @memberof AnimatedSpriteArtist
     */
    Reset() {
        this.paused = false;
        this.currentTakeIndex = -1;
        this.currentCellIndex = this.startCellIndex;
        this.timeSinceLastFrameInMs = 0;
    }

    /**
     * Advances animation to the next frame based on elapsed time since last frame
     *
     * @param {GameTime} gameTime
     * @param {Sprite} parent
     * @memberof AnimatedSpriteArtist
     */
    Update(gameTime, parent, camera) {
        if (!this.paused) {
            this.timeSinceLastFrameInMs += Math.round(gameTime.ElapsedTimeInMs);
            if (this.timeSinceLastFrameInMs > this.frameIntervalInMs) {
                this.Advance();
                this.timeSinceLastFrameInMs = 0;
            }
        }
    }

    /**
     * Renders pixel data from spritesheet to canvas on a frame by frame basis
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @param {Camera2D} activeCamera 
     * @memberof AnimatedSpriteArtist
     */
    Draw(gameTime, parent, activeCamera) {
        //save whatever context settings were used before this (color, line, text styles)
        activeCamera.Context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();

        //apply the sprite transformations to the sprite 
        parent.SetContext(activeCamera.Context);
  
        let cell = this.cells[this.currentCellIndex];
        activeCamera.Context.drawImage(this.animationData.spriteSheet,
            cell.X, cell.Y,
            cell.Width, cell.Height,
            parent.Transform2D.Translation.X, parent.Transform2D.Translation.Y, 
            cell.Width, cell.Height);
        activeCamera.Context.restore();

    }

    /**
     * Increments the current cell index and wraps if > length
     *
     * @memberof AnimatedSpriteArtist
     */
    Advance() {
        if (this.currentCellIndex < this.endCellIndex)
            this.currentCellIndex++;
        else {
            this.currentCellIndex = this.startCellIndex;

            //add code to handle 0 or N loops here...
        }
    }

    //#region Equals, Clone, ToString 

    Equals(other) {
        return super.Equals(other) && this.animationData.id === other.AnimationData.id &&
            this.animationData.spriteSheet === other.AnimationData.spriteSheet;
    }

    Clone() {
        return new AnimatedSpriteArtist(this.Alpha,
            this.animationData); //a shallow copy is fine, since obj contains no sprite specific data (e.g. velocity, keys)
    }

    ToString() {
        return "[" + this.animationData.id + "]";
    }

    //#endregion

}