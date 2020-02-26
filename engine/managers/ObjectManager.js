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
    if (this.sprites[sprite.ActorType])
      this.sprites[sprite.ActorType].push(sprite);
    else {
      this.sprites[sprite.ActorType] = [];
      this.sprites[sprite.ActorType].push(sprite);
    }
  }

  FindIndex(actorType, predicate) {
    if (this.sprites[actorType])
      return this.sprites[actorType].findIndex(predicate);
    else return -1;
  }

  FindIndices(actorType, predicate) {
    if (this.sprites[actorType]) {
      let foundIndices = [];
      let index = 0;
      for (let i = 0; i < this.sprites[actorType].length; i++) {
        if (predicate(sprite)) foundIndices[index] = i;
        index++;
      }
    }
    return foundIndices.length != 0 ? foundIndices : null;
  }

  Find(actorType, predicate) {
    let index = this.sprites[actorType].findIndex(predicate);

    if (index != -1) return this.sprites[actorType][index];
    else return -1;
  }

  Remove(actorType, predicate) {
    if (this.sprites[actorType])
      this.sprites.splice(this.FindIndex(actorType, predicate), 1);
  }

  RemoveAll(actorType, predicate) {
    if (this.sprites[actorType])
      this.sprites.splice(this.FindIndex(actorType, predicate), 1);
  }

  RemoveAllByType(actorType) {
    if (this.sprites[actorType])
      this.sprites[actorType].splice(0, this.sprites[actorType].length);
  }

  Get(actorType){
    if (this.sprites[actorType])
    return this.sprites[actorType];
  }

  Sort(actorType, compareFunction) {
    if (this.sprites[actorType]) {
      this.sprites[actorType].sort(compareFunction);
    }
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
      let keys = Object.keys(this.sprites);
      for (let i = 0; i < keys.length; i++) {
        //for the sprites inside the array for the current key call update
        for (let j = 0; j < this.sprites[keys[i]].length; j++)
          this.sprites[keys[i]][j].Update(
            gameTime,
            this.cameraManager.ActiveCamera
          );
      }
    }
  }

  Draw(gameTime) {
    //if update enabled for the object manager?
    if ((this.statusType & StatusType.IsDrawn) != 0) {
      //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
      let keys = Object.keys(this.sprites);
      for (let i = 0; i < keys.length; i++) {
        //for the sprites inside the array for the current key call update
        for (let j = 0; j < this.sprites[keys[i]].length; j++) {
          this.sprites[keys[i]][j].Draw(
            gameTime,
            this.cameraManager.ActiveCamera
          );
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
  DrawDebugBoundingBox(color, sprite) {
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
