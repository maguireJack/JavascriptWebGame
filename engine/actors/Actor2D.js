/**
 * Represents any entity within a game with position information (e.g. camera, sprite, menu element)
 * @author
 * @version 1.0
 * @class Actor2D
 */

class Actor2D {

    //#region  Fields 
    //#endregion 

    //#region  Properties 
    get ID() {
        return this.id;
    }
    get ActorType() {
        return this.actorType;
    }
    get Transform2D() {
        return this.transform2D;
    }
    get StatusType() {
        return this.statusType;
    }

    set ID(id) {
        this.id = id;
    }
    set ActorType(actorType) {
        this.actorType = actorType;
    }
    set Transform2D(transform2D) {
        this.transform2D = transform2D;
    }
    set StatusType(statusType) {
        this.statusType = statusType;
    }
    //#endregion

    constructor(id, actorType, transform2D, statusType) {
        this.id = id;
        this.actorType = actorType;
        this.transform2D = transform2D;
        this.statusType = statusType;
        this.behaviors = [];
    }

    /**
     * Use to add a behavior instance to the array of behaviors executed for this actor.
     *
     * @param {*} behavior
     * @memberof Actor2D
     */
    AttachBehavior(behavior) {
        this.behaviors.push(behavior);
    }

    /**
     * Use to remove a behavior instance, by id, from the array of behaviors executed for this actor.
     *
     * @param {String} id
     * @memberof Actor2D
     */
    DetachBehaviorByID(id) {
        for (let i = 0; i < this.behaviors.length; i++) {
            if (this.behaviors[i].ID.Equals(id)) {
                this.behaviors.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Updated state information and executes attached behavior(s)
     *
     * @param {GameTime} gameTime
     * @see ObjectManager::Update()
     * @memberof Actor2D
     */
    Update(gameTime) {
        for (let i = 0; i < this.behaviors.length; i++)
            this.behaviors[i].Execute(gameTime, this);
    }

    //#region Equals, Clone, ToString 
    Equals(other) {
        if (other == null || other == undefined || !other instanceof Actor2D)
            throw 'Error: One or more objects is null, undefined, or not type ' + a.constructor.name;

        return this.id === other.ID && this.actorType === other.ActorType && this.transform2D.Equals(other.Transform2D);
    }

    static Equals(a, b) {
        if (a == null || a == undefined || !a instanceof Actor2D)
            throw 'Error: One or more objects is null, undefined, or not type ' + this.constructor.name;

        return a.Equals(b);
    }

    Clone() {

        //make a clone of the actor
        let clone = new Actor2D("clone - " + this.id, this.actorType, this.transform2D.Clone(), this.statusType);

        //now clone all the actors attached behaviors
        for (let behavior of this.behaviors)
            clone.AttachBehavior(behavior.Clone());

        //lastly return the actor
        return clone;
    }

    ToString() {
        return "[" + this.id + "," + this.actorType + "," + this.transform2D.ToString() + "]";
    }
    //#endregion

}