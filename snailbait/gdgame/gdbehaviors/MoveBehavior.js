/**
 * Moves sprite based either on time-based or user input.
 * @author
 * @version 1.0
 * @class MoveBehavior
 */
class MoveBehavior
{
    constructor(moveDirection, moveSpeed)
    {
          this.moveDirection = moveDirection;
          this.moveSpeed = moveSpeed;
    }

    Execute(gameTime, parent)
    {
       let translateBy = Vector2.MultiplyScalar(this.moveDirection, gameTime.ElapsedTimeInMs * this.moveSpeed);
       parent.Transform2D.TranslateBy(translateBy);
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
    return new MoveBehavior(this.moveDirection, this.moveSpeed);
   }

}