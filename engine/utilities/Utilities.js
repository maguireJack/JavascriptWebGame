/**
 * Provides common math related functions.
 * @author
 * @version 1.0
 * @class GDMath
 */
class GDMath {
    static ToRadians(degrees) {
        degrees %= 360;
        return degrees * (Math.PI / 180);
    }

    static ToDegrees(radians) {
        return Math.fround(radians * (180 / Math.PI));
    }

    static ToFixed(number, precision, base){
        if(number == 0)
            return 0;
            
        let pow = Math.pow(base||10, precision);
        return Math.round(number*pow) / pow;
    }
}

/**
 * Provides common un-related utility functions.
 * @author
 * @version 1.0
 * @class GDUtility
 */
class GDUtility{

    /**
     * Returns true if "other" is non-null, not undefined and of type "target".
     *
     * @static
     * @param {JS/user-defined data type} target
     * @param {JS/user-defined data type} other
     * @returns True if target and other are the same data type, otherwise false
     * @memberof GDUtility
     */
    static IsSameTypeAsTarget(target, other){

        if (other == null ||other == undefined)
            throw "Error: Other object is null or undefined";

        if(other.constructor.name != target.constructor.name)
            throw "Error: Other object is type " + other.constructor.name + " and should be type " + target.constructor.name;

        //returns false if both point to the same object in RAM i.e. a shallow copy
        return target != other;
    }
}