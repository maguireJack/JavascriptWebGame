/**
 * Stores, updates, and changes game state in my specific game e.g. Snailbait.
 * @author
 * @version 1.0
 * @class MyGameStateManager
 */

class MyGameStateManager extends GameStateManager {

    inventoryArray = [];
    playerHealth = 100;

    constructor(id, notificationCenter) {
        super(id);

        this.notificationCenter = notificationCenter;
        this.RegisterForNotifications();
    }

    //handle all GameState type events - see PlayerBehavior::HandleEnemyCollision()
    RegisterForNotifications() {
        this.notificationCenter.Register(NotificationType.GameState, this, this.HandleNotification);
    }

    HandleNotification(...argArray)
    {
      let notification = argArray[0];
      switch(notification.NotificationAction)
      {
        case NotificationAction.Health:
          this.HandleHealthStateChange(notification.NotificationArguments);  
          break;

        case NotificationAction.Inventory:
          this.HandleInventoryStateChange(notification.NotificationArguments);  
          break;

        case NotificationAction.Ammo:
          this.HandleAmmoStateChange(notification.NotificationArguments);  
          break;

        //add more cases...
       
        default:
          break;  
      }
    }
    
    HandleHealthStateChange(argArray){
      console.log(argArray);
      //add your code here..maybe update a UI, or a health variable?
    }

    HandleInventoryStateChange(argArray){
      console.log(argArray);
      //add your code here..maybe update a UI, or a health variable?
    }

    HandleAmmoStateChange(argArray){
      console.log(argArray);
      //add your code here..maybe update a UI, or a health variable?
    }

    Update(gameTime) {

      //your code - every update() we can check player health, check inventory and make some decision e.g. win/lose etc.

    }

}