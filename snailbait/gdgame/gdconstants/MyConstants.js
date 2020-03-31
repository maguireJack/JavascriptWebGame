//#region Audio data
//audio - step 2 - create array of cues with same unique IDs as were loaded in HTML file
const audioCueArray = [
  new AudioCue("background", AudioType.Background, 1, 1, true, 0),
  new AudioCue("jump", AudioType.Move, 1, 1, false, 0),
  new AudioCue("gameOver", AudioType.WinLose, 1, 1, false, 0)
];
//#endregion

//#region Sprite Data
const RUNNER_START_POSITION = new Vector2(80, 250);
const RUNNER_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space];
const RUNNER_RUN_VELOCITY = 0.1;
const RUNNER_JUMP_VELOCITY = 0.6;

const RUNNER_ANIMATION_DATA = Object.freeze({
  id: "runner_animation_data",
  spriteSheet: document.getElementById("snailbait_sprite_sheet"),
  alpha: 1,
  takes: {  
    "run_right" :  {
      fps: 12,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 8,
      boundingBoxDimensions: new Vector2(49, 54), //notice I choose the largest of all the widths taken from the cellData array below
      cellData: [
        new Rect(414, 385, 47, 54),
        new Rect(362, 385, 44, 54),
        new Rect(314, 385, 39, 54),
        new Rect(265, 385, 46, 54),
        new Rect(205, 385, 49, 54),
        new Rect(150, 385, 46, 54),
        new Rect(96, 385, 46, 54),
        new Rect(45, 385, 35, 54),
        new Rect(0, 385, 35, 54)
      ]
    },
    "run_left" : {
      fps: 12,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 8,
      boundingBoxDimensions: new Vector2(49, 54), //notice I choose the largest of all the widths taken from the cellData array below
      cellData: [
        new Rect(0, 305, 47, 54),
        new Rect(55, 305, 44, 54),
        new Rect(107, 305, 39, 54),
        new Rect(152, 305, 46, 54),
        new Rect(208, 305, 49, 54),
        new Rect(265, 305, 46, 54),
        new Rect(320, 305, 42, 54),
        new Rect(380, 305, 35, 54),
        new Rect(425, 305, 35, 54)
      ]
    }
  }
});

const ENEMY_ANIMATION_DATA = Object.freeze({
  id: "enemy_animation_data",
  spriteSheet: document.getElementById("snailbait_sprite_sheet"),
  alpha: 1,
  takes: {  
    "wasp_fly" :  {
      fps: 16,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(35, 50), 
      cellData: [
        new Rect(20, 234, 35, 50),
        new Rect(90, 234, 35, 50),
        new Rect(160, 234, 35, 50)
      ]
    }
  }
});

const COLLECTIBLES_ANIMATION_DATA = Object.freeze({
  id: "collectibles_animation_data",
  spriteSheet: document.getElementById("snailbait_sprite_sheet"),
  alpha: 1,
  takes: {  
    "sapphire_glint" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 4,
      boundingBoxDimensions: new Vector2(46, 50), 
      cellData: [
        new Rect(185, 138, 30, 35),
        new Rect(220, 138, 30, 35),
        new Rect(258, 138, 30, 35),
        new Rect(294, 138, 30, 35),
        new Rect(331, 138, 30, 35)
      ]
    },
    "ruby_glint" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 4,
      boundingBoxDimensions: new Vector2(30, 35), 
      cellData: [
        new Rect(3, 138, 30, 35),
        new Rect(39, 138, 30, 35),
        new Rect(76, 138, 30, 35),
        new Rect(112, 138, 30, 35),
        new Rect(148, 138, 30, 35)
      ]
    },
    "gold_glint" :  {
      fps: 6,
      leadInDelayMs: 0,
      leadOutDelayMs: 0,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(30, 30), 
      cellData: [
        new Rect(65, 540, 30, 30),
        new Rect(96, 540, 30, 30),
        new Rect(128, 540, 30, 30)
      ]
    }
  }
});

const PLATFORM_DATA = Object.freeze({
  id: "platform",
  spriteSheet: document.getElementById("snailbait_jungle_tileset"),
  sourcePosition: new Vector2(0, 112),
  sourceDimensions: new Vector2(48, 48),
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  actorType: ActorType.Platform,
  collisionType: CollisionType.Collidable,
  layerDepth: 0,
  explodeBoundingBoxInPixels: -6,
  translationArray: [
    new Vector2(30, 420),
    new Vector2(80, 420),
    new Vector2(130, 420),

    new Vector2(230, 370),
    new Vector2(280, 370),
    new Vector2(330, 370),
    new Vector2(380, 370),

    new Vector2(480, 300),
    new Vector2(530, 300),
    
    new Vector2(280, 240),
    new Vector2(330, 240)
  ]
});

const BACKGROUND_DATA = [
  {
    id: "background_1",
    spriteSheet: document.getElementById("snailbait_background_1"),
    sourcePosition: new Vector2(0, 0),
    sourceDimensions: new Vector2(384, 216),
    translation: new Vector2(0, 0),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    actorType: ActorType.Background,
    collisionType: CollisionType.NotCollidable,
    layerDepth: 0,
    scrollSpeedMultiplier: 0.2
  },
  {
    id: "background_2",
    spriteSheet: document.getElementById("snailbait_background_2"),
    sourcePosition: new Vector2(0, 0),
    sourceDimensions: new Vector2(384, 216),
    translation: new Vector2(0, 0),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    actorType: ActorType.Background,
    layerDepth: 0.1,
    scrollSpeedMultiplier: 0.15
  },
  {
    id: "background_3",
    spriteSheet: document.getElementById("snailbait_background_3"),
    sourcePosition: new Vector2(0, 0),
    sourceDimensions: new Vector2(384, 216),
    translation: new Vector2(0, 0),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    actorType: ActorType.Background,
    layerDepth: 0.15,
    scrollSpeedMultiplier: 0.1
  },
  {
    id: "background_4",
    spriteSheet: document.getElementById("snailbait_background_4"),
    sourcePosition: new Vector2(0, 0),
    sourceDimensions: new Vector2(384, 216),
    translation: new Vector2(0, 0),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    actorType: ActorType.Background,
    layerDepth: 0.2,
    scrollSpeedMultiplier: 0.05
  },
  {
    id: "background_5",
    spriteSheet: document.getElementById("snailbait_background_5"),
    sourcePosition: new Vector2(0, 0),
    sourceDimensions: new Vector2(384, 216),
    translation: new Vector2(0, 0),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    actorType: ActorType.Background,
    layerDepth: 0.25,
    scrollSpeedMultiplier: 0.01
  }
];
//#endregion

//#region UI Data
const FontType = Object.freeze({
  //Command & Conquer - battle unit - info overlay
  UnitInformationSmall: "12px Comic Sans MS",
  UnitInformationMedium: "18px Comic Sans MS",
  UnitInformationLarge: "24px Comic Sans MS"
});

//#endregion
