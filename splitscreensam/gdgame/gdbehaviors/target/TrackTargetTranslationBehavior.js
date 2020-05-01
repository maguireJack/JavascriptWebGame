/**
 * Moves the camera based on the transform2D translation value of a target actor.
 * We typically use this class to add a camera to track a player in our game
 * @author niall mcguinness
 * @version 1.0
 * @class TrackTargetTranslationBehavior
 */
class TrackTargetTranslationBehavior {


    /**
     * Creates an instance of ThirdPersonCameraBehavior.
     * @param {Game} game Handle to the main game class
     * @param {number} playerIndex Index of the player sprite that we are tracking - see Game::playerSprites array
     * @param {Vector2} initialTranslationOffset Vector2 which allows us to "shunt/move" the attached parent camera relative to the target actor (i.e. a player sprite)
     * @memberof TrackTargetTranslationBehavior
     */
    constructor(game, playerSpritesIndex, initialTranslationOffset) {
        this.game = game;
        this.playerSpritesIndex = playerSpritesIndex;
        this.initialTranslationOffset = initialTranslationOffset;
        this.targetActor = null;
    }

    Execute(gameTime, parent) {
        

        //ask Game.js for a handle the player sprite that we are tracking
        //we do this here because in Game.js when we make the camera behaviour we have NOT yet made a player
        if(this.targetActor == null)
            this.targetActor = this.game.GetTargetPlayer(this.playerSpritesIndex);
        
        console.log('parent', this.targetActor.id);

        //set the camera Y-position to the same as the player Y-position
        parent.Transform2D.SetTranslationY(this.initialTranslationOffset.Y + this.targetActor.Transform2D.Translation.Y);

        //we can also change X in the same way
        //parent.Transform2D.SetTranslationX(this.initialTranslationOffset.X + this.targetActor.Transform2D.Translation.X);

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