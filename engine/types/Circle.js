/**
 * Represents a 2D circle (center, radius) which is typically used for collision detection/collision response.
 * @author niall mcguinness
 * @version 1.0
 * @class Circle
 */

class Circle {
    //#region Fields
    //#endregion

    //#region Statics
    static get One() {
        return new Cicrle(0, 0, 1);
    }
    static get Zero() {
        return new Cicrle(0, 0, 0);
    }
    //#endregion

    //#region Properties
    get Center() {
        return this.center;
    }
    get Radius() {
        return this.radius;
    }
    set Center(center) {
        this.center = center;
    }
    set Radius(radius) {
        this.radius = radius;
    }
    //#endregion

    constructor(center, radius) {
        this.center = center;
        this.originalCenter = center.Clone(); //since center is an object (Vector2) we need to formally Clone to make deep copy
        this.radius = this.originalRadius = radius;
    }

    Reset(){
        this.center = this.originalCenter.Clone();
        this.radius = this.originalRadius;
    }

    Move(vector) {
        this.center.x += vector.X;
        this.center.y += vector.Y;
    }

    Move(x, y) {
        this.center.x += x;
        this.center.y += y;
    }

   /**
   *  Used to re-position or re-dimension the Circle object based on the translation, scale, and dimensions provided in the Transform2D
   *  This method will most often be used to re-calculate the position of the bounding circle for a sprite that is being transformed (e.g. translate, scale, dimension).
   *  Note that the benefit of a bounding circle is that it is invariant to rotation, unlike a bounding rectangle.
   *
   * @param {*} transform2D
   * @memberof Circle
   * @see RectCollisionPrimitive
   * @see CircleCollisionPrimitive
   * @see Rect:Transform()
   */
    Transform(transform2D) {
        this.radius = Math.round(this.originalRadius * transform2D.scale.Length() * transform2D.dimensions.x);
        this.center.x = transform2D.origin.x;
        this.center.y = transform2D.origin.y;
    }

    Explode(explodeBy) {
        if (this.radius + explodeBy < 0)
            throw "Error: Circle cannot have negative radius";

        this.radius += explodeBy;
    }

    //#region Collision Detection
    //c1.Contains(c2);
    Contains(other) {
        let max = Math.max(this.radius, other.radius);
        let min = Math.min(this.radius, other.radius);
        return Vector2.Distance(this.center, other.center) + min < max;
    }

    Intersects(other) {
        return (Vector2.Distance(this.center, other.center) < this.radius + other.radius);
    }
    //#endregion

    //#region Equals, Clone, ToString
    Equals(other) {
        //if we get here then we have two valid (i.e. non-null, defined, correct type) and distinct (i.e. separate RAM) objects that we need to test
        return GDUtility.IsSameTypeAsTarget(this, other) && (
            this.center.Equals(other.center) && this.radius === other.radius);
    }

    Clone() {
        //if we see 'new' then we are making a DISTINCT object in RAM i.e. deep copy
        return new Circle(new Vector2(this.center.x, this.center.y), this.radius);
    }

//    Clone() {
        //if we see 'new' then we are making a DISTINCT object in RAM i.e. deep copy
//        return new Circle(this.center.Clone(), this.radius);
//    }

    ToString() {
        return ("[" + this.center.ToString() + "," + this.radius + "]");
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

    static Explode(circle, explodeBy) {
        let clone = circle.Clone();
        clone.Explode(explodeBy);
        return clone;
    }

    static Transform(circle, transform2D) {
        let clone = circle.Clone();
        clone.Transform(transform2D);
        return clone;
    }
    //#endregion
}