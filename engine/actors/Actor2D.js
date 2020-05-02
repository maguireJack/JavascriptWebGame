/**
 * Represents any entity within a game with position information (e.g. camera, sprite, menu element)
 * This class contains a collisionPrimitive object which stores either a rect or circle collision primitive type.
 * This means that we can choose which primitive best suits the shape or CD/CR requirements for the actor it will be used with.
 *
 * @author niall mcguinness
 * @version 1.1
 * @class Actor2D
 */

class Actor2D {
  //#region Fields
  collisionPrimitive;
  //#endregion

  //#region  Properties
  get ID() {
    return this.id;
  }
  get CollisionType() {
    return this.collisionType;
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
  get CollisionPrimitive() {
    return this.collisionPrimitive;
  }
  set ID(id) {
    this.id = id;
  }
  set CollisionType(collisionType) {
    this.collisionType = collisionType;
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
  set CollisionPrimitive(collisionPrimitive) {
    this.collisionPrimitive = collisionPrimitive;
  }
  //#endregion

  constructor(id, actorType, collisionType, transform2D, statusType) {
    this.id = id;
    this.actorType = actorType;
    this.collisionType = collisionType;
    this.transform2D = transform2D;
    this.statusType = statusType;
  }

  /**
   * Use to add a behavior instance to the array of behaviors executed for this actor.
   *
   * @param {*} behavior
   * @memberof Actor2D
   */
  AttachBehavior(behavior) {
    if(this.behaviors == undefined)
      this.behaviors = [];

    this.behaviors.push(behavior);
  }

  /**
   * Use to remove a behavior instance, by id, from the array of behaviors executed for this actor.
   *
   * @param {string} id
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
   * Updates state information and executes attached behavior(s)
   *
   * @param {GameTime} gameTime
   * @see ObjectManager::Update()
   * @memberof Actor2D
   */
  Update(gameTime) {
    if(this.behaviors != undefined)
    {
      for (let i = 0; i < this.behaviors.length; i++)
        this.behaviors[i].Execute(gameTime, this);
    }
  }

  //#region Equals, Clone, ToString
  Equals(other) {

    return GDUtility.IsSameTypeAsTarget(this, other) && (
      this.id === other.ID &&
      this.actorType === other.ActorType &&
      this.collisionType === other.CollisionType &&
      this.transform2D.Equals(other.Transform2D)
    );
  }

  Clone() {
    //make a clone of the actor
    let clone = new Actor2D(
      "clone - " + this.id,
      this.actorType,
      this.collisionType,
      this.transform2D.Clone(),
      this.statusType
    );

    //now clone all the actors attached behaviors
    for (let behavior of this.behaviors) clone.AttachBehavior(behavior.Clone());

    //lastly return the actor
    return clone;
  }

  ToString() {
    return (
      "[" +
      this.id +
      "," +
      this.actorType +
      "," +
      this.collisionType +
      "," +
      this.transform2D.ToString() +
      "]"
    );
  }
  //#endregion
}