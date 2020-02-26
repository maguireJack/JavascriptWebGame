/**
 * Moves Camera2D to the left based on move direction.
 * @author
 * @version 1.0
 * @class PanCameraBehavior
 */
class PanCameraBehavior {
    constructor() {
        this.timeSinceLastUpdate = 0;
    }
  
    Execute(gameTime, parent) {

        this.timeSinceLastUpdate += gameTime.ElapsedTimeInMs;
        if(this.timeSinceLastUpdate >= 1000)
        {
            parent.Transform2D.TranslateBy(new Vector2(10, 0));
            this.timeSinceLastUpdate = 0;
        }
    }
  }
  