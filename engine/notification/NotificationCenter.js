/**
 * Provides a central hub for registering, de-registering and posting notifications.
 * This component notifies listeners when interesting events (we call them notification
 * types to avoid confusion with JavaScript events) occur in our game.
 *
 * For example, when the player wins the game then the player controller attached
 * to the player sprite will post a notification
 * e.g. notificationCenter.Notify(NotificationType.PlayerWin, {msg: "player wins!", audio: "victory.wav"});
 *
 * @author NMCG
 * @version 1.0
 * @class NotificationCenter
 */

//here we try to think of ALL the unique type of events that may want a listener to respond by performing an action (e.g. menu, player, sound, pickup)
const NotificationType = Object.freeze({

  Player: Symbol("Player"),
  Enemy: Symbol("Enemy"),
  Pickup: Symbol("Pickup"),
  Sprite: Symbol("Sprite"),

  GameState: Symbol("GameState"),
  Menu: Symbol("Menu"),
  Sound: Symbol("Sound")
});

//here we try to think of ALL the unique actions in our game that may want a listener to respond by performing an action (e.g. playing a sound, updating the UI)
const NotificationAction = Object.freeze({

  Fire: Symbol("Fire"),
  Win: Symbol("Win"),

  Lose: Symbol("Lose"),
  Spawn: Symbol("Spawn"),

  Remove: Symbol("Remove"),
  Health: Symbol("Health"),
  Ammo: Symbol("Ammo"),
  Inventory: Symbol("Inventory"),

  ShowMenuChanged: Symbol("ShowMenuChanged"),

  SetVolume: Symbol("SetVolume"),
  SetVolumeByTheme: Symbol("SetVolumeByTheme"),
  SetVolumeAll: Symbol("SetVolumeAll"),
  ResetVolumeAll: Symbol("ResetVolumeAll")
  //add more here as required and use Symbol to automatically generate a unique value rather than managing it ourselves
});

class Notification {
  notificationType;
  notificationAction;
  notificationArguments = [];

  constructor(notificationType, notificationAction, notificationArguments) {
    this.notificationType = notificationType;
    this.notificationAction = notificationAction;
    this.notificationArguments = notificationArguments;
  }

  get NotificationType() {
    return this.notificationType;
  }
  get NotificationAction() {
    return this.notificationAction;
  }
  get NotificationArguments() {
    return this.notificationArguments;
  }

  Equals(other) {
    if (other == null || other == undefined || !other instanceof Notification)
      throw "Error: One or more objects is null, undefined, or not type " +
        this.constructor.name;

    //both point to the same object in RAM i.e. a shallow copy
    if (this == other) return true;

    //if we get here then we have two valid (i.e. non-null, defined, correct type) and distinct (i.e. separate RAM) objects that we need to test
    return (
      this.notificationType === other.NotificationType &&
      this.notificationAction === other.NotificationAction &&
      this.notificationArguments === other.NotificationArguments
    );
  }
}

class NotificationCenter {
  //stores what observer wants to be notified for a particular Notification type
  notificationTypeToObserversMap;

  constructor() {
    this.notificationTypeToObserversMap = new Array();
  }

  //nmcg - bug fix - 11.2.20 - was not allowing map to contain more than one callback entity for the same type (e.g. MyObjectManager and MyMenuManager both registering for Menu)
  Register(notificationType, observer, callback) {

    let bSuccess = true;
    //already a notificationType in the map (maybe for another entity)
    if (this.notificationTypeToObserversMap[notificationType])
    {
      //if we are not trying to add a duplicate observer then add
      if (this.IndexOf(notificationType, observer) == -1)
        this.notificationTypeToObserversMap[notificationType].push({observer: observer, callback: callback });
      else
        bSuccess = false;
    }
    else //not present
    {
      this.notificationTypeToObserversMap[notificationType] = new Array();
      this.notificationTypeToObserversMap[notificationType].push({observer: observer, callback: callback });
    }
    return bSuccess;
  }

  Deregister(notificationType, observer, callback) {
    let index = this.IndexOf(notificationType, observer);
    if (index != -1) {
      this.notificationTypeToObserversMap[notificationType].splice(index, 1);
      return true;
    } else {
      console.log(
        "An observer has already been added for this notification type!"
      );
      return false;
    }
  }

  IndexOf(notificationType, observer) {
    if (this.notificationTypeToObserversMap[notificationType]) {
      let observers = this.notificationTypeToObserversMap[notificationType];
      for (let i = observers.length - 1; i >= 0; i--) {
        if (observers[i].observer === observer) 
          return i;
      }
    }
    return -1;
  }

  Notify(notification) {
    if (this.notificationTypeToObserversMap[notification.NotificationType]) {
      let observers = this.notificationTypeToObserversMap[notification.NotificationType];
      for (let i = observers.length - 1; i >= 0; i--)
      {
        Reflect.apply(observers[i].callback, observers[i].observer, [notification]);
      }
    }
  }
}
