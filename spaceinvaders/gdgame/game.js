
//#region Development Diary
/*
Week 1 - January 20th 2020
------

To Do:
- Add collision detection and collision response.
- Add Start/Pause/Game Over menu.
- Add ScreenManager to store screen size and calculate BSP (binary space partitions).r
- Prevent player from moving outside of the screen.
- Trigger events on enemies reaching bottom of the screen.
- Add IsFirstKeyPress and IsKeyPressedSinceMs to KeyboardManager.
- Shoot sound is too long for fireInterval => either fire fewer bullets or edit and shorten sound

Done:
- Added screen rectangle to game.js to store dimensions of the canvas - used for CD/CR checking.
- Added MyCollisionManager methods to support CD/CR.
- Added jsconfig to support intellisense between engine and game specific classes.
*/


/*
Week - January 9th 2020
------

To Do:
- Add collision detection and collision response.
- Add Start/Pause/Game Over menu.
- Add ScreenManager to store screen size and calculate BSP (binary space partitions).r
- Prevent player from moving outside of the screen.
- Trigger events on enemies reaching bottom of the screen.
- Add IsFirstKeyPress and IsKeyPressedSinceMs to KeyboardManager.
- Shoot sound is too long for fireInterval => either fire fewer bullets or edit and shorten sound

Done:
- Completed NotificationCentre::Notify() using Reflect to call method in correct context.
- Completed SoundManager by adding HandleNotification().
- BUG: Game was only showing background and collision rectangles because decoratorSprites were drawn last and so were over-drawing everything else.  
- BUG: Background image was not showing because MyObjectManager::Draw() was calling Update() instead of Draw() on decoratorSprites.
- Complete NotificationManager (renamed to NotificationCenter).
*/


/*
Week 13 (Final Week)
------

To Do:
- Discuss NotificationCenter and discuss NotificationType.
- Add collision detection and collision response.
- Add Start/Pause/Game Over menu.
- Add ScreenManager to store screen size and calculate BSP (binary space partitions).r
- Prevent player from moving outside of the screen.
- Trigger events on enemies reaching bottom of the screen.
- Add IsFirstKeyPress and IsKeyPressedSinceMs to KeyboardManager.
- Shoot sound is too long for fireInterval => either fire fewer bullets or edit and shorten sound

Done:
- BUG: Game was only showing background and collision rectangles because decoratorSprites were drawn last and so were over-drawing everything else.  
- BUG: Background image was not showing because MyObjectManager::Draw() was calling Update() instead of Draw() on decoratorSprites.
- Complete NotificationManager (renamed to NotificationCenter).
*/

/*
Week 11
------

To Do:
- Add collision detection and collision response  
- Complete NotificationManager (WORK IN PROGRESS).
- Add IsFirstKeyPress and IsKeyPressedSinceMs to KeyboardManager.
- Shoot sound is too long for fireInterval => either fire fewer bullets or edit and shorten sound

Done:
- BUG: Fixed bug in PlayerFireBehavior::Execute() - see line: bulletClone.Transform2D.Translation = parent.Transform2D.Translation.Clone();
- Moved hard-coded magic numbers related to bullet and player into GameConstants.js
- Added Clone() to all existing behaviors
- Amended Actor2D and Sprite Clone() method to also clone behaviors
- Added debug draw of bounding boxes to ObjectManager and enabled in MyObjectManager
- Complete MyObjectManager (WORK IN PROGRESS) to the game to store, update and draw game sprites
- Add IsFirstKeyPress and IsKeyPressedSinceMs to KeyboardManager.
*/

/*
Week 9
------

Bugs:
- Background sprite is not drawing since move to MyObjectManager.

To Do:
- Complete PlayerFireBehavior.
- Complete NotificationManager (WORK IN PROGRESS).
- Complete MyObjectManager (WORK IN PROGRESS) to the game to store, update and draw game sprites
- Add IsFirstKeyPress and IsKeyPressedSinceMs to KeyboardManager.

Done:
- Added a bounding rectangle to every instance of Transform2D which updates if the transform values change (e.g. change to translation value of onscreen sprite).
- Updated CycleMoveDescendBehavior.js and PlayerMoveBehavior.js to use new SetTranslate() and TranslateBy() methods in Transform2D.
- Moved some constants to our game constants file, GameConstants.js, and the engine constants file, Constants.js
- Re-organised SpaceInvaders.js by adding regions and breaking down LoadSprites into sub-functions to load each sprite type e.g. barrier, enemy.
- Completed Rect class and tested Equals, ToString, Contains, Intersects and Clone.
- Added KeyboardManager.
- Added ObjectManager.
- Moved our game specific code (i.e. non-engine) into gdgame folder.
- Moved Keys enum to engine/constants.
- Added PlayerMoveBehavior to support moving player with Left and Right arrow keys.
- Added DemoSound to SpaceInvaders.js and removed event listeners for keyup and keydown.
- Add Reset to AudioCue which resets volumes to original value at startup.
*/

/*
Week 8
------

To Do:
- Complete Rect class and test Equals, ToString, Contains, Intersects and Clone.
- Complete NotificationManager (WORK IN PROGRESS).
- Complete MyObjectManager (WORK IN PROGRESS) to the game to store, update and draw game sprites
- Add IsFirstKeyPress and IsKeyPressedSinceMs to KeyboardManager.

Done:
- Added KeyboardManager.
- Added ObjectManager.
- Moved our game specific code (i.e. non-engine) into gdgame folder.
- Moved Keys enum to engine/constants.
- Added PlayerMoveBehavior to support moving player with Left and Right arrow keys.
- Added DemoSound to SpaceInvaders.js and removed event listeners for keyup and keydown.
- Add Reset to AudioCue which resets volumes to original value at startup.
*/

//#endregion

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
var soundManager;
var keyboardManager;
var objectManager;
var screenManager;
var physicsManager;
var collisionManager;
var notificationCenter;

//stores screen bounds in a rectangle
var screenRectangle;

/************************************************************ CORE GAME LOOP CODE UNDER THIS POINT ************************************************************/

// #region LoadGame, Start, Animate 
function LoadGame() {

  //load content
  Initialize();

  //start timer
  Start();
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

// #region Update, Draw 

function Update(gameTime) {
  //update all the game sprites
  this.objectManager.Update(gameTime);
  this.collisionManager.Update(gameTime);
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
  LoadInputManagers();
  LoadNotificationCenter();
  LoadAllOtherManagers();
  LoadSprites();
}

function InitializeScreenRectangle()
{
  this.screenRectangle = new Rect(cvs.clientLeft, cvs.clientTop, cvs.clientWidth, cvs.clientHeight);
}

function LoadNotificationCenter() {
  this.notificationCenter = new NotificationCenter();
}

function LoadInputManagers() {
    //checks for keyboard input
    this.keyboardManager = new KeyboardManager();
}

function LoadAllOtherManagers() {
  //renders game sprites
  let debugEnabled = false;
  this.objectManager = new MyObjectManager("game sprites", this.ctx, debugEnabled);

  //plays sound
  this.soundManager = new SoundManager(audioCueArray);

  //checks for collisions and determines the response
  this.collisionManager = new MyCollisionManager(this.objectManager, this.soundManager, this.screenRectangle);
}
/*************************************************************************************/
function LoadAssets() {
  //textures
  this.spriteSheet = document.getElementById("invaders_sprite_sheet");
  this.backgroundSpriteSheet = document.getElementById("invaders_background");
}

function LoadSprites() {
  LoadBackground();
  LoadEnemies();
  LoadBarriers();
  LoadPlayer();
}

function LoadBackground() {
  //Background
  var spriteArtist = new SpriteArtist(
    ctx,
    this.backgroundSpriteSheet,
    new Vector2(0, 0),
    new Vector2(
      this.backgroundSpriteSheet.width,
      this.backgroundSpriteSheet.height
    )
  );
  var transform = new Transform2D(
    new Vector2(0, 0),
    0,
    new Vector2(1, 1),
    new Vector2(0, 0),
    new Vector2(cvs.clientWidth, cvs.clientHeight)
  );
  this.objectManager.Add(
    new Sprite(
      "background",
      ActorType.Decorator,
      transform,
      spriteArtist,
      StatusType.IsUpdated | StatusType.IsDrawn
    )
  );
}

function LoadEnemies() {
  
  var scaleX = 2;
  var scaleY = 2;
  var startY = 50;
  var verticalOffset = 50;

  //ENEMY 1
  var spriteArtist = new AnimatedSpriteArtist(
    ctx,
    this.spriteSheet,
    1,
    ENEMY_ONE_CELLS,
    0
  );
  var transform = new Transform2D(
    new Vector2(0, 0),
    0,
    new Vector2(scaleX, scaleY),
    new Vector2(0, 0),
    new Vector2(ENEMY_ONE_WIDTH, ENEMY_HEIGHT)
  );
  var spriteArchetype = new Sprite(
    "enemy1",
    ActorType.Enemy,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn
  );

  for (let i = 0; i <= 8; i++) {
    var spriteClone = spriteArchetype.Clone();
    spriteClone.ID = "enemy 1 - " + i;
    spriteClone.Transform2D.Translation = new Vector2(50 * i + 30, startY);
    spriteClone.AttachBehavior(
      new CycleMoveDescendBehavior(
        new Vector2(20, 0),
        5,
        1000,
        new Vector2(0, 20)
      )
    );
    this.objectManager.Add(spriteClone); //add a new sprite
  }

  //ENEMY 2
  spriteArtist = new AnimatedSpriteArtist(
    ctx,
    this.spriteSheet,
    4,
    ENEMY_TWO_CELLS,
    0
  );
  transform = new Transform2D(
    new Vector2(0, 0),
    0,
    new Vector2(scaleX, scaleY),
    new Vector2(0, 0),
    new Vector2(ENEMY_TWO_WIDTH, ENEMY_HEIGHT)
  );
  spriteArchetype = new Sprite(
    "enemy2",
    ActorType.Enemy,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn
  );

  for (let i = 0; i <= 8; i++) {
    var spriteClone = spriteArchetype.Clone();
    spriteClone.ID = "enemy 2 - " + i;
    spriteClone.Transform2D.Translation = new Vector2(50 * i + 35, startY + verticalOffset);
    spriteClone.AttachBehavior(
      new CycleMoveDescendBehavior(
        new Vector2(20, 0),
        5,
        1000,
        new Vector2(0, 20)
      )
    );
    this.objectManager.Add(spriteClone); //add a new sprite
  }

  //ENEMY 3
  spriteArtist = new AnimatedSpriteArtist(
    ctx,
    this.spriteSheet,
    4,
    ENEMY_THREE_CELLS,
    0
  );
  transform = new Transform2D(
    new Vector2(0, 0),
    0,
    new Vector2(scaleX, scaleY),
    new Vector2(0, 0),
    new Vector2(ENEMY_THREE_WIDTH, ENEMY_HEIGHT)
  );
  spriteArchetype = new Sprite(
    "enemy3",
    ActorType.Enemy,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn
  );

  for (let i = 0; i <= 8; i++) {
    var spriteClone = spriteArchetype.Clone();
    spriteClone.ID = "enemy 3 - " + i;
    spriteClone.Transform2D.Translation = new Vector2(50 * i + 28, startY + 2 * verticalOffset);
    spriteClone.AttachBehavior(
      new CycleMoveDescendBehavior(
        new Vector2(20, 0),
        5,
        1000,
        new Vector2(0, 20)
      )
    );
    this.objectManager.Add(spriteClone); //add a new sprite
  }
}

function LoadBarriers() {
  var spriteArtist = new SpriteArtist(
    ctx,
    this.spriteSheet,
    new Vector2(BARRIER_LEFT, BARRIER_TOP),
    new Vector2(BARRIER_WIDTH, BARRIER_HEIGHT)
  );
  var transform = new Transform2D(
    new Vector2(100, 200),
    0,
    new Vector2(1, 1),
    new Vector2(0, 0),
    new Vector2(BARRIER_WIDTH, BARRIER_HEIGHT)
  );
  spriteArchetype = new Sprite(
    "barrier",
    ActorType.DestructibleObstacle,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn
  );

  for (let i = 0; i <= 5; i++) {
    var spriteClone = spriteArchetype.Clone();
    spriteClone.ID = "barrier - " + i;
    spriteClone.Transform2D.Translation = new Vector2(106 * i + 70, 700);
    this.objectManager.Add(spriteClone); //add a new sprite
  }
}

function LoadPlayer() {
  //BULLET
  let artist = new SpriteArtist(
    ctx,
    this.spriteSheet,
    BULLET_TYPE_A_SPRITESHEET_ORIGIN,
    BULLET_TYPE_A_SPRITESHEET_DIMENSIONS,
    1
  );

  //initial translation doesnt matter since it will be instanciated at player
  transform = new Transform2D(
    BULLET_TYPE_A_INITIAL_TRANSLATION,
    0,
    new Vector2(1, 1),
    Vector2.Zero,
    BULLET_TYPE_A_SPRITESHEET_DIMENSIONS
  );

  let archetypalBullet = new Sprite(
    "arch bullet",
    ActorType.Bullet,
    transform,
    artist,
    StatusType.Off
  ); //starts as off
  archetypalBullet.AttachBehavior(
    new MoveBehavior(BULLET_TYPE_A_MOVE_DIRECTION, BULLET_TYPE_A_MOVE_SPEED)
  ); //60 pixels/second

  /****************************************************************************/

  //PLAYER
  var spriteArtist = new SpriteArtist(
    ctx,
    this.spriteSheet,
    new Vector2(PLAYER_LEFT, PLAYER_TOP),
    new Vector2(PLAYER_WIDTH, PLAYER_HEIGHT)
  );

  var transform = new Transform2D(
    new Vector2((cvs.clientWidth - PLAYER_WIDTH) / 2, PLAYER_Y_POSITION),
    0,
    new Vector2(1, 1),
    PLAYER_ORIGIN,
    new Vector2(PLAYER_WIDTH, PLAYER_HEIGHT)
  );

  var playerSprite = new Sprite(
    "player",
    ActorType.Player,
    transform,
    spriteArtist,
    StatusType.IsUpdated | StatusType.IsDrawn
  );

  playerSprite.AttachBehavior(
    new PlayerMoveBehavior(
      this.keyboardManager,
      PLAYER_MOVE_DIRECTION,
      PLAYER_MOVE_SPEED
    )
  );

  playerSprite.AttachBehavior(
    new PlayerFireBehavior(
      this.keyboardManager,
      this.soundManager,
      this.objectManager,
      BULLET_TYPE_A_FIRE_INTERVAL_IN_MS,
      archetypalBullet,
      BULLET_TYPE_A_OFFSET_FROM_PLAYER
    )
  );

  this.objectManager.Add(playerSprite);
}
// #endregion 
