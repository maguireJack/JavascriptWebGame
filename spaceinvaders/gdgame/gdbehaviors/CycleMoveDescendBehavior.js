
/**
 * Moves the parent sprite over and back, then down the screen for Space Invaders game.
 * @author
 * @version 1.0
 * @class CycleMoveDescendBehavior
 */ 
class CycleMoveDescendBehavior{

    currentMoveIncrement = 0;
    timeSinceLastMoveInMs = 0;
    moveDirection = 1; //1 = right, -1 = left

    constructor(moveVector, maxMoveIncrements, intervalBetweenInMs, descendVector) 
    {
        this.moveVector = moveVector; //Vector2
        this.descendVector = descendVector; //Vector2
        this.maxMoveIncrements = maxMoveIncrements; //Number
        this.intervalBetweenInMs = intervalBetweenInMs; //Number
    }
 

    Execute(gameTime, parent)
    {
        this.timeSinceLastMoveInMs += gameTime.ElapsedTimeInMs;

        if(this.timeSinceLastMoveInMs >= this.intervalBetweenInMs)
        {
            this.currentMoveIncrement++;

            if(this.currentMoveIncrement <= this.maxMoveIncrements)
            {
                let translateBy = Vector2.MultiplyScalar(this.moveVector, this.moveDirection);
                parent.Transform2D.TranslateBy(translateBy);
                this.timeSinceLastMoveInMs = 0;
            }
            else if(this.currentMoveIncrement > this.maxMoveIncrements)
            {
                this.moveDirection *= -1;
                this.currentMoveIncrement = 0;
                parent.Transform2D.TranslateBy(this.descendVector);
                this.timeSinceLastMoveInMs = -this.intervalBetweenInMs;
            }
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
        return new CycleMoveDescendBehavior(this.moveVector, this.maxMoveIncrements, this.intervalBetweenInMs, this.descendVector);
    }

 };
