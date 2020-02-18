/**
 * Represents a 2D vector within our game engine.
 * @author
 * @version 1.0
 * @class Vector2
 */
class Vector2 {

    /************************************************************ MEMBER METHODS ************************************************************/
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isDirty = true;
    }

    static get Zero() {
        return new Vector2(0, 0);
    }
    static get One() {
        return new Vector2(1, 1);
    }
    static get UnitX() {
        return new Vector2(1, 0);
    }
    static get UnitY() {
        return new Vector2(0, 1);
    }

    get X() {
        return this.x;
    }
    get Y() {
        return this.y;
    }

    set X(x) {
        this.x = x;
        this.isDirty = true;
    }
    set Y(y) {
        this.y = y;
        this.isDirty = true;
    }

    Add(other) {
        this.x += other.X;
        this.y += other.Y;
    }

    Subtract(other) {
        this.x -= other.X;
        this.y -= other.Y;
    }

    Multiply(other) {
        this.x *= other.X;
        this.y *= other.Y;
    }

    MultiplyScalar(s) {
        this.x *= s;
        this.y *= s;
    }

    Normalize() {
        this.x /= this.length;
        this.y /= this.length;
    }

    Dot(other) {
        return this.x * other.X + this.Y * other.Y;
    }

    Length() {
        if (this.isDirty) {
            this.length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); //PYTHAGORAS
            this.isDirty = false;
        }

        return this.length;
    }

    AngleInRadiansBetween(other) {
        return Math.acos(this.Dot(other) / (this.Length() * other.Length()));
    }

    Equals(other) {
        if (other == null || other == undefined)
            return false;

        if (other instanceof Vector2) {
            return this.x == other.X && this.y == other.Y;
        }

        return false;
    }

    Clone() {
        return new Vector2(this.x, this.y);
    }

    ToString() {
        return "[" + this.x + "," + this.y + "]";
    }

    /************************************************************ STATIC METHODS ************************************************************/
    static Add(v1, v2) {
        return new Vector2(v1.X + v2.X, v2.Y + v2.Y);
    }

    static Subtract(v1, v2) {
        return new Vector2(v1.X - v2.X, v2.Y - v2.Y);
    }

    
    static Multiply(a, b) {
        return new Vector2(a.X * b.X, a.Y * b.Y);
    }

    static MultiplyScalar(v, s) {
        return new Vector2(v.X * s, v.Y * s);
    }

    static Normalize(v) {
        var length = v.Length();
        v.X /= length;
        v.Y /= length;
        return v;
    }


}