class MyMenuManager {

    constructor(notificationCenter, keyboardManager) {
        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;
        this.Initialize();
        this.RegisterForNotifications();
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
        this.statusType = argArray[0];
        //if we created an event to tell the objectmanager to draw and update then it means we want the game to run i.e. hide the menu
        if (this.statusType != StatusType.Off) //hide menu
        {
            $('#main').hide();
            $('#menu').removeClass('main');
        }
        else    //show menu
        {
            $('#main').show();
            $('#menu').addClass('main');
        }
    }
    //#endregion

    Initialize() {

        //show the wrapper that encloses our menu and canvas - if we dont show the wrapper then we will see a blank area only
        $('.wrapper').show();

        //click handlers for the different menu screens
        $('.play').click(this.HideMenu.bind(this));
    }

    HideMenu(){
        //hide the main menu;
        $('#menu').hide();
        //send a notification to update and draw the game
        NotificationCenter.Notify(new Notification(NotificationType.Menu, NotificationAction.ShowMenuChanged, [StatusType.IsUpdated | StatusType.IsDrawn]));
    }

    Update(gameTime) {

        //to do...add code to listen for 'p' pause key and show/hide menu accordingly
    }
}

