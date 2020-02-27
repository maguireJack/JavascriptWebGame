
//used to draw color to the screen e.g. ClearScreen(Color.Black)
const Color = Object.freeze({
    Black: '#000000',
    White: '#FFFFFF',
    Grey: '#8b8680',
    CornFlowerBlue: '#6495ed'
});

//used by any entity which listens for key input
const Keys = Object.freeze({
    Space: 32,      Enter: 13,
    ArrowLeft: 37,  ArrowUp: 38,    ArrowRight: 39,    ArrowDown: 40,
    A: 65,      B: 65,    C: 67,    D: 68,    E: 69,
    F: 70,      G: 71,    H: 72,    I: 73,    J: 74,
    K: 75,      L: 76,    M: 77,    N: 78,    O: 79,
    P: 80,      Q: 81,    R: 82,    S: 83,    T: 84,
    U: 85,      V: 86,    W: 87,    X: 88,    Y: 89,  
    Z: 90,
    F1: 112,     F2: 113,    F3: 114,    F4: 115,
    F5: 116,     F6: 117,    F7: 118,    F8: 119,
    F9: 120,     F10: 121,    F11: 122,    F12: 123,
    NumPad0: 96,  NumPad1: 97,  NumPad2: 98,  NumPad3: 99, NumPad4: 100,  
    NumPad5: 101,  NumPad6: 102,  NumPad7: 103,  NumPad8: 104,  NumPad9: 105,
});

//used by Actor2D
const StatusType = Object.freeze({
    Off: 1,
    IsDrawn: 2,
    IsUpdated: 4
    //add more here as required but ENSURE they are 2^N values
    //its important that the values are powers of two because we combine them using a bitwise-OR
    //e.g. StatusType.IsUpdated | StatusType.IsDrawn
    //if we dont need to ever combine the values then we just use a number of Symbol() as in the types below.
});

const AudioType = Object.freeze({ //replaced user-defined values with Symbol 
	Background :    Symbol('Background'),
	Menu:           Symbol('Menu'),
    Explosion:      Symbol('Explosion'),
    Move:           Symbol('Move'),
    Pickup:         Symbol('Pickup'),
    Damage:         Symbol('Damage'),
	WinLose:        Symbol('WinLose'),
	Weapon:         Symbol('Weapon'),
    All:            Symbol('All')
    //add as many audio types as your game needs here...
  });


  const ActorType = Object.freeze({ //replaced user-defined values with Symbol 
    Background:     0,
    Platform:       1,
    Decorator:      2,
    Pickup:         3,
    Interactable:   4,
    Bullet:         5,
    Enemy:          6,
    NPC:            7,
    Player:         9,
    Camera:         10,
    HUD:            11,
    //add as many actor types as your game needs here BUT remember that the assigned number will determine drawn sort order...
});

// const ActorType = Object.freeze({ //replaced user-defined values with Symbol 
//     Player:                 'Player',
//     Enemy:                  'Enemy',
//     NPC:                    'NPC',
//     Interactable:           'Interactable',
//     Inventory:              'Inventory',
//     Health:                 'Health',
//     Ammo:                   'Ammo',
//     Decorator:              'Decorator',
//     Platform:               'Platform',
//     NonDesctructibleObstacle: 'NonDesctructibleObstacle',
//     DestructibleObstacle:   'DestructibleObstacle',
//     Bullet:                 'Bullet',
//     Menu:                   'Menu',
//     HUD:                    'HUD',
//     Background:             'Background',
//     UIText:                 'UIText',
//     Camera2D:               'Camera2D'
//     //add as many actor types as your game needs here...
// });

const EasingStrengthType = Object.freeze({
        Slow: 1.1,
        Medium: 1.5,
        Fast: 2
});