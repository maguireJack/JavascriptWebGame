/**
 * Moves the parent sprite based on keyboard input and detect collisions against platforms, pickups etc
 * @author
 * @version 1.0
 * @class PlayerBehavior
 */
class PlayerBehavior {
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
    runVelocity = 2,
    jumpVelocity = 10
  ) {
    this.keyboardManager = keyboardManager;
    this.objectManager = objectManager;

    this.moveKeys = moveKeys;
    this.runVelocity = runVelocity;
    this.jumpVelocity = jumpVelocity;
  }

  //#region Your Game Specific Methods - add code for more CD/CR or input handling
  HandleInput(gameTime, parent) {
    this.HandleMove(gameTime, parent);
    this.HandleJump(gameTime, parent);

    //your game - add more input handling here...
    //this.HandleMouse(gameTime, parent);
  }

  HandleMove(gameTime, parent) {
    //if left or right key pressed and player is on the ground then add/remove move velocity
    if (this.keyboardManager.IsKeyDown(this.moveKeys[0])) {
      parent.Body.AddVelocityX(-this.runVelocity * gameTime.ElapsedTimeInMs);
      parent.Artist.SetTake("run_left");
      //  parent.Artist.Cells = this.runLeftCells;
    } else if (this.keyboardManager.IsKeyDown(this.moveKeys[1])) {
      parent.Body.AddVelocityX(this.runVelocity * gameTime.ElapsedTimeInMs);
      parent.Artist.SetTake("run_right");
      //parent.Artist.Cells = this.runRightCells;
    }
  }

  CheckCollisions(parent) {
    parent.Body.IsOnGround = false;
    this.HandlePlatformCollision(parent);
    this.HandleEnemyCollision(parent);
    this.HandlePickupCollision(parent);
  }

  HandlePickupCollision(parent) {
    let sprites = this.objectManager.Get(ActorType.Pickup);

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];

      //we can use simple collision check here (i.e. Intersects) because dont need to think was it top, bottom, left, or right
      if (parent.Transform2D.BoundingBox.Intersects(sprite.Transform2D.BoundingBox)) {


        notificationCenter.Notify(
          new Notification(
            NotificationType.Sprite,
            NotificationAction.RemoveFirst,
            [sprite]));

        //uncomment this code to see how we could remove ALL platforms    
        // notificationCenter.Notify(new Notification(
        //   NotificationType.Sprite,  //Who is registered to listen to this notification? see ObjectManager::RegisterForNotifications
        //   NotificationAction.RemoveAllByType, //how does the ObjectManager handle the notification? see ObjectManager::HandleNotification
        //   [ActorType.Platform]));  //what parameters does the method you are calling expect? see ObjectManager::RemoveAllByType()

        //uncomment this code to see how we could remove the first platform with an X position > 400
        notificationCenter.Notify(
          new Notification(
            NotificationType.Sprite, NotificationAction.RemoveFirstBy,
            [ActorType.Platform, 
          sprite => 
          sprite.Transform2D.Translation.X > 400]
          )
        );

      }
    }
  }

  HandleEnemyCollision(parent) {
    let sprites = this.objectManager.Get(ActorType.Enemy);

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];

      if (
        parent.Transform2D.BoundingBox.Intersects(
          sprite.Transform2D.BoundingBox
        )
      ) {

        //your code - play sound, remove enemy, add health e.g. you could write code like this...
        notificationCenter.Notify(
          new Notification(
            NotificationType.GameState,
            NotificationAction.Health,
            [5]
          )
        );
        notificationCenter.Notify(
          new Notification(
            NotificationType.Sprite,
            NotificationAction.RemoveFirst,
            [sprite]
          )
        );
        notificationCenter.Notify(
          new Notification(NotificationType.Sound, NotificationAction.Play, [
            "background"
          ])
        );
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

  HandleJump(gameTime, parent) {
    //if jump key is pressed and player is not jumping and on the ground then jump
    if (
      this.keyboardManager.IsKeyDown(this.moveKeys[2]) &&
      !parent.Body.IsJumping &&
      parent.Body.IsOnGround
    ) {
      parent.Body.IsJumping = true;
      parent.Body.IsOnGround = false;
      parent.Body.SetVelocityY(-this.jumpVelocity * gameTime.ElapsedTimeInMs);
      notificationCenter.Notify(
        new Notification(NotificationType.Sound, NotificationAction.Play, [
          "jump"
        ])
      );
    }
  }

  ApplyForces(parent) {
    parent.Body.ApplyGravity();
    parent.Body.ApplyFriction();
  }

  HandlePlatformCollision(parent) {
    let sprites = this.objectManager.Get(ActorType.Platform);

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      let collisionLocationType = Collision.GetCollisionLocationType(
        parent,
        sprite
      );

      if (
        collisionLocationType === CollisionLocationType.Left ||
        collisionLocationType === CollisionLocationType.Right
      ) {
        parent.Body.SetVelocityX(0);
      } else if (collisionLocationType === CollisionLocationType.Bottom) {
        parent.Body.IsOnGround = true;
        parent.Body.IsJumping = false;
      } else if (collisionLocationType === CollisionLocationType.Top) {
        parent.Body.SetVelocityY(1);
      }
    }
  }

  ApplyInput(parent) {
    //if on the ground then dont apply any Y velocity
    if (parent.Body.IsOnGround) {
      parent.Body.SetVelocityY(0);
    }

    //if we have small left over values then zero
    if (Math.abs(parent.Body.velocityX) <= Body.MIN_SPEED)
      parent.Body.velocityX = 0;
    if (Math.abs(parent.Body.velocityY) <= Body.MIN_SPEED)
      parent.Body.velocityY = 0;

    //apply velocity to (x,y) of the parent's translation
    parent.Transform2D.TranslateBy(
      new Vector2(parent.Body.velocityX, parent.Body.velocityY)
    );
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
