/**
 * Represents a 2D vector within our game engine.
 * @author
 * @version 1.0
 * @class Vector2
 */
class Vector2 {
  //#region Fields
  //#endregion

  //#region Properties
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
  //#endregion

  constructor(x, y) {
    this.x = x;
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

  Divide(other) {
    this.x /= other.X;
    this.y /= other.Y;
  }

  DivideScalar(s) {
    this.x /= s;
    this.y /= s;
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

  Distance(other) {
    if (other == null || other == undefined || !other instanceof Vector2)
      throw "Error: One or more objects is null, undefined, or not type " +
        this.constructor.name;

    return Math.sqrt(
      Math.pow(this.x - other.X, 2) + Math.pow(this.y - other.Y, 2)
    );
  }

  Abs() {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
  }

  Transform(m){
    this.x = this.x * m.a11 + this.y * m.a21 + m.a31;
    this.y = this.x * m.a12 + this.y * m.a22 + m.a32;
  }

  //#region Equals, Clone, ToString
  Equals(other) {
    return GDUtility.IsSameTypeAsTarget(this, other) && this.x === other.X && this.y === other.Y;
  }

  Clone() {
    return new Vector2(this.x, this.y);
  }

  ToString() {
    return "[" + this.x + "," + this.y + "]";
  }
  //#endregion

  //#region Static Methods
  static Add(v1, v2) {
    return new Vector2(v1.X + v2.X, v2.Y + v2.Y);
  }

  static Subtract(v1, v2) {
    return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
  }

  static Multiply(a, b) {
    return new Vector2(a.X * b.X, a.Y * b.Y);
  }

  static MultiplyScalar(v, s) {
    return new Vector2(v.X * s, v.Y * s);
  }

  static Divide(a, b) {
    return new Vector2(a.X / b.X, a.Y / b.Y);
  }

  static DivideScalar(v, s) {
    return new Vector2(v.X / s, v.Y / s);
  }

  static Normalize(v) {
    var length = v.Length();
    return new Vector2(v.X / length, v.Y / length);
  }

  static Distance(a, b) {
    return a.Distance(b);
  }

  static Abs(a) {
    return new Vector2(Math.abs(this.x), Math.abs(this.y));
  }

  static Transform(v, m){
    let x = v.x * m.a11 + v.y * m.a21;
    let y = v.x * m.a12 + v.y * m.a22;
    return new Vector2(x, y);
  }


  static Round(v, precision){
    return new Vector2(GDMath.ToFixed(v.x, precision, 10), GDMath.ToFixed(v.y, precision, 10));
  }

  //#endregion
}