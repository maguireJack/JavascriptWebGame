/**
 * This is the base class for your own games implementation of ObjectManager e.g. MyObjectManager. An ObjectManager
 * is responsible for storing, updating, and drawing all the sprites within the game.
 * @author
 * @version 1.0
 * @class ObjectManager
 */

class ObjectManager {

    //#region Fields
    id = "";
    context;
    debugEnabled = false;
    //#endregion

    //#region Properties
    get StatusType() {
        return this.statusType;
    }
    get DebugEnabled() {
        return this.debugEnabled;
    }
    //#endregion

    constructor(id, statusType, canvas, context, cameraManager, debugEnabled = false) {
        this.id = id;
        this.statusType = statusType;
        this.canvas = canvas;
        this.context = context;
        this.cameraManager = cameraManager;
        this.debugEnabled = debugEnabled;
    }

    Update(gameTime) {

    }

    Draw(gameTime) {

    }

    ApplyCamera(activeCamera)
    {
        let cameraTransform = activeCamera.Transform2D;
        this.context.translate(cameraTransform.Origin.X, cameraTransform.Origin.Y);
        this.context.scale(cameraTransform.Scale.X, cameraTransform.Scale.Y);
        this.context.rotate(cameraTransform.RotationInRadians);
        this.context.translate(-cameraTransform.Origin.X, -cameraTransform.Origin.Y);
        this.context.translate(-cameraTransform.Translation.X, -cameraTransform.Translation.Y);
    }

    DrawDebugBoundingBox(color, parent) {
        this.context.save();
        this.ApplyCamera(this.cameraManager.ActiveCamera);
        let transform = parent.Transform2D;
        this.context.lineWidth = 2;
        this.context.strokeStyle = color;
        this.context.globalAlpha = 1;
        this.context.strokeRect(transform.BoundingBox.X, transform.BoundingBox.Y, transform.BoundingBox.Width, transform.BoundingBox.Height);
        this.context.restore();
    }
}