/**
 * Represents any drawn non-player or non-player character entity within a game with position information (e.g. pickup, obstacle, UI element)
 * which is COMPOSED of either other Sprite, MoveableSprite, or ComponentSprite object instances.
 * 
 * @author NMCG
 * @version 1.0
 * @class ComponentSprite
 */

class ComponentSprite extends Sprite {
    //#region  Fields
    componentChildren = new Array();
    //#endregion

    //#region  Properties
    //#endregion


    constructor(
        id,
        actorType,
        collisionType,
        transform2D,
        artist,
        statusType,
        scrollSpeedMultiplier,
        layerDepth
    ) {
        super(id, actorType, collisionType, transform2D, artist, statusType, scrollSpeedMultiplier, layerDepth);
    }

    /**
     * Calls super::Update() and then updates any attached child sprites
     *
     * @param {GameTime} gameTime
     * @see Sprite::Update()
     * @memberof ComponentSprite
     */
    Update(gameTime) {
        super.Update(gameTime);

        if (this.componentChildren != undefined) {
            for (let i = 0; i < this.componentChildren.length; i++)
                this.componentChildren[i].Update(gameTime, this);
        }
    }

    /**
     * Calls super::Update() and then draws any attached child sprites
     *
     * @param {GameTime} gameTime
     * @param {Camera2D} activeCamera
     * @see Sprite::Draw()
     * @memberof Sprite
     */
    Draw(gameTime, activeCamera) {       
        super.Draw(gameTime, activeCamera);

        //draw any attached children
        for (let attachedChild of this.componentChildren)
            attachedChild.Artist.DrawParented(gameTime, this, attachedChild, activeCamera);

    }

    /**
     * Attaches a child sprite to this object. The child sprite will be transformed (translation, rotation, scale) relative to any changes to its parent.
     *
     * @param {Sprite} sprite
     * @memberof ComponentSprite
     */
    AttachChild(sprite) {
        if (this.componentChildren == undefined)
            this.componentChildren = [];

        if (sprite == undefined || sprite == null || !sprite instanceof Actor2D)
            throw "Error: Object is not a valid instance of Sprite and cannot be attached as a child!";

        this.componentChildren.push(sprite);
    }


    /**
     * Detaches a child sprite from this object. DetachChild will normally be called when the parent changes its visual composition (e.g. gun replacement) or is removed from the object manager.
     *
     * @param {Sprite} sprite
     * @memberof ComponentSprite
     */
    DetachChild(sprite) {

        if (sprite == undefined || sprite == null || !sprite instanceof Actor2D)
            throw "Error: Object is not a valid instance of Sprite and cannot be detached!";

        let index = this.componentChildren.indexOf(sprite);
        this.componentChildren.splice(index, 1);
    }


    /**
     * Removes all child sprites from the parent.
     *
     * @memberof ComponentSprite
     */
    ClearAllChildren() {
        this.componentChildren.length = 0;
    }

     //#region Common Methods - Equals, ToString, Clone
     Equals(other) {
        //to do...
        throw "Not Yet Implemented";
    }
    ToString() {
        //to do...
        throw "Not Yet Implemented";
    }

    Clone() {
        //to do...
        throw "Not Yet Implemented";
    }
    //#endregion
}