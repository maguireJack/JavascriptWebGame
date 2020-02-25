class Camera2D extends Actor2D{

     //#region  Fields 
    //#endregion 

    //#region  Properties
    //#endregion

    constructor(id, actorType, transform2D, statusType) {
        super(id, actorType, transform2D, statusType);
    }

    //other methods...
    Update(gameTime){
     super.Update(gameTime); //call parent to update any attached behaviors   

    }

    //#region Equals, Clone, ToString 
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