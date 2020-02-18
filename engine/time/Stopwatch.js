/**
 * Like the real thing, you can start and stop a stopwatch, and you can find out the elapsed time the stopwatch has been running. After you stop
 * a stopwatch, it's GetElapsedTime() method returns the elapsed time between the start and stop.
 * @author
 * @version 1.0
 * @class Stopwatch
 */
class Stopwatch {

   constuctor() {
      this.startTime = 0;
      this.running = false;
      this.elapsed = undefined;

      this.paused = false;
      this.startPause = 0;
      this.totalPausedTime = 0;
   }

   get IsRunning() {
      return this.running;
   }
   get IsPaused() {
      return this.paused;
   }

   Start(gameTime) {
      this.startTime = gameTime ? gameTime.TotalElapsedTimeInMs : +new Date();
      this.elapsedTime = undefined;
      this.running = true;
      this.totalPausedTime = 0;
      this.startPause = 0;
   }

   Stop(gameTime) {
      if (this.paused) {
         this.Unpause();
      }

      this.elapsed = (gameTime ? gameTime.TotalElapsedTimeInMs : +new Date()) - this.startTime - this.totalPausedTime;
      this.running = false;
   }

   Pause(gameTime) {
      if (this.paused) {
         return;
      }

      this.startPause = gameTime ? gameTime.TotalElapsedTimeInMs : +new Date();
      this.paused = true;
   }

   Unpause(gameTime) {
      if (!this.paused)
         return;

      this.totalPausedTime += (gameTime ? gameTime.TotalElapsedTimeInMs : +new Date()) - this.startPause;
      this.startPause = 0;
      this.paused = false;
   }

   GetElapsedTime(gameTime) {
      if (this.running) {
         return (gameTime ? gameTime.TotalElapsedTimeInMs : +new Date()) - this.startTime - this.totalPausedTime;
      } else {
         return this.elapsed;
      }
   }

   Reset(gameTime) {
      this.elapsed = 0;
      this.startTime = gameTime ? gameTime.TotalElapsedTimeInMs : +new Date();
      this.elapsedTime = undefined;
      this.running = false;
   }
};