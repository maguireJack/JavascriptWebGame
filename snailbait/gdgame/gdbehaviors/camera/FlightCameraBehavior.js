/**
 * Moves Camera2D by changing the parent transform based on time or user input.
 * @author
 * @version 1.0
 * @class FlightCameraBehavior
 */
class FlightCameraBehavior {
  constructor(keyboardManager, moveKeys, moveSpeed, rotateSpeedInRadians, scaleSpeed) {
    this.keyboardManager = keyboardManager;
    this.moveKeys = moveKeys;
    this.moveSpeed = moveSpeed;
    this.rotateSpeedInRadians = rotateSpeedInRadians;
    this.scaleSpeed = scaleSpeed;
  }

  Execute(gameTime, parent) {

    //translate camera
    if (this.keyboardManager.IsKeyDown(this.moveKeys[0])) {
      parent.Transform2D.TranslateBy(Vector2.MultiplyScalar(this.moveSpeed, -1));
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[1])) {
        parent.Transform2D.TranslateBy(this.moveSpeed);
    }

    //rotate camera
    if (this.keyboardManager.IsKeyDown(this.moveKeys[2])) {
        parent.Transform2D.RotateBy(-this.rotateSpeedInRadians);
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[3])) {
        parent.Transform2D.RotateBy(this.rotateSpeedInRadians);
    }

    //scale camera
    if (this.keyboardManager.IsKeyDown(this.moveKeys[4])) {
        parent.Transform2D.ScaleBy(this.scaleSpeed);
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[5])) {
        parent.Transform2D.ScaleBy(Vector2.MultiplyScalar(this.scaleSpeed, -1));
    }

    //reset camera
    if (this.keyboardManager.IsKeyDown(this.moveKeys[6])) {
        parent.Transform2D.Reset();
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
  

  Clone() {
    return new MoveBehavior(this.moveDirection, this.moveSpeed);
  }
  */
}
