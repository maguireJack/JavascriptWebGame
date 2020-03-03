/**
 * Represents a drawn player character or non-player character within a game with position information (e.g. player, enemy)
 * @author
 * @version 1.0
 * @class PlayerSprite
 */

class MoveableSprite extends Sprite {
    //#region  Fields
    body = new Body();
    //#endregion

    //#region  Properties
    get Body() {
        return this.body;
    }
    set Body(body) {
        this.body = body || new Body(); //set default if not defined
    }
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
        super(
            id,
            actorType,
            collisionType,
            transform2D,
            artist,
            statusType,
            scrollSpeedMultiplier,
            layerDepth
        );
    }

    //#region Equals, Clone, ToString
    Equals(other) {
        return super.Equals(other) && this.body.Equals(other.Body);
    }

    ToString() {
        //lazy option is to call parent method, add a class specific method here later...
        return super.ToString();
    }

    Clone() {
        //make a clone of the actor
        let clone = new MoveableSprite(
            this.ID,
            this.ActorType,
            this.CollisionType,
            this.Transform2D.Clone(),
            this.Artist.Clone(),
            this.StatusType,
            this.ScrollSpeedMultiplier,
            this.LayerDepth
        );

        //now clone all the actors attached behaviors
        for (let behavior of this.behaviors) clone.AttachBehavior(behavior.Clone());

        //lastly return the actor
        return clone;
    }
    //#endregion
}