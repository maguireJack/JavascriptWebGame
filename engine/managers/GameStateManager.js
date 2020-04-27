/**
 * This class will listen for state changes (ammo, health, death, respawn) and update UI or respawn sprites, or restart game
//  * @author JMG
 * @version 1.0
 * @class GameStateManager
 */

class GameStateManager{

    id = "";
    context;
    playerOneHealth = 100;
    playerTwoHealth = 100;
    debugEnabled = false;
    isDamagable = true;
    
    
    
    constructor(id, notificationCenter){
        this.id = id;
        this.notificationCenter = notificationCenter;
        this.RegisterForNotifications();
        
    
    }

    RegisterForNotifications()
  {
    this.notificationCenter.Register(NotificationType.GameState, this, this.HandleNotification);
  }

  HandleNotification(...argArray)
  {
    let notification = argArray[0];
    switch(notification.NotificationAction)
    {
      case NotificationAction.Damage:
        this.Damage(notification.NotificationArguments[0], notification.NotificationArguments[1]);  //remember when we created the event we passed sound name in [0] in the array - see    notificationCenter.Notify(new Notification(NotificationType.Sound, NotificationAction.Play,  ["sound_shoot"]));
        break;

      case NotificationAction.setHealth:
        this.setHealth(notification.NotificationArguments[0], notification.NotificationArguments[1]);
        break;

      default:
        break;  
        
    }
  }

  
    Update(gameTime)
    {

    }

    setHealth(newHealth, target)
    {
        
    }

    Damage(damage, target)
    {
        if(target.id == "player 1")
        {
          console.log("Damaging " + target.id + " for " + damage);
        }else if(target == "player 2")
        {

        }
    }

}