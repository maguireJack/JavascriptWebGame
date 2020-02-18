/**
 * Stores, updates, and draws all sprites in my specific game e.g. SpaceInvaders.
 * @author
 * @version 1.0
 * @class MyObjectManager
 */

class MyObjectManager extends ObjectManager {

    //PC and NPCs
    enemySprites = [];
    playerSprites = [];

    //bullets fired by PC and NPCs
    bulletSprites = [];

    //sprites destroyed by bullets 
    destructibleSprites = [];

    //stores all other sprites e.g. background
    decoratorSprites = [];

    //these getters allow a collision manager to get access to the sprites for collision detection/collision response (CD/CR) testing
    get EnemySprites() { return this.enemySprites;}
    get PlayerSprites() { return this.playerSprites;}
    get BulletSprites() { return this.bulletSprites;}
    get DestructibleSprites() { return this.destructibleSprites;}

    constructor(id, ctx=null, debugEnabled=false) {
        super(id, ctx, debugEnabled);
    }

    Add(sprite) {
        //is it valid and the correct object type?
        if (sprite != null && sprite instanceof Sprite) {
            //does it have a sprite type?
            if (sprite.ActorType) {
                switch (sprite.ActorType) {
                    case ActorType.Bullet:
                        this.bulletSprites.push(sprite);
                        break;
                    case ActorType.Enemy:
                        this.enemySprites.push(sprite);
                        break;
                    case ActorType.Player:
                        this.playerSprites.push(sprite);
                        break;
                    case ActorType.DestructibleObstacle:
                        this.destructibleSprites.push(sprite);
                        break;
                    default:
                        this.decoratorSprites.push(sprite);
                        break;
                }
            }
        }
    }

//#region Optional Functions
    Get(spriteID) {
        //to do....      
    }

    Get(spriteID, actorType) {
        //to do....      
    }

    Remove(spriteID) {
        //to do....
    }

    Remove(spriteID, actorType) {
        //to do....
    }

    RemoveAll(actorType) {
        //to do....
    }

    Clear() {
        //to do....
    }
//#endregion

    Update(gameTime) {

        this.UpdateAll(gameTime);
    }

    Draw(gameTime) {

        this.DrawAll(gameTime);
        if(this.DebugEnabled)
            this.DrawDebug();
    }

    UpdateAll(gameTime){

        for (let i = 0; i < this.enemySprites.length; i++)
            this.enemySprites[i].Update(gameTime);

        for (let i = 0; i < this.playerSprites.length; i++)
            this.playerSprites[i].Update(gameTime);

        for (let i = 0; i < this.bulletSprites.length; i++)
            this.bulletSprites[i].Update(gameTime);

        for (let i = 0; i < this.destructibleSprites.length; i++)
            this.destructibleSprites[i].Update(gameTime);

        for (let i = 0; i < this.decoratorSprites.length; i++)
            this.decoratorSprites[i].Update(gameTime);
    }

    DrawAll(gameTime){
			
        for (let i = 0; i < this.decoratorSprites.length; i++)
            this.decoratorSprites[i].Draw(gameTime);
		
		for (let i = 0; i < this.bulletSprites.length; i++)
			this.bulletSprites[i].Draw(gameTime);

        for (let i = 0; i < this.enemySprites.length; i++)
            this.enemySprites[i].Draw(gameTime);

        for (let i = 0; i < this.playerSprites.length; i++)
            this.playerSprites[i].Draw(gameTime);

        for (let i = 0; i < this.destructibleSprites.length; i++)
            this.destructibleSprites[i].Draw(gameTime);

    }

    //draws the CD/CR Rect around sprites if enabled
    DrawDebug(){

    for (let i = 0; i < this.enemySprites.length; i++)
        this.DrawDebugBoundingBox("red", this.enemySprites[i].Transform2D.BoundingBox);

    for (let i = 0; i < this.playerSprites.length; i++)
        this.DrawDebugBoundingBox("red", this.playerSprites[i].Transform2D.BoundingBox);

    for (let i = 0; i < this.bulletSprites.length; i++)
        this.DrawDebugBoundingBox("red", this.bulletSprites[i].Transform2D.BoundingBox);

    for (let i = 0; i < this.destructibleSprites.length; i++)
        this.DrawDebugBoundingBox("red", this.destructibleSprites[i].Transform2D.BoundingBox);
    }
}