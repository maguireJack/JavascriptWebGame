class MyUIManager {

    constructor(id, uiID, notificationCenter, keyboardManager) {
        this.id = id;
        this.uiID = uiID;
        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;
        
        this.RegisterForNotifications();
        this.Initialize();
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
                this.HandleShowMenu(notification.NotificationArguments);
                break;

            default:
                break;
        }
    }

    HandleShowMenu(argArray) {
        let statusType = argArray[0];

        //is this notification message for me? (e.g. what happens when one player opens her/his menu and the other does not?)
        if((argArray[1] && argArray[1] === this.id)  || (argArray[2] && argArray[2] === this.id))
        {
            //if we created an event to tell the objectmanager to draw and update then it means we want the game to run i.e. hide the menu
            if (statusType == StatusType.Off) //turn off the menu!
                this.HideUI();
            else
                this.ShowUI(); 
        }
    }
    //#endregion

    Initialize() {
     
    }

    Update(gameTime) {
        //to do...add code to listen for toggleMenuKey and show/hide menu
    }

//#region Shared UI and Menu
    Toggle(cssSelector) {
        let object = document.querySelector(cssSelector);
        if (object.style.display === 'block') {
            object.style.display = 'none';
        } else {
            object.style.display = 'block';
        }
    }

    Show(cssSelector) {
        document.querySelector(cssSelector).style.display = 'block'; //visible
    }

    Hide(cssSelector) {
        document.querySelector(cssSelector).style.display = 'none';  //hide
    }

//#endregion
}