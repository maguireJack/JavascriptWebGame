/**
 * Fires a bullet/laser based on keyboard input.
 * @author
 * @version 1.0
 * @class PlayerFireBehavior
 */
class PlayerFireBehavior
{
    timeSinceLastInMs = 0;

    constructor(keyboardManager, soundManager, 
                objectManager, fireIntervalInMs, bulletSprite, translationOffset)
    {
        this.keyboardManager = keyboardManager;
        this.soundManager = soundManager;
        this.objectManager = objectManager;

        this.fireIntervalInMs = fireIntervalInMs || 100; //if specified, otherwise 100ms
        this.bulletSprite = bulletSprite;
        this.translationOffset = translationOffset;

    }

    Execute(gameTime, parent)
    {
        this.timeSinceLastInMs += gameTime.ElapsedTimeInMs;

        if(this.timeSinceLastInMs >= this.fireIntervalInMs && this.keyboardManager.IsKeyDown(Keys.Space))
        {
             //make or clone a bullet
            var bulletClone = this.bulletSprite.Clone();
        
            //set the position of the bullet 
            //IMPORTANT - notice that we MUST CLONE the translation otherwise the bullet will have a shallow copy to the players translation
            //and when we change the bullet position we will change the PLAYER translation!           
            //to see that bug comment out line 39 and uncomment line 38
            //bulletClone.Transform2D.Translation = parent.Transform2D.Translation;
            bulletClone.Transform2D.Translation = parent.Transform2D.Translation.Clone();

            bulletClone.Transform2D.TranslateBy(this.translationOffset);

            //enable the bullet
            bulletClone.StatusType = StatusType.IsUpdated | StatusType.IsDrawn;

            //add bullet to object manager
            this.objectManager.Add(bulletClone);
           
            //play fire sound!
            notificationCenter.Notify(new Notification(NotificationType.Sound, NotificationAction.Play,  ["sound_shoot"]));

            //if we wanted to set sound volume on all audio clips we could publish this type of event...
            //notificationCenter.Notify(new Notification(NotificationType.Sound, NotificationAction.SetVolumeAll,  [1]));
          
            //reset
            this.timeSinceLastInMs = 0;
        }
    }

    /*
    Equals(other) {
        //to do...  
        return false;
    }

    ToString()
    {
        //to do...
        return "undefined";
    }
    */

   Clone() {
    return new PlayerFireBehavior(this.keyboardManager, this.soundManager, this.objectManager, this.bulletSprite, this.translationOffset);
   }
}