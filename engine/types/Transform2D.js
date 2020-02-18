/**
 * Stores all the transformations applied to a 2D element (e.g. a sprite, a menu button, a Camera2D)
 * @author
 * @version 1.0
 * @class Transform2D
 */

class Transform2D {

    //#region  Fields 
    translationOffset = new Vector2(0, 0);
    //#endregion 

    //#region Properties
    get BoundingBox() {
        if (this.isDirty) {
            //make a new Rect at (0,0,1,1) and apply this transform to it
            this.boundingBox = Rect.Zero;
            this.boundingBox.Transform(this);
            this.boundingBox.Move(this.translationOffset);
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

    static get Zero() {
        return new Transform2D(Vector2.Zero, 0, Vector2.One);
    }
    get Translation() {
        return this.translation;
    }
    get RotationInDegrees() {
        return this.rotationInDegrees;
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
    get TranslationOffset() {
        return this.translationOffset;
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
    set RotationInDegrees(rotationInDegrees) {
        this.rotationInDegrees = rotationInDegrees;
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

    //endregion 


    /************************************************************ MEMBER METHODS ************************************************************/
    constructor(translation, rotationInDegrees, scale, origin, dimensions, explodeBoundingBoxInPixels = 0) {
        this.translation = this.originalTranslation = translation;
        this.rotationInDegrees = this.originalRotationInDegrees = rotationInDegrees;
        this.scale = this.originalScale = scale;
        this.origin = this.originalOrigin = origin;
        this.dimensions = this.originalDimensions = dimensions;
        this.explodeBoundingBoxInPixels = explodeBoundingBoxInPixels;
        //indicates that the values of this Transform2D object have been updated
        this.isDirty = true;
    }

    /**
     * Called when we want to add/subtract a Vector2 from a sprites translation offset.
     * Remember a translation offset allows us to move a sprite on-screen without polluting the Transform2D.Translation value.
     * @param {Vector2} translation
     * @memberof Transform2D
     */
    AddToTranslationOffset(translation) {
        this.translationOffset.Add(translation);
        this.isDirty = true; //flag as dirty to upload the bounding box
    }

    /**
     * Called when we want to set the translation offset to a specific Vector2 value.
     * @param {Vector2} translation
     * @memberof Transform2D
     */
    SetTranslationOffset(translationOffset) {
        this.translationOffset = translationOffset;
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

    SetRotationInDegrees(rotationInDegrees) {
        this.rotationInDegrees = rotationInDegrees;
        this.isDirty = true;
    }

    RotateBy(rotationInDegreesBy) {
        this.rotationInDegrees += rotationInDegreesBy;
        this.isDirty = true;
    }

    SetScale(scale) {
        this.scale = scale;
        this.isDirty = true;
    }

    ScaleBy(scaleBy) {
        this.scale.Multiply(scaleBy);
        this.isDirty = true;
    }

    //#region Equals, Clone, ToString */
    Equals(other) {
        if (other == null || other == undefined || !other instanceof Transform2D)
            throw 'Error: One or more objects is null, undefined, or not type ' + this.constructor.name;

        return this.translation.Equals(other.Translation) && this.rotationInDegrees == other.RotationInDegrees &&
            this.scale.Equals(other.Scale) && this.origin.Equals(other.Origin) && this.dimensions.Equals(other.Dimensions);

    }

    Clone() {
        return new Transform2D(this.translation.Clone(), this.rotationInDegrees, this.scale.Clone(), this.origin.Clone(),
            this.dimensions.Clone(), this.explodeBoundingBoxInPixels);
    }

    ToString() {
        return "[" + this.translation.ToString() + "," + this.rotationInDegrees + "," + this.scale.ToString() + "]";
    }
    //#endregion

}