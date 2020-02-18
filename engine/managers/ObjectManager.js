/**
 * This is the base class for your own games implementation of ObjectManager e.g. MyObjectManager. An ObjectManager
 * is responsible for storing, updating, and drawing all the sprites within the game.
 * @author
 * @version 1.0
 * @class ObjectManager
 */

class ObjectManager{

    id = "";
    context;
    debugEnabled = false;
    
    constructor(id, statusType, canvas, context, debugEnabled=false, scrollBoundingBoxBorder=20){
        this.id = id;
        this.statusType = statusType;
        this.canvas = canvas;
        this.context = context;
        this.debugEnabled = debugEnabled;

        //used to determine if a sprite is visible i.e. intersects this rectangle
        this.screenBoundingBox = new Rect(0, 0,  this.canvas.width, this.canvas.height);
         
        //used to determine when we apply a delta to the translation offset for non-player sprites (i.e. when player moves outside this rectangle we scroll all non-player sprites)
        this.scrollBoundingBox = this.screenBoundingBox.Clone();
        this.scrollBoundingBox.Explode(-scrollBoundingBoxBorder);
    }

    get StatusType() 
    {
        return this.statusType;
    }

    get DebugEnabled() 
    {
        return this.debugEnabled;
    }

    Update(gameTime){

    }

    Draw(gameTime){

    }

    DrawDebugBoundingBox(color, parent)
    {
        this.context.save();
        var transform = parent.Transform2D;
        this.context.scale(transform.Scale.X, transform.Scale.Y);

        this.context.lineWidth = 2;
        this.context.strokeStyle = color;
        this.context.globalAlpha = 1;
        this.context.strokeRect(transform.BoundingBox.X, transform.BoundingBox.Y, transform.BoundingBox.Width, transform.BoundingBox.Height);
        this.context.restore();
    }
}