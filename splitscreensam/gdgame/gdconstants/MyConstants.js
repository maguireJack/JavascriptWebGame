//#region Audio data
//array of cues with same unique IDs as were loaded in HTML file
//#endregion

//#region Sprite Data
const GUARD_START_POSITION = new Vector2(80, 250);
const GUARD_MOVE_KEYS = [Keys.W, Keys.S, Keys.A, Keys.D];
const GUARD_MOVE_SPEED = 0.15;
const GUARD_INITIAL_LOOK_DIRECTION = new Vector2(1, 0);
const GUARD_ROTATE_RATE = 0.004;

//Source: https://mymblemoments.wordpress.com/tag/animation/
const GUARD_ANIMATION_DATA = Object.freeze({
    id: "guard_walk",
    spriteSheet: document.getElementById("guard_walk"),
    takes: {  
      "walk" :  {
        fps: 10,
        leadInDelayMs: 0,
        leadOutDelayMs: 0,
        maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
        startCellIndex: 0,
        endCellIndex: 9,
        boundingBoxDimensions: new Vector2(128, 128), //notice I choose the largest of all the widths taken from the cellData array below
        cellData: [
          new Rect(0, 0, 128, 128),
          new Rect(128, 0, 128, 128),
          new Rect(256, 0, 128, 128),
          new Rect(384, 0, 128, 128),
          new Rect(512, 0, 128, 128),
          new Rect(640, 0, 128, 128),
          new Rect(768, 0, 128, 128),
          new Rect(896, 0, 128, 128),
          new Rect(1024, 0, 128, 128),
          new Rect(1152, 0, 128, 128),
          new Rect(0, 0, 128, 128), 
        ]
      }
    }
  });
//#endregion
