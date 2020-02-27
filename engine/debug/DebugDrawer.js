/**
 * Description goes here...
 * @author NMCG
 * @version 1.0
 * @class DebugDrawer
 */

class DebugDrawer {
  //#region Fields
  id = "";
  //#endregion

  //#region Properties
  //#endregion

  constructor(id, ctx, objectManager, cameraManager) {
      this.id = id;
      this.ctx = ctx;
      this.objectManager = objectManager;
      this.cameraManager = cameraManager;
  }

  //#region Draw, Update
  Update(gameTime) {
        //does nothing here yet...
  }

  Draw(gameTime) {
    let count = 0;

    //if update enabled for the object manager?
    if ((this.statusType & StatusType.IsDrawn) != 0) {
      //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
      for (let key of Object.keys(this.sprites)) {
        //for the sprites inside the array for the current key call update
        for (let sprite of this.sprites[key])
        {
          if(sprite.Transform2D.BoundingBox.Intersects(this.cameraManager.ActiveCamera.Transform2D.BoundingBox))
          {
            sprite.Draw(gameTime,this.cameraManager.ActiveCamera);
            count++;
          }
          //do we want to see the CD/CR bounding boxes?
          if(this.DebugEnabled && sprite.CollisionType === CollisionType.Collidable)
            this.DrawDebugBoundingBox(sprite, "red");
        }
      }
    }

    console.log(count);
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
  DrawDebugBoundingBox(sprite, color) {
    this.context.save();
    this.SetContext(this.cameraManager.ActiveCamera);
    let transform = sprite.Transform2D;
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
