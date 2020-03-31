/**
 * Render text based on text value, position, color, style, and opacity.
 * @author NMCG
 * @version 1.0
 * @class TextSpriteArtist
 */

class TextSpriteArtist extends Artist{

    //#region  Fields 
    //#endregion 

    //#region Properties
    get Text()
    {
        return this.text;
    }
    set Text(text)
    {
        this.text = text;
    }
    get Alpha()
    {
        return this.alpha;
    }
    set Alpha(alpha)
    {
        this.alpha = alpha;
    }
    //#endregion

    constructor(text, textParameters, alpha=1, maxWidth) {
        super(alpha);
        this.text = text;
        this.textParameters = textParameters;      
        this.maxWidth = maxWidth;
    }

     Update(gameTime, parent){
        //does it cycle between fonts?
        //does its align change over time?
    }

    Draw(gameTime, parent, activeCamera) {
        //save whatever context settings were used before this (color, line, text styles)
        activeCamera.Context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();

        //apply the sprite transformations to the sprite 
        parent.SetContext(activeCamera.Context);

        //access the transform for the parent that this artist is attached to
        let transform = parent.Transform2D;
        activeCamera.Context.globalAlpha = this.Alpha;  
        activeCamera.Context.fillStyle = this.fillStyle;  
        this.textParameters.Draw(activeCamera.Context);
        activeCamera.Context.fillText(this.text, 
            transform.Translation.X - transform.Origin.X, 
            transform.Translation.Y - transform.Origin.Y, 
            this.maxWidth);
        activeCamera.Context.restore();
    }

    DrawParented(gameTime, attached, parent, activeCamera) {
        //save whatever context settings were used before this (color, line, text styles)
        activeCamera.Context.save();
        //apply the camera transformations to the scene (i.e. to enable camera zoom, pan, rotate)
        activeCamera.SetContext();

        //apply the transformations coming from the attached parent
        attached.SetContext(activeCamera.Context);

        //apply the sprite transformations to the sprite 
        parent.SetContext(activeCamera.Context);

        //access the transform for the parent that this artist is attached to
        let transform = parent.Transform2D;
        activeCamera.Context.globalAlpha = this.Alpha;        
        activeCamera.Context.fillStyle = this.fillStyle;  //ColorParameters?
        this.textParameters.Draw(activeCamera.Context);
        activeCamera.Context.globalAlpha = this.Alpha; //ColorParameters?
        activeCamera.Context.fillText(this.text, 
            transform.Translation.X - transform.Origin.X, 
            transform.Translation.Y - transform.Origin.Y, 
            this.maxWidth);
        activeCamera.Context.restore();
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