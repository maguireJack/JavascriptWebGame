/**
 * Moves the parent sprite left to right based on keyboard input.
 * @author
 * @version 1.0
 * @class PlayerMoveBehavior
 */
class PlayerMoveBehavior
{
    constructor(keyboardManager, moveDirection, moveSpeedMultiplier=1)
    {
        this.keyboardManager = keyboardManager;
        this.moveDirection = moveDirection; 
        this.moveSpeedMultiplier = moveSpeedMultiplier;
    }

    Execute(gameTime, parent)
    {
        if(this.keyboardManager.IsKeyDown(Keys.ArrowLeft))
        {
            let translateBy = Vector2.MultiplyScalar(this.moveDirection, -gameTime.ElapsedTimeInMs * this.moveSpeedMultiplier);
            parent.Transform2D.TranslateBy(translateBy);
        }
        else if(this.keyboardManager.IsKeyDown(Keys.ArrowRight))
        {
            let translateBy = Vector2.MultiplyScalar(this.moveDirection, gameTime.ElapsedTimeInMs * this.moveSpeedMultiplier);
            parent.Transform2D.TranslateBy(translateBy);
        }
    }

    /*
    Equals(other) {
        //to do...  
        return false;
    }

    ToString()
    {
        //to do...
        return "undefined";
    }
    */

   Clone() {
    return new PlayerMoveBehavior(this.keyboardManager, this.moveDirection, this.moveSpeedMultiplier);
   }
}