/**
 * The file contains no specific ContextParameters but holds the parameter classes related to drawing to the canvas.
 * @author NMCG
 * @version 1.0
 * @see https://simon.html5.org/dump/html5-canvas-cheat-sheet.html
 */

class ColorParameters{

    //#region Fields
    //#endregion

    //#region Statics
    static DEFAULT_STROKE_FILL_SHADOW = "rgb(0,0,0)";
    //#endregion

    //#region Properties
    //#endregion

    constructor(strokeStyle, fillStyle, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor)
    {
        this.strokeStyle = strokeStyle || ColorParameters.DEFAULT_STROKE_FILL_SHADOW;	
        this.fillStyle = fillStyle || ColorParameters.DEFAULT_STROKE_FILL_SHADOW;
        this.shadowOffsetX = shadowOffsetX || 0;
        this.shadowOffsetY = shadowOffsetY || 0;
        this.shadowBlur = shadowBlur || 0;
        this.shadowColor = shadowColor || ColorParameters.DEFAULT_STROKE_FILL_SHADOW;
    }

    Draw(context){
        context.strokeStyle = strokeStyle;
        context.fillStyle = fillStyle;
        context.shadowOffsetX = shadowOffsetX;
        context.shadowOffsetY = shadowOffsetY;
        context.shadowBlur = shadowBlur;
        context.shadowColor = shadowColor;
    }

    //#region Equals, Clone, ToString 
    Equals(other) {
      return GDUtility.IsSameTypeAsTarget(this, other) && this.strokeStyle === other.strokeStyle 
            && this.fillStyle === other.fillStyle
            && this.shadowOffsetX === other.shadowOffsetX && this.shadowOffsetY === other.shadowOffsetY
            && this.shadowBlur === other.shadowBlur && this.shadowColor === other.shadowColor;
    }

    ToString() {
       return "[" 
       +  this.strokeStyle + "," +  this.fillStyle + "," 
       +  this.shadowOffsetX + "," +  this.shadowOffsetY + "," 
       +  this.shadowBlur + "," +  this.shadowColor + "," 
       + "]";
    }

    Clone() {
        return new ColorParameters(this.strokeStyle, this.fillStyle, this.shadowOffsetX, 
            this.shadowOffsetY, this.shadowBlur, this.shadowColor);
    }
    //#endregion
}

class TextParameters{
    //#region Fields
    //#endregion

    //#region Statics
    static DEFAULT_FONT = "10px sans-serif";
    //#endregion

    //#region Properties
    //#endregion

    constructor(font, textAlign, textBaseline)
    {
        this.font = font || TextParameters.DEFAULT_FONT;	
        this.textAlign = textAlign || TextAlignType.Start;
        this.textBaseline = textBaseline || TextBaselineType.Top;
    }
    
    Draw(context){
        context.font = font;
        context.textAlign = textAlign;
        context.textBaseline = textBaseline;
    }

    //#region Equals, Clone, ToString 
    Equals(other) { 
      return GDUtility.IsSameTypeAsTarget(this, other) &&  this.font === other.font 
            && this.textAlign === other.textAlign
            && this.textBaseline === other.textBaseline;
    }

    ToString() {
       return "[" 
       +  this.font + "," +  this.textAlign + "," +  this.textBaseline 
       + "]";
    }

    Clone() {
        return new TextParameters(this.font, this.textAlign, this.textBaseline);
    }
    //#endregion
}

class LineParameters{
    //#region Fields
    //#endregion

    //#region Statics
    static DEFAULT_LINE_WIDTH = 1;
    static DEFAULT_MITER_LIMIT = 10;
    //#endregion

    //#region Properties
    //#endregion

    constructor(lineWidth, lineCap, lineJoin, miterLimit)
    {
        this.lineWidth = lineWidth || TextParameters.DEFAULT_LINE_WIDTH;	
        this.lineCap = lineCap || LineCapType.Butt;
        this.lineJoin = lineJoin || LineJoinType.Miter;
        this.miterLimit = miterLimit || LineParameters.DEFAULT_MITER_LIMIT; 
    }
    
    Draw(context){
        context.lineWidth = lineWidth;
        context.lineCap = lineCap;
        context.lineJoin = lineJoin;
        context.miterLimit = miterLimit;
    }

    //#region Equals, Clone, ToString 
    Equals(other) {  
      return GDUtility.IsSameTypeAsTarget(this, other) && this.lineWidth === other.lineWidth 
            && this.lineCap === other.lineCap
            && this.lineJoin === other.lineJoin
            && this.miterLimit === other.miterLimit;
    }

    ToString() {
       return "[" 
       +  this.lineWidth + "," +  this.lineCap + "," 
       +  this.lineJoin + "," +  this.miterLimit + "," 
       + "]";
    }

    Clone() {
        return new LineParameters(this.lineWidth, this.lineCap, this.lineJoin, this.miterLimit);
    }
    //#endregion
}
