class Matrix{
    
    static DEFAULT_DECIMAL_PRECISION = 2;

    constructor(a11, a12, a13=0, a21, a22, a23=0, a31, a32, a33=1){
        this.a11 = a11;     
        this.a12 = a12;     
        this.a13 = 0;

        this.a21 = a21;     
        this.a22 = a22;     
        this.a23 = 0;

        this.a31 = a31;     
        this.a32 = a32; 
        this.a33 = 1;       
    }

    ToString(){
        return "[" + this.a11 + "," + this.a12 + this.a13 + "\n" +
                        this.a21 + "," + this.a22 + this.a23 + "\n" +
                            this.a31 + "," + this.a32 +  this.a33 + "]"
    }

    Multiply(other){
        this.a11 = this.a11 * other.a11 + this.a12 * other.a21;
        this.a12 = this.a11 * other.a12 + this.a12 * other.a22;
        this.a13 = 0;

        this.a21 = this.a21 * other.a11 + this.a22 * other.a21;
        this.a22 = this.a21 * other.a12 + this.a22 * other.a22;
        this.a23 = 0;

        this.a31 = this.a31 * other.a11 + this.a32 * other.a21 + other.a31;
        this.a32 = this.a31 * other.a12 + this.a32 * other.a22 + other.a32;
        this.a33 = 1;
    }

    static get Identity(){
        return new Matrix(1, 0, 0, 
                          0, 1, 0, 
                          0, 0, 1);
    }

    static CreateScale(scale){
        return new Matrix(scale.x,  0,          0,
                          0,        scale.y,    0,  
                          0,        0,          1);
    }

    static CreateRotation(rotationInRadians){

        let cos = 1, sin = 0;
        if(rotationInRadians%360 != 0)
        {
            cos = GDMath.ToFixed(Math.cos(rotationInRadians), Matrix.DEFAULT_DECIMAL_PRECISION, 10); 
            sin = GDMath.ToFixed(Math.sin(rotationInRadians), Matrix.DEFAULT_DECIMAL_PRECISION, 10);
        }

        return new Matrix(cos,   -1 * sin,  0,
                          sin,   cos,       0,
                          0,     0,         1);
    }

    static CreateTranslation(translation){
        return new Matrix(1,                0,              0,
                          0,                1,              0,
                          translation.x,    translation.y,  1);
    }

    static Create(scale, rotationInRadians, translation){

        let cos = 1, sin = 0;
        if(rotationInRadians%360 != 0)
        {
            cos = GDMath.ToFixed(Math.cos(rotationInRadians), Matrix.DEFAULT_DECIMAL_PRECISION, 10); 
            sin = GDMath.ToFixed(Math.sin(rotationInRadians), Matrix.DEFAULT_DECIMAL_PRECISION, 10);
        }
        return new Matrix(  scale.x * cos,    -1*scale.x * sin, 0,
                            scale.y * sin,    scale.y * cos,    0,
                            translation.x,  translation.y,      1);
    }

    static Multiply(m1, m2){
        let a11 = m1.a11 * m2.a11 + m1.a12 * m2.a21;
        let a12 = m1.a11 * m2.a12 + m1.a12 * m2.a22;

        let a21 = m1.a21 * m2.a11 + m1.a22 * m2.a21;
        let a22 = m1.a21 * m2.a12 + m1.a22 * m2.a22;

        let a31 = m1.a31 * m2.a11 + m1.a32 * m2.a21 + m2.a31;
        let a32 = m1.a31 * m2.a12 + m1.a32 * m2.a22 + m2.a32;

        return new Matrix(a11, a12, 0, a21, a22, 0, a31, a32, 1);
    }


}