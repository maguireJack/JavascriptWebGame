class MyMenuManager {

    constructor(id, notificationCenter, keyboardManager, menuID, canvasID, toggleMenuKey) {
        this.id = id;
        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;
        this.menuID = menuID;
        this.canvasID = canvasID;
        this.toggleMenuKey = toggleMenuKey;

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
            if (statusType == StatusType.Off) //show menu
                this.ShowMain();
            else
                this.StartGame(); //show game
        }
    }
    //#endregion

    Initialize() {
        this.ShowMain();
        this.InitializeEventListeners();
    }

    StartGame() {
        //hide the <div> with class="menu" for the correct parent (i.e. each menu has a parent id)
        this.Hide("#" + this.menuID + " .menu");
        //show canvas where actual game is drawn
        this.Show("#" + this.menuID + " #" + this.canvasID);

        this.Show("#player-top.ui_player_name");
    }

    ShowMain() {
        //hide canvas where actual game is drawn
        this.Hide("#" + this.menuID + " #" + this.canvasID); 
        //show the first menu and hide the others
        this.Show("#" + this.menuID + " #main.submenu");
        this.Hide("#" + this.menuID + " #options.submenu");
        this.Hide("#" + this.menuID + " #leaderboard.submenu");
    }

    ShowOptions() {
        this.Hide("#" + this.menuID + " #main.submenu");
        this.Show("#" + this.menuID + " #options.submenu");
        this.Hide("#" + this.menuID + " #leaderboard.submenu");
    }

    ShowLeaderboard() {
        this.Hide("#" + this.menuID + " #main.submenu");
        this.Hide("#" + this.menuID + " #options.submenu");
        this.Show("#" + this.menuID + " #leaderboard.submenu");
    }

    InitializeEventListeners() {
        document.querySelector("#" + this.menuID + " #play_btn.button").addEventListener("click", event => {
            this.StartGame();

            //wakes up object and render manager
            NotificationCenter.Notify(
                new Notification(
                  NotificationType.Menu,
                  NotificationAction.ShowMenuChanged,
                  [StatusType.IsDrawn | StatusType.IsUpdated, this.id]
                  )
                );
        });

        document.querySelector("#" + this.menuID + " #customization_btn.button").addEventListener("click", event => {
            console.log("customization...");
        });

        document.querySelector("#" + this.menuID + " #leaderboard_btn.button").addEventListener("click", event => {
            this.ShowLeaderboard();
        });

        document.querySelector("#" + this.menuID + " #options_btn.button").addEventListener("click", event => {
            this.ShowOptions();
        });

        document.querySelector("#" + this.menuID + " #game_controls_btn.button").addEventListener("click", event => {
            console.log("game controls...");
        });

        document.querySelector("#" + this.menuID + " #options_back_btn.button").addEventListener("click", event => {
            this.ShowMain();
        });

        document.querySelector("#" + this.menuID + " #leaderboard_back_btn.button").addEventListener("click", event => {
            this.ShowMain();
        });
    }

    Update(gameTime) {

        //to do...add code to listen for toggleMenuKey and show/hide menu
    }

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
}