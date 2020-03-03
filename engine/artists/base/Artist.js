/**
 * Base class for all artists.
 * @author
 * @version 1.0
 * @class Artist
 */
class Artist {
    //#region  Fields 
    //#endregion 

    //#region  Properties
    get Alpha() {
        return this.alpha;
    }
    set Alpha(alpha) {
        this.alpha = alpha > 1 || alpha < 0 ? 1 : alpha;
    }
    //#endregion

    constructor(alpha) {
        this.Alpha = alpha;
    }

    /**
     * Currently unused.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent (unused)
     * @memberof Artist
     */
    Update(gameTime, parent, camera) {

    }

    /**
     * Currently unused.
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent
     * @param {Camera2D} activeCamera 
     * @memberof Artist
     */
    Draw(gameTime, parent, camera) {

    }

    //#region Equals, Clone, ToString 
    Equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other) && this.context === other.Context;
    }

    Clone() {
        return new Artist(this.alpha);
    }

    ToString() {
        return "[" + this.context + "]";
    }
    //#endregion
}