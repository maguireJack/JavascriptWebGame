//#region Development Diary
/*
Week 11
------
Notes:
- None

Exercises: 
- Add PICKUP_DECORATOR_ANIMATION_DATA and add animation
- Discuss coin pickup animations
- Discuss SamPlayerBehavior, UIManager, ThirdPersonCameraBehavior

To Do (Split Screen Sam):
- Add CD/CR against architecture
- Add animation on coin pickup
- Add HUD and show changes to health, ammo, coins
- Add ThirdPersonCameraBehavior to move with target player
- Add UIManager
- Rotate BB
- Update children position apart from passing reference to parent translation?
- Add toggleMenuKey functionality to MyMenuManager
- Rotate, NON-AABB, BSP, Camera, Dynamic canvas, draw across canvas, multi-player menu

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
- Replaced get/set with direct access in high frequency draw code
- Package canvas data

Bugs (Split Screen Sam):
- BB on players is not correctly set
- Player 2 is not responding to J/L keys
- Skew on gun rotation
- Camera culling has been disabled
- Camera bounding boxes are incorrect
- DebugDrawer text in bottom window (ctx.translate()) is not in the correct location

Bugs (Snailbait):
- Camera bounding box is not updating on camera scale, rotate.
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?
*/

/*
Week 10
------
Notes:
- None

Exercises: 
- None

To Do (Split Screen Sam):
- Add UIManager
- Rotate BB
- Update children position apart from passing reference to parent translation?
- Add toggleMenuKey functionality to MyMenuManager
- Rotate, NON-AABB, BSP, Camera, Dynamic canvas, draw across canvas, multi-player menu

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
- Replaced get/set with direct access in high frequency draw code
- Package canvas data

Bugs (Split Screen Sam):
- Skew on gun rotation
- Camera culling has been disabled
- Camera bounding boxes are incorrect
- DebugDrawer text in bottom window (ctx.translate()) is not in the correct location

Bugs (Snailbait):
- Camera bounding box is not updating on camera scale, rotate.
- When we scroll too far L/R then scrolling stops - see ScrollingSpriteArtist.
- When we use background scroll <- and -> then collisions are not tested and responded to
- When player and platform above are separated by only player height?
*/

/*
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
  screenBottom;
  screenTop;

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
  playerSprites = new Array();

  //multi-player count and ready test
  readyPlayers = 0;
  maxPlayers = 2;

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
  LoadGame() {

    //load content
    this.Initialize();

    //publish an event to pause the object manager (i.e. no update) and render manager (i.e. no draw) and show the menu
    NotificationCenter.Notify(
      new Notification(
        NotificationType.Menu,
        NotificationAction.ShowMenuChanged,
        [StatusType.Off, "menu-bottom", "menu-top"]
      )
    );
    

    //start timer - notice that it is called only after we loaded all the game content
    this.Start();
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

    //updates the camera manager which in turn updates all cameras
    this.cameraManager.Update(gameTime);

    //DEBUG - REMOVE LATER
    if (this.debugModeOn)
      this.debugDrawer.Update(gameTime);

  }

  Draw(gameTime) {
    //clear screen on each draw of ALL sprites (i.e. menu and game sprites)
    this.ClearScreen(this.screenTop.clearScreenColor, this.screenTop.cvs, this.screenTop.ctx, this.screenTop.topLeft);
    this.ClearScreen(this.screenBottom.clearScreenColor, this.screenBottom.cvs, this.screenBottom.ctx, this.screenBottom.topLeft);

    //draw all the game sprites
    this.renderManager.Draw(gameTime);

    //DEBUG - REMOVE LATER
    if (this.debugModeOn)
      this.debugDrawer.Draw(gameTime);
  }

  ClearScreen(color, canvasObject, context, topLeft) {
    context.save();
    context.fillStyle = color;
    context.fillRect(topLeft.x, topLeft.y, canvasObject.clientWidth, canvasObject.clientHeight);
    context.restore();
  }
  // #endregion

  /************************************************************ YOUR GAME SPECIFIC UNDER THIS POINT ************************************************************/
  // #region Initialize, Load(Debug, Cameras, Managers)
  Initialize() {
    this.SetGraphics();
    this.LoadCanvases();
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

  SetGraphics(){
    //to do - use this later to add and set canvas dimensions dynamically...
    /*
    //Cross-browser code to obtain browser width and height
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

      var height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
      */
  }

  LoadCanvases() {
    //get a handle to our context
    this.screenTop = GDGraphics.GetScreenObject("player 1", "camera top", "parent-top", 
    "canvas-top", "player-intro-top", "player-ui-top",
      new Vector2(0, 0), new Vector2(840, 346), Color.LightGreen);

    this.screenBottom = GDGraphics.GetScreenObject("player 2", "camera bottom", "parent-bottom", 
    "canvas-bottom", "player-intro-bottom", "player-ui-bottom",
      new Vector2(0, 0), new Vector2(840, 346), Color.LightGreen);
  }
  GetTargetPlayer(playerIndex) {
    if (playerIndex >= 0 && playerIndex < this.playerSprites.length)
      return this.playerSprites[playerIndex];
    else
      throw "Error: A behavior (e.g. TrackTargetTranslationBehavior) is looking for a player index that does not exist. Are there sufficient sprites in the playerSprites array?";
  }
  LoadCameras() {
    //#region Camera 1    
        let transform = new Transform2D(
          new Vector2(0, 0),
          0,
          new Vector2(2, 2),
          new Vector2(0, 0),
          new Vector2(this.screenTop.cvs.width, this.screenTop.cvs.height),
          0
        );
    
        let cameraTop = new Camera2D(
          "camera top",
          ActorType.Camera,
          transform,
          StatusType.IsUpdated,
          this.screenTop.ctx
        );
        /**************** NEED TO ATTACH A COLLISION PRIMITIVE (e.g. CIRCLE OR RECTANGLE) ****************/
        cameraTop.CollisionPrimitive = new RectCollisionPrimitive(transform, 0);
        cameraTop.AttachBehavior(new TrackTargetTranslationBehavior(this, 0, new Vector2(0, -100)));
        this.cameraManager.Add(cameraTop);
    //#endregion
    
    //#region Camera 2
    transform = new Transform2D(
      new Vector2(0, 0),
      0,
      new Vector2(2, 2),
      new Vector2(0, 0),
      new Vector2(this.screenBottom.cvs.width, this.screenBottom.cvs.height));
    
      console.log(transform);
      console.log(this.screenBottom);
    
    let cameraBottom = new Camera2D(
      "camera bottom",
      ActorType.Camera,
      transform,
      StatusType.IsUpdated,
      this.screenBottom.ctx
    );
    
    /**************** NEED TO ATTACH A COLLISION PRIMITIVE (e.g. CIRCLE OR RECTANGLE) ****************/
    cameraBottom.CollisionPrimitive = new RectCollisionPrimitive(transform, 0);
    cameraBottom.AttachBehavior(new TrackTargetTranslationBehavior(this, 1, new Vector2(0, -100)));
    this.cameraManager.Add(cameraBottom);
    //#endregion
    
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

  LoadAllOtherManagers(gameTime) {
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

      this.startGameSentinel = new NumericSentinel(2);

    //load a menu managers for each screen since they need to function independently
    this.menuManagerTop = new MyMenuManager("menu-top", this.notificationCenter, this.keyboardManager, 
                            this.screenTop, this.startGameSentinel);

    this.menuManagerBottom = new MyMenuManager("menu-bottom", this.notificationCenter, this.keyboardManager, 
                            this.screenBottom, this.startGameSentinel);

    //audio - step 3 - instanciate the sound manager with the array of cues
    this.soundManager = new SoundManager(
      audioCueArray, 
      this.notificationCenter);

    this.gameStateManager = new GameStateManager(
        "Main State Manager",
        this.notificationCenter
        );

  }


  LoadDebug() {
    this.debugDrawer = new DebugDrawer("shows debug info", StatusType.IsDrawn,
      this.objectManager, this.cameraManager,
      this.notificationCenter,
      DebugDrawType.ShowDebugText | DebugDrawType.ShowSpriteCollisionPrimitive);
  }
  //#endregion

  //#region Load(Assets, Sprites)
  LoadAssets() {
    //what could we use this for?
  }

  LoadSprites() {
    let sprite = null;
    this.objectManager.Clear();
    //load the level walls etc
    // this.LoadMultipleSpritesFrom2DArray(LEVEL_ARCHITECTURE_DATA);
    // this.LoadBackground();
    // //load all the pickups
    // this.LoadMultipleSpritesFrom2DArray(LEVEL_PICKUPS_DATA);
    // this.objectManager.Clear();

    this.LoadMultipleSpritesFrom2DArray(FLOOR_DATA);
    this.LoadMultipleSpritesFrom2DArray(WALL_DATA);
    
    

    // //load players
    // this.LoadAnimatedSprite(PICKUP_COIN_ANIMATION_DATA);

    // //load players
    sprite = this.LoadAnimatedPlayerSprite(PLAYER_ONE_DATA);
    this.objectManager.Add(sprite);
    this.playerSprites[0] = sprite;
    sprite = this.LoadWeapon(WEAPON_SWORD, this.playerSprites[0], new Vector2(10, 40));
    this.objectManager.Add(sprite);

    sprite = this.LoadAnimatedPlayerSprite(PLAYER_TWO_DATA);
    this.objectManager.Add(sprite);
    this.playerSprites[1] = sprite;


    sprite = this.LoadAnimatedEnemySprite(ENEMY_TYPE_ONE_DATA);
    this.objectManager.Add(sprite);
    sprite = this.LoadAnimatedEnemySprite(ENEMY_TYPE_TWO_DATA);
    this.objectManager.Add(sprite);
    sprite = this.LoadAnimatedEnemySprite(ENEMY_TYPE_THREE_DATA);
    this.objectManager.Add(sprite);
 
    sprite = this.LoadWeapon(WEAPON_SWORD_2, this.playerSprites[1]);
    this.objectManager.Add(sprite);
    

    // //load players
    // this.LoadAnimatedPlayerSprite(PLAYER_TWO_DATA);

    // //PICKUP_COIN_DECORATOR_ANIMATION_DATA
    // this.LoadAnimatedSprite(PICKUP_COIN_DECORATOR_ANIMATION_DATA);
  }

  LoadWeapon(theObject, attachedPlayer, offset)
  {
    let artist = new AnimatedSpriteArtist(theObject);
    artist.SetTake(theObject.defaultTakeName);

    let pos = new Vector2(attachedPlayer.Transform2D.translation.X, attachedPlayer.Transform2D.translation.Y);

    let transform = new Transform2D(
      pos,
      theObject.rotationInRadians,
      theObject.scale,
      theObject.origin,
      artist.GetSingleFrameDimensions(theObject.defaultTakeName));

    let sprite = new MoveableSprite(theObject.id,
      theObject.actorType,
      theObject.collisionProperties.type,
      transform, artist,
      theObject.statusType,
      theObject.scrollSpeedMultiplier,
      theObject.layerDepth);

    /**************** NEED TO FRICTION TO MAKE THIS CHARACTER MOVE IN A MORE BELIEVEABLE MANNER ***********/
    sprite.Body.MaximumSpeed = theObject.maximumSpeed;
    sprite.Body.Friction = theObject.frictionType;
    sprite.Body.Gravity = theObject.gravityType; //top-down, so no gravity in +Y direction

    /**************** NEED TO ATTACH A COLLISION PRIMITIVE (e.g. CIRCLE OR RECTANGLE) ****************/
    //assign a circular collision primitive to better fit the drawn sprite
    if (theObject.collisionProperties.primitive == CollisionPrimitiveType.Circle) {
      sprite.CollisionPrimitive = new CircleCollisionPrimitive(transform, theObject.collisionProperties.circleRadius);
    } else {
      sprite.CollisionPrimitive = new RectCollisionPrimitive(transform, theObject.collisionProperties.explodeRectangleBy);
    }

    /**************** NEED TO ADD A BEHAVIOR TO MAKE THIS A CONTROLLABLE ACTOR ***********/
    sprite.AttachBehavior(new Weapon(this.keyboardManager,
      this.objectManager,
      theObject.attackKey,
      theObject.lookDirection,
      theObject.swingSpeed,
      attachedPlayer));

    //return the player so that we can add all players to playerSprites array so that any camera targeting a player can get a handle to the player in this array
    return sprite;
  }

  LoadAnimatedEnemySprite(playerObject)
  {
    let artist = new AnimatedSpriteArtist(playerObject);
    artist.SetTake(playerObject.defaultTakeName);

    let transform = new Transform2D(playerObject.translation, 
        playerObject.rotation,
          playerObject.scale,
            playerObject.origin,
            artist.GetSingleFrameDimensions(playerObject.defaultTakeName),
                playerObject.explodeBoundingBoxInPixels);

    let playerSprite = new MoveableSprite(playerObject.id, 
              playerObject.actorType, 
                playerObject.collisionType, 
                transform, artist, 
                  playerObject.statusType, 
                    playerObject.scrollSpeedMultiplier, 
                      playerObject.layerDepth);

    /**************** NEED TO FRICTION TO MAKE THIS CHARACTER MOVE IN A MORE BELIEVEABLE MANNER ***********/
    playerSprite.Body.MaximumSpeed = playerObject.maximumSpeed;
    playerSprite.Body.Friction = playerObject.frictionType;
    playerSprite.Body.Gravity = playerObject.gravityType;   //top-down, so no gravity in +Y direction


    //assign a circular collision primitive to better fit the drawn sprite
    if (playerObject.collisionProperties.primitive == CollisionPrimitiveType.Circle) {
      playerSprite.CollisionPrimitive = new CircleCollisionPrimitive(transform, playerObject.collisionProperties.circleRadius);
    } else {
      playerSprite.CollisionPrimitive = new RectCollisionPrimitive(transform, playerObject.collisionProperties.explodeRectangleBy);
    }

    /**************** NEED TO ADD A BEHAVIOR TO MAKE THIS A CONTROLLABLE CHARACTER ***********/
    playerSprite.AttachBehavior(
      new Killable( 
        this.objectManager,
        playerObject.lookDirection,
        playerObject.moveSpeed,
        playerObject.rotateSpeed));

  return playerSprite; //add animated player sprite      

  }

  LoadAnimatedPlayerSprite(playerObject){

    let artist = new AnimatedSpriteArtist(playerObject);
    artist.SetTake(playerObject.defaultTakeName);

    let transform = new Transform2D(playerObject.translation, 
        playerObject.rotation,
          playerObject.scale,
            playerObject.origin,
            artist.GetSingleFrameDimensions(playerObject.defaultTakeName),
                playerObject.explodeBoundingBoxInPixels);

    let playerSprite = new MoveableSprite(playerObject.id, 
              playerObject.actorType, 
                playerObject.collisionType, 
                transform, artist, 
                  playerObject.statusType, 
                    playerObject.scrollSpeedMultiplier, 
                      playerObject.layerDepth);

    /**************** NEED TO FRICTION TO MAKE THIS CHARACTER MOVE IN A MORE BELIEVEABLE MANNER ***********/
    playerSprite.Body.MaximumSpeed = playerObject.maximumSpeed;
    playerSprite.Body.Friction = playerObject.frictionType;
    playerSprite.Body.Gravity = playerObject.gravityType;   //top-down, so no gravity in +Y direction


    //assign a circular collision primitive to better fit the drawn sprite
    if (playerObject.collisionProperties.primitive == CollisionPrimitiveType.Circle) {
      playerSprite.CollisionPrimitive = new CircleCollisionPrimitive(transform, playerObject.collisionProperties.circleRadius);
    } else {
      playerSprite.CollisionPrimitive = new RectCollisionPrimitive(transform, playerObject.collisionProperties.explodeRectangleBy);
    }

    /**************** NEED TO ADD A BEHAVIOR TO MAKE THIS A CONTROLLABLE CHARACTER ***********/
    playerSprite.AttachBehavior(
      new SamPlayerBehavior(
        this.keyboardManager,
        this.objectManager,
        playerObject.moveKeys,
        playerObject.lookDirection,
        playerObject.moveSpeed,
        playerObject.rotateSpeed));

  return playerSprite; //add animated player sprite                  

  }

  LoadAnimatedSprite(animatedObject){

    let artist = new AnimatedSpriteArtist(animatedObject);
    artist.SetTake(animatedObject.defaultTakeName);

    let transform = new Transform2D(animatedObject.translation, 
        animatedObject.rotation,
          animatedObject.scale,
            animatedObject.origin,
            artist.GetSingleFrameDimensions(animatedObject.defaultTakeName),
                animatedObject.explodeBoundingBoxInPixels);

    let sprite = new Sprite(animatedObject.id, 
              animatedObject.actorType, 
                animatedObject.collisionType, 
                transform, artist, 
                  animatedObject.statusType, 
                    animatedObject.scrollSpeedMultiplier, 
                      animatedObject.layerDepth);

  this.objectManager.Add(sprite); //add animated sprite                  

  }

  
  LoadMultipleSpritesFrom2DArray(levelObject){
    let maxRows = levelObject.levelLayoutArray.length;
    let maxCols = levelObject.levelLayoutArray[0].length;
    let blockWidth = levelObject.maxBlockWidth;
    let blockHeight = levelObject.maxBlockHeight;
    let transform = null;
    let artist = null;
    let sprite = null;

    for(let row = 0; row < maxRows; row++)
    {
      for(let col = 0; col < maxCols; col++)
      {
          //we read a number from the array (and subtract 1 because 0 is our draw nothing value)
          let levelSpritesNumber = levelObject.levelLayoutArray[row][col];

          //if we get a value of 0 from the  we have nothing to draw
          if(levelSpritesNumber != 0) 
          {
            transform = new Transform2D(new Vector2(col*blockWidth, row*blockHeight),
              levelObject.levelSprites[levelSpritesNumber].rotation,
                levelObject.levelSprites[levelSpritesNumber].scale,
                  levelObject.levelSprites[levelSpritesNumber].origin,
                    levelObject.levelSprites[levelSpritesNumber].sourceDimensions);

            //remember we can also add an animated artist instead
            artist = new SpriteArtist(levelObject.levelSprites[levelSpritesNumber].spriteSheet,
              levelObject.levelSprites[levelSpritesNumber].sourcePosition, 
                      levelObject.levelSprites[levelSpritesNumber].sourceDimensions, 
                      levelObject.levelSprites[levelSpritesNumber].alpha);

            sprite = new Sprite("block[" + row + "," + col + "]", 
                        levelObject.levelSprites[levelSpritesNumber].actorType,
                          levelObject.levelSprites[levelSpritesNumber].collisionProperties.type,
                          transform, artist, 
                          levelObject.levelSprites[levelSpritesNumber].statusType,
                          levelObject.levelSprites[levelSpritesNumber].scrollSpeedMultiplier,
                          levelObject.levelSprites[levelSpritesNumber].layerDepth);

            if (levelObject.levelSprites[levelSpritesNumber].collisionProperties.primitive == CollisionPrimitiveType.Circle) {
              sprite.CollisionPrimitive = new CircleCollisionPrimitive(transform, levelObject.levelSprites[levelSpritesNumber].collisionProperties.circleRadius);
            } else {
              sprite.CollisionPrimitive = new RectCollisionPrimitive(transform, levelObject.levelSprites[levelSpritesNumber].collisionProperties.explodeRectangleBy);
            }

            //do we want to add behaviors?

            this.objectManager.Add(sprite);
          }
      }
    }
  }

  /*
  LoadTanks(){
    let sprite = document.getElementById("sprite_tank_body");
   
    //#region Body
    let transform = new Transform2D(
      new Vector2(150, 150),
      0,
      new Vector2(0.5, 0.5),
      new Vector2(sprite.width/2, sprite.height/2),
      new Vector2(sprite.width, sprite.height),
      0
    );

    this.tankSprite = new ComponentSprite(
      "tank_body_1",
      ActorType.Player,
      CollisionType.Collidable,
      transform,
      new SpriteArtist(sprite, new Vector2(0, 0), new Vector2(sprite.width, sprite.height)),
      StatusType.IsUpdated | StatusType.IsDrawn,
      1,
      1
    );

    this.tankSprite.AttachBehavior(new TankBehavior(this.keyboardManager, 
      this.objectManager, [Keys.A, Keys.D, Keys.W, Keys.S], GUARD_MOVE_SPEED, 
      GUARD_INITIAL_LOOK_DIRECTION, GUARD_ROTATE_RATE));

    //#endregion

    //#region Gun
    sprite = document.getElementById("sprite_tank_gun");

    transform = new Transform2D(
      this.tankSprite.Transform2D.Translation,
      0,
      new Vector2(0.5, 0.5),
      new Vector2(38, 124),
      new Vector2(sprite.width, sprite.height),
      0
    );

    let gunSprite = new Sprite(
      "tank_gun",
      ActorType.Player,
      CollisionType.Collidable,
      transform,
      new SpriteArtist(sprite, new Vector2(0, 0), 
      new Vector2(sprite.width, sprite.height)),
      StatusType.IsUpdated | StatusType.IsDrawn,
      1,
      1
    );

    gunSprite.AttachBehavior(new GunBehavior(this.keyboardManager, 
      this.objectManager, [Keys.Q,Keys.E], GUARD_ROTATE_RATE));
    this.tankSprite.AttachChild(gunSprite);

    //#endregion

    //#region Tracks
    // sprite = document.getElementById("sprite_tank_track");

    // transform = new Transform2D(
    //   this.tankSprite.Transform2D.Translation,
    //   0,
    //   new Vector2(1, 1),
    //   new Vector2(sprite.width/2, sprite.height/2),
    //   new Vector2(sprite.width, sprite.height),
    //   0
    // );

    // this.tankSprite.AttachChild(new Sprite(
    //   "tank_gun",
    //   ActorType.Player,
    //   CollisionType.Collidable,
    //   transform,
    //   new SpriteArtist(sprite, new Vector2(0, 0), 
    //   new Vector2(sprite.width, sprite.height)),
    //   StatusType.IsUpdated | StatusType.IsDrawn,
    //   1,
    //   1
    // ));
    //#endregion
    this.objectManager.Add(this.tankSprite); //add tank body
  }
  */
}


//instead of "load" we could use "DOMContentLoaded" but this would indicate load complete when the HTML and DOM is loaded and NOT when all styling, scripts and images have been downloaded
window.addEventListener("load", event => {
  let bDebugMode = false;
  let game = new Game(bDebugMode);
  game.LoadGame();
});




