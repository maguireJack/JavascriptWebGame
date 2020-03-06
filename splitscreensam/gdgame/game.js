//#region Development Diary
/*

- Rotate, NON-AABB, BSP, Camera, Dynamic canvas, draw across canvas, multi-player menu

Week 7 
------
Notes:
- None

Exercises: 
- None

To Do (Snailbait):
- Wrap MyConstants.js and Constants.js in a class to set scope and no longer pollute global project space.
- Add booleans to DebugDrawer to enable/disable drawing of BBs for objects and camera, and drawing of debug text.
- Improve SoundManager to block load until all sound resources have loaded.
- Add pause/unpause to SoundManager when we lose/gain window focus.
- Add code to calculate TextSpriteArtist bounding box size based on text used.
- Fix background UpdateHorizontalScrolling().
- Add countdown toast when we gain window focus.
- Add check for "P" key in MyMenuManager::Update() to show/hide menu
- Improve KeyboardManager to add IsFirstKeyPress() method.
- Complete menu demo.
- Continue adding documentation to all classes and methods.

Done:
- None

Bugs (Snailbait):
- Camera bounding box is not updating on camera scale, rotate.
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?
*/

//#endregion

class Game {

  /************************************************************ CORE CODE THAT DOESN'T CHANGE EXCEPT WHEN ADDING/REMOVING/REFACTORING MANAGERS ************************************************************/

  //#region Fields
  //canvas and context
  cvs;
  ctx;

  //game resources
  spriteSheet;
  jungleSpriteSheet;

  //time object and notification 
  gameTime;
  notificationCenter;

  //managers
  objectManager;
  soundManager;
  gameStateManager;
  cameraManager;

  //debug
  debugModeOn;
  //#endregion

  //#region Constructor
  constructor(debugModeOn) {
    //enable/disable debug info
    this.debugModeOn = debugModeOn;
  }
  //#endregion

  // #region LoadGame, Start, Animate
  LoadGame(canvasID) {

    let m = Matrix.CreateRotation(GDMath.ToRadians(45));
    let look = new Vector2(1, 0);
    look.Transform(m);



    //load content
    this.Initialize(canvasID);

    //start timer - notice that it is called only after we loaded all the game content
    this.Start();

    //publish an event to pause the object manager (i.e. no update, no draw) and show the menu
    NotificationCenter.Notify(
      new Notification(
        NotificationType.Menu,
        NotificationAction.ShowMenuChanged,
        [StatusType.Off]
      )
    );
  }

  Start() {
    //runs in proportion to refresh rate
    this.gameTime = new GameTime();
    this.animationTimer = window.requestAnimationFrame(this.Animate.bind(this));
  }

  Animate(now) {
    this.gameTime.Update(now);
    this.Update(this.gameTime);
    this.Draw(this.gameTime);
    window.requestAnimationFrame(this.Animate.bind(this));
  }
  // #endregion

  // #region Update, Draw
  Update(gameTime) {
    //update all the game sprites
    this.objectManager.Update(this.gameTime);

    //draw the sprites
    this.renderManager.Update(gameTime);

    //updates the camera manager which in turn updates all cameras
    this.cameraManager.Update(gameTime);

    //DEBUG - REMOVE LATER
    if (this.debugModeOn)
      this.debugDrawer.Update(gameTime);
  }

  Draw(gameTime) {
    //clear screen on each draw of ALL sprites (i.e. menu and game sprites)
    this.ClearScreen(Color.Grey);

    //draw all the game sprites
    this.renderManager.Draw(gameTime);

    //DEBUG - REMOVE LATER
    if (this.debugModeOn)
      this.debugDrawer.Draw(gameTime);
  }

  ClearScreen(color) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.cvs.clientWidth, this.cvs.clientHeight);
    this.ctx.restore();
  }
  // #endregion

  /************************************************************ YOUR GAME SPECIFIC UNDER THIS POINT ************************************************************/
  // #region Initialize, Load(Debug, Cameras, Managers)
  Initialize(canvasID) {
    this.LoadCanvases(canvasID);
    this.LoadAssets();
    this.LoadNotificationCenter();
    this.LoadInputAndCameraManagers();
    this.LoadCameras(); //make at the end as 1+ behaviors in camera may depend on sprite
    this.LoadAllOtherManagers();
    this.LoadSprites();

    //DEBUG - REMOVE LATER
    if (this.debugModeOn)
      this.LoadDebug();

  }

  LoadCanvases(canvasID) {
    //get a handle to our context
    this.cvs = document.getElementById(canvasID);
    this.ctx = this.cvs.getContext("2d");
  }

  LoadCameras() {
    let transform = new Transform2D(
      new Vector2(0, 0),
      0,
      new Vector2(1, 1),
      new Vector2(this.cvs.clientWidth / 2, this.cvs.clientHeight / 2),
      new Vector2(this.cvs.clientWidth, this.cvs.clientHeight),
      0
    );

    let camera = new Camera2D(
      "intro camera",
      ActorType.Camera,
      transform,
      StatusType.IsUpdated,
      this.ctx
    );

    camera.AttachBehavior(
      new FlightCameraBehavior(
        this.keyboardManager,
        [
          Keys.NumPad4, Keys.NumPad6, Keys.NumPad1, Keys.NumPad9,
          Keys.NumPad8, Keys.NumPad2, Keys.NumPad5
        ],
        new Vector2(3, 0),
        Math.PI / 180,
        new Vector2(0.005, 0.005)
      )
    );

   // camera.AttachBehavior(new ThirdPersonCameraBehavior(this));

    this.cameraManager.Add(camera);
  }

  LoadNotificationCenter() {
    this.notificationCenter = new NotificationCenter();
  }

  LoadInputAndCameraManagers() {
    //checks for keyboard input
    this.keyboardManager = new KeyboardManager();
    //stores the cameras in our game
    this.cameraManager = new CameraManager("stores and manages cameras");
  }

  LoadAllOtherManagers() {
    //update objects
    this.objectManager = new ObjectManager(
      "game sprites",
      StatusType.IsUpdated,
      this.cameraManager,
      this.notificationCenter
    );

    //draw objects
    this.renderManager = new RenderManager(
      "draws sprites in obj manager",
      StatusType.IsDrawn,
      this.objectManager,
      this.cameraManager,
      this.notificationCenter);

    //load other managers...
  }

  LoadDebug() {
    this.debugDrawer = new DebugDrawer("shows debug info",
      this.ctx, this.objectManager, this.cameraManager);
  }
  //#endregion

  //#region Load(Assets, Sprites)
  LoadAssets() {
  }

  LoadSprites() {
    this.LoadPlayer();
  }

  GetTarget()
  {
    return this.playerSprite;
  }

  LoadPlayer() {
    let spriteArtist = new AnimatedSpriteArtist(1, GUARD_ANIMATION_DATA);
    spriteArtist.SetTake("walk");

    let transform = new Transform2D(
      GUARD_START_POSITION,
      0,
      new Vector2(1, 1),
      new Vector2(64, 64),
      spriteArtist.GetBoundingBoxByTakeName("walk"),
      -20
    );

    this.playerSprite = new Sprite(
      "guard1",
      ActorType.Player,
      CollisionType.Collidable,
      transform,
      spriteArtist,
      StatusType.IsUpdated | StatusType.IsDrawn,
      1,
      1
    );

    this.playerSprite.AttachBehavior(
      new GuardBehavior(
        this.keyboardManager,
        this.objectManager,
        GUARD_MOVE_KEYS,
        GUARD_MOVE_SPEED,
        GUARD_INITIAL_LOOK_DIRECTION,
        GUARD_ROTATE_RATE
      )
    );

    this.objectManager.Add(this.playerSprite); //add player sprite
  }
  //#endregion
}

window.addEventListener("load", event => {
  let game = new Game(true);
  game.LoadGame("game-canvas");
});