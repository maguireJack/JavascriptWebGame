/**
 * Represents a 2D rectangle (x, y, width, height) which is typically used for collision detection/collision response.
 * @author
 * @version 1.0
 * @class Rect
 */

class Rect {
  //#region Fields
  //#endregion

  //#region Properties
  static get Zero() {
    return new Rect(0, 0, 1, 1);
  }
  get X() {
    return this.x;
  }
  get Y() {
    return this.y;
  }
  get Width() {
    return this.width;
  }
  get Height() {
    return this.height;
  }

  get Center() {
    return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
  }

  set X(x) {
    this.x = x;
  }
  set Y(y) {
    this.y = y;
  }
  set Width(width) {
    this.width = width;
  }
  set Height(height) {
    this.height = height;
  }
  //#endregion

  constructor(x, y, width, height) {
    this.x = this.originalX = x;
    this.y = this.originalY = y;
    this.width = this.originalWidth = width;
    this.height = this.originalHeight = height;

    this.originalWidth = width;
    this.originalHeight = height;
  }

  Move(vector) {
    this.x += vector.X;
    this.y += vector.Y;
  }

  Transform(transform2D) {
    this.x = transform2D.Translation.X;
    this.y = transform2D.Translation.Y;
    console.log(this.originalWidth + "," + transform2D.Scale.X + "," + transform2D.Dimensions.X);
    this.width = this.originalWidth * transform2D.Scale.X * transform2D.Dimensions.X;
    console.log("\t" + this.originalHeight + "," + transform2D.Scale.Y + "," + transform2D.Dimensions.Y);
    this.height = this.originalHeight * transform2D.Scale.Y * transform2D.Dimensions.Y;


}

  Explode(explodeBy) {
    if (explodeBy % 2 == 1)
      throw new "Error: Explode value must be an even number since we explode (i.e. expand or contract) the rectangle evenly on all sides"();

    let explodeHalf = explodeBy / 2;

    //make wider and taller and move (x,y) up and left based on +ve explodeBy value
    this.x -= explodeHalf;
    this.y -= explodeHalf;
    this.width += explodeBy;
    this.height += explodeBy;

    if (this.width < 0 || this.height < 0)
      throw "Error: Rectangle cannot have negative width or height";
  }

  //#region Collision Detection
  Contains(other) {
    let enclosingRect = this.GetEnclosingRect(other);
    return (
      enclosingRect.Width == Math.max(this.width, other.Width) &&
      enclosingRect.Height == Math.max(this.height, other.Height)
    );
  }

  Intersects(other) {
    let enclosingRect = this.GetEnclosingRect(other);
    return (
      enclosingRect.Width <= this.width + other.Width &&
      enclosingRect.Height <= this.height + other.Height
    );
  }

  /**
   * Returns true if this Rect is directly on top of the other - used for platform tests - see Snailbait/PlayerMoveBehavior::ExecuteFall()
   * @param {Rect} other
   */
  IsOnTop(other) {
    return (
      this.x + this.width > other.x &&
      this.x < other.x + other.width &&
      this.y + this.height <= other.y
    );
  }

  GetEnclosingRect(other) {
    if (other == null || other == undefined || !other instanceof Rect)
      throw "Error: One or more objects is null, undefined, or not type " +
        this.constructor.name;

    let minX = Math.min(this.x, other.X);
    let minY = Math.min(this.y, other.Y);

    let width = Math.max(this.x + this.Width, other.X + other.Width) - minX;
    let height = Math.max(this.y + this.Height, other.Y + other.Height) - minY;

    return new Rect(minX, minY, width, height);
  }
  //#endregion

  //#region Equals, Clone, ToString
  Equals(other) {
    //if we get here then we have two valid (i.e. non-null, defined, correct type) and distinct (i.e. separate RAM) objects that we need to test
    return GDUtility.IsSameTypeAsTarget(this, other) && (
      this.x === other.X &&
      this.y === other.Y &&
      this.width === other.Width &&
      this.height === other.Height
    );
  }

  Clone() {
    //shallow copy if we simply return this
    //return this;

    //if we see 'new' then we are making a DISTINCT object in RAM i.e. deep copy
    return new Rect(this.x, this.y, this.width, this.height);
  }

  ToString() {
    return (
      "[" + this.x + "," + this.y + "," + this.width + "," + this.height + "]"
    );
  }
  //#endregion

  //#region Static Methods
  static Contains(a, b) {
    if (a == null || a == undefined || !a instanceof Rect)
      throw "Error: One or more objects is null, undefined, or not type " +
        a.constructor.name;

    return a.Contains(b);
  }

  static Intersects(a, b) {
    if (a == null || a == undefined || !a instanceof Rect)
      throw "Error: One or more objects is null, undefined, or not type " +
        a.constructor.name;

    return a.Intersects(b);
  }

  static GetEnclosingRect(a, b) {
    if (a == null || a == undefined || !a instanceof Rect)
      throw "Error: One or more objects is null, undefined, or not type " +
        a.constructor.name;

    return a.GetEnclosingRect(b);
  }

  static Explode(rect, explodeBy) {
    let clone = rect.Clone();
    clone.Explode(explodeBy);
    return clone;
  }

  static Move(rect, vector) {
    let clone = rect.Clone();
    clone.Move(vector);
    return clone;
  }

  static Transform(rect, transform2D) {
    let clone = rect.Clone();
    clone.Transform(transform2D);
    return clone;
  }

  static Round(r, precision){
    return new Rect(GDMath.ToFixed(r.x, precision, 10), GDMath.ToFixed(r.y, precision, 10), 
    GDMath.ToFixed(r.width, precision, 10), GDMath.ToFixed(r.height, precision, 10));
  }
  //#endregion
}
