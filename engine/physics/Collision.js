/**
 * Provides functions relating to CD/CR
 * @author
 * @version 1.0
 * @class 
class Collision
 */
const CollisionLocationType = Object.freeze({
    Top: 0,
    Right: 1,
    Bottom: 2,
    Left: 3
});

class Collision {

    //ùsed to determine on what side we collides with spriteB - normally only used for platforms
    static GetCollisionLocationType(spriteA, spriteB) {

        let boundingBoxA = new Rect(spriteA.Transform2D.BoundingBox.X + spriteA.Body.velocityX,
                                            spriteA.Transform2D.BoundingBox.Y + spriteA.Body.velocityY,
                                            spriteA.Transform2D.BoundingBox.Width, spriteA.Transform2D.BoundingBox.Height); 
        let boundingBoxB = spriteB.Transform2D.BoundingBox;        

        // get the vectors to check against
        let vX = boundingBoxA.Center.X - boundingBoxB.Center.X, 
                vY = boundingBoxA.Center.Y - boundingBoxB.Center.Y;

        // add the half widths and half heights of the objects
        let hWidths = (boundingBoxA.Width + boundingBoxB.Width)/2,  
                hHeights = (boundingBoxA.Height + boundingBoxB.Height)/2;

        let collisionLocationType = null;
    
        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            
            // figures out on which side we are colliding (top, bottom, left, or right)
            let oX = Math.ceil(hWidths - Math.abs(vX));
            let oY = Math.ceil(hHeights - Math.abs(vY));
                    
            if (oX >= oY) {
                if (vY > 0) {
                    collisionLocationType = CollisionLocationType.Top;
                } else {
                    collisionLocationType = CollisionLocationType.Bottom;
                }
            } else {
                if (vX > 0) {
                    collisionLocationType = CollisionLocationType.Left;
                } else {
                    collisionLocationType = CollisionLocationType.Right;
                }
            }
        }
        return collisionLocationType;
    }

}