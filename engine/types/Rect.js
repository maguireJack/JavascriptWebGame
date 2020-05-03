/**
 * Represents a 2D rectangle (x, y, width, height) which is typically used for collision detection/collision response.
 * @author niall mcguinness
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
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.width = width;
    this.height = height;
    this.originalWidth = width;
    this.originalHeight = height;
  }

  Reset() {
    this.x = this.originalX;
    this.y = this.originalY;

    this.width = this.originalWidth;
    this.height = this.originalHeight;
   }


  Move(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  Move(x, y) {
    this.x += x;
    this.y += y;
  }

  /**
   *  Used to re-position or re-dimension the Rect object based on the translation, scale, and dimensions provided in the Transform2D
   *  This method will most often be used to re-calculate the position of the bounding rectangle for a sprite that is being transformed (e.g. translate, scale, dimension).
   *  Note that we do NOT take into account any rotation data provided by the Transform2D which means that we cannot rotate bounding rectangles
   *  within our simple CD/CR system in our game. It is for this reason that we created a CircleCollisionPrimitive type.
   *
   * @param {*} transform2D
   * @memberof Rect
   * @see CircleCollisionPrimitive
   * @see RectCollisionPrimitive
   * @see Circle:Transform()
   */
  Transform(transform2D) {

    this.width = this.originalWidth * transform2D.scale.x * transform2D.dimensions.x;
    this.height = this.originalHeight * transform2D.scale.y * transform2D.dimensions.y;

    this.x = transform2D.translation.x - transform2D.origin.x * transform2D.scale.x;//
    this.y = transform2D.translation.y - transform2D.origin.y * transform2D.scale.y;//
   }

  Explode(explodeBy) {
    if (explodeBy % 2 == 1)
      throw new "Error: Explode value must be an even number since we explode (i.e. expand or contract) the rectangle evenly on all sides"();
    
    if (this.width + explodeBy < 0 || this.height + explodeBy < 0)
      throw "Error: Rectangle cannot have negative width or height";

    let explodeHalf = explodeBy / 2;
    //make wider and taller and move (x,y) up and left based on +ve explodeBy value
    this.x -= explodeHalf;
    this.y -= explodeHalf;
    this.width += explodeBy;
    this.height += explodeBy;
  }

  //#region Collision Detection
  Contains(otherRect) {
    let enclosingRect = this.GetEnclosingRect(otherRect);
    return (
      enclosingRect.Width == Math.max(this.width, otherRect.Width) &&
      enclosingRect.Height == Math.max(this.height, otherRect.Height)
    );
  }

  Intersects(otherRect) {
    let enclosingRect = this.GetEnclosingRect(otherRect);
    return (
      enclosingRect.Width <= this.width + otherRect.Width &&
      enclosingRect.Height <= this.height + otherRect.Height
    );
  }

  /**
   * Returns true if this Rect is directly on top of the otherRect - used for platform tests - see Snailbait/PlayerMoveBehavior::ExecuteFall()
   * @param {Rect} otherRect
   */
  IsOnTop(otherRect) {
    return (
      this.x + this.width > otherRect.x &&
      this.x < otherRect.x + otherRect.width &&
      this.y + this.height <= otherRect.y
    );
  }

  GetEnclosingRect(otherRect) {
    if (otherRect == null || otherRect == undefined || !otherRect instanceof Rect)
      throw "Error: One or more objects is null, undefined, or not type " + this.constructor.name;

    let minX = Math.min(this.x, otherRect.x);
    let minY = Math.min(this.y, otherRect.y);

    let width = Math.max(this.x + this.width, otherRect.x + otherRect.width) - minX;
    let height = Math.max(this.y + this.height, otherRect.y + otherRect.height) - minY;

    return new Rect(minX, minY, width, height);
  }
  //#endregion

  //#region Equals, Clone, ToString
  Equals(otherRect) {
    //if we get here then we have two valid (i.e. non-null, defined, correct type) and distinct (i.e. separate RAM) objects that we need to test
    return GDUtility.IsSameTypeAsTarget(this, otherRect) && (
      this.x === otherRect.X &&
      this.y === otherRect.Y &&
      this.width === otherRect.Width &&
      this.height === otherRect.Height
    );
  }

  Clone() {
    //shallow copy if we simply return this
    //return this;

    //if we see 'new' then we are making a DISTINCT object in RAM i.e. deep copy
    return new Rect(this.x, this.y, this.width, this.height);
  }

  ToString() {
    return ("[" + this.x + "," + this.y + "," + this.width + "," + this.height + "]");
  }
  //#endregion

  //#region Static Methods
  static Contains(rect1, rect2) {
    if (rect1 == null || rect1 == undefined || !rect1 instanceof Rect)
      throw "Error: One or more objects is null, undefined, or not type " +
        rect1.constructor.name;

    return rect1.Contains(rect2);
  }

  static Intersects(rect1, rect2) {
    if (rect1 == null || rect1 == undefined || !rect1 instanceof Rect)
      throw "Error: One or more objects is null, undefined, or not type " +
        rect1.constructor.name;

    return rect1.Intersects(rect2);
  }

  static GetEnclosingRect(rect1, rect2) {
    if (rect1 == null || rect1 == undefined || !rect1 instanceof Rect)
      throw "Error: One or more objects is null, undefined, or not type " +
        rect1.constructor.name;

    return rect1.GetEnclosingRect(rect2);
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

  static Round(rect, precision) {
    return new Rect(GDMath.ToFixed(rect.x, precision, 10), GDMath.ToFixed(rect.y, precision, 10),
      GDMath.ToFixed(rect.width, precision, 10), GDMath.ToFixed(rect.height, precision, 10));
  }
  //#endregion
}