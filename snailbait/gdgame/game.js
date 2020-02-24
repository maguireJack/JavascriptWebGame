//#region Development Diary
/*
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
- When platform and platform above are separated by only player height?

*/

/*
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
- When platform and platform above are separated by only player height?

*/

/*
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
- When platform and platform above are separated by only player height?

*/

/*
Week 2 
------
To Do:
- Add PlayerMoveBehavior::ExecuteFall()
- Add ScrollingBackgroundArtist
- Add PlatformArtist

Done:
- Added RectangleSpriteArtist
- Added initial fall code
*/

/*
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
var spriteSheet, backgroundSpriteSheet;

//managers and notification
var objectManager;
var soundManager;
var notificationCenter;
var gameStateManager;
//...

//stores screen bounds in a rectangle
var screenRectangle;
//#endregion

/************************************************************ CORE GAME LOOP CODE UNDER THIS POINT ************************************************************/

// #region  LoadGame, Start, Animate
function LoadGame() {
  //load content
  Initialize();

  //start timer - notice that it is called only after we loaded all the game content
  Start();

  //publish an event to pause the object manager (i.e. no update, no draw) and show the menu
 this.notificationCenter.Notify(new Notification(NotificationType.Menu, NotificationAction.ShowMenuChanged,  [StatusType.Off]));
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

  //#region Platform Test
  //press -> and move platform left
  if (this.keyboardManager.IsKeyDown(Keys.ArrowRight)) {
    this.objectManager.DeltaTranslationOffset = new Vector2(-3, 0);
  } else if (this.keyboardManager.IsKeyDown(Keys.ArrowLeft)) {
    this.objectManager.DeltaTranslationOffset = new Vector2(3, 0);
  }
  //#endregion
}

function Draw(gameTime) {
  //clear screen on each draw of ALL sprites (i.e. menu and game sprites)
  ClearScreen(Color.Black);

  //draw all the game sprites
  this.objectManager.Draw(gameTime);
}

function ClearScreen(color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cvs.clientWidth, cvs.clientHeight);
  ctx.restore();
}

// #endregion

/************************************************************ YOUR GAME SPECIFIC UNDER THIS POINT ************************************************************/

// #region  Initialize, Load
function Initialize() {
  InitializeScreenRectangle();
  LoadAssets();
  LoadNotificationCenter();
  LoadManagers();
  LoadSprites();
  this.isPlaying = false;
}


function InitializeScreenRectangle() {
  this.screenRectangle = new Rect(
    cvs.clientLeft,
    cvs.clientTop,
    cvs.clientWidth,
    cvs.clientHeight
  );
}

function LoadNotificationCenter() {
  this.notificationCenter = new NotificationCenter();
}

function LoadManagers() {
  let debugEnabled = true;
  let scrollBoundingBoxBorder = 20;
  this.objectManager = new MyObjectManager(
    "game sprites",
    StatusType.IsUpdated | StatusType.IsDrawn,
    this.notificationCenter,
    this.cvs,
    this.ctx,
    debugEnabled,
    scrollBoundingBoxBorder
  );

  //checks for keyboard input
  this.keyboardManager = new KeyboardManager();

  //adds support for storing and responding to changes in game state e.g. player collect all inventory items, or health == 0
  this.gameStateManager = new MyGameStateManager("store and manage game state", this.notificationCenter);

  //audio - step 3 - instanciate the sound manager with the array of cues
  this.soundManager = new SoundManager(audioCueArray, this.notificationCenter);

  //adds support for a menu system
  this.menuManager = new MyMenuManager(this.notificationCenter, this.keyboardManager);

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
}

function LoadBackground() {

  for(let i = 0; i < BACKGROUND_DATA.length; i++)
  {
    let spriteArtist = new ScrollingSpriteArtist(
      ctx,
      BACKGROUND_DATA[i].spriteSheet,
      BACKGROUND_DATA[i].sourcePosition,
      BACKGROUND_DATA[i].sourceDimensions,
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
        transform,
        spriteArtist,
        StatusType.IsUpdated | StatusType.IsDrawn,
        BACKGROUND_DATA[i].scrollSpeedMultiplier,
        BACKGROUND_DATA[i].layerDepth,
      )
    );
  }

  //sort all background sprites by depth 0 (back) -> 1 (front)
  this.objectManager.SortAllByDepth(this.objectManager.BackgroundSprites, 
                      function sortAscendingDepth(a, b) {return a.LayerDepth - b.LayerDepth});
  
}

function LoadPlatforms(){

  let spriteArtist = new SpriteArtist(
    ctx,
    PLATFORM_DATA.spriteSheet,
    PLATFORM_DATA.sourcePosition,
    PLATFORM_DATA.sourceDimensions
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
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn,
    PLATFORM_DATA.scrollSpeedMultiplier,
    PLATFORM_DATA.layerDepth,
  )

  this.objectManager.Add(platformSprite);

  let clone = null;

  for(let i = 1; i < PLATFORM_DATA.translationArray.length; i++)
  {
    clone = platformSprite.Clone();
    clone.Transform2D.Translation = PLATFORM_DATA.translationArray[i];
    this.objectManager.Add(clone);
  }

}

function LoadPickups(){
  let spriteArtist = new AnimatedSpriteArtist(
    ctx,
    this.spriteSheet,
    SAPPHIRE_CELLS_FPS,
    SAPPHIRE_CELLS, //used to access animation sprites - see MyConstants
    0
  );

  let transform = new Transform2D(
    new Vector2(530, 250),
    0,
    new Vector2(1, 1),
    new Vector2(0, 0),
    new Vector2(SAPPHIRE_CELLS_WIDTH, SAPPHIRE_CELLS_HEIGHT) //used for CD/CR rectangle - see MyConstants
  );

  let pickupSprite = new Sprite(
    "sapphire",
    ActorType.Health,
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
  let spriteArtist = new AnimatedSpriteArtist(
    ctx,
    this.spriteSheet,
    BEE_ANIMATION_FPS,
    BEE_CELLS, //used to access animation sprites - see MyConstants
    0
  );

  let transform = new Transform2D(
    new Vector2(200, 200),
    0,
    new Vector2(1, 1),
    new Vector2(0, 0),
    new Vector2(BEE_CELLS_WIDTH, BEE_CELLS_HEIGHT) //used for CD/CR rectangle - see MyConstants
  );

  let enemySprite = new MoveableSprite(
    "bee",
    ActorType.Enemy,
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
  let spriteArtist = new AnimatedSpriteArtist(
    ctx,
    this.spriteSheet,
    RUNNER_ANIMATION_FPS,
    RUNNER_CELLS_RIGHT, //used to access animation sprites for right walk - see MyConstants
    0
  );

  let transform = new Transform2D(
    new Vector2(RUNNER_START_X_POSITION, RUNNER_START_Y_POSITION),
    0,
    new Vector2(1, 1),
    new Vector2(0, 0),
    new Vector2(RUNNER_CELLS_WIDTH, RUNNER_CELLS_HEIGHT) //used for CD/CR rectangle - see MyConstants
  );

  let playerSprite = new MoveableSprite(
    "player",
    ActorType.Player,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn,
    1,
    1
  );

  //set performance characteristics of the body attached to the moveable sprite
  playerSprite.Body.MaximumSpeed = 6;
  playerSprite.Body.Friction = FrictionType.Normal;
  playerSprite.Body.Gravity = GravityType.Normal;

  playerSprite.AttachBehavior(
    new PlayerBehavior(
      this.keyboardManager,
      this.objectManager,
      RUNNER_MOVE_KEYS,
      RUNNER_RUN_VELOCITY,
      RUNNER_JUMP_VELOCITY,
      RUNNER_CELLS_LEFT,
      RUNNER_CELLS_RIGHT
      )
  );

  this.objectManager.Add(playerSprite); //add player sprite
}

