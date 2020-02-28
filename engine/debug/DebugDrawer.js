/**
 * This component allows us to draw debug information to the screen (e.g. sprite and camera bounding boxes, fps etc)
 * @author NMCG
 * @version 1.0
 * @class DebugDrawer
 */

class DebugDrawer {
  //#region Fields
  id = "";
  static SPRITE_BOUNDING_BOX_COLOR = "red";
  static CAMERA_BOUNDING_BOX_COLOR  = "blue"
  //#endregion

  //#region Properties
  //#endregion

  constructor(id, context, objectManager, cameraManager) {
    this.id = id;
    this.context = context;
    this.objectManager = objectManager;
    this.cameraManager = cameraManager;
  }

  //#region Draw, Update
  Update(gameTime) {
    //does nothing here yet...
  }

  Draw(gameTime) {

    //draw the bounfing boxes for the in-view (i.e. inside the bounding box of the active camera) sprites
    let drawCount = this.DrawCollidableSpriteBoundingBoxes(DebugDrawer.SPRITE_BOUNDING_BOX_COLOR);
   
    //draws the collision surface (i.e. Transform2D.BoundingBox) around the active camera
    this.DrawActiveCameraBoundingBoxes(DebugDrawer.CAMERA_BOUNDING_BOX_COLOR);

    //draws any additional information to screen
    this.DrawDebugText(gameTime, drawCount);
  }

  DrawDebugText(gameTime, drawCount) {
    console.log("Sprites inside camera bounding box: " + drawCount);
    console.log("Active Camera: " + this.cameraManager.ActiveCamera.ActorType);
  }

  DrawActiveCameraBoundingBoxes(boundingBoxColor) {
    this.DrawBoundingBox(this.cameraManager.ActiveCamera.Transform2D, boundingBoxColor);
  }

  DrawCollidableSpriteBoundingBoxes(boundingBoxColor) {
    let drawCount = 0;
    let sprites = this.objectManager.Sprites;
    //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
    for (let key of Object.keys(sprites)) {
      //for the sprites inside the array for the current key call update
      for (let sprite of sprites[key]) {
        if (sprite.Transform2D.BoundingBox.Intersects(this.cameraManager.ActiveCamera.Transform2D.BoundingBox) &&
          sprite.CollisionType === CollisionType.Collidable) {
          drawCount++;
          this.DrawBoundingBox(sprite.Transform2D, boundingBoxColor);
        }
      }
    }
    return drawCount;
  }

  SetContext(activeCamera) {
    let cameraTransform = activeCamera.Transform2D;
    this.context.translate(cameraTransform.Origin.X, cameraTransform.Origin.Y);
    this.context.scale(cameraTransform.Scale.X, cameraTransform.Scale.Y);
    this.context.rotate(cameraTransform.RotationInRadians);
    this.context.translate(
      -cameraTransform.Origin.X,
      -cameraTransform.Origin.Y
    );
    this.context.translate(
      -cameraTransform.Translation.X,
      -cameraTransform.Translation.Y
    );
    this.context.globalAlpha = 1;
  }
  //#endregion

  //#region Debug
  DrawBoundingBox(transform, color) {
    this.context.save();
    this.SetContext(this.cameraManager.ActiveCamera);
    this.context.lineWidth = 2;
    this.context.strokeStyle = color;
    this.context.strokeRect(
      transform.BoundingBox.X,
      transform.BoundingBox.Y,
      transform.BoundingBox.Width,
      transform.BoundingBox.Height
    );
    this.context.restore();
  }
  //#endregion
}