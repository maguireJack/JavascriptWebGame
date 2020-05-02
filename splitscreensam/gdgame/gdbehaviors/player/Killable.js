/**
 * Moves the enemy sprite around and damages player
 * @author JMG
 * @version 1.0
 * @class Killable
 */
class Killable {
    //#region Static Fields
    //#endregion
  
    //#region Fields
    //#endregion
  
    //#region Properties
    //#endregion
  
    constructor(objectManager, lookDirection, moveSpeed = 2, rotateSpeed = 0.04)
    {
      this.objectManager = objectManager;
      this.lookDirection = lookDirection;
      this.moveSpeed = moveSpeed;
      this.rotateSpeed = rotateSpeed;
    }
  
    //#region Your Game Specific Methods - add code for more CD/CR or input handling
    HandleInput(gameTime, parent) {
      this.HandleMove(gameTime, parent);
    }
  
    HandleMove(gameTime, parent) {
      /**
       * Gets the nearest player(needs revision), and moves towards them. Checks each axis individually and so
       * may not accurately track the "closest" player, rather the "lesser xy" player
       */
      let sprites = this.objectManager.Get(ActorType.Player);
      let trackedPlayer = null;
      //   let player2 = sprites[1];
        let player1 = sprites[0];
        let player2 = sprites[1];

        let tempXY = new Vector2(player1.Transform2D.BoundingBox.X, player1.Transform2D.BoundingBox.Y);
        let playerXY = new Vector2(player2.Transform2D.BoundingBox.X, player2.Transform2D.BoundingBox.Y);

        

      //   if(tempXY >= new Vector2(player2.Transform2D.BoundingBox.X, player2.Transform2D.BoundingBox.Y))
      //   {
            let currentPos = new Vector2(parent.Transform2D.BoundingBox.X, parent.Transform2D.BoundingBox.Y);
            let distanceToPlayer1 = new Vector2(Math.abs(tempXY.X - currentPos.X), Math.abs(tempXY.Y - currentPos.Y));
            let distanceToPlayer2 = new Vector2(Math.abs(playerXY.X - currentPos.X), Math.abs(playerXY.Y - currentPos.Y));


            if(distanceToPlayer1.Y >= distanceToPlayer2.Y)
            {
              trackedPlayer = playerXY;
            }
            else if(distanceToPlayer1.Y < distanceToPlayer2.Y)
            {
              trackedPlayer = tempXY;
            }

            if(distanceToPlayer1.X >= distanceToPlayer2.X)
            {
              trackedPlayer = playerXY;
            }
            else if(distanceToPlayer1.X < distanceToPlayer2.X)
            {
              trackedPlayer = tempXY;
            }

            

            
            // if(playerXY.Y <= tempXY.Y)
            // {
            //    trackedPlayer = playerXY;
            // }
            // else if(playerXY.Y > tempXY.Y)
            // {
            //     trackedPlayer = tempXY;
            // }

           
            // if(playerXY.X <= tempXY.X)
            // { 
            //     trackedPlayer = playerXY;
            // }
            // else if(playerXY.X > tempXY.X)
            // {
            //   trackedPlayer = tempXY;
            // }

      // if(Math.abs(currentPos.X - tempXY.X) <= 5 || Math.abs(currentPos.Y - tempXY.Y) <= 5){

          if(currentPos.Y <= trackedPlayer.Y)
          {
              parent.Body.AddVelocityY(this.moveSpeed * gameTime.ElapsedTimeInMs);
              parent.Artist.SetTake("walk");
          }
          else if(currentPos.Y > trackedPlayer.Y)
          {
              parent.Body.AddVelocityY(-this.moveSpeed * gameTime.ElapsedTimeInMs);
              parent.Artist.SetTake("walk");
          }

          if(currentPos.X <= trackedPlayer.X)
          {
              parent.Body.AddVelocityX(this.moveSpeed * gameTime.ElapsedTimeInMs);
              parent.Artist.SetTake("walk");
          }
          else if(currentPos.X > trackedPlayer.X)
          {
              parent.Body.AddVelocityX(-this.moveSpeed * gameTime.ElapsedTimeInMs);
              parent.Artist.SetTake("walk");
          }
      // }
         
      // }





    
  //   //up/down
  //   if (this.keyboardManager.IsKeyDown(this.moveKeys[0])) {
  //     parent.Body.AddVelocityY(-this.moveSpeed * gameTime.ElapsedTimeInMs);
  //     parent.Artist.SetTake("walk");
  //   } else if (this.keyboardManager.IsKeyDown(this.moveKeys[1])) {
  //     parent.Body.AddVelocityY(this.moveSpeed * gameTime.ElapsedTimeInMs);
  //     parent.Artist.SetTake("walk");
  //   }

  //   //left/right
  //   if (this.keyboardManager.IsKeyDown(this.moveKeys[2])) {
  //     parent.Body.AddVelocityX(-this.moveSpeed * gameTime.ElapsedTimeInMs);
  //     parent.Artist.SetTake("walk");
  //   } else if (this.keyboardManager.IsKeyDown(this.moveKeys[3])) {
  //     parent.Body.AddVelocityX(this.moveSpeed * gameTime.ElapsedTimeInMs);
  //     parent.Artist.SetTake("walk");
  //   }
  }
  
    CheckCollisions(parent) {

      //bug - temporarily remove because of changes being made to bounding boxes
     this.HandleArchitectureCollision(parent);

      // this.HandlePlayerCollision(parent);
      
    }
  
    
  
    HandlePlayerCollision(parent) {
      let players = this.objectManager.Get(ActorType.Player);
  
      for (let i = 0; i < players.length; i++) {
        let player = players[i];
  
        //if player != me then test
        if(player != this){
          if (parent.Transform2D.BoundingBox.Intersects(player.Transform2D.BoundingBox)) {  
            //your code - play sound
            
            //remove health
            NotificationCenter.Notify(
              new Notification(
                NotificationType.GameState,
                NotificationAction.Damage,
                [-10, player.id]));
          }
        }
      }
    }
  
    //#endregion
  
    //#region Core Methods - doesnt need to change
    Execute(gameTime, parent) {
      this.HandleInput(gameTime, parent);
      this.ApplyForces(parent);
      // this.CheckCollisions(parent);
      this.ApplyInput(parent);
    }
   
    ApplyForces(parent) {
      //notice we need to slow body in X and Y and we dont ApplyGravity() in a top-down game
      parent.Body.ApplyFrictionX();
      parent.Body.ApplyFrictionY();
    }
  
    HandleArchitectureCollision(parent) {
      let sprites = this.objectManager.Get(ActorType.Architecture);

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      let collisionLocationType = Collision.GetIntersectsLocation(parent, sprite);

      //the code below fixes a bug which caused sprites to stick inside an object
      if (collisionLocationType === CollisionLocationType.Left) {
        if (parent.Body.velocityX <= 0)
          parent.Body.SetVelocityX(0);
      } else if (collisionLocationType === CollisionLocationType.Right) {
        if (parent.Body.velocityX >= 0)
          parent.Body.SetVelocityX(0);
      }
      //the code below fixes a bug which caused sprites to stick inside an object
      if (collisionLocationType === CollisionLocationType.Top) {
        if (parent.Body.velocityY <= 0)
          parent.Body.SetVelocityY(0);
      } else if (collisionLocationType === CollisionLocationType.Bottom) {
        if (parent.Body.velocityY >= 0)
          parent.Body.SetVelocityY(0);
      }

    }
    }
  
    ApplyInput(parent) {
      //if we have small left over values then zero
      if (Math.abs(parent.Body.velocityX) <= Body.MIN_SPEED)
        parent.Body.velocityX = 0;
      if (Math.abs(parent.Body.velocityY) <= Body.MIN_SPEED)
        parent.Body.velocityY = 0;
  
      //apply velocity to (x,y) of the parent's translation
      parent.Transform2D.TranslateBy(new Vector2(parent.Body.velocityX, parent.Body.velocityY));
    }
    //#endregion
  
    //#region Common Methods - Equals, ToString, Clone
    Equals(other) {
      //to do...
      throw "Not Yet Implemented";
    }
  
    ToString() {
      //to do...
      throw "Not Yet Implemented";
    }
  
    Clone() {
      //to do...
      throw "Not Yet Implemented";
    }
    //#endregion
  }