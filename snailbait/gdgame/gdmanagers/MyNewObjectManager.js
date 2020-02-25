/**
 * New and improved - Stores, updates, and draws all sprites in my specific game e.g. Snailbait.
 * @author
 * @version 1.0
 * @class MyNewObjectManager
 */

class MyNewObjectManager extends ObjectManager {
  //#region Fields
  sprites = [];
  //#endregion

  //#region Properties
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
    super(id, statusType, canvas, context, cameraManager, debugEnabled);

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
      case NotificationAction.Remove:
        this.HandleRemoveSprite(notification.NotificationArguments);
        break;

      case NotificationAction.Spawn:
        this.HandleSpawnSprite(notification.NotificationArguments);
        break;

      case NotificationAction.ShowMenuChanged:
        this.HandleShowMenu(notification.NotificationArguments);
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

  //#region Add, FindIndex, Remove, Sort
  SortAllByDepth(spriteArray, sortFunc) {
    //to do...
  }

  Add(sprite) {
    //to do...
  }

  Remove(sprite) {
    //to do...
  }

  FindIndex(sprite) {
    //to do...
  }

  RemoveByType(actorType) {
    //to do...
  }

  RemoveAll() {
    //to do...
  }
  //#endregion

  //#region Draw, Update
  Update(gameTime) {
    //should we be updating? if menu is shown then we should not
    if ((this.statusType & StatusType.IsUpdated) != 0) {
      this.UpdateAll(gameTime);
    }
  }

  Draw(gameTime) {
    //should we be drawing? if menu is shown then we should not
    if ((this.statusType & StatusType.IsDrawn) != 0) {
      this.DrawAll(gameTime);

      if (this.DebugEnabled)
        this.DrawDebug("red", "green", "white", "yellow", "blue");
    }
  }

  UpdateAll(gameTime) {
    let activeCamera = this.cameraManager.ActiveCamera;

    //to do...
  }


  DrawAll(gameTime) {
    let activeCamera = this.cameraManager.ActiveCamera;
    //to do...
  }

  //#endregion

  //#region Debug
  DrawDebug(
    debugEnemyColor,
    debugInteractableColor,
    debugPlayerColor,
    debugPlatformColor,
    debugUIColor){
      //to do...    
  }
  //#endregion
}
