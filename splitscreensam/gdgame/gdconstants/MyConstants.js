//#region AUDIO DATA
//audio - step 2 - create an array with all cues
//note the name we use below MUST be identical to id used in HTML when loading the sound asset
const audioCueArray = [
  new AudioCue("coin_pickup", AudioType.Pickup, 1, 1, false, 0),
  new AudioCue("main_music", AudioType.Background, .01, 1, true, 0),
  new AudioCue("sword", AudioType.Weapon, .01, 1, false, 0)
  //add more cues here but make sure you load in the HTML!
];
//See Game::LoadAllOtherManagers() for SoundManager instanciation
//#endregion

//#region SPRITE DATA - LEVEL LAYOUT

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

// const BACKGROUND_DATA = Object.freeze({
//   spriteSheet: document.getElementById("start01"),
//   sourcePosition: new Vector2(0,0),
//   sourceDimensions: new Vector2(420, 360),
//   rotation: 0,
//   scale: new Vector2(1,1),
//   origin: new Vector2(0,0),
//   actorType: ActorType.Background,
//   CollisionType: NotCollidable,
//   statusType: StatusType.IsDrawn,
//   scrollSpeedMultiplier: 0.2,
//   layerDepth: 0,
//   explodeBoundingBoxInPixels: 0,
//   alpha: 1
// });


const LEVEL_ARCHITECTURE_DATA = Object.freeze({
  //an array of all the sprite objects (i.e. sheet, sourceposition etc) that are used to make the level
  id: "level architecture data",
  levelSprites: {
    // 1: { //grass
    //   spriteSheet: document.getElementById("wall_architecture_green"),
    //   sourcePosition: new Vector2(42, 0),
    //   sourceDimensions: new Vector2(42, 42),
    //   rotation: 0,
    //   scale: new Vector2(1, 1),
    //   origin: new Vector2(0, 0),
    //   actorType: ActorType.Architecture,
    //   collisionType: CollisionType.Collidable,
    //   statusType: StatusType.IsDrawn,
    //   scrollSpeedMultiplier: 1,
    //   layerDepth: 0,
    //   explodeBoundingBoxInPixels: 0,
    //   alpha: 1
    // },
    // 2: {  //block
    //   spriteSheet: document.getElementById("wall_architecture_green"),
    //   sourcePosition: new Vector2(84, 0),
    //   sourceDimensions: new Vector2(42, 13),
    //   rotation: 0,
    //   scale: new Vector2(1, 1),
    //   origin: new Vector2(0, 0),
    //   actorType: ActorType.Architecture,
    //   collisionType: CollisionType.Collidable,
    //   statusType: StatusType.IsDrawn,
    //   scrollSpeedMultiplier: 1,
    //   layerDepth: 0,
    //   explodeBoundingBoxInPixels: 0,
    //   alpha: 1
    // },
    // 3: { //single connector
    //   spriteSheet: document.getElementById("wall_architecture_green"),
    //   sourcePosition: new Vector2(126, 0),
    //   sourceDimensions: new Vector2(42, 42),
    //   rotation: 0,
    //   scale: new Vector2(1, 1),
    //   origin: new Vector2(0, 0),
    //   actorType: ActorType.Architecture,
    //   collisionType: CollisionType.Collidable,
    //   statusType: StatusType.IsDrawn,
    //   scrollSpeedMultiplier: 1,
    //   layerDepth: 0,
    //   explodeBoundingBoxInPixels: 0,
    //   alpha: 1
    // },
    // 4: { //connector top + grass
    //   spriteSheet: document.getElementById("wall_architecture_green"),
    //   sourcePosition: new Vector2(252, 0),
    //   sourceDimensions: new Vector2(42, 42),
    //   rotation: 0,
    //   scale: new Vector2(1, 1),
    //   origin: new Vector2(0, 0),
    //   actorType: ActorType.Architecture,
    //   collisionType: CollisionType.Collidable,
    //   statusType: StatusType.IsDrawn,
    //   scrollSpeedMultiplier: 1,
    //   layerDepth: 0,
    //   explodeBoundingBoxInPixels: 0,
    //   alpha: 1
    // },
    // 5: { //connector bottom + grass
    //   spriteSheet: document.getElementById("wall_architecture_green"),
    //   sourcePosition: new Vector2(168, 0),
    //   sourceDimensions: new Vector2(42, 42),
    //   rotation: 0,
    //   scale: new Vector2(1, 1),
    //   origin: new Vector2(0, 0),
    //   actorType: ActorType.Architecture,
    //   collisionType: CollisionType.Collidable,
    //   statusType: StatusType.IsDrawn,
    //   scrollSpeedMultiplier: 1,
    //   layerDepth: 0,
    //   explodeBoundingBoxInPixels: 0,
    //   alpha: 1
    // },
    // 6: { //connector left + grass
    //   spriteSheet: document.getElementById("wall_architecture_green"),
    //   sourcePosition: new Vector2(210, 0),
    //   sourceDimensions: new Vector2(42, 42),
    //   rotation: 0,
    //   scale: new Vector2(1, 1),
    //   origin: new Vector2(0, 0),
    //   actorType: ActorType.Architecture,
    //   collisionType: CollisionType.Collidable,
    //   statusType: StatusType.IsDrawn,
    //   scrollSpeedMultiplier: 1,
    //   layerDepth: 0,
    //   explodeBoundingBoxInPixels: 0,
    //   alpha: 1
    // },
    // 7: { //connector right + grass
    //   spriteSheet: document.getElementById("wall_architecture_green"),
    //   sourcePosition: new Vector2(294, 0),
    //   sourceDimensions: new Vector2(42, 42),
    //   rotation: 0,
    //   scale: new Vector2(1, 1),
    //   origin: new Vector2(0, 0),
    //   actorType: ActorType.Architecture,
    //   collisionType: CollisionType.Collidable,
    //   statusType: StatusType.IsDrawn,
    //   scrollSpeedMultiplier: 1,
    //   layerDepth: 0,
    //   explodeBoundingBoxInPixels: 0,
    //   alpha: 1
    // },
    // 8: { //double connector
    //   spriteSheet: document.getElementById("wall_architecture_green"),
    //   sourcePosition: new Vector2(0, 0),
    //   sourceDimensions: new Vector2(42, 42),
    //   rotation: 0,
    //   scale: new Vector2(1, 1),
    //   origin: new Vector2(0, 0),
    //   actorType: ActorType.Decorator,
    //   collisionType: CollisionType.NotCollidable, //notice this is non-collidable because the player CANNOT reach it
    //   statusType: StatusType.IsDrawn,
    //   scrollSpeedMultiplier: 1,
    //   layerDepth: 0,
    //   explodeBoundingBoxInPixels: 0,
    //   alpha: 1
    // },
    1:{
      spriteSheet: document.getElementById("spawn01"),
      sourcePosition: new Vector2(0,0),
      sourceDimensions: new Vector2(480,360),
      rotation: 0,
      scale: new Vector2(0,0),
      actorType: ActorType.Background,
      collisionType: CollisionType.NotCollidable,
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




const FLOOR_DATA = Object.freeze({
  id: "floorType1",
  levelSprites: {
    1: { //Cracked Floor
      spriteSheet: document.getElementById("floor"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Background,
      collisionType: CollisionType.NotCollidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: -14,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    }
  },
  maxBlockWidth: 16,
  maxBlockHeight: 16, 
  levelLayoutArray: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    
  ]

});


const WALL_DATA = Object.freeze({
  id: "wall data",
  levelSprites: {
    1: { //Mid Wall
      spriteSheet: document.getElementById("midWall"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    2:{ //Mid Wall Topper
      spriteSheet: document.getElementById("midWallTop"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Background,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    3:{ //Left Wall Corner
      spriteSheet: document.getElementById("leftTopCorner"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    4:{ //Left Side Border Wall
      spriteSheet: document.getElementById("leftSideBorderWall"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    5:{ //Left Side Border Wall
      spriteSheet: document.getElementById("rightTopCorner"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    6:{
      spriteSheet: document.getElementById("rightSideBorderWall"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    7:{
      spriteSheet: document.getElementById("wallCornerFrontLeft"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    8:{
      spriteSheet: document.getElementById("wallCornerFrontRight"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 0,
      }
    },
    9:{
      spriteSheet: document.getElementById("wallCornerBottomLeft"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 2,
      }
    },
    10:{
      spriteSheet: document.getElementById("wallCornerBottomRight"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(16, 16),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.Architecture,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: 2,
      alpha: 1,
      collisionProperties: {
        type: CollisionType.Collidable,
        primitive: CollisionPrimitiveType.Rectangle,
        //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
        circleRadius: 0,
        explodeRectangleBy: 2,
      }
    }

  },
  maxBlockWidth: 16,
  maxBlockHeight: 16, 
  levelLayoutArray: [
    [0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,6,1,1,1,1,1,1,5,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,2,2,10,0,0,0,0,0,0,6,2,2,2,2,2,0],
    [0,0,0,6,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,5],
    [0,2,2,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
    [3,1,1,1,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
    [4,0,0,0,0,0,0,6,1,1,9,2,2,2,2,2,2,2,2,2,2,2,2,10],
    [9,2,0,0,0,0,0,6,0,0,7,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [7,1,4,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,4,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,9,2,2,2,2,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]
});


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
//#endregion


const HEALTH_BAR = Object.freeze({
  id: "health bar",
  heartSprites: {
    1: {
      spriteSheet: document.getElementById("player_one_animations"),
      sourcePosition: new Vector2(289,258),
      sourceDimensions: new Vector2(13, 13),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      actorType: ActorType.HUD,
      collisionType: CollisionType.Collidable,
      statusType: StatusType.IsDrawn,
      scrollSpeedMultiplier: 1,
      layerDepth: 0,
      explodeBoundingBoxInPixels: -14,
      alpha: 1
  },
  2: {
    spriteSheet: document.getElementById("player_one_animations"),
    sourcePosition: new Vector2(294,258),
    sourceDimensions: new Vector2(13, 13),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    actorType: ActorType.HUD,
    collisionType: CollisionType.Collidable,
    statusType: StatusType.IsDrawn,
    scrollSpeedMultiplier: 1,
    layerDepth: 0,
    explodeBoundingBoxInPixels: -14,
    alpha: 1
  },
  3: {
    spriteSheet: document.getElementById("player_one_animations"),
    sourcePosition: new Vector2(299,258),
    sourceDimensions: new Vector2(13, 13),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    actorType: ActorType.HUD,
    collisionType: CollisionType.Collidable,
    statusType: StatusType.IsDrawn,
    scrollSpeedMultiplier: 1,
    layerDepth: 0,
    explodeBoundingBoxInPixels: -14,
    alpha: 1
  }
  }
});

const WEAPON_SWORD = Object.freeze({
  id: "sword 1",
  spriteSheet: document.getElementById("player_one_animations"),
  translation: new Vector2(0,0),
  defaultTakeName: "idle",
  rotation: 0,
  scale: new Vector2(1,1),
  origin: new Vector2(0,22),
  actorType: ActorType.Weapon,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  explodeBoundingBoxInPixels: 2,
  alpha: 1,
  lookDirection: new Vector2(0, 1),
  attackKey: [Keys.Space],
  swingSpeed: 3,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Rectangle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 10,
  },
  takes: {  
    "idle" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(10, 22), 
      cellData: [
        new Rect(323, 25, 10, 22),
        new Rect(323, 25, 10, 22),
        new Rect(323, 25, 10, 22)
      ]
    }
  }
});

const WEAPON_SWORD_2 = Object.freeze({
  id: "sword 2",
  spriteSheet: document.getElementById("player_one_animations"),
  translation: new Vector2(0,0),
  defaultTakeName: "idle",
  rotation: 0,
  scale: new Vector2(1,1),
  origin: new Vector2(0,22),
  actorType: ActorType.Weapon,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  explodeBoundingBoxInPixels: 2,
  alpha: 1,
  lookDirection: new Vector2(0, 1),
  attackKey: [Keys.Enter],
  swingSpeed: 3,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Rectangle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 10,
  },
  takes: {  
    "idle" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(10, 22), 
      cellData: [
        new Rect(323, 25, 10, 22),
        new Rect(323, 25, 10, 22),
        new Rect(323, 25, 10, 22)
      ]
    }
  }
});


const ENEMY_TYPE_ONE_DATA = Object.freeze({
  id: "enemy 1",
  spriteSheet: document.getElementById("player_one_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(225, 50),
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  actorType: ActorType.Enemy,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 1,
  explodeBoundingBoxInPixels: 0,
  alpha: 1,
  lookDirection: new Vector2(0, 1), //straight-down according to source image
  moveKeys: [Keys.W, Keys.S, Keys.A, Keys.D],
  moveSpeed: 0.005,
  attackPower: 5,
  health: 15,
  rotateSpeed: 0.004,
  gravityType: GravityType.Off, //top-down so no gravity
  frictionType: FrictionType.Normal, 
  maximumSpeed: 5,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Rectangle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 0,
  },
  takes: {  
    "walk" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(11, 17), 
      cellData: [
        new Rect(371, 207, 11, 17),
        new Rect(387, 207, 11, 17),
        new Rect(403, 207, 11, 17)
      ]
    }
  }
});

const ENEMY_TYPE_TWO_DATA = Object.freeze({
  id: "enemy 2",
  spriteSheet: document.getElementById("player_one_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(40, 150),
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  actorType: ActorType.Enemy,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 1,
  explodeBoundingBoxInPixels: 0,
  alpha: 1,
  lookDirection: new Vector2(0, 1), //straight-down according to source image
  moveKeys: [Keys.W, Keys.S, Keys.A, Keys.D],
  moveSpeed: 0.005,
  attackPower: 5,
  health: 15,
  rotateSpeed: 0.004,
  gravityType: GravityType.Off, //top-down so no gravity
  frictionType: FrictionType.Normal, 
  maximumSpeed: 5,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Rectangle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 0,
  },
  takes: {  
    "walk" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(11, 17), 
      cellData: [
        new Rect(371, 207, 11, 17),
        new Rect(387, 207, 11, 17),
        new Rect(403, 207, 11, 17)
      ]
    }
  }
});

const ENEMY_TYPE_THREE_DATA = Object.freeze({
  id: "enemy 3",
  spriteSheet: document.getElementById("player_one_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(255, 60),
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  actorType: ActorType.Enemy,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 1,
  explodeBoundingBoxInPixels: 0,
  alpha: 1,
  lookDirection: new Vector2(0, 1), //straight-down according to source image
  moveKeys: [Keys.W, Keys.S, Keys.A, Keys.D],
  moveSpeed: 0.005,
  attackPower: 5,
  health: 15,
  rotateSpeed: 0.004,
  gravityType: GravityType.Off, //top-down so no gravity
  frictionType: FrictionType.Normal, 
  maximumSpeed: 5,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Rectangle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 0,
  },
  takes: {  
    "walk" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(11, 17), 
      cellData: [
        new Rect(371, 207, 11, 17),
        new Rect(387, 207, 11, 17),
        new Rect(403, 207, 11, 17)
      ]
    }
  }
});



//#region SPRITE DATA - PLAYER
const PLAYER_ONE_DATA = Object.freeze({
  id: "player 1",
  spriteSheet: document.getElementById("player_one_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(40, 85),
  rotation: 0,
  scale: new Vector2(1, 1),
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
  moveSpeed: 0.04,
  health: 100,
  rotateSpeed: 0.004,
  gravityType: GravityType.Off, //top-down so no gravity
  frictionType: FrictionType.Normal, 
  maximumSpeed: 5,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Rectangle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 0,
  },
  takes: {  
    "walk" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(16, 16), 
      cellData: [
        new Rect(128, 75, 16, 21),
        new Rect(144, 75, 16, 21),
        new Rect(160, 75, 16, 21)
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
        new Rect(112, 32, 16, 16) //play frame where player stands repeatedly
      ]
    }
  }
});

const PLAYER_TWO_DATA = Object.freeze({
  id: "player 2",
  spriteSheet: document.getElementById("player_one_animations"),
  defaultTakeName: "walk",
  translation: new Vector2(40, 88),
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  actorType: ActorType.Player,
  collisionType: CollisionType.Collidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 1,
  explodeBoundingBoxInPixels: 0,
  alpha: 1,
  lookDirection: new Vector2(0, 1), //straight-down according to source image
  moveKeys: [Keys.I, Keys.K, Keys.J, Keys.L],
  moveSpeed: 0.04,
  health: 100,
  rotateSpeed: 0.004,
  gravityType: GravityType.Off, //top-down so no gravity
  frictionType: FrictionType.Normal, 
  maximumSpeed: 5,
  collisionProperties: {
    type: CollisionType.Collidable,
    primitive: CollisionPrimitiveType.Rectangle,
    //if circle then set circleRadius, if rectangle then set explodeRectangleBy - but NOT both
    circleRadius: 0,
    explodeRectangleBy: 0,
  },
  takes: {  
    "walk" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(16, 16), 
      cellData: [
        new Rect(128, 75, 16, 21),
        new Rect(144, 75, 16, 21),
        new Rect(160, 75, 16, 21)
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
        new Rect(112, 32, 16, 16) //play frame where player stands repeatedly
      ]
    }
  }
});
//#endregion

//#region SPRITE DATA - PICKUP

const PICKUP_COIN_ANIMATION_DATA = Object.freeze({
  id: "animated coin",
  spriteSheet: document.getElementById("spinning_coin_pickup"),
  defaultTakeName: "spin",
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

//#region SPRITE DATA - ANIMATION DECORATORS (fire, pickup)
//pickup_collision_animation
// PICKUP_DECORATOR_ANIMATION_DATA;

const PICKUP_COIN_DECORATOR_ANIMATION_DATA = Object.freeze({
  id: "pickup_collision_animation",
  spriteSheet: document.getElementById("pickup_collision_animation"),
  defaultTakeName: "explode",
  translation: new Vector2(200, 200),
  rotation: 0,
  scale: new Vector2(0.5, 0.3),
  origin: new Vector2(0, 0),
  actorType: ActorType.DecoratorAnimated,
  collisionType: CollisionType.NotCollidable,
  statusType: StatusType.IsDrawn | StatusType.IsUpdated,
  scrollSpeedMultiplier: 1,
  layerDepth: 0,
  alpha: 1,
  /**********************/
  explodeBoundingBoxInPixels: 0,
  lookDirection: Vector2.Zero, //straight-down according to source image
  moveKeys: null,
  moveSpeed: 0,
  rotateSpeed: 0,
  gravityType: GravityType.Off, //top-down so no gravity
  frictionType: FrictionType.Off, 
  maximumSpeed: 0,
  takes: {  
    "explode" :  {
      fps: 40,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount:   1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 8,
      boundingBoxDimensions: new Vector2(157, 157), 
      cellData: [
        new Rect(0, 0, 157, 157),
        new Rect(157, 0, 157, 157),
        new Rect(314, 0, 157, 157),
        new Rect(471, 0, 157, 157),
        new Rect(628, 0, 157, 157),
        new Rect(785, 0, 157, 157),
        new Rect(942, 0, 157, 157),
        new Rect(1099, 0, 157, 157),
        new Rect(1256, 0, 157, 157)
      ]
    }
  }
});



//complete object to load the animation for pickup of coins...
//#endregion


