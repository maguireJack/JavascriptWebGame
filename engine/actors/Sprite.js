/**
 * Represents any drawn non-player or non-player character entity within a game with position information (e.g. pickup, obstacle, UI element)
 * @author niall mcguinness
 * @version 1.0
 * @class Sprite
 */

class Sprite extends Actor2D {
  //#region  Fields
  //#endregion

  //#region  Properties
  get Artist() {
    return this.artist;
  }
  set Artist(artist) {
    this.artist = artist;
  }
  get ScrollSpeedMultiplier() {
    return this.scrollSpeedMultiplier;
  }
  set ScrollSpeedMultiplier(scrollSpeedMultiplier) {
    this.scrollSpeedMultiplier = (scrollSpeedMultiplier > 0 && scrollSpeedMultiplier <= 1) ? scrollSpeedMultiplier : 1;
  }
  get LayerDepth() {
    return this.layerDepth;
  }
  set LayerDepth(layerDepth) {
    this.layerDepth = (layerDepth >= 0 && layerDepth <= 1) ? layerDepth : 1;
  }
  //#endregion


  constructor(
    id,
    actorType,
    collisionType,
    transform2D,
    artist,
    statusType,
    scrollSpeedMultiplier=1,
    layerDepth=1
  ) {
    super(id, actorType, collisionType, transform2D, statusType);
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
  Update(gameTime) {

    //if we have an attached artist and we are supposed to update the sprite then update the artist
    if (this.artist != null && (this.statusType & StatusType.IsUpdated) != 0) {
      this.artist.Update(gameTime, this);

      //call Actor2D::Update() to update any attached behaviors
      super.Update(gameTime);
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
    if (this.artist != null && (this.statusType & StatusType.IsDrawn) != 0)
      this.artist.Draw(gameTime, this, activeCamera);
  }

  /**
   * Allows the sprite to be transformed (i.e. translation, rotation, scale) based on its transform values.
   * 
   * @param {context} context
   * @see SpriteArtist::Draw()
   * @memberof Sprite
   */
  SetContext(context) {
    //Mo -> SRoT -> -Mo
    context.translate(this.transform2D.translation.x, this.transform2D.translation.y);
    context.scale(this.transform2D.scale.x, this.transform2D.scale.y);
    context.rotate(this.transform2D.rotationInRadians);
    context.translate(-this.transform2D.translation.x, -this.transform2D.translation.y);
  }

  //#region Equals, Clone, ToString
  Equals(other) {
    if (other == null || other == undefined || !other instanceof Sprite)
      throw "Error: One or more objects is null, undefined, or not type " + this.constructor.name;

    //both point to the same object in RAM i.e. a shallow copy
    if (this == other) return true;

    return (
      this.id === other.ID &&
      this.actorType === other.ActorType &&
      this.collisionType === other.CollisionType &&
      this.transform2D.Equals(other.Transform2D) &&
      this.artist.Equals(other.Artist)
    );
  }

  Clone() {
    //make a clone of the actor
    let clone = new Sprite(
      "clone - " + this.id,
      this.actorType,
      this.collisionType,
      this.transform2D.Clone(),
      this.artist.Clone(),
      this.statusType
    );

    //now clone all the actors attached behaviors
    if(this.behaviors != null)
    {
      for (let behavior of this.behaviors) 
        clone.AttachBehavior(behavior.Clone());
    }

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