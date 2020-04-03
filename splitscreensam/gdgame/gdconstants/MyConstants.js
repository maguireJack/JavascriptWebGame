//#region Audio data
//array of cues with same unique IDs as were loaded in HTML file
//#endregion

//#region LEVEL SPRITES

/*
spriteSheet:                handle to the sprite sheet resource from id specfied in HTML file
sourcePosition:             (x,y) texture space co-ordinates of the top-left corner of the sprite data in the spritesheet
sourceDimensions:           (w,h) of the sprite data in the spritesheet
rotation:                   rotation angle in degrees to be applied to the drawn sprite about its origin
scale:                      scale to be applied to the drawn sprite about its origin
origin:                     (x,y) texture space co-ordinates for the point of rotation/scale for the sprite
actorType:                  actor type (remember the number associated with ActorType determines draw order on screen - see ActorType and RenderManager::Draw()
collisionType:              collision type which defines if the active character (e.g. player) will test for collisions with this sprite
statusType:                 status type (normally IsDrawn, use IsDrawn | IsUpdated if the sprite has an attached behaviour or animated artist)
scrollSpeedMultiplier:      defines how much the sprite moves in relation to camera movement (1 = move as fast as camera, <1 = move slower than camera)
layerDepth:                 defines the draw order for all sprites of the same ActorType (see RenderManager::Draw())    
explodeBoundingBoxInPixels: integer amount which allows us to shrink (-ve) or grow (+ve) the bounding box around the sprite
alpha:                      opacity of the drawn sprite (0=transparent, 1=opaque)
*/
const LEVEL_ARCHITECTURE_DATA = Object.freeze({
  //an array of all the sprite objects (i.e. sheet, sourceposition etc) that are used to make the level
  id: "level architecture data",
  levelSprites: {
    1: { //grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(42, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 0,
      alpha: 1
    },
    2: {  //block
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(84, 0),
      sourceDimensions: new Vector2(42, 13),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 0,
      alpha: 1
    },
    3: { //single connector
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(126, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 0,
      alpha: 1
    },
    4: { //connector top + grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(252, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 0,
      alpha: 1
    },
    5: { //connector bottom + grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(168, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 0,
      alpha: 1
    },
    6: { //connector left + grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(210, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 0,
      alpha: 1
    },
    7: { //connector right + grass
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(294, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 0,
      alpha: 1
    },
    8: { //double connector
      spriteSheet: document.getElementById("wall_architecture_green"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Decorator,
      collisionType: CollisionType.NotCollidable, //notice this is non-collidable because the player CANNOT reach it
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 0,
      alpha: 1
    }
    //add more sprite objects to build out the architecture in your level
  },
  maxBlockWidth: 42,
  maxBlockHeight: 42, 
  /* Why use 33 rows x 20 cols?
    * We can see that our largest sprite block is 42x42 
    * (i.e. "green block") so from this we need 33 rows and 15 columns
    * to cover a total "game area" of 840 x 1386 
    *   20x42 = 840 pixels 
    *   33x42 = 1386 pixels 
    * This means each player can see ALL the width of the level but 
    * only a portion (i.e. canvas height) of the height.
    */
  levelLayoutArray: [
    [1,1,1,1,5,5,5,5,1,1,1,1,5,5,5,5,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [4,0,0,1,3,1,0,0,1,3,3,1,0,0,1,3,1,0,0,6],
    [4,0,0,1,5,1,0,0,1,8,8,1,0,0,1,5,1,0,0,6],
    [1,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,1,5,5,1,0,0,0,0,0,0,0,1],
    [1,3,3,3,3,1,0,0,0,0,0,0,0,0,1,3,3,3,3,1], 
    [1,5,5,5,5,1,0,0,0,0,0,0,0,0,1,5,5,5,5,1], 
    [1,0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
    [4,0,0,1,7,7,7,7,1,0,0,1,7,7,7,7,1,0,0,6], 
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [8,2,2,2,1,0,0,1,2,7,7,2,1,0,0,1,2,2,2,8],
    [8,8,8,8,1,0,0,1,8,8,8,8,1,0,0,1,8,8,8,8], 
    [8,2,2,2,1,0,0,1,2,7,7,2,1,0,0,1,2,2,2,8],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6], 
    [4,0,0,1,7,7,7,7,1,0,0,1,7,7,7,7,1,0,0,6],
    [1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,5,5,1,0,0,0,0,0,0,0,1],
    [1,3,3,3,3,1,0,0,0,0,0,0,0,0,1,3,3,3,3,1],
    [1,5,5,5,5,1,0,0,0,0,0,0,0,0,1,5,5,5,5,1], 
    [1,0,0,0,0,0,0,0,1,3,3,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,1],  
    [4,0,0,1,3,1,0,0,1,8,8,1,0,0,1,3,1,0,0,6],
    [4,0,0,1,8,1,0,0,1,5,5,1,0,0,1,8,1,0,0,6],
    [4,0,0,1,8,1,0,0,0,0,0,0,0,0,1,8,1,0,0,6],
    [4,0,0,1,5,1,0,0,0,0,0,0,0,0,1,5,1,0,0,6], 
    [1,0,0,0,0,0,0,0,1,3,3,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,8,8,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,3,3,3,3,1,1,1,1,3,3,3,3,1,1,1,1]
  ]
});

/*
spriteSheet:                handle to the sprite sheet resource from id specfied in HTML file
sourcePosition:             (x,y) texture space co-ordinates of the top-left corner of the sprite data in the spritesheet
sourceDimensions:           (w,h) of the sprite data in the spritesheet
rotation:                   rotation angle in degrees to be applied to the drawn sprite about its origin
scale:                      scale to be applied to the drawn sprite about its origin
origin:                     (x,y) texture space co-ordinates for the point of rotation/scale for the sprite
actorType:                  actor type (remember the number associated with ActorType determines draw order on screen - see ActorType and RenderManager::Draw()
collisionType:              collision type which defines if the active character (e.g. player) will test for collisions with this sprite
statusType:                 status type (normally IsDrawn, use IsDrawn | IsUpdated if the sprite has an attached behaviour or animated artist)
scrollSpeedMultiplier:      defines how much the sprite moves in relation to camera movement (1 = move as fast as camera, <1 = move slower than camera)
layerDepth:                 defines the draw order for all sprites of the same ActorType (see RenderManager::Draw())    
explodeBoundingBoxInPixels: integer amount which allows us to shrink (-ve) or grow (+ve) the bounding box around the sprite
alpha:                      opacity of the drawn sprite (0=transparent, 1=opaque)
*/
const LEVEL_PICKUPS_DATA = Object.freeze({
  //an array of all the sprite objects (i.e. sheet, sourceposition etc) that are used to make the level
  id: "level pickups data",
  levelSprites: {
    1: { //heart
      spriteSheet: document.getElementById("pickups"),
      sourcePosition: new Vector2(84, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Pickup,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: -14,
      alpha: 1
    },
    2: { //coin
      spriteSheet: document.getElementById("pickups"),
      sourcePosition: new Vector2(42, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Pickup,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: -16,
      alpha: 1
    },
    3: { //chest
      spriteSheet: document.getElementById("pickups"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Pickup,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: -10,
      alpha: 1
    },
    4: { //key
      spriteSheet: document.getElementById("pickups"),
      sourcePosition: new Vector2(126, 0),
      sourceDimensions: new Vector2(42, 42),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Pickup,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: -10,
      alpha: 1
    }
    //add more sprite objects to build out the architecture in your level
  },
  maxBlockWidth: 42,
  maxBlockHeight: 42, 
  levelLayoutArray: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,1,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0], 
    [0,1,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,1,0],
    [0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0], 
    [0,1,2,2,2,2,2,0,0,0,0,0,2,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0], 
    [0,1,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,1,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],  
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,0], 
    [0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0],
    [0,1,2,2,2,2,2,2,0,0,0,0,1,2,2,2,4,2,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]
});


const PLAYER_ONE_DATA = Object.freeze({
  id: "player 1",
  spriteSheet: document.getElementById("player_one_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(420, 85),
  rotation: 45,
  scale: new Vector2(0.5, 0.5),
  origin: new Vector2(0, 0),
  actorType: ActorType.Player,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 1,
  explodeBoundingBoxInPixels: 0,
  alpha: 1,
  lookDirection: new Vector2(0, 1), //straight-down according to source image
  moveKeys: [Keys.W, Keys.S, Keys.A, Keys.D],
  moveSpeed: 0.15,
  rotateSpeed: 0.004,
  frictionType: FrictionType.Off, //top-down so no gravity
  maximumSpeed: 5,
  takes: {  
    "walk" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(100, 100), 
      cellData: [
        new Rect(0, 0, 98, 98),
        new Rect(98, 0, 98, 98),
        new Rect(196, 0, 98, 98),
      ]
    },
    "idle" :  {
      fps: 1,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 0,
      boundingBoxDimensions: new Vector2(100, 100), 
      cellData: [
        new Rect(0, 0, 98, 98) //play frame where player stands repeatedly
      ]
    }
  }
});

const PLAYER_TWO_DATA = Object.freeze({
  id: "player 2",
  spriteSheet: document.getElementById("player_two_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(334, 1175),
  rotation: 0,
  scale: new Vector2(0.5, 0.5),
  origin: new Vector2(0, 0),
  actorType: ActorType.Player,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 0,
  explodeBoundingBoxInPixels: 0,
  alpha: 1,
  lookDirection: new Vector2(0, 1), //straight-down according to source image
  moveKeys: [Keys.I, Keys.K, Keys.J, Keys.L],
  moveSpeed: 0.15,
  rotateSpeed: 0.004,
  frictionType: FrictionType.Off, //top-down so no gravity
  maximumSpeed: 5,
  takes: {  
    "walk" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(100, 100), 
      cellData: [
        new Rect(0, 0, 98, 98),
        new Rect(98, 0, 98, 98),
        new Rect(196, 0, 98, 98),
      ]
    },
    "idle" :  {
      fps: 10,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 0,
      boundingBoxDimensions: new Vector2(100, 100), 
      cellData: [
        new Rect(0, 0, 98, 98) //play frame where player stands repeatedly
      ]
    }
  }
});


const PICKUP_COIN_ANIMATION_DATA = Object.freeze({
  id: "animated coin",
  spriteSheet: document.getElementById("spinning_coin_pickup"),
  translation: new Vector2(510, 126),
  rotation: 0,
  scale: new Vector2(0.15, 0.15),
  origin: new Vector2(0, 0),
  actorType: ActorType.Pickup,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 0,
  explodeBoundingBoxInPixels: 0,
  alpha: 1,
  takes: {  
    "spin" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 5,
      boundingBoxDimensions: new Vector2(199, 170), 
      cellData: [
        new Rect(0, 0, 199, 170),
        new Rect(199, 0, 199, 170),
        new Rect(398, 0, 199, 170),
        new Rect(597, 0, 199, 170),
        new Rect(796, 0, 199, 170),
        new Rect(995, 0, 199, 170),
      ]
    }
  }
});

//#endregion


