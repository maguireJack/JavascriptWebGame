//#region Development Diary
/*
Week 6 
------
Notes:
- Demo: CollisionType, ActorType, ObjectManager, DebugDrawer

To Do:
- Add booleans to DebugDrawer to enable/disable drawing of BBs for objects and camera, and drawing of debug text.
- Camera2D bounding box is not updating with scale or rotation changes.
- Re-introduce culling in MyObjectManager::Draw() based on Camera2D bounding box.
- Add DebugDrawer::Draw() and show object count, fps etc.

- Re-factor CameraManager to align with ObjectManager use of predicates etc?
- Improve SoundManager to block load until all sound resources have loaded.
- Add pause/unpause to SoundManager when we lose/gain window focus.
- Fix bounding box on TextSpriteArtist - see constants::TextBaselineType and https://www.w3schools.com/tags/canvas_textbaseline.asp and https://www.w3schools.com/tags/canvas_measuretext.asp
- Fix UpdateHorizontalScrolling().
- Add countdown toast when we gain window focus.
- Add check for "P" key in MyMenuManager::Update() to show/hide menu
- Improve KeyboardManager to add IsFirstKeyPress() method.
- Complete menu demo.
- Continue adding documentation to all classes and methods.

Done:
- Removed ObjectManager::DrawDebugBoundingBox and created DebugDrawer to handle showing debug (bounding boxes, FPS) related information
- Added CollisionType to allow us to say which actors are collidable, or not.
- Re-factor MyObjectManager.
- Added predicate based remove, find, and sort functions to CameraManager.
- Fix no translate on numpad keys left, right.
- Add Camera2D and re-factor use of translationOffset in Transform2D and artist Draw().
- Add CameraManager to update all cameras.
- Complete TextSpriteArtist.
- Improve AnimatedSpriteArtist to store all animations for a sprite inside an object and not in a single array of cells.

Bugs:
- When we scroll L/R and the active camera NO LONGER intersects the centre background image (i.e. its bounding box) then the background is no drawn.
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?

Week 5 
------
Notes:
- None

To Do:
- Continue adding documentation to all classes and methods.
- Complete TextSpriteArtist.
- Improve AnimatedSpriteArtist to store all animations for a sprite inside an object and not in a single array of cells.
- Improve SoundManager to block load until all sound resources have loaded.
- Improve KeyboardManager to add IsFirstKeyPress() method.
- Add Camera2D and re-factor use of translationOffset in Transform2D and artist Draw().
- Complete menu demo.

Done:

Bugs:
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?

Week 4 
------
Notes:
- Runner jump and run values are finely balanced with friction and gravity - tweak these values for your own game - see Body

To Do:
- Complete menu demo.

Done:
- Added MyObjectManager pause event handling.
- Commented in code to play jump and background music (when you collide with the wasp/insect from the top)
- Fixed bug in AnimatedSpriteArtist Cells getter which would not reset animation frames if animation changed (e.g. from walk left to walk right).
- In MyObjectManager::RegisterForNotifications() removed reference to HandleSpriteNotification.
- In MyMenuManager::Initialize() changed this.notificationCenter.Notify() to notificationCenter.Notify().

Bugs:
- When we use background scroll <- and -> then collisions are not tested and responded to
- When jumping and touch platform to L or R - allows double jump?
- When player and platform above are separated by only player height?

Week 3 
------
Notes:
- Runner jump and run values are finely balanced with friction and gravity - tweak these values for your own game - see Body

To Do:
- Use 

Done:
- Added NotificationCenter instanciation in game.js to support sound, sprite removal, and game state events (e.g. inventory, ammo, pickup, health)
- Added HandleNotification() methods to MyObjectManager, SoundManager, and MyGameStateManager to listen for relevant NotificationCenter events - see PlayerBehavior::HandlePickupCollision()
- Added new AudioType to support damage and pickup category audio
- Added new ActorTypes to support ammo, pickup, inventory
- Simplified CD/CR in PlayerBehavior to check for platform, enemy, pickup collisions in separate methods
- Added Body class to support friction, velocity, and gravity
- Added MoveableSprite for sprites that will have an associated Body object
- Re-factored jump/fall physics in PlayerBehavior to reduce CPU overhead and add gravity and friction
- Added new objects in MyConstants to represent BACKGROUND_DATA and PLATFORM_DATA
- Added draw culling (dont draw sprites outside screen) to MyObjectManager::DrawAll()
- Added ScrollingBackgroundArtist and renamed to ScrollingSpriteArtist
- Added RectangleSpriteArtist
- Added initial fall code

Bugs:
- When jumping and touch platform to L or R - allows double jump?
- When player and platform above are separated by only player height?

Week 2 
------
To Do:
- Add PlayerMoveBehavior::ExecuteFall()
- Add ScrollingBackgroundArtist
- Add PlatformArtist

Done:
- Added RectangleSpriteArtist
- Added initial fall code

Week 1
------
To Do:
- Add PlayerMoveBehavior
- Add ScrollingBackgroundArtist
- Add PlatformArtist

Done:

*/

//#endregion

//#region Global Variables
/********************************************************************* EVENT LISTENERS *********************************************************************/
//add event listener for load
window.addEventListener("load", LoadGame);

/********************************************************************* GLOBAL VARS *********************************************************************/
//get a handle to our canvas
var cvs = document.getElementById("game-canvas");
//get a handle to 3D context which allows drawing
var ctx = cvs.getContext("2d");

//stores elapsed time
var gameTime;
//assets
var spriteSheet;

//managers and notification
var notificationCenter;
var objectManager;
var soundManager;
var gameStateManager;
var cameraManager;
//#endregion

//#region 
var debugModeOn = true;
//#endregion

/************************************************************ CORE GAME LOOP CODE UNDER THIS POINT ************************************************************/

// #region  LoadGame, Start, Animate
function LoadGame() {

  //load content
  Initialize();

  //start timer - notice that it is called only after we loaded all the game content
  Start();

  //publish an event to pause the object manager (i.e. no update, no draw) and show the menu
  this.notificationCenter.Notify(
    new Notification(
      NotificationType.Menu,
      NotificationAction.ShowMenuChanged,
      [StatusType.Off]
    )
  );
}

function Start() {
  //runs in proportion to refresh rate
  this.animationTimer = window.requestAnimationFrame(Animate);
  this.gameTime = new GameTime();
}

function Animate(now) {
  this.gameTime.Update(now);
  Update(this.gameTime);
  Draw(this.gameTime);
  window.requestAnimationFrame(Animate);
}
// #endregion

// #region  Update, Draw
function Update(gameTime) {
  //update all the game sprites
  this.objectManager.Update(gameTime);

  //update game state
  this.gameStateManager.Update(gameTime);

  //updates the menu manager to listen for show/hide menu keystroke
  this.menuManager.Update(gameTime);

  //updates the camera manager which in turn updates all cameras
  this.cameraManager.Update(gameTime);

  //DEBUG - REMOVE LATER
  if(this.debugModeOn)
    this.debugDrawer.Update(gameTime);
}

function Draw(gameTime) {
  //clear screen on each draw of ALL sprites (i.e. menu and game sprites)
  ClearScreen(Color.Black);

  //draw all the game sprites
  this.objectManager.Draw(gameTime);

    //DEBUG - REMOVE LATER
  if(this.debugModeOn)
    this.debugDrawer.Draw(gameTime);
}

function ClearScreen(color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cvs.clientWidth, cvs.clientHeight);
  ctx.restore();
}
// #endregion

/************************************************************ YOUR GAME SPECIFIC UNDER THIS POINT ************************************************************/

// #region Initialize, Load
function Initialize() {
  LoadAssets();
  LoadNotificationCenter();
  LoadInputAndCameraManagers();
  LoadCameras(); //make at the end as 1+ behaviors in camera may depend on sprite
  LoadAllOtherManagers();
  LoadSprites();

  //set game is playing
  this.isPlaying = false;

  //DEBUG - REMOVE LATER
  if(this.debugModeOn)
    LoadDebug();

}

function LoadDebug(){
  this.debugDrawer = new DebugDrawer("shows debug info", this.ctx, this.objectManager, this.cameraManager);
}

function LoadCameras() {
  let transform = new Transform2D(
    new Vector2(0, 0),
    0,
    Vector2.One,
    new Vector2(cvs.clientWidth/2,  cvs.clientHeight/2),
    new Vector2(cvs.clientWidth, cvs.clientHeight),
    0
  );

  let camera = new Camera2D(
    "intro camera",
    ActorType.Camera,
    transform,
    StatusType.IsUpdated
  );

  camera.AttachBehavior(
    new FlightCameraBehavior(
      this.keyboardManager,
      [
        Keys.NumPad4,   Keys.NumPad6,  Keys.NumPad1,   Keys.NumPad9,
        Keys.NumPad8,   Keys.NumPad2,  Keys.NumPad5
      ],
      new Vector2(3,0),
      Math.PI / 180,
      new Vector2(0.005, 0.005)
    )
  );

 // camera.AttachBehavior(new PanCameraBehavior());
  this.cameraManager.Add(camera);
}

function LoadNotificationCenter() {
  this.notificationCenter = new NotificationCenter();
}

function LoadInputAndCameraManagers() {
  //checks for keyboard input
  this.keyboardManager = new KeyboardManager();
  //stores the cameras in our game
  this.cameraManager = new CameraManager("stores and manages cameras");
}

function LoadAllOtherManagers() {
  this.objectManager = new ObjectManager(
    "game sprites",
    StatusType.IsUpdated | StatusType.IsDrawn,
    this.ctx,
    this.cameraManager,
    this.notificationCenter
  );

  //adds support for storing and responding to changes in game state e.g. player collect all inventory items, or health == 0
  this.gameStateManager = new MyGameStateManager(
    "store and manage game state",
    this.notificationCenter
  );

  //audio - step 3 - instanciate the sound manager with the array of cues
  this.soundManager = new SoundManager(audioCueArray, this.notificationCenter);

  //adds support for a menu system
  this.menuManager = new MyMenuManager(
    this.notificationCenter,
    this.keyboardManager
  );

  //load other managers...
}

function LoadAssets() {
  //textures
  this.spriteSheet = document.getElementById("snailbait_sprite_sheet");
  //grass
  this.jungleSpriteSheet = document.getElementById("snailbait_jungle_tileset");
  //see MyConstants::BACKGROUND_DATA for background sprite sheet load
}

function LoadSprites() {
  LoadBackground();
  LoadPlatforms();
  LoadPickups();
  LoadEnemies();
  LoadPlayer();
  LoadOnScreenText();
}

function LoadBackground() {
  for (let i = 0; i < BACKGROUND_DATA.length; i++) {
    let spriteArtist = new ScrollingSpriteArtist(
      ctx,
      BACKGROUND_DATA[i].spriteSheet,
      BACKGROUND_DATA[i].sourcePosition,
      BACKGROUND_DATA[i].sourceDimensions,
      1,
      cvs.width,
      cvs.height
    );
    let transform = new Transform2D(
      BACKGROUND_DATA[i].translation,
      BACKGROUND_DATA[i].rotation,
      BACKGROUND_DATA[i].scale,
      BACKGROUND_DATA[i].origin,
      new Vector2(cvs.clientWidth, cvs.clientHeight)
    );
    this.objectManager.Add(
      new Sprite(
        BACKGROUND_DATA[i].id,
        BACKGROUND_DATA[i].actorType,
        BACKGROUND_DATA[i].collisionType,
        transform,
        spriteArtist,
        StatusType.IsUpdated | StatusType.IsDrawn,
        BACKGROUND_DATA[i].scrollSpeedMultiplier,
        BACKGROUND_DATA[i].layerDepth
      )
    );
  }

  //sort all background sprites by depth 0 (back) -> 1 (front)
  this.objectManager.Sort(ActorType.Background, function sortAscendingDepth(a, b) {
      return a.LayerDepth - b.LayerDepth;
    }
  );
}

function LoadPlatforms() {
  let spriteArtist = new SpriteArtist(
    ctx,
    PLATFORM_DATA.spriteSheet,
    PLATFORM_DATA.sourcePosition,
    PLATFORM_DATA.sourceDimensions,
    1
  );

  let transform = new Transform2D(
    PLATFORM_DATA.translationArray[0],
    PLATFORM_DATA.rotation,
    PLATFORM_DATA.scale,
    PLATFORM_DATA.origin,
    PLATFORM_DATA.sourceDimensions,
    PLATFORM_DATA.explodeBoundingBoxInPixels
  );

  let platformSprite = new Sprite(
    PLATFORM_DATA.id,
    PLATFORM_DATA.actorType,
    PLATFORM_DATA.collisionType, 
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn,
    PLATFORM_DATA.scrollSpeedMultiplier,
    PLATFORM_DATA.layerDepth
  );

  this.objectManager.Add(platformSprite);

  let clone = null;

  for (let i = 1; i < PLATFORM_DATA.translationArray.length; i++) {
    clone = platformSprite.Clone();
    clone.Transform2D.Translation = PLATFORM_DATA.translationArray[i];
    this.objectManager.Add(clone);
  }
}

function LoadPickups() {
  let spriteArtist = new AnimatedSpriteArtist(
    ctx,
    1,
    COLLECTIBLES_ANIMATION_DATA
  );
  spriteArtist.SetTake("gold_glint");

  let transform = new Transform2D(
    new Vector2(530, 250),
    0,
    Vector2.One,
    Vector2.Zero,
    spriteArtist.GetBoundingBoxByTakeName("gold_glint"),
    0
  );

  let pickupSprite = new Sprite(
    "gold",
    ActorType.Pickup,
    CollisionType.Collidable,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn,
    1,
    1
  );

  //your code - does a pickup need behavior?

  this.objectManager.Add(pickupSprite);
}

function LoadEnemies() {
  let spriteArtist = new AnimatedSpriteArtist(ctx, 1, ENEMY_ANIMATION_DATA);
  spriteArtist.SetTake("wasp_fly");

  let transform = new Transform2D(
    new Vector2(200, 200),
    0,
    new Vector2(1, 1),
    Vector2.Zero,
    spriteArtist.GetBoundingBoxByTakeName("wasp_fly"),
    0
  );

  let enemySprite = new MoveableSprite(
    "wasp",
    ActorType.Enemy,
    CollisionType.Collidable,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn,
    1,
    1
  );

  //set performance characteristics of the body attached to the moveable sprite
  enemySprite.Body.MaximumSpeed = 6;
  enemySprite.Body.Friction = FrictionType.Normal;
  enemySprite.Body.Gravity = GravityType.Normal;

  //your code - add bee move behavior here...

  this.objectManager.Add(enemySprite);
}

function LoadPlayer() {
  let spriteArtist = new AnimatedSpriteArtist(ctx, 1, RUNNER_ANIMATION_DATA);
  spriteArtist.SetTake("run_right");

  let transform = new Transform2D(
    RUNNER_START_POSITION,
    0,
    Vector2.One,
    Vector2.Zero,
    spriteArtist.GetBoundingBoxByTakeName("run_right"),
    0
  );

  let playerSprite = new MoveableSprite(
    "player",
    ActorType.Player,
    CollisionType.Collidable,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn,
    1,
    1
  );

  // //set performance characteristics of the body attached to the moveable sprite
  playerSprite.Body.MaximumSpeed = 6;
  playerSprite.Body.Friction = FrictionType.Normal;
  playerSprite.Body.Gravity = GravityType.Normal;

  playerSprite.AttachBehavior(
    new PlayerBehavior(
      this.keyboardManager,
      this.objectManager,
      RUNNER_MOVE_KEYS,
      RUNNER_RUN_VELOCITY,
      RUNNER_JUMP_VELOCITY
    )
  );

  this.objectManager.Add(playerSprite); //add player sprite
}

function LoadOnScreenText() {
  let transform = new Transform2D(
    new Vector2(180,190),
    0,
    Vector2.One,
    Vector2.Zero,
    new Vector2(10, 10),
    0
  );

  let spriteArtist = new TextSpriteArtist(
    this.ctx,
    "Wasp[20, 5]",
    FontType.UnitInformationSmall,
    "rgb(0, 0, 0)",
    TextAlignType.Left,
    1,
    200
  );

  let sprite = new Sprite(
    "txt_ui_hello",
    ActorType.HUD,
    CollisionType.Collidable,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn,
    1,
    1
  );

  this.objectManager.Add(sprite);
}
