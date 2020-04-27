/**
 * Moves the parent sprite based on keyboard input and detect collisions against platforms, pickups etc
 * @author
 * @version 1.0
 * @class SamPlayerBehavior
 */
class SamPlayerBehavior {
    //#region Static Fields
    //#endregion
  
    //#region Fields
    //#endregion
  
    //#region Properties
    //#endregion
  
    constructor(
      keyboardManager,
      objectManager,
      moveKeys,
      lookDirection,
      moveSpeed = 2,
      rotateSpeed = 0.04
    ) {
      this.keyboardManager = keyboardManager;
      this.objectManager = objectManager;
      this.timer = new Stopwatch();
      this.moveKeys = moveKeys;
      this.hit = false;
      this.lookDirection = lookDirection;
      this.moveSpeed = moveSpeed;
      this.rotateSpeed = rotateSpeed;
    }
  
    //#region Your Game Specific Methods - add code for more CD/CR or input handling
    HandleInput(gameTime, parent) {
      this.HandleMove(gameTime, parent);
    }
  
    HandleMove(gameTime, parent) {
      //if left or right key pressed and player is on the ground then add/remove move velocity
      
      //up/down
      if (this.keyboardManager.IsKeyDown(this.moveKeys[0])) {
        parent.Body.AddVelocityY(-this.moveSpeed * gameTime.ElapsedTimeInMs);
        parent.Artist.SetTake("walk");
      } else if (this.keyboardManager.IsKeyDown(this.moveKeys[1])) {
        parent.Body.AddVelocityY(this.moveSpeed * gameTime.ElapsedTimeInMs);
        parent.Artist.SetTake("walk");
      }

      //left/right
      if (this.keyboardManager.IsKeyDown(this.moveKeys[2])) {
        parent.Body.AddVelocityX(-this.moveSpeed * gameTime.ElapsedTimeInMs);
        parent.Artist.SetTake("walk");
      } else if (this.keyboardManager.IsKeyDown(this.moveKeys[3])) {
        parent.Body.AddVelocityX(this.moveSpeed * gameTime.ElapsedTimeInMs);
        parent.Artist.SetTake("walk");
      }
    }
  
    CheckCollisions(parent) {

      //Currently Handles Enemies
        this.HandlePickupCollision(parent);
        
    
      
      this.HandleEnemyCollision(parent);
      this.HandleArchitectureCollision(parent);
      
    }
  
    HandlePickupCollision(parent) {
      let enemySprites = this.objectManager.Get(ActorType.Enemy);
      
  
      for (let i = 0; i < enemySprites.length; i++) {
        let enemySprite = enemySprites[i];
  
        //we can use simple collision check here (i.e. Intersects) because dont need to think was it top, bottom, left, or right
        if (enemySprite.Transform2D.BoundingBox.Intersects(parent.Transform2D.BoundingBox)) {

          //your code - play sound, remove enemy, add health e.g. you could write code like this...
          //remove coin
          if(this.hit == false){
            this.timer.Start();
          NotificationCenter.Notify(
            new Notification(NotificationType.Sound, NotificationAction.Play, [
              "coin_pickup"]));

          NotificationCenter.Notify(
            new Notification(
              NotificationType.GameState,
              NotificationAction.Damage,
              [5, parent]));
              this.hit = true;

            }
            else{
              if(this.timer.GetElapsedTime() >= 2000)
              {
                this.hit = false;
                this.timer.Reset();
              }
              else{
                
              }
            }  
        }
      }
    }
  
    HandleEnemyCollision(parent) {
      let sprites = this.objectManager.Get(ActorType.Player);
  
      for (let i = 0; i < sprites.length; i++) {
        let sprite = sprites[i];
  
        //if player != me then test
        if(sprite != this){
          if (parent.Transform2D.BoundingBox.Intersects(sprite.Transform2D.BoundingBox)) {  
            //your code - play sound
            
            //remove health
            NotificationCenter.Notify(
              new Notification(
                NotificationType.GameState,
                NotificationAction.Damage,
                [-10, sprite.id]));
                
          }
        }
      }
    }
  
    //#endregion
  
    //#region Core Methods - doesnt need to change
    Execute(gameTime, parent) {
      this.HandleInput(gameTime, parent);
      this.ApplyForces(parent);
      this.CheckCollisions(parent);
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
        let collisionLocationType = Collision.GetCollisionLocationType(parent,sprite);
  
        if (collisionLocationType === CollisionLocationType.Left ||
          collisionLocationType === CollisionLocationType.Right) {
          parent.Body.SetVelocityX(0);
        } else if (collisionLocationType === CollisionLocationType.Bottom || 
          collisionLocationType === CollisionLocationType.Top) {
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