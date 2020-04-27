class Weapon
{
    constructor(keyboardManager, objectManager, attackKey, lookDirection, swingSpeed)
    {
        this.keyboardManager = keyboardManager;
        this.objectManager = objectManager;
        this.attackKey = attackKey;
        this.lookDirection = lookDirection;
        this.swingSpeed = swingSpeed;
        
    }

    Execute(gameTime, parent)
    {
        this.HandleInput(gameTime, parent);
    }

    HandleInput(gameTime, parent)
    {
        this.HandleSword(gameTime, parent);
    }


    HandleSword(gameTime, parent)
    {
        let players = this.objectManager.Get(ActorType.Player);
        let player = players[0];
        let pos = new Vector2(player.Transform2D.BoundingBox.X + 15, player.Transform2D.BoundingBox.Y);
        
        parent.Transform2D.Translation = pos;
        
    }
}