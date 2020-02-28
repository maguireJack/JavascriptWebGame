class GameTime
{
    constructor(){
        this.totalElapsedTimeInMs = 0;
        this.elapsedTimeInMs = 0;

        this.startTimeInMs = 0;
        this.lastAnimationFrameTimeInMs = 0;

        this.lastFpsUpdateTime = 0;
        this.fps = 0;

    }

    get TotalElapsedTimeInMs() { return Math.ceil(this.totalElapsedTimeInMs); }
    get ElapsedTimeInMs() { return Math.ceil(this.elapsedTimeInMs); }
    get ElapsedTimeInSecs() { return Math.ceil(this.elapsedTimeInMs)/1000; }
    get FPS() { return this.fps; }

    Update(now){

        if(!this.startTimeInMs)
            this.startTimeInMs = now;
  
        this.totalElapsedTimeInMs = now - this.startTimeInMs;
        this.elapsedTimeInMs = now - this.lastAnimationFrameTimeInMs;
        this.UpdateFPS(now);
        this.lastAnimationFrameTimeInMs = now;
    }

    UpdateFPS(now) 
    {
        this.fps = Math.floor(1 / (now - this.lastAnimationFrameTimeInMs) * 1000);  
        if (now - this.lastFpsUpdateTime > 1000) 
            this.lastFpsUpdateTime = now;
    }
}