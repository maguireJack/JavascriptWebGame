/**
 * Render text based on text value, position, color, style, and opacity.
 * @author NMCG
 * @version 1.0
 * @class TextSpriteArtist
 */

class TextSpriteArtist extends Artist{

    //#region  Fields 
    //#endregion 

    //#region  Properties
    //#endregion

    constructor(context, text, fontType, fillStyle, textAlign, alpha=1, maxWidth) {
        super(context, alpha);

        this.text = text;
        this.fontType = fontType;      
        this.fillStyle = fillStyle;
        this.textAlign = textAlign;    
        this.maxWidth = maxWidth;
    }

     Update(gameTime, parent, camera){
        //does it cycle between fonts?
        //does its align change over time?
    }

    Draw(gameTime, parent, activeCamera) {
        this.Context.save();

        super.ApplyCamera(activeCamera);
        let transform = parent.Transform2D;

        this.Context.font = this.fontType;
        this.Context.fillStyle = this.fillStyle;
        this.Context.textAlign = this.textAlign;
        this.Context.globalAlpha = this.Alpha;
        this.Context.fillText(this.text, transform.Translation.X, transform.Translation.Y, 
            this.maxWidth);
        this.Context.restore();
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