/**
 * This class will listen for state changes (ammo, health, death, respawn) and update UI or respawn sprites, or restart game
 * @author
 * @version 1.0
 * @class GameStateManager
 */

class GameStateManager{

    id = "";
    context;
    health = 100;
    debugEnabled = false;
    
    constructor(id){
        this.id = id;
    
    }

  
    Update(gameTime){

    }

    setHealth(newHealth)
    {
        this.health = newHealth;
    }

    Damage(Damage)
    {
        this.health -= Damage;
    }

}