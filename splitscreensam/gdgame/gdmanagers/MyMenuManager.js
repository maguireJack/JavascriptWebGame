class MyMenuManager {

    constructor(id, notificationCenter, keyboardManager, screenObject, sentinelObject = null) {
        this.id = id;
        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;
        this.menuID = screenObject.parentDivID;
        this.canvasID = screenObject.canvasID;
        //#region DOM related Intro & Loader functionality
        this.introID = screenObject.introID;
        this.sentinelObject = sentinelObject;
        //#endregion
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


    StartLoader() {

        //hide the <div> with class="menu" for the correct parent (i.e. each menu has a parent id)
        this.Hide("#" + this.menuID + " .menu");

        //increment the sentinel to say one more menu will start showing the loader
        this.sentinelObject.Increment();

        //if the target value for the sentinel has not been reached then it means we need to show the loader
        if (this.sentinelObject.Value) {
  
            //get a handle to the div that we use for adding UI elements for this particular canvas (e.g. player-ui-top)
            let container = document.querySelector("#" + this.introID);

            //#region Loader
            let div_loader = document.createElement("div");
            div_loader.setAttribute("class", "loader");
            let loaderSpinDurationInSecs = 2;
            let loaderHighlightColor = "#006739";
            //notice how we can set the custom properties (e.g. --loader-spin-duration) using JS which will set the CSS style in the CSS file
            div_loader.setAttribute("style", "margin-top: -50px; margin-left: -50px; --loader-width: 60px; --loader-height: 60px; --loader-spin-duration: " + loaderSpinDurationInSecs + "s; --loader-color: " + loaderHighlightColor + ";");
            //#endregion

            //#region Loader Background
            let div_loader_background = document.createElement("div");
            div_loader_background.setAttribute("class", "loader-background");
            //#endregion

            //#region Loader Waiting Text
            let div_loader_text = document.createElement("div");
            div_loader_text.setAttribute("class", "loader-text");
            //get the half width of the text when drawn with the font size and family specificed in the CSS style (i.e. ui-info-toast-countdown) so that we can center using margin-left
            div_loader_text.innerText = "Waiting for player...";
            div_loader_text.style.font = "16pt Orbitron, Impact, Charcoal, sans-serif";
            let halfWidth = GDDOM.GetTextDimensions(div_loader_text, div_loader_text.style.font).width / 2;
            div_loader_text.setAttribute("style", "margin-left: " + -1 * halfWidth + "px;");
            //#endregion

            //show the elements inside the container for the time specified
            let toast = GDDOM.ShowElementsWhile(container, [div_loader_background, div_loader, div_loader_text], this.sentinelObject, 0, 200, -1);
            //then when time elapses and the Promise is resolved call the next function (i.e. ShowStartToast)
            toast.then(resolve => {
                this.ShowCountdown();
            });
        } else {
            this.ShowCountdown();
        }
    }

    ShowCountdown() {

        //get a handle to the div that we use for adding UI elements for this particular canvas (e.g. player-ui-top)
        let container = document.querySelector("#" + this.introID);

        //#region Loader Background
        let div_loader_background = document.createElement("div");
        div_loader_background.setAttribute("class", "loader-background");
        //#endregion

        //create the first element in the sequence (i.e. 3)
        let div_get_ready = document.createElement("div");
        div_get_ready.setAttribute("class", "ui-info-toast-countdown");
        div_get_ready.innerText = "3";

        //show the elements inside the container for the time specified
        GDDOM.ShowElementsFor(container, [div_loader_background, div_get_ready], 0, 1000).then(resolve => {

            //create the next element in the sequence (i.e. 2)
            let div_get_ready = document.createElement("div");
            div_get_ready.setAttribute("class", "ui-info-toast-countdown");
            div_get_ready.innerText = "2";

            //show the elements inside the container for the time specified
            GDDOM.ShowElementsFor(container, [div_loader_background, div_get_ready], 0, 1000).then(resolve => {

                //create the next element in the sequence (i.e. 1)
                let div_get_ready = document.createElement("div");
                div_get_ready.setAttribute("class", "ui-info-toast-countdown");
                div_get_ready.innerText = "1";

                //show the elements inside the container for the time specified
                GDDOM.ShowElementsFor(container, [div_loader_background, div_get_ready], 0, 1000).then(resolve => {

                    //create the next element in the sequence (i.e. Go!)
                    let div_get_ready = document.createElement("div");
                    div_get_ready.setAttribute("class", "ui-info-toast-countdown");
                    div_get_ready.innerText = "Go!";
                    div_get_ready.style.font = "18pt Orbitron, Impact, Charcoal, sans-serif;";
                    //get the dimensions of the text "Go!" when drawn with the font size and family specificed in the CSS style (i.e. ui-info-toast-countdown)
                    let halfWidth = GDDOM.GetTextDimensions(div_get_ready,  div_get_ready.style.font).width/2;
                    div_get_ready.setAttribute("style", "margin-left: " + -1 * halfWidth + ";");

                     //show the elements inside the container for the time specified
                    GDDOM.ShowElementsFor(container, [div_loader_background, div_get_ready], 0, 1000).then(resolve => {

                        //finally start the game!
                        this.StartGame();
                        NotificationCenter.Notify(
                            new Notification(
                                NotificationType.Menu,
                                NotificationAction.ShowMenuChanged,
                                [StatusType.IsDrawn | StatusType.IsUpdated, this.id]
                            )
                        );
                    });
                });
            });
        });
    }


    StartGame() {
        //hide the <div> with class="menu" for the correct parent (i.e. each menu has a parent id)
        this.Hide("#" + this.menuID + " .menu");
        //show canvas where actual game is drawn
        this.Show("#" + this.menuID + " #" + this.canvasID);

        NotificationCenter.Notify(
            new Notification(
              NotificationType.Sound,
              NotificationAction.Play,
              ["main_music"]
            )
          );
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
            //#region DOM related Intro & Loader functionality
            this.StartLoader();
            //#endregion
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