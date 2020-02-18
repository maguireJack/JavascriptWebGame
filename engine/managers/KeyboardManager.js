/**
 * Stores keyboard state and allows user to query key state through methods. See also Keys in constants.js.
 * @author
 * @version 1.0
 * @class KeyboardManager
 */

class KeyboardManager
{
    keyState = {};

    constructor()
    {     
        window.addEventListener("keydown", (event) =>
        {
            this.keyState[event.keyCode] = true;
        });

        window.addEventListener("keyup", (event) => 
        {
            delete this.keyState[event.keyCode];
        });
    }

    IsKeyDown(keyCode)
    {
        return (this.keyState[keyCode]) ? true : false;   
    }

    IsKeyUp(keyCode)
    {
        return !this.IsKeyDown(keyCode);
    }
    
    IsAnyKeyPressed()
    {
        return Object.entries(this.keyState).length != 0;
    }

    AreKeysDown(keyCodeArray)
    {
        if(keyCodeArray)
        {
            var result = true;
            for(var i = 0; i < keyCodeArray.length; i++){
                result = result & this.IsKeyDown(keyCodeArray[i]);
            }
            return result;
        }
        else
            throw "Error: keyCodesArray does not contain a valid array!";
    }

    IsFirstKeyPress(key)
    {
        //to do...
    }

    IsKeyPressedSinceMs(keyCode, elapsedTimeInMs)
    {
       //to do...
    }
}