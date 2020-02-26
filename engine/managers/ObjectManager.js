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
  sprites = [];
  //#endregion

  //#region Properties
  get StatusType() {
    return this.statusType;
  }
  get DebugEnabled() {
    return this.debugEnabled;
  }
  get Sprites() {
    return this.sprites;
  }
  //#endregion

  constructor(
    id,
    statusType,
    canvas,
    context,
    cameraManager,
    notificationCenter,
    debugEnabled
  ) {
    this.id = id;
    this.statusType = statusType;
    this.canvas = canvas;
    this.context = context;
    this.cameraManager = cameraManager;
    this.debugEnabled = debugEnabled;
    this.notificationCenter = notificationCenter;
    this.RegisterForNotifications();
  }

  //#region Notification Handling
  //handle all GameState type events - see PlayerBehavior::HandleEnemyCollision()
  RegisterForNotifications() {
    //handle events related to add/remove sprites
    this.notificationCenter.Register(
      NotificationType.Sprite,
      this,
      //nmcg - bug fix - 11.2.20 - there was no function (i.e. no notification handler called HandleSpriteNotification)
      this.HandleNotification //formerly this.HandleSpriteNotification
    );

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
        this.HandleShowMenu(notification.NotificationArguments);
        break;

      case NotificationAction.Remove:
        this.HandleRemoveSprite(notification.NotificationArguments);
        break;

      default:
        break;
    }
  }

  HandleShowMenu(argArray) {
    this.statusType = argArray[0];
  }

  HandleRemoveSprite(argArray) {
    let spriteToRemove = argArray[0];
    this.Remove(spriteToRemove);
  }
  //#endregion

  //#region Add, Remove, Find, Clear
  Add(sprite) {
    if (this.sprites[sprite.ActorType.ID])
      this.sprites[sprite.ActorType.ID].push(sprite);
    else {
      this.sprites[sprite.ActorType.ID] = [];
      this.sprites[sprite.ActorType.ID].push(sprite);
    }
  }

  FindIndex(actorType, predicate) {
    if (this.sprites[actorType.ID])
      return this.sprites[actorType.ID].findIndex(predicate);
    else return -1;
  }

  FindIndices(actorType, predicate) {
    if (this.sprites[actorType.ID]) {
      let foundIndices = [];
      let index = 0;
      for (let i = 0; i < this.sprites[actorType.ID].length; i++) {
        if (predicate(sprite)) foundIndices[index] = i;
        index++;
      }
    }
    return foundIndices.length != 0 ? foundIndices : null;
  }

  Find(actorType, predicate) {
    let index = this.sprites[actorType.ID].findIndex(predicate);

    if (index != -1) return this.sprites[actorType.ID][index];
    else return -1;
  }

  Remove(actorType, predicate) {
    if (this.sprites[actorType.ID])
      this.sprites.splice(this.FindIndex(actorType, predicate), 1);
  }

  RemoveAll(actorType, predicate) {
    if (this.sprites[actorType.ID])
      this.sprites.splice(this.FindIndex(actorType.ID, predicate), 1);
  }

  RemoveAllByType(actorType) {
    if (this.sprites[actorType.ID])
      this.sprites[actorType.ID].splice(0, this.sprites[actorType.ID].length);
  }

  Get(actorType){
    if (this.sprites[actorType.ID])
    return this.sprites[actorType.ID];
  }

  Sort(actorType, compareFunction) {
    if (this.sprites[actorType.ID]) {
      this.sprites[actorType.ID].sort(compareFunction);
    }
  }

  SetDrawOrder(compareFunction){
    this.sprites.sort(compareFunction);
  }

  Clear() {
    //why not just set length = 0 or arr = []?
    //see https://www.tutorialspoint.com/in-javascript-how-to-empty-an-array

    //remove each of the sprites inside each of the arrays
    for (let key in Object.keys(this.sprites)) {
      this.sprites[key].splice(0, this.sprites[key].length);
    }

    //remove each empty array from the parent array
    this.sprites.splice(0, this.sprites.length);
  }
  //#endregion

  //#region Draw, Update
  Update(gameTime) {
    //if update enabled for the object manager?
    if ((this.statusType & StatusType.IsUpdated) != 0) {
      //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
      for (let key of Object.keys(this.sprites)) {
        //for the sprites inside the array for the current key call update
        for (let sprite of this.sprites[key])
          sprite.Update(gameTime,this.cameraManager.ActiveCamera);
      }
    }
  }

  Draw(gameTime) {
    //if update enabled for the object manager?
    if ((this.statusType & StatusType.IsDrawn) != 0) {
      //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
      for (let key of Object.keys(this.sprites)) {
        //for the sprites inside the array for the current key call update
        for (let sprite of this.sprites[key])
        {
          sprite.Draw(gameTime,this.cameraManager.ActiveCamera);
          //do we want to see the CD/CR bounding boxes?
          if(this.DebugEnabled)
            this.DrawDebugBoundingBox(sprite, "red");
        }
      }
    }
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
