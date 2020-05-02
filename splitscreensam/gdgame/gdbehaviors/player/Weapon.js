class Weapon
{
    constructor(keyboardManager, objectManager, attackKey, lookDirection, swingSpeed, attachedPlayer)
    {
        this.keyboardManager = keyboardManager;
        this.objectManager = objectManager;
        this.attackKey = attackKey;
        this.lookDirection = lookDirection;
        this.swingSpeed = swingSpeed;
        this.attachedPlayer = attachedPlayer;
        
    }

    Execute(gameTime, parent)
    {
        this.HandleInput(gameTime, parent);
        this.HandleDamage(gameTime, parent);
    }

    HandleInput(gameTime, parent)
    {
        this.HandleSword(gameTime, parent);
    }

    HandleDamage(gameTime, parent)
    {
        let canAttack = false;
        let sprites = this.objectManager.Get(ActorType.Enemy);

        for(let i = 0; i < sprites.length; i++)
        {
            let sprite = sprites[i];
            if(this.keyboardManager.IsKeyDown(this.attackKey[0]))
            {
                canAttack = true;
            }
            else if(this.keyboardManager.IsKeyUp(this.attackKey[0]))
            {
                canAttack = false;
            }

            if(canAttack)
            {
                if(parent.Transform2D.BoundingBox.Intersects(sprite.Transform2D.BoundingBox))
                {
                    NotificationCenter.Notify(
                        new Notification(
                        NotificationType.GameState,
                        NotificationAction.Damage,
                        [5, sprite]));
                        
                }   
            }
        }

    }


    HandleSword(gameTime, parent)
    {     
        let player = this.attachedPlayer;
        let pos = new Vector2(player.Transform2D.BoundingBox.X + 15, player.Transform2D.BoundingBox.Y + 10);
        
        parent.Transform2D.Translation = pos;


        if(this.keyboardManager.IsKeyDown(this.attackKey[0]))
        {
            parent.Transform2D.RotateBy(0.3);


            if(parent.Transform2D.RotationInRadians >= 1.5)
            {
                parent.Transform2D.RotationInRadians = 1.5;
            }
            
        }
        else if(this.keyboardManager.IsKeyUp(this.attackKey[0]))
        {
            parent.Transform2D.RotationInRadians = 0;
        }
        
        
        
    }
}