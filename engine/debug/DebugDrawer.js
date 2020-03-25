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
  static CAMERA_BOUNDING_BOX_COLOR = "yellow";
  static DEBUG_TEXT_FONT = "10px Arial";
  static DEBUG_TEXT_MAXWIDTH = 200;

  //#endregion

  //#region Properties
  //#endregion

  constructor(id, statusType, objectManager, cameraManager, notificationCenter) {
    this.id = id;
    this.statusType = statusType;
    this.objectManager = objectManager;
    this.cameraManager = cameraManager;
    this.notificationCenter = notificationCenter;
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

      //draw the bounfing boxes for the in-view (i.e. inside the bounding box of the active camera) sprites
      this.DrawCollidableSpriteBoundingBoxes(DebugDrawer.SPRITE_BOUNDING_BOX_COLOR);
      for (let i = 0; i < this.cameraManager.Cameras.length; i++) {
        //draws the collision surface (i.e. Transform2D.BoundingBox) around the active camera
        this.DrawActiveCameraBoundingBoxes(DebugDrawer.CAMERA_BOUNDING_BOX_COLOR, this.cameraManager.Cameras[i]);

        //draws any additional information to screen
        this.DrawDebugText(gameTime, this.cameraManager.Cameras[i]);
      }
    }
  }

  DrawDebugText(gameTime, activeCamera) {
    let x = 10,
      y = 10;
    let yOffset = 15;

    let offsetMultiplier = 1; //used to move each text line down 1x yOffset from the previous line
    this.DrawText(activeCamera.context, "Debug Information", x, y + offsetMultiplier * yOffset, "white");
    offsetMultiplier++;

    this.DrawText(activeCamera.context, "-------------------------------", x, y + offsetMultiplier * yOffset, "white");
    offsetMultiplier++;

    this.DrawText(activeCamera.context, "FPS: " + gameTime.FPS + " ms", x, y + offsetMultiplier * yOffset, "white");
    offsetMultiplier++;

    this.DrawText(activeCamera.context, "Camera(ID): " + activeCamera.ID, x, y + offsetMultiplier * yOffset, "white");
    offsetMultiplier++;

    this.DrawText(activeCamera.context, "Camera(origin): " + Vector2.Round(activeCamera.Transform2D.Origin, 2).ToString(), x, y + offsetMultiplier * yOffset, "white");
    offsetMultiplier++;

    this.DrawText(activeCamera.context, "Camera(scale): " + Vector2.Round(activeCamera.Transform2D.Scale, 2).ToString(), x, y + offsetMultiplier * yOffset, "white");
    offsetMultiplier++;

    this.DrawText(activeCamera.context, "Camera(BB): " + Rect.Round(activeCamera.Transform2D.BoundingBox, 2).ToString(), x, y + offsetMultiplier * yOffset, "red");
    offsetMultiplier++;

    //add more debug info here...
  }

  DrawText(context, text, x, y, color) {
    context.save();
    context.font = DebugDrawer.DEBUG_TEXT_FONT;
    context.fillStyle = color;
    context.textBaseline = "top";
    context.globalAlpha = DebugDrawer.DEBUG_TEXT_ALPHA;
    context.fillText(text, x, y, DebugDrawer.DEBUG_TEXT_MAXWIDTH);
    context.restore();
  }

  DrawActiveCameraBoundingBoxes(boundingBoxColor, activeCamera) {
    this.DrawBoundingBox(activeCamera, activeCamera.Transform2D, boundingBoxColor);
  }

  DrawCollidableSpriteBoundingBoxes(boundingBoxColor) {
    let sprites = this.objectManager.Sprites;
    //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
    for (let key of Object.keys(sprites)) {
      //for the sprites inside the array for the current key call update
      for (let sprite of sprites[key]) {
        if (sprite.CollisionType === CollisionType.Collidable) //is it collidable?
        {
          for (let i = 0; i < this.cameraManager.Cameras.length; i++) //get the first camera
          {
            //BUG - disable temporarily - see ObjectManager::Draw() for same commented out if()
         //   if (sprite.Transform2D.BoundingBox.Intersects(this.cameraManager.Cameras[i].Transform2D.BoundingBox)) //can the camera see it?
            {
              this.DrawBoundingBox(this.cameraManager.Cameras[i], sprite.Transform2D, boundingBoxColor); //draw its bounding box
            }
          }
        }
      }
    }
  }

  SetContext(context, transform) {
    context.translate(transform.translation.x, transform.translation.y);
    context.scale(transform.scale.x, transform.scale.y);
    context.rotate(transform.rotationInRadians);
    context.translate(-transform.translation.x, -transform.translation.y);
  }

  DrawBoundingBox(activeCamera, transform, color) {
    activeCamera.context.save();
    activeCamera.SetContext();
    this.SetContext(activeCamera.context, transform);
    activeCamera.context.globalAlpha = 1;
    activeCamera.context.lineWidth = 2;
    activeCamera.context.strokeStyle = color;
    let bb = transform.BoundingBox;
    activeCamera.context.strokeRect(
      bb.X - transform.Origin.X,
      bb.Y - transform.Origin.Y,
      bb.Width,
      bb.Height
    );
    activeCamera.context.restore();
  }
  //#endregion
}