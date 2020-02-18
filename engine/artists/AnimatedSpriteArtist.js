/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, heigth) stored in the current cell index of an array of cells.
 * The array of cells indicate the (x, y, width, height) data for each cell in the animation.
 * @author NMCG
 * @version 1.0
 * @class AnimatedSpriteArtist
 */

class AnimatedSpriteArtist {

    //#region  Fields 
    //#endregion 

    //#region  Properties
    get Spritesheet() {
        return this.spritesheet;
    }
    set Spritesheet(spritesheet) {
        this.spritesheet = spritesheet;
    }
    get Cells() {
        return this.cells;
    }
     /**
     * Sets cells for the animation but only if previous cells were null (startup) or different from current
     *
     * @memberof AnimatedSpriteArtist
     */
    set Cells(cells) {

        //bug fix - reset animation after each time cells are changed (based on movement)
        if (this.cells == null || this.cells !== cells)
            this.Reset();

        this.cells = cells;
    }
    get StartCellIndex() {
        return this.startCellIndex;
    }
    set StartCellIndex(startCellIndex) {
        this.startCellIndex = startCellIndex;
    }
    get CurrentCellIndex() {
        return this.currentCellIndex;
    }
    set CurrentCellIndex(currentCellIndex) {
        this.currentCellIndex = currentCellIndex;
    }
    //#endregion

    constructor(context, spritesheet, framesPerSec, cells, startCellIndex = 0) {
        this.context = context;
        this.spritesheet = spritesheet;

        //to do...
        this.frameRatePerSec = this.originalFrameRatePerSec = framesPerSec; //10fps => 1/10 => 100ms
        this.frameIntervalInMs = 1000.0 / framesPerSec; //
        this.timeSinceLastFrameInMs = 0;

        this.cells = cells;
        this.startCellIndex = startCellIndex % this.cells.length; //prevent too large value
        this.currentCellIndex = this.startCellIndex;
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
    Update(gameTime, parent) {
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
     * @memberof AnimatedSpriteArtist
     */
    Draw(gameTime, parent) {
        //to do...
        this.context.save();
        var cell = this.cells[this.currentCellIndex];
        var transform = parent.Transform2D;
        this.context.translate(
            transform.TranslationOffset.X,
            transform.TranslationOffset.Y);
        this.context.scale(transform.Scale.X, transform.Scale.Y);

        this.context.drawImage(this.spritesheet,
            cell.left, cell.top,
            cell.width, cell.height,
            transform.Translation.X, transform.Translation.Y, //0, 0
            cell.width, cell.height);
        this.context.restore();

    }

    /**
     * Increments the current cell index and wraps if > length
     *
     * @memberof AnimatedSpriteArtist
     */
    Advance() {

        if (this.currentCellIndex === this.cells.length - 1)
            this.currentCellIndex = 0;
        else
            this.currentCellIndex++;
        //to do...
    }

    //#region Equals, Clone, ToString 

    Equals(other) {
        if (other == null || other == undefined || !other instanceof AnimatedSpriteArtist)
            throw 'Error: One or more objects is null, undefined, or not type ' + this.constructor.name;

        return this.spritesheet === other.Spritesheet && this.cells === other.Cells && this.startCellIndex === other.StartCellIndex;
    }

    Clone() {
        return new AnimatedSpriteArtist(this.context, this.spritesheet, this.frameRatePerSec, this.cells, this.startCellIndex);
    }

    ToString() {
        return "[" + this.spritesheet + "," + this.frameRatePerSec + "," + this.cells + "," + this.startCellIndex + "]";
    }

    //#endregion

}