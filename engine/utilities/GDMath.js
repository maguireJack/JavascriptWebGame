/**
 * Provides common math related functions.
 * @author
 * @version 1.0
 * @class GDMath
 */
class GDMath {
    static ToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    static ToDegrees(radians) {
        return Math.fround(radians * (180 / Math.PI));
    }

    static ToFixedNumber(number, precision, base){
        let pow = Math.pow(base||10, precision);
        return Math.round(number*pow) / pow;
    }
}