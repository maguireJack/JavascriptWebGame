class AnimationTimer {

    constructor(duration, easingFunction) {
        this.easingFunction = easingFunction;

        if (duration !== undefined) 
            this.duration = duration;
        else 
            this.duration = 1000;

        this.stopwatch = new Stopwatch();
        this.percentComplete = 0;
    }

    Start(gameTime) {
        this.stopwatch.Start(gameTime);
    }

    Stop(gameTime) {
        this.stopwatch.Stop(gameTime);
    }

    Pause(gameTime) {
        this.stopwatch.Pause(gameTime);
    }

    Unpause(gameTime) {
        this.stopwatch.Unpause(gameTime);
    }

    IsPaused() {
        return this.stopwatch.IsPaused();
    }

    GetElapsedTime(gameTime) {
        var elapsedTime = this.stopwatch.GetElapsedTime(gameTime);

        this.percentComplete = elapsedTime / this.duration;
        if (this.easingFunction === undefined || this.percentComplete == 0 || this.percentComplete > 1) {
            return elapsedTime;
        }
        return elapsedTime * (this.easingFunction(this.percentComplete) / this.percentComplete);
    }

    IsRunning() {
        return this.stopwatch.IsRunning;
    }

    IsExpired(gameTime) {
        return this.stopwatch.GetElapsedTime(gameTime) > this.duration;
    }

    Reset(gameTime) {
        this.stopwatch.Reset(gameTime);
    }

    static MakeEaseOutEasingFunction(strength) {
        return function (percentComplete) {
            return  1 - Math.pow(1 - this.percentComplete, strength * 2);
        };
    }

    static MakeEaseInEasingFunction(strength) {
        return function (percentComplete) {
            return Math.pow(this.percentComplete, strength * 2);
        };
    }

    static MakeEaseOutInEasingFunction() {
        return function (percentComplete) {
            return this.percentComplete +
                Math.sin(this.percentComplete * 2 * Math.PI) / (2 * Math.PI);
        };
    }

    static MakeEaseInOutEasingFunction() {
        return function (percentComplete) {
            return percentComplete -
                Math.sin(this.percentComplete * 2 * Math.PI) / (2 * Math.PI);
        };
    }

    static MakeLinearEasingFunction() {
        return function (percentComplete) {
            return this.percentComplete;
        };
    }
}