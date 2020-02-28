class Camera2D extends Actor2D{

     //#region  Fields 
    //#endregion 

    //#region  Properties
    //#endregion

    constructor(id, actorType, transform2D, statusType) {
        super(id, actorType, CollisionType.Collidable, transform2D, statusType);
    }

    //other methods...
    Update(gameTime){
     super.Update(gameTime); //call parent - is this methods necessary?
    }

    //#region Equals, Clone, ToString 
    Equals(other) {
        return super.Equals(other); //call parent - is this methods necessary?
    } 

    ToString() {
        return super.ToString(); //call parent - is this methods necessary?
    }

    Clone() {
        return new Camera2D(this.ID, this.ActorType, this.CollisionType, this.Transform2D, this.StatusType);

    }
    //#endregion


}