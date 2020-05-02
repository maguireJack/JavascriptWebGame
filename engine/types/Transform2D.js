/**
 * Stores all the transformations applied to a 2D element (e.g. a sprite, a menu button, a Camera2D)
 * @author niall mcguinness
 * @version 1.0
 * @class Transform2D
 */

class Transform2D {
  //#region Fields
  //#endregion

  //#region Statics
  static get Zero() {
    return new Transform2D(
      Vector2.Zero,
      0,
      Vector2.Zero,
      Vector2.Zero,
      Vector2.Zero,
      0
    );
  }
  //#endregion

  //#region Properties
  get Translation() {
    return this.translation;
  }
  get RotationInRadians() {
    return this.rotationInRadians;
  }
  get Scale() {
    return this.scale;
  }
  get Origin() {
    return this.origin;
  }
  get TranslationIncrement() {
    return this.translationIncrement;
  }
  get RotationIncrement() {
    return this.rotationIncrement;
  }
  get ScaleIncrement() {
    return this.scaleIncrement;
  }
  get Dimensions() {
    return this.dimensions;
  }
  set Dimensions(dimensions) {
    this.dimensions = dimensions.Clone();
    this.isDirty = true;
  }
  set Translation(translation) {
    this.translation = translation.Clone();
    this.isDirty = true;
  }
  set RotationInRadians(rotationInRadians) {
    this.rotationInRadians = rotationInRadians;
    this.isDirty = true;
  }
  set Scale(scale) {
    this.scale = scale.Clone();
    this.isDirty = true;
  }
  set Origin(origin) {
    this.origin = origin.Clone();
    this.isDirty = true;
  }
  get IsDirty() {
    return this.isDirty;
  }
  set IsDirty(isDirty) {
    this.isDirty = isDirty;
  }
  //#endregion

  /**
   * Creates an instance of Transform2D.
   * 
   * @param {Vector2} translation Vector2 with the position of the sprite on the screen
   * @param {number} rotationInRadians Floating-point angle in radians to rotate the sprite (+ve = CW, -ve=CCW)
   * @param {Vector2} scale Vector2 with the scale of the sprite on the screen
   * @param {Vector2} origin Vector2 with the centre of rotation for the sprite
   * @param {Vector2} dimensions Vector2 with the original dimensions of the sprite taken from the image file
   * @memberof Transform2D
   */
  constructor(
    translation,
    rotationInRadians,
    scale,
    origin,
    dimensions
  ) {
    this.translation = translation;
    this.rotationInRadians = rotationInRadians;
    this.scale = scale;
    this.origin = origin;
    this.dimensions = dimensions;

    //store original values for Reset()
    this.originalTranslation = translation.Clone(); //Why do we need to call Clone() on the Vector2 types? Hint: Shallow vs Deep.
    this.originalRotationInRadians = rotationInRadians;
    this.originalScale = scale.Clone();
    this.originalOrigin = origin.Clone();
    this.originalDimensions = dimensions.Clone();

    //indicates that the values of this Transform2D object have been updated
    this.isDirty = true;
  }

  /**
   * Resets the transform to its original values.
   * 
   * @memberof Transform2D
   */
  Reset() {
    this.translation = this.originalTranslation.Clone();
    this.rotationInRadians = this.originalRotationInRadians;
    this.scale = this.originalScale.Clone();
    this.origin = this.originalOrigin.Clone();
    this.dimensions = this.originalDimensions.Clone();
    this.isDirty = true;
  }

  //#region Methods to translation, scale, rotate and set the origin for the transform
  /**
   * Sets the translation of the sprite to a user-defined value. Sets the isDirty flag to 
   * indicate to the CollisionPrimitive that the sprite has changed a property that will 
   * affect its bounding primitive.
   *
   * @param {Vector2} translation
   * @memberof Transform2D
   */
  SetTranslation(translation) {
    this.translation = translation.Clone();
    this.isDirty = true;
  }

  /**
   * Sets the x-ordinate of the translation of the sprite to a user-defined value. Sets the isDirty flag to 
   * indicate to the CollisionPrimitive that the sprite has changed a property that will 
   * affect its bounding primitive.
   *
   * @param {number} x Integer value used to set the corresponding ordinate value of the translation.
   * @memberof Transform2D
   */
  SetTranslationX(x) {
    this.translation.x = x;
    this.isDirty = true;
  }

  /**
   * Sets the y-ordinate of the translation of the sprite to a user-defined value. Sets the isDirty flag to 
   * indicate to the CollisionPrimitive that the sprite has changed a property that will 
   * affect its bounding primitive.
   *
   * @param {number} y Integer value used to set the corresponding ordinate value of the translation.
   * @memberof Transform2D
   */
  SetTranslationY(y) {
    this.translation.y = y;
    this.isDirty = true;
  }

  /**
   * Increases/decreases the Vector2 translation of the sprite. We can use
   * this method to move the sprite on-screen. Sets the isDirty flag to indicate to the 
   * CollisionPrimitive that the sprite has changed a property that will affect its bounding primitive.
   *
   * @param {Vector2} translateBy Vector2 value used to increment/decrement the translation.
   * @memberof Transform2D
   */
  TranslateBy(translateBy) {
    this.translation.Add(translateBy);
    this.isDirty = true;
  }


  /**
   * Sets the rotation value (in radians) for the sprite.
   *
   * @param {number} rotationInRadians Floating-point rotation value in radians
   * @memberof Transform2D
   */
  SetRotationInRadians(rotationInRadians) {
    this.rotationInRadians = rotationInRadians;
    this.isDirty = true;
  }

  /**
   * Increases/decreases the rotation value (in radians) for the sprite.
   *
   * @param {number} rotationInRadians Floating-point rotation value in radians
   * @memberof Transform2D
   */
  RotateBy(rotationInRadiansBy) {
    this.rotationInRadians += rotationInRadiansBy;
    this.isDirty = true;
  }

  /**
   * Sets the scale values for the sprite.
   *
   * @param {Vector2} scale Vector2 representing the scale (x,y) values
   * @memberof Transform2D
   */
  SetScale(scale) {
    this.scale = scale.Clone();
    this.isDirty = true;
  }

  /**
   * Increases/decreases the scale values for the sprite.
   *
   * @param {Vector2} scale Vector2 representing the scale (x,y) values
   * @memberof Transform2D
   */
  ScaleBy(scaleBy) {
    this.scale.Add(scaleBy);
    this.isDirty = true;
  }

  /**
   * Sets the origin for the sprite.
   *
   * @param {Vector2} scale Vector2 representing the origin (x,y) values
   * @memberof Transform2D
   */
  SetOrigin(origin) {
    this.origin = origin.Clone();
    this.isDirty = true;
  }
  //#endregion

  //#region Equals, Clone, ToString
  Equals(other) {
    return GDUtility.IsSameTypeAsTarget(this, other) && (
      this.translation.Equals(other.translation) &&
      this.rotationInRadians === other.rotationInRadians &&
      this.scale.Equals(other.scale) &&
      this.origin.Equals(other.origin) &&
      this.dimensions.Equals(other.dimensions)
    );
  }

  Clone() {
    return new Transform2D(
      this.translation.Clone(),
      this.rotationInRadians,
      this.scale.Clone(),
      this.origin.Clone(),
      this.dimensions.Clone()
    );
  }

  ToString() {
    return (
      "[" +
      this.translation.ToString() +
      "," +
      this.rotationInRadians +
      "," +
      this.scale.ToString() +
      "," +
      this.origin.ToString() +
      "," +
      this.dimension.ToString() +
      "]"
    );
  }
  //#endregion
}