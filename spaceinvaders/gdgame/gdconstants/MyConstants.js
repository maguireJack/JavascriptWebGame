
/********************************************************************** AUDIO RESOURCES *********************************************************************/
const audioCueArray = [
	new AudioCue("sound_background",
		AudioType.Background, 1, 1, false, 0),
	new AudioCue("sound_shoot",
		AudioType.Weapon, 1, 1, false, 0),
	new AudioCue("sound_bading",
		AudioType.Explosion, 1, 1, false, 0)
];

/*********************************************************************************************************************************************************/

//sprite positions on spritesheet
const ENEMY_HEIGHT = 16;
const ENEMY_ONE_WIDTH = 22;
const ENEMY_ONE_CELLS = [
	{
		left: 0,
		top: 0,
		width: ENEMY_ONE_WIDTH,
		height: ENEMY_HEIGHT
	},
	{
		left: 0,
		top: ENEMY_HEIGHT,
		width: ENEMY_ONE_WIDTH,
		height: ENEMY_HEIGHT
	}
];

const ENEMY_TWO_WIDTH = 16;
const ENEMY_TWO_CELLS = [
	{
		left: 22,
		top: 0,
		width: ENEMY_TWO_WIDTH,
		height: ENEMY_HEIGHT
	},
	{
		left: 22,
		top: ENEMY_HEIGHT,
		width: ENEMY_TWO_WIDTH,
		height: ENEMY_HEIGHT
	}
];

const ENEMY_THREE_WIDTH = 24;
const ENEMY_THREE_CELLS = [
	{
		left: 38,
		top: 0,
		width: ENEMY_THREE_WIDTH,
		height: ENEMY_HEIGHT
	},
	{
		left: 38,
		top: ENEMY_HEIGHT,
		width: ENEMY_THREE_WIDTH,
		height: ENEMY_HEIGHT
	}
];

const BARRIER_HEIGHT = 24;
const BARRIER_WIDTH = 36;
const BARRIER_LEFT = 84;
const BARRIER_TOP = 8;

/*********************************************************************************************************************************************************/
//bullet variables

//dimensions from PNG
const BULLET_TYPE_A_SPRITESHEET_ORIGIN = new Vector2(67,20);
const BULLET_TYPE_A_SPRITESHEET_DIMENSIONS = new Vector2(7,12);


//properties of the drawn bullet on screen
const BULLET_TYPE_A_INITIAL_TRANSLATION = new Vector2(0, -100);
const BULLET_TYPE_A_OFFSET_FROM_PLAYER = new Vector2(8, -20);

//properties of the MoveBehavior associated with the bullet
const BULLET_TYPE_A_MOVE_SPEED = 0.4;
const BULLET_TYPE_A_MOVE_DIRECTION = new Vector2(0, -1);
const BULLET_TYPE_A_FIRE_INTERVAL_IN_MS = 600;    

/*********************************************************************************************************************************************************/

//player varaibles
//dimensions from PNG
const PLAYER_HEIGHT = 16;
const PLAYER_WIDTH = 22;
const PLAYER_LEFT = 62;
const PLAYER_TOP = 0;

//properties of the drawn player ship on screen
const PLAYER_MOVE_SPEED = 0.25;
const PLAYER_MOVE_DIRECTION = new Vector2(1, 0);
const PLAYER_ORIGIN = new Vector2(0,0);
const PLAYER_Y_POSITION = 750;
