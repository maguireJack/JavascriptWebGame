//#region Development Diary
/*

Week 7 
------
Comments: 
- None

Exercises: 
- None

Notes:
- None

To Do:
- Wrap MyConstants.js and Constants.js in a class to set scope and no longer pollute global project space.
- Add booleans to DebugDrawer to enable/disable drawing of BBs for objects and camera, and drawing of debug text.
- Re-factor CameraManager to align with ObjectManager use of predicates etc?
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

Bugs:
- Camera bounding box is not updating on camera scale, rotate.
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?
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
  NotificationCenter.Notify(
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
  //to do...
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
  this.gameStateManager = new MyGameStateManager("store and manage game state",this.notificationCenter);

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

    //to do...
//   //textures
//   this.spriteSheet = document.getElementById("snailbait_sprite_sheet");
//   //grass
//   this.jungleSpriteSheet = document.getElementById("snailbait_jungle_tileset");
//   //see MyConstants::BACKGROUND_DATA for background sprite sheet load
}

function LoadSprites() {
 LoadPlayer();
}

function LoadPlayer() {
    //to do...
}
