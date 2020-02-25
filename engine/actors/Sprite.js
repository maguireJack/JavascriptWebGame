/**
 * Represents any drawn non-player or non-player character entity within a game with position information (e.g. pickup, obstacle, UI element)
 * @author
 * @version 1.0
 * @class Sprite
 */

class Sprite extends Actor2D {

    //#region  Fields 
    body = new Body();
    //#endregion 

    //#region  Properties
    get Artist() {
        return this.artist;
    }
    set Artist(artist) {
        this.artist = artist;
    }
    get Body() {
        return this.body;
    }
    set Body(body) {
        this.body = body || new Body(); //set default if not defined
    }
    get ScrollSpeedMultiplier() {
        return this.scrollSpeedMultiplier;
    }
    set ScrollSpeedMultiplier(scrollSpeedMultiplier) {
        this.scrollSpeedMultiplier = scrollSpeedMultiplier || 1;
    }
    get LayerDepth() {
        return this.layerDepth;
    }
    set LayerDepth(layerDepth) {
        this.layerDepth = layerDepth || 0;
    }
    //#endregion

    constructor(id, actorType, transform2D, artist, statusType,
        scrollSpeedMultiplier, layerDepth) {
        super(id, actorType, transform2D, statusType);
        this.artist = artist;
        this.ScrollSpeedMultiplier = scrollSpeedMultiplier;
        this.LayerDepth = layerDepth;
    }

    /**
     * Updates attached artist and calls super::Update()
     *
     * @param {GameTime} gameTime
     * @see ObjectManager::Update()
     * @memberof Sprite
     */
    Update(gameTime, camera) {
        //if we have an attached artist and we are supposed to update the sprite then update the artist 
        if (this.artist != null &&
            (this.StatusType & StatusType.IsUpdated) != 0) {
            this.artist.Update(gameTime, this, camera);
            //call Actor2D::Update() to update any attached behaviors
            super.Update(gameTime, camera);
        }
    }


    /**
     * Calls Draw() method of the attached artist which renders the sprite to screen.
     *
     * @param {GameTime} gameTime
     * @param {Camera2D} activeCamera
     * @see ObjectManager::Draw()
     * @memberof Sprite
     */
    Draw(gameTime, activeCamera) {

        //if we have an attached artist and we are supposed to draw the sprite then draw 
        if (this.artist != null && (this.StatusType & StatusType.IsDrawn) != 0)
            this.artist.Draw(gameTime, this, activeCamera);
    }

    //#region Equals, Clone, ToString 
    Equals(other) {
        if (other == null || other == undefined || !other instanceof Sprite)
            throw 'Error: One or more objects is null, undefined, or not type ' + this.constructor.name;

        return this.id === other.ID && this.actorType === other.ActorType && this.transform2D.Equals(other.Transform2D) && this.artist.Equals(other.Artist);
    }

    Clone() {
        //make a clone of the actor
        let clone = new Sprite("clone - " + this.id, this.actorType, this.transform2D.Clone(), this.artist.Clone(), this.statusType);

        //now clone all the actors attached behaviors
        for (let behavior of this.behaviors)
            clone.AttachBehavior(behavior.Clone());

        //lastly return the actor
        return clone;
    }

    ToString() {
        return "[" + this.id + "," + this.actorType.toString() + "," + this.transform2D.ToString() + "]";
    }
    //#endregion


}