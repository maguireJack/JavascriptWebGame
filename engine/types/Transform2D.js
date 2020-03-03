/**
 * Stores all the transformations applied to a 2D element (e.g. a sprite, a menu button, a Camera2D)
 * @author
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
  get BoundingBox() {
    if (this.isDirty) {
      //make a new Rect at (0,0,1,1) and apply this transform to it
      this.boundingBox = Rect.Zero;
      this.boundingBox.Transform(this);
      //this allows us to make bounding box smaller than the sprite drawn on screen
      if (this.explodeBoundingBoxInPixels != 0)
        this.boundingBox.Explode(this.explodeBoundingBoxInPixels);
      //set flag to false until translation, rotation, scale, origin, or dimensions change again
      this.isDirty = false;
    }
    return this.boundingBox;
  }
  get BoundingBoxCenter() {
    return this.boundingBox.Center;
  }
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
  get Dimensions() {
    return this.dimensions;
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
  set Translation(translation) {
    this.translation = translation;
    this.isDirty = true;
  }
  set RotationInRadians(rotationInRadians) {
    this.rotationInRadians = rotationInRadians;
    this.isDirty = true;
  }
  set Scale(scale) {
    this.scale = scale;
    this.isDirty = true;
  }
  set Origin(origin) {
    this.origin = origin;
    this.isDirty = true;
  }
  set Dimensions(dimensions) {
    this.dimensions = dimensions;
    this.isDirty = true;
  }
  //#endregion

  constructor(
    translation,
    rotationInRadians,
    scale,
    origin,
    dimensions,
    explodeBoundingBoxInPixels = 0
  ) {
    this.translation = translation;
    this.rotationInRadians = rotationInRadians;
    this.scale = scale;
    this.origin = origin;
    this.dimensions = dimensions;
    this.explodeBoundingBoxInPixels = explodeBoundingBoxInPixels;
    //indicates that the values of this Transform2D object have been updated
    this.isDirty = true;

    //store original values for Reset()
    this.originalTranslation = translation.Clone(); //Why do we need to call Clone() on the Vector2 types? Hint: Shallow vs Deep.
    this.originalRotationInRadians = rotationInRadians;
    this.originalScale = scale.Clone();
    this.originalOrigin = origin.Clone();
    this.originalDimensions = dimensions.Clone();
    this.explodeBoundingBoxInPixels = explodeBoundingBoxInPixels;
  }

  Reset() {
    this.translation = this.originalTranslation.Clone();
    this.rotationInRadians = this.originalRotationInRadians;
    this.scale = this.originalScale.Clone();
    this.origin = this.originalOrigin.Clone();
    this.dimensions = this.originalDimensions.Clone();
    this.isDirty = true;
  }

  SetTranslation(translation) {
    this.translation = translation;
    this.isDirty = true;
  }

  SetTranslationX(x) {
    this.translation.X = x;
    this.isDirty = true;
  }

  SetTranslationY(y) {
    this.translation.Y = y;
    this.isDirty = true;
  }

  TranslateBy(translateBy) {
    this.translation.Add(translateBy);
    this.isDirty = true;
  }

  SetRotationInRadians(rotationInRadians) {
    this.rotationInRadians = rotationInRadians;
    this.isDirty = true;
  }

  RotateBy(rotationInRadiansBy) {
    this.rotationInRadians += rotationInRadiansBy;
    this.isDirty = true;
  }

  SetScale(scale) {
    this.scale = scale;
    this.isDirty = true;
  }

  ScaleBy(scaleBy) {
    this.scale.Add(scaleBy);

    //comment these statements in if you want to stop the scale becoming negative
    // if(this.scale.X <= 0 || this.scale.Y <= 0)
    //     this.scale = this.originalScale.Clone();

    this.isDirty = true;
  }

  //#region Equals, Clone, ToString
  Equals(other) {
    return GDUtility.IsSameTypeAsTarget(this, other) && (
      this.translation.Equals(other.Translation) &&
      this.rotationInRadians === other.RotationInRadians &&
      this.scale.Equals(other.Scale) &&
      this.origin.Equals(other.Origin) &&
      this.dimensions.Equals(other.Dimensions)
    );
  }

  Clone() {
    return new Transform2D(
      this.translation.Clone(),
      this.rotationInRadians,
      this.scale.Clone(),
      this.origin.Clone(),
      this.dimensions.Clone(),
      this.explodeBoundingBoxInPixels
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
      "]"
    );
  }
  //#endregion
}
