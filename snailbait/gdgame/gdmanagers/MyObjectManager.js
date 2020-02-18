/**
 * Stores, updates, and draws all sprites in my specific game e.g. Snailbait.
 * @author
 * @version 1.0
 * @class MyObjectManager
 */

class MyObjectManager extends ObjectManager {
  //PC and NPCs
  enemySprites = [];
  playerSprites = [];
  platformSprites = [];

  //stores all the background sprites e.g. trees, clouds, mountains
  backgroundSprites = [];

  //stores all interactable sprites e.g. ammo, pickup
  interactableSprites = [];

  //stores all other sprites
  decoratorSprites = [];

  //this offset will be applied to all sprites listed in UpdateGlobalTranslationOffset()
  deltaTranslationOffset = Vector2.Zero;
  translationOffset = Vector2.Zero;

  //these getters allow a collision manager to get access to the sprites for collision detection/collision response (CD/CR) testing
  get EnemySprites() {
    return this.enemySprites;
  }
  get PlayerSprites() {
    return this.playerSprites;
  }
  get PlatformSprites() {
    return this.platformSprites;
  }
  get InteractableSprites() {
    return this.interactableSprites;
  }
  get BackgroundSprites() {
    return this.backgroundSprites;
  }

  /**
   * Used by a player sprite to set the translation offset for all sprites that need to be moved when player moves.
   * e.g. in a scrollable game we move everything around the player instead of moving the player.     *
   * @memberof MyObjectManager
   */
  set DeltaTranslationOffset(deltaTranslationOffset) {
    this.deltaTranslationOffset = deltaTranslationOffset;
    this.translationOffset.Add(deltaTranslationOffset);
    this.IsDirty = true;
  }

  constructor(
    id,
    statusType,
    notificationCenter,
    canvas,
    context,
    debugEnabled,
    scrollBoundingBoxBorder
  ) {
    super(id, statusType, canvas, context, debugEnabled, scrollBoundingBoxBorder);
    this.notificationCenter = notificationCenter;
    this.RegisterForNotifications();
  }

  //#region Notification Handling

  //handle all GameState type events - see PlayerBehavior::HandleEnemyCollision()
  RegisterForNotifications() {

    //handle events related to add/remove sprites
    this.notificationCenter.Register(
      NotificationType.Sprite,
      this,
      //nmcg - bug fix - 11.2.20 - there was no function (i.e. no notification handler called HandleSpriteNotification)
      this.HandleNotification //formerly this.HandleSpriteNotification
    );

    this.notificationCenter.Register(
      NotificationType.Menu,
      this,
      this.HandleNotification
    );


  }

  HandleNotification(...argArray) {
    let notification = argArray[0];
    switch (notification.NotificationAction) {
      case NotificationAction.Remove:
        this.HandleRemoveSprite(notification.NotificationArguments);
        break;

      case NotificationAction.Spawn:
        this.HandleSpawnSprite(notification.NotificationArguments);
        break;

      case NotificationAction.ShowMenuChanged:
        this.HandleShowMenu(notification.NotificationArguments);
        break;

      default:
        break;
    }
  }

  HandleShowMenu(argArray) {
    this.statusType = argArray[0];
  }

  HandleRemoveSprite(argArray) {
    let spriteToRemove = argArray[0];
    this.Remove(spriteToRemove);
  }


  //#endregion

  /**
   * Call this method before the game starts and after we add
   * all the sprites to sort the draw order of the sprites by depth
   * where 0 == back and 1 == front.
   *
   * @memberof MyObjectManager
   */
  SortAllByDepth(spriteArray, sortFunc) {
    //sort functions need to return -ve, 0, or +ve number
    spriteArray.sort(sortFunc);
  }

  //#region Add, FindIndex, Remove

  Add(sprite) {
    //is it valid and the correct object type?
    if (sprite != null && sprite instanceof Sprite) {
      //does it have a sprite type?
      if (sprite.ActorType) {
        switch (sprite.ActorType) {
          case ActorType.Enemy:
            this.enemySprites.push(sprite);
            break;
          case ActorType.Player:
            this.playerSprites.push(sprite);
            break;
          case ActorType.Platform:
            this.platformSprites.push(sprite);
            break;
          case ActorType.Background:
            this.backgroundSprites.push(sprite);
            break;

          //notice we can group lots of similar actor types into a single array i.e. interactables
          case ActorType.Health:
          case ActorType.Inventory:
          case ActorType.Interactable:
          case ActorType.Ammo:
            this.interactableSprites.push(sprite);
            break;

          //add more cases for each of the new ActorTypes that you add in your game
          default:
            this.decoratorSprites.push(sprite);
            break;
        }
      }
    }
  }

  Remove(sprite) {
    //is it valid and the correct object type?
    if (sprite != null && sprite instanceof Sprite) {
      //does it have a sprite type?
      if (sprite.ActorType) {
        switch (sprite.ActorType) {
          case ActorType.Enemy:
            this.enemySprites.splice(this.FindIndex(sprite), 1);
            break;
          case ActorType.Player:
            this.playerSprites.splice(this.FindIndex(sprite), 1);
            break;
          case ActorType.Platform:
            this.platformSprites.splice(this.FindIndex(sprite), 1);
            break;
          case ActorType.Background:
            this.backgroundSprites.splice(this.FindIndex(sprite), 1);
            break;

          //notice we can group lots of similar actor types into a single array i.e. interactables
          case ActorType.Health:
          case ActorType.Inventory:
          case ActorType.Interactable:
          case ActorType.Ammo:
            this.interactableSprites.splice(this.FindIndex(sprite), 1);
            break;

          //add more cases for each of the new ActorTypes that you add in your game
          default:
            this.decoratorSprites.splice(FindIndex(sprite), 1);
            break;
        }
      }
    }
  }

  FindIndex(sprite) {
    let index = -1;

    if (sprite) {
      switch (sprite.ActorType) {
        case ActorType.Enemy:
          index = this.enemySprites.findIndex((s) => s === sprite);
          break;
        case ActorType.Player:
          index = this.playerSprites.findIndex((s) => s === sprite);
          break;
        case ActorType.Platform:
          index = this.platformSprites.findIndex((s) => s === sprite);
          break;
        case ActorType.Background:
          index = this.backgroundSprites.findIndex((s) => s === sprite);
          break;

        case ActorType.Health:
        case ActorType.Inventory:
        case ActorType.Interactable:
        case ActorType.Ammo:
          index = this.interactableSprites.findIndex((s) => s === sprite);
          break;

        default:
          index = this.decoratorSprites.findIndex((s) => s === sprite);
          break;
      }
    }

    return index;
  }

  RemoveByType(actorType) {
    //does it have a sprite type?
    if (actorType) {
      switch (actorType) {
        case ActorType.Enemy:
          this.enemySprites.splice(0, this.enemySprites.length);
          break;
        case ActorType.Player:
          this.playerSprites.splice(0, this.playerSprites.length);
          break;
        case ActorType.Platform:
          this.platformSprites.splice(0, this.platformSprites.length);
          break;
        case ActorType.Background:
          this.backgroundSprites.splice(0, this.backgroundSprites.length);
          break;

        case ActorType.Health:
        case ActorType.Inventory:
        case ActorType.Interactable:
        case ActorType.Ammo:
          this.interactableSprites.splice(0, this.interactableSprites.length);
          break;

        default:
          this.decoratorSprites.splice(0, this.decoratorSprites.length);
          break;
      }
    }
  }

  RemoveAll() {
    //why not just set length = 0 or arr = []?
    //see https://www.tutorialspoint.com/in-javascript-how-to-empty-an-array
    this.backgroundSprites.splice(0, this.backgroundSprites.length);
    this.platformSprites.splice(0, this.platformSprites.length);
    this.enemySprites.splice(0, this.enemySprites.length);
    this.interactableSprites.splice(0, this.interactableSprites.length);
    this.decoratorSprites.splice(0, this.decoratorSprites.length);
    this.playerSprites.splice(0, this.playerSprites.length);
  }

  //#endregion

  //#region Draw, Update

  Update(gameTime) {
    //should we be updating? if menu is shown then we should not
    if ((this.statusType & StatusType.IsUpdated) != 0) {
      this.UpdateTranslationOffset(gameTime);
      this.UpdateAll(gameTime);
    }
  }

  Draw(gameTime) {
    //should we be drawing? if menu is shown then we should not
    if ((this.statusType & StatusType.IsDrawn) != 0) {
      this.DrawAll(gameTime);
      if (this.DebugEnabled)
        this.DrawDebug("red", "green", "white", "yellow");
    }
  }

  /**
   * Call this to re-position all the sprites that move around the player sprite i.e. to enable side-scrolling.
   * Note: Player sprite is not updated here since all sprites move around the player sprite so its translation offset is zero.
   * @param {GameTime} gameTime
   * @memberof MyObjectManager
   */
  UpdateTranslationOffset(gameTime) {
    //add to each sprites existing translation offset if non-zero
    if (this.deltaTranslationOffset.Length() != 0) {
      this.deltaTranslationOffset.MultiplyScalar(gameTime.ElapsedTimeInMs);

      for (let i = 0; i < this.enemySprites.length; i++)
        this.enemySprites[i].Transform2D.SetTranslationOffset(
          this.translationOffset
        );

      for (let i = 0; i < this.platformSprites.length; i++)
        this.platformSprites[i].Transform2D.SetTranslationOffset(
          this.translationOffset
        );

      for (let i = 0; i < this.decoratorSprites.length; i++)
        this.decoratorSprites[i].Transform2D.SetTranslationOffset(
          this.translationOffset
        );

      for (let i = 0; i < this.interactableSprites.length; i++)
        this.interactableSprites[i].Transform2D.SetTranslationOffset(
          this.translationOffset
        );

      for (let i = 0; i < this.backgroundSprites.length; i++)
        this.backgroundSprites[i].Transform2D.SetTranslationOffset(
          this.translationOffset
        );

      //set the delta back to zero, otherwise it will keep being applied in each Update()
      this.deltaTranslationOffset = Vector2.Zero;
    }
  }

  UpdateAll(gameTime) {
    for (let i = 0; i < this.enemySprites.length; i++)
      this.enemySprites[i].Update(gameTime);

    for (let i = 0; i < this.playerSprites.length; i++)
      this.playerSprites[i].Update(gameTime);

    for (let i = 0; i < this.platformSprites.length; i++)
      this.platformSprites[i].Update(gameTime);

    for (let i = 0; i < this.interactableSprites.length; i++)
      this.interactableSprites[i].Update(gameTime);

    for (let i = 0; i < this.decoratorSprites.length; i++)
      this.decoratorSprites[i].Update(gameTime);

    for (let i = 0; i < this.backgroundSprites.length; i++)
      this.backgroundSprites[i].Update(gameTime);
  }

  /**
   * Draw all game sprites. Note, the order in which we draw each array is important. We MUST always draw
   * from the back of the screen forward i.e. call for(backgroundSprites)... to for(playerSprites).
   *
   * @param {GameTime} gameTime
   * @memberof MyObjectManager
   */
  DrawAll(gameTime) {
    this.drawn = 0;

    for (let i = 0; i < this.backgroundSprites.length; i++)
      this.backgroundSprites[i].Draw(gameTime);

    //this will cull(remove) sprites that arent visible on the screen
    for (let i = 0; i < this.decoratorSprites.length; i++) {
      if (
        this.screenBoundingBox.Intersects(
          this.decoratorSprites[i].Transform2D.BoundingBox
        )
      )
        this.decoratorSprites[i].Draw(gameTime);
    }

    //this will cull(remove) sprites that arent visible on the screen
    for (let i = 0; i < this.interactableSprites.length; i++) {
      if (
        this.screenBoundingBox.Intersects(
          this.interactableSprites[i].Transform2D.BoundingBox
        )
      )
        this.interactableSprites[i].Draw(gameTime);
    }

    //this will cull(remove) sprites that arent visible on the screen
    for (let i = 0; i < this.enemySprites.length; i++) {
      if (
        this.screenBoundingBox.Intersects(
          this.enemySprites[i].Transform2D.BoundingBox
        )
      )
        this.enemySprites[i].Draw(gameTime);
    }

    //this will cull(remove) sprites that arent visible on the screen
    for (let i = 0; i < this.platformSprites.length; i++) {
      if (
        this.screenBoundingBox.Intersects(
          this.platformSprites[i].Transform2D.BoundingBox
        )
      )
        this.platformSprites[i].Draw(gameTime);
    }

    for (let i = 0; i < this.playerSprites.length; i++)
      this.playerSprites[i].Draw(gameTime);
  }

  //#endregion

  //#region Debug
  //draws the CD/CR Rect around sprites if enabled
  DrawDebug(
    debugEnemyColor,
    debugInteractableColor,
    debugPlayerColor,
    debugPlatformColor
  ) {
    for (let i = 0; i < this.enemySprites.length; i++)
      this.DrawDebugBoundingBox(debugEnemyColor, this.enemySprites[i]);

    for (let i = 0; i < this.interactableSprites.length; i++)
      this.DrawDebugBoundingBox(
        debugInteractableColor,
        this.interactableSprites[i]
      );

    for (let i = 0; i < this.playerSprites.length; i++)
      this.DrawDebugBoundingBox(debugPlayerColor, this.playerSprites[i]);

    for (let i = 0; i < this.platformSprites.length; i++)
      this.DrawDebugBoundingBox(debugPlatformColor, this.platformSprites[i]);

    //add more for loops here for any other arrays containing sprites with bounding boxes...
  }
  //#endregion
}
