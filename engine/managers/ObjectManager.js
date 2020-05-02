/**
 * This class is responsible for storing and updating all the sprites within the game.
 * @author niall mcguinness
 * @version 1.0
 * @class ObjectManager
 */

class ObjectManager {
  //#region Fields
  id = "";
  context;
  sprites = [];
  //#endregion

  //#region Properties
  get StatusType() {
    return this.statusType;
  }
  get Sprites() {
    return this.sprites;
  }
  //#endregion

  constructor(
    id,
    statusType,
    cameraManager,
    notificationCenter) {
    this.id = id;
    this.statusType = statusType;
    this.cameraManager = cameraManager;
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
      this.HandleNotification
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
        this.statusType = notification.NotificationArguments[0];
        break;

      case NotificationAction.Add:
        this.Add(notification.NotificationArguments[0]);
        break;

      case NotificationAction.RemoveFirst:
        this.RemoveFirst(notification.NotificationArguments[0]);
        break;

      case NotificationAction.RemoveFirstBy:
        this.RemoveFirstBy(notification.NotificationArguments[0], notification.NotificationArguments[1]);
        break;

      case NotificationAction.RemoveAllBy:
        this.RemoveAllBy(notification.NotificationArguments[0], notification.NotificationArguments[1]);
        break;

      case NotificationAction.RemoveAllByType:
        this.RemoveAllByType(notification.NotificationArguments[0]);
        break;

      default:
        break;
    }
  }
  //#endregion

  //#region Add, Remove, Find, Clear
  Add(sprite) {
    //we have a sprite of this ActorType already in the 2D sprites array
    if (this.sprites[sprite.ActorType])
      this.sprites[sprite.ActorType].push(sprite);
    //we have a sprite with a new ActorType so we need a new array in the 2D sprites array
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
      let index = 0;
      let foundIndices = [];
      for (let i = 0; i < this.sprites[actorType].length; i++) {
        if (predicate(this.sprites[actorType][i])) {
          foundIndices[index] = i;
          index++;
        }
      }
      return foundIndices.length != 0 ? foundIndices : null;
    }
    return null;
  }

  Find(actorType, predicate) {
    let index = this.sprites[actorType].findIndex(predicate);
    if (index != -1)
      return this.sprites[actorType][index];
    else
      return -1;
  }

  RemoveFirst(sprite) {
    if (this.sprites[sprite.ActorType]) {
      let index = this.sprites[sprite.ActorType].indexOf(sprite);
      if (index != -1)
        this.sprites[sprite.ActorType].splice(index, 1);
    } else
        throw "Error: No sprites of actorType(" + actorType + ") exist in the ObjectManager! Did you add them at startup?";

  }

  RemoveFirstBy(actorType, predicate) {
    if (this.sprites[actorType])
      this.sprites[actorType].splice(this.FindIndex(actorType, predicate), 1);
    else
      throw "Error: No sprites of actorType(" + actorType + ") exist in the ObjectManager! Did you add them at startup?";
  }

  RemoveAllBy(actorType, predicate) {
    let indices = this.FindIndices(actorType, predicate);
    for (let i = indices.length - 1; i >= 0; i--)
      this.sprites[actorType].splice(this.sprites[actorType][i], 1);
  }

  RemoveAllByType(actorType) {
    if (this.sprites[actorType])
      this.sprites[actorType].splice(0, this.sprites[actorType].length);
    else
      throw "Error: No sprites of actorType(" + actorType + ") exist in the ObjectManager! Did you add them at startup?";
  }

  Get(actorType) {
    if (this.sprites[actorType])
      return this.sprites[actorType];
    else
      throw "Error: No sprites of actorType(" + actorType + ") exist in the ObjectManager! Did you add them at startup?";
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
    for (let i = 0; i < this.sprites.length; i++) {
      if (this.sprites[i] != undefined) //if we have a valid array at index == i
        this.sprites[i].splice(0, this.sprites[i].length);
    }

    //remove each empty array from the parent array
    this.sprites.splice(0, this.sprites.length);
  }
  //#endregion

  //#region Update
  Update(gameTime) {
    //if update enabled for the object manager?
    if ((this.statusType & StatusType.IsUpdated) != 0) {
      //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
      //for (let key of Object.keys(this.sprites)) {
        for (let key in this.sprites) {
        //for the sprites inside the array for the current key call update
        for (let sprite of this.sprites[key])
          sprite.Update(gameTime);
      }
    }
  }
  //#endregion

}