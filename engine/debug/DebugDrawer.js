/**
 * This component allows us to draw debug information to the screen (e.g. sprite and camera bounding boxes, fps etc)
 * @author niall mcguinness
 * @version 1.0
 * @class DebugDrawer
 */

//allows us to turn certain debug information off (e.g. turn text in TLH of the window off)
const DebugDrawType = Object.freeze({
  //notice that the values are all powers of 2 values. why? so that we can Bitwise-OR them together
  Off: 0,
  ShowDebugText: 1,
  ShowSpriteCollisionPrimitive: 2,
  ShowCameraBoundingBox: 4
});

class DebugDrawer {
  //#region Statics
  static BOUNDING_PRIMITIVE_COLOR = "red";
  static BOUNDING_PRIMITIVE_LINE_WIDTH = 2;
  static BOUNDING_PRIMITIVE_LINE_ALPHA = 1;

  static DEBUG_TEXT_COLOR = "white";
  static DEBUG_TEXT_FONT = "14px Arial";
  static DEBUG_TEXT_MAXWIDTH = 200;
  static DEBUG_TEXT_BASELINE = "top";
  //#endregion

  //#region Fields
  id = "";
  //#endregion

  //#region Properties
  //#endregion

  constructor(id, statusType, objectManager,
    cameraManager, notificationCenter,
    debugDrawType = DebugDrawType.ShowSpriteCollisionPrimitive 
    | DebugDrawType.ShowCameraBoundingBox | DebugDrawType.ShowDebugText) {
    this.id = id;
    this.statusType = statusType;
    this.objectManager = objectManager;
    this.cameraManager = cameraManager;
    this.notificationCenter = notificationCenter;
    this.debugDrawType = debugDrawType;
  }

  //#region Notification Handling
  //handle all GameState type events - see PlayerBehavior::HandleEnemyCollision()
  RegisterForNotifications() {
    this.notificationCenter.Register(
      NotificationType.Menu,
      this,
      this.HandleNotification
    );
  }

  HandleNotification(...argArray) {
    let notification = argArray[0];
    switch (notification.NotificationAction) {
      case NotificationAction.ShowMenuChanged:
        this.statusType = notification.NotificationArguments[0];
        break;

      default:
        break;
    }
  }
  //#endregion

  //#region Draw, Update
  Update(gameTime) {
    //does nothing here yet...
  }

  Draw(gameTime) {
    if ((this.statusType & StatusType.IsDrawn) != 0) {
      let drawCount = 0;

      for (let i = 0; i < this.cameraManager.Cameras.length; i++) {
        let activeCamera = this.cameraManager.Cameras[i];

        //draw the bounding boxes for the in-view (i.e. inside the bounding box of the active camera) sprites
        if ((this.debugDrawType & DebugDrawType.ShowSpriteCollisionPrimitive) != 0)
          drawCount = this.DrawCollisionPrimitives(activeCamera);

        //draws the collision surface (i.e. Transform2D.BoundingBox) around the active camera
        if ((this.debugDrawType & DebugDrawType.ShowCameraBoundingBox) != 0)
          this.DrawCameraCollisionPrimitive(activeCamera, activeCamera.collisionPrimitive)

        //draws any additional information to screen
        if ((this.debugDrawType & DebugDrawType.ShowDebugText) != 0)
          this.DrawDebugText(gameTime, activeCamera, drawCount);
      }
    }
  }

  SetContext(context, transform) {
    context.translate(transform.translation.x, transform.translation.y);
    context.scale(transform.scale.x, transform.scale.y);
    context.rotate(transform.rotationInRadians);
    context.translate(-transform.translation.x, -transform.translation.y);
  }

  DrawCollisionPrimitives(activeCamera) {
    let sprites = this.objectManager.Sprites;
    let drawCount = 0;
    //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
    for (let key of Object.keys(sprites)) {
      //for the sprites inside the array for the current key call update
      for (let sprite of sprites[key]) {
        if (sprite.CollisionType === CollisionType.Collidable) //is it collidable?
        {
          if (Collision.Intersects(sprite, activeCamera)) {
            this.DrawSpriteCollisionPrimitive(activeCamera, sprite.collisionPrimitive); //draw its bounding box
            drawCount++;
          }
        }
      }
    }
    return drawCount;
  }

  DrawCameraCollisionPrimitive(activeCamera, collisionPrimitive) {
    activeCamera.context.save();
    collisionPrimitive.DebugDraw(activeCamera.Context, DebugDrawer.BOUNDING_PRIMITIVE_LINE_WIDTH,
      DebugDrawer.BOUNDING_PRIMITIVE_LINE_ALPHA, DebugDrawer.BOUNDING_PRIMITIVE_COLOR);
    activeCamera.context.restore();
  }

  DrawSpriteCollisionPrimitive(activeCamera, collisionPrimitive) {
    activeCamera.context.save();
    activeCamera.SetContext();
    collisionPrimitive.DebugDraw(activeCamera.context, DebugDrawer.BOUNDING_PRIMITIVE_LINE_WIDTH,
      DebugDrawer.BOUNDING_PRIMITIVE_LINE_ALPHA, DebugDrawer.BOUNDING_PRIMITIVE_COLOR);
    activeCamera.context.restore();
  }

  DrawDebugText(gameTime, activeCamera, drawCount) {
    let x = 10,
      y = 10;
    let yOffset = 15;

    let offsetMultiplier = 1; //used to move each text line down 1x yOffset from the previous line
    this.DrawText(activeCamera, "Debug Information", x, y + offsetMultiplier * yOffset);
    offsetMultiplier++;

    this.DrawText(activeCamera, "-------------------------------", x, y + offsetMultiplier * yOffset);
    offsetMultiplier++;

    this.DrawText(activeCamera, "FPS: " + gameTime.fps + " ms", x, y + offsetMultiplier * yOffset);
    offsetMultiplier++;

    this.DrawText(activeCamera, "Draw Count: " + drawCount, x, y + offsetMultiplier * yOffset);
    offsetMultiplier++;

    this.DrawText(activeCamera, "Camera(ID): " + activeCamera.id, x, y + offsetMultiplier * yOffset);
    offsetMultiplier++;

    this.DrawText(activeCamera, "Camera(origin): " + Vector2.Round(activeCamera.transform2D.origin, 2).ToString(), x, y + offsetMultiplier * yOffset);
    offsetMultiplier++;

    this.DrawText(activeCamera, "Camera(BB): " + Rect.Round(activeCamera.collisionPrimitive.GetBoundingPrimitive(), 1).ToString(), x, y + offsetMultiplier * yOffset);
    offsetMultiplier++;

    //add more debug info here...
  }

  DrawText(activeCamera, text, x, y) {
    activeCamera.context.save();
    activeCamera.context.font = DebugDrawer.DEBUG_TEXT_FONT;
    activeCamera.context.fillStyle = DebugDrawer.DEBUG_TEXT_COLOR;
    activeCamera.context.textBaseline = DebugDrawer.DEBUG_TEXT_BASELINE;
    activeCamera.context.globalAlpha = DebugDrawer.DEBUG_TEXT_ALPHA;
    activeCamera.context.fillText(text, x, y, DebugDrawer.DEBUG_TEXT_MAXWIDTH);
    activeCamera.context.restore();
  }
  //#endregion
}