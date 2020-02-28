/**
 * This is reponsible for checking all relevant collisions within the game, removing sprites, playing collision related sounds, notifying
 * the UI that the player has win/lost etc. 
 * @author
 * @version 1.0
 * @class MyCollisionManager 
 */

class MyCollisionManager{

    constructor(objectManager, soundManager, screenRectangle, enemyWinDepthAsFraction=0.8){
        this.objectManager = objectManager;
        this.soundManager = soundManager;
        this.screenRectangle = screenRectangle;
        this.enemyWinDepthAsFraction = enemyWinDepthAsFraction;
    }

    Update(gameTime){
 
        //check that the player is not trying to move outside the horizontal constraints of the screen
        //this.CheckPlayerBounds(gameTime);

        //check that enemies have not reached the bottom of the screen
        this.CheckEnemyBounds(gameTime);
        
        //check that bullets are visible, remove if not
        this.CheckBulletBounds(gameTime);

        //test for bullet vs enemy or player hits
        this.HandleHitEnemy(gameTime);
        this.HandleHitPlayer(gameTime);
    }

    CheckPlayerBounds(gameTime)
    {
        //should we do this here, or inside the player move behavior?
    }

    CheckEnemyBounds(gameTime)
    {
        //to do...
        for(let i = 0; i < this.objectManager.EnemySprites.length; i++)
        {
            let sprite = this.objectManager.EnemySprites[i];
            let boundingBox = sprite.Transform2D.BoundingBox;
            if(boundingBox.Y > this.enemyWinDepthAsFraction * this.screenRectangle.Height)
            {
                console.log("debug - lose - enemies have reached the bottom of the screen!");
            }
        }
    }

    CheckBulletBounds(gameTime)
    {
        for(let i = 0; i < this.objectManager.BulletSprites.length; i++)
        {
            let sprite = this.objectManager.BulletSprites[i];
            let boundingBox = sprite.Transform2D.BoundingBox;

            //if the bullet is off the screen then remove it from the array in object manager
            if(!boundingBox.Intersects(this.screenRectangle))
                this.objectManager.BulletSprites.splice(i, 1);
        }
    }

    HandleHitEnemy(gameTime)
    {

        for(let i = 0; i < this.objectManager.BulletSprites.length; i++)
        {
            let sprite = this.objectManager.BulletSprites[i];
            let boundingBox = sprite.Transform2D.BoundingBox;

            for(let j = 0; j < this.objectManager.EnemySprites.length; j++)
            {
                let enemy = this.objectManager.EnemySprites[j];
                let enemyBoundingBox = enemy.Transform2D.BoundingBox;

                if(boundingBox.Intersects(enemyBoundingBox))
                {
                    this.objectManager.EnemySprites.splice(j, 1);
                    this.objectManager.BulletSprites.splice(i, 1);
                    //play sound!
                    notificationCenter.Notify(new Notification(NotificationType.Sound, 
                        NotificationAction.Play,  ["sound_shoot"]));

                }
            }
        }






    }

    HandleHitPlayer(gameTime)
    {
        //to do...
    }


}