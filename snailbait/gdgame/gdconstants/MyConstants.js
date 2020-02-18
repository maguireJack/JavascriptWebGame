

//#region Audio data 
//audio - step 2 - create array of cues with same unique IDs as were loaded in HTML file
const audioCueArray = [
	//add game specific audio cues here...
	
	new AudioCue("background",
		AudioType.Background, 1, 1, true, 0),
	new AudioCue("jump",
		AudioType.Move, 1, 1, false, 0),
	new AudioCue("gameOver",
		AudioType.WinLose, 1, 1, false, 0)
	
];
//#endregion

//#region Sprite data - initial positions, dimensions
   const RUNNER_CELLS_WIDTH = 50; // in pixels
   const RUNNER_CELLS_HEIGHT = 54;
   const RUNNER_ANIMATION_FPS = 12;
   const RUNNER_START_X_POSITION = 80;
   const RUNNER_START_Y_POSITION = 250;
   const RUNNER_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space];
   const RUNNER_RUN_VELOCITY = 0.1;
   const RUNNER_JUMP_VELOCITY = 0.6;

   const BAT_CELLS_HEIGHT = 34; 
   const BEE_CELLS_HEIGHT = 50;
   const BEE_CELLS_WIDTH  = 50;
   const BEE_ANIMATION_FPS = 12;

   const SAPPHIRE_CELLS_HEIGHT = 30;
   const SAPPHIRE_CELLS_WIDTH  = 35;
   const SAPPHIRE_CELLS_FPS = 6;

   //other things we can add...
   const BUTTON_CELLS_HEIGHT  = 20;
   const BUTTON_CELLS_WIDTH   = 31;
   const COIN_CELLS_HEIGHT = 30;
   const COIN_CELLS_WIDTH  = 30; 

   const EXPLOSION_CELLS_HEIGHT = 62;

   const RUBY_CELLS_HEIGHT = 30;
   const RUBY_CELLS_WIDTH = 35;


   const SNAIL_BOMB_CELLS_HEIGHT = 20;
   const SNAIL_BOMB_CELLS_WIDTH  = 20;
   const SNAIL_CELLS_HEIGHT = 34;
   const SNAIL_CELLS_WIDTH  = 64;
//#endregion

//#region Cell data 
   
   const BEE_CELLS = [
      { left: 5,   top: 234, width:  BEE_CELLS_WIDTH,
                            height: BEE_CELLS_HEIGHT },

      { left: 75,  top: 234, width:  BEE_CELLS_WIDTH, 
                            height: BEE_CELLS_HEIGHT },

      { left: 145, top: 234, width:  BEE_CELLS_WIDTH, 
                            height: BEE_CELLS_HEIGHT }
   ];
   
   const BACKGROUND_CELL = [
      { left: 0,   top: 590, width: 1104, height: 400 }
   ];

   
   const RUNNER_CELLS_RIGHT = [
      { left: 414, top: 385, 
        width: 47, height: RUNNER_CELLS_HEIGHT },

      { left: 362, top: 385, 
         width: 44, height: RUNNER_CELLS_HEIGHT },

      { left: 314, top: 385, 
         width: 39, height: RUNNER_CELLS_HEIGHT },

      { left: 265, top: 385, 
         width: 46, height: RUNNER_CELLS_HEIGHT },

      { left: 205, top: 385, 
         width: 49, height: RUNNER_CELLS_HEIGHT },

      { left: 150, top: 385, 
         width: 46, height: RUNNER_CELLS_HEIGHT },

      { left: 96,  top: 385, 
         width: 46, height: RUNNER_CELLS_HEIGHT },

      { left: 45,  top: 385, 
         width: 35, height: RUNNER_CELLS_HEIGHT },

      { left: 0,   top: 385, 
         width: 35, height: RUNNER_CELLS_HEIGHT }
   ];

   const RUNNER_CELLS_LEFT = [
      { left: 0,   top: 305, 
         width: 47, height: RUNNER_CELLS_HEIGHT },

      { left: 55,  top: 305, 
         width: 44, height: RUNNER_CELLS_HEIGHT },

      { left: 107, top: 305, 
         width: 39, height: RUNNER_CELLS_HEIGHT },

      { left: 152, top: 305, 
         width: 46, height: RUNNER_CELLS_HEIGHT },

      { left: 208, top: 305, 
         width: 49, height: RUNNER_CELLS_HEIGHT },

      { left: 265, top: 305, 
         width: 46, height: RUNNER_CELLS_HEIGHT },

      { left: 320, top: 305, 
         width: 42, height: RUNNER_CELLS_HEIGHT },

      { left: 380, top: 305, 
         width: 35, height: RUNNER_CELLS_HEIGHT },

      { left: 425, top: 305, 
         width: 35, height: RUNNER_CELLS_HEIGHT },
   ];

   const SAPPHIRE_CELLS = [
      { left: 185,   top: 138, width:  SAPPHIRE_CELLS_WIDTH,
                             height: SAPPHIRE_CELLS_HEIGHT },

      { left: 220,  top: 138, width:  SAPPHIRE_CELLS_WIDTH, 
                             height: SAPPHIRE_CELLS_HEIGHT },

      { left: 258,  top: 138, width:  SAPPHIRE_CELLS_WIDTH, 
                             height: SAPPHIRE_CELLS_HEIGHT },

      { left: 294, top: 138, width:  SAPPHIRE_CELLS_WIDTH, 
                             height: SAPPHIRE_CELLS_HEIGHT },

      { left: 331, top: 138, width:  SAPPHIRE_CELLS_WIDTH, 
                             height: SAPPHIRE_CELLS_HEIGHT }
   ];

   const BAT_CELLS = [
      { left: 3,   top: 0, width: 36, height: BAT_CELLS_HEIGHT },
      { left: 41,  top: 0, width: 46, height: BAT_CELLS_HEIGHT },
      { left: 93,  top: 0, width: 36, height: BAT_CELLS_HEIGHT },
      { left: 132, top: 0, width: 46, height: BAT_CELLS_HEIGHT },
   ];

   const BAT_RED_EYE_CELLS = [
      { left: 185, top: 0, 
        width: 36, height: BAT_CELLS_HEIGHT },

      { left: 222, top: 0, 
        width: 46, height: BAT_CELLS_HEIGHT },

      { left: 273, top: 0, 
        width: 36, height: BAT_CELLS_HEIGHT },

      { left: 313, top: 0, 
        width: 46, height: BAT_CELLS_HEIGHT },
   ];
   
   const BLUE_COIN_CELLS = [
      { left: 5, top: 540, width:  COIN_CELLS_WIDTH, 
                           height: COIN_CELLS_HEIGHT },

      { left: 5 + this.COIN_CELLS_WIDTH, top: 540,
       width: COIN_CELLS_WIDTH, 
        height: COIN_CELLS_HEIGHT }
   ];

   const EXPLOSION_CELLS = [
      { left: 3,   top: 48, 
        width: 52, height: EXPLOSION_CELLS_HEIGHT },
      { left: 63,  top: 48, 
        width: 70, height: EXPLOSION_CELLS_HEIGHT },
      { left: 146, top: 48, 
        width: 70, height: EXPLOSION_CELLS_HEIGHT },
      { left: 233, top: 48, 
        width: 70, height: EXPLOSION_CELLS_HEIGHT },
      { left: 308, top: 48, 
        width: 70, height: EXPLOSION_CELLS_HEIGHT },
      { left: 392, top: 48, 
        width: 70, height: EXPLOSION_CELLS_HEIGHT },
      { left: 473, top: 48, 
        width: 70, height: EXPLOSION_CELLS_HEIGHT }
   ];

   const GOLD_COIN_CELLS = [
      { left: 65, top: 540, width:  COIN_CELLS_WIDTH, 
                            height: COIN_CELLS_HEIGHT },
      { left: 96, top: 540, width:  COIN_CELLS_WIDTH, 
                            height: COIN_CELLS_HEIGHT },
      { left: 128, top: 540, width:  COIN_CELLS_WIDTH, 
                             height: COIN_CELLS_HEIGHT },
   ];

   const RUBY_CELLS = [
      { left: 3,   top: 138, width:  RUBY_CELLS_WIDTH,
                             height: RUBY_CELLS_HEIGHT },

      { left: 39,  top: 138, width:  RUBY_CELLS_WIDTH, 
                             height: RUBY_CELLS_HEIGHT },

      { left: 76,  top: 138, width:  RUBY_CELLS_WIDTH, 
                             height: RUBY_CELLS_HEIGHT },

      { left: 112, top: 138, width:  RUBY_CELLS_WIDTH, 
                             height: RUBY_CELLS_HEIGHT },

      { left: 148, top: 138, width:  RUBY_CELLS_WIDTH, 
                             height: RUBY_CELLS_HEIGHT }
   ];

   const SNAIL_BOMB_CELLS = [
      { left: 40, top: 512, width: 30, height: 20 },
      { left: 2, top: 512, width: 30, height: 20 }
   ];

   const SNAIL_CELLS = [
      { left: 142, top: 466, width:  SNAIL_CELLS_WIDTH,
                             height: SNAIL_CELLS_HEIGHT },

      { left: 75,  top: 466, width:  SNAIL_CELLS_WIDTH, 
                             height: SNAIL_CELLS_HEIGHT },

      { left: 2,   top: 466, width:  SNAIL_CELLS_WIDTH, 
                             height: SNAIL_CELLS_HEIGHT },
   ]; 
//#endregion

//#region Platform data

   //the 5 scollable backgrounds - see game.js\LoadBackgrounds()
  const BACKGROUND_DATA = [
   {
     id: "background_1",
     spriteSheet: document.getElementById("snailbait_background_1"),
     sourcePosition: new Vector2(0,0),
     sourceDimensions: new Vector2(384, 216),
     translation: new Vector2(0,0),
     rotation: 0,
     scale: new Vector2(1,1),
     origin: new Vector2(0,0),
     actorType: ActorType.Background,
     layerDepth: 0,
     scrollSpeedMultiplier: 0.2
   },
   {
      id: "background_2",
      spriteSheet: document.getElementById("snailbait_background_2"),
      sourcePosition: new Vector2(0,0),
      sourceDimensions: new Vector2(384, 216),
      translation: new Vector2(0,0),
      rotation: 0,
      scale: new Vector2(1,1),
      origin: new Vector2(0,0),
      actorType: ActorType.Background,
      layerDepth: 0.1,
      scrollSpeedMultiplier: 0.3
    },
    {
      id: "background_3",
      spriteSheet: document.getElementById("snailbait_background_3"),
      sourcePosition: new Vector2(0,0),
      sourceDimensions: new Vector2(384, 216),
      translation: new Vector2(0,0),
      rotation: 0,
      scale: new Vector2(1,1),
      origin: new Vector2(0,0),
      actorType: ActorType.Background,
      layerDepth: 0.15,
      scrollSpeedMultiplier: 0.5
    },
    {
      id: "background_4",
      spriteSheet: document.getElementById("snailbait_background_4"),
      sourcePosition: new Vector2(0,0),
      sourceDimensions: new Vector2(384, 216),
      translation: new Vector2(0,0),
      rotation: 0,
      scale: new Vector2(1,1),
      origin: new Vector2(0,0),
      actorType: ActorType.Background,
      layerDepth: 0.2,
      scrollSpeedMultiplier: 0.7
    },
    {
      id: "background_5",
      spriteSheet: document.getElementById("snailbait_background_5"),
      sourcePosition: new Vector2(0,0),
      sourceDimensions: new Vector2(384, 216),
      translation: new Vector2(0,0),
      rotation: 0,
      scale: new Vector2(1,1),
      origin: new Vector2(0,0),
      actorType: ActorType.Background,
      layerDepth: 0.25,
      scrollSpeedMultiplier: 0.8
    },
 ];

 const PLATFORM_DATA = {
      id: "platform",
      spriteSheet: document.getElementById("snailbait_jungle_tileset"),
      sourcePosition: new Vector2(0, 112),
      sourceDimensions: new Vector2(48, 48),
      rotation: 0,
      scale: new Vector2(1,1),
      origin: new Vector2(0,0),
      actorType: ActorType.Platform,
      layerDepth: 0,
      scrollSpeedMultiplier: 1,
      explodeBoundingBoxInPixels: -6,
      translationArray: [new Vector2(30,420),new Vector2(80,420), new Vector2(130,420), 
                     new Vector2(230,370),new Vector2(280,370), new Vector2(330,370),new Vector2(380,370),
                     new Vector2(480,300),new Vector2(530,300),
                     new Vector2(280,240),new Vector2(330,240)]
};

//#endregion