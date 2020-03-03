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
  static CAMERA_BOUNDING_BOX_COLOR  = "yellow";
  static DEBUG_TEXT_FONT = "8px Comic Sans MS";
  static DEBUD_TEXT_MAXWIDTH = 200;

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
    let x = 10, y = 10;
    let yOffset = 10;

    this.DrawText("Debug Info", x, y + yOffset, "white");
    this.DrawText("--------------------------", x, y + 2 * yOffset,  "white");
    this.DrawText("Draw Count:" + drawCount, x, y + 3 * yOffset, "white");
    this.DrawText("FPS:" + gameTime.FPS + " ms", x, y + 4 * yOffset,  "white");
  }

  DrawText(text, x, y, color){
    this.context.save();

    //uncomment this line and see what happens to the debug text when you move camera using numpad 4 - 6
    //this.SetContext(this.cameraManager.ActiveCamera);

    this.context.font = DebugDrawer.DEBUG_TEXT_FONT;
    this.context.fillStyle = color; 
    this.context.textBaseline = "top";
    this.context.globalAlpha = DebugDrawer.DEBUG_TEXT_ALPHA;
    this.context.fillText(text, x, y, DebugDrawer.DEBUG_TEXT_MAXWIDTH);
    this.context.restore();
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
  //#endregion

  //#region Debug
  DrawBoundingBox(transform, color) {
    this.context.save();
    this.cameraManager.ActiveCamera.SetContext(this.context);
    this.context.globalAlpha = 1;
    this.context.lineWidth = 2;
    this.context.strokeStyle = color;
    let bb = transform.BoundingBox;
    this.context.strokeRect(
      bb.X,
      bb.Y,
      bb.Width,
      bb.Height
    );
    this.context.restore();
  }
  //#endregion
}