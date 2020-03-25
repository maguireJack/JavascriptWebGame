
class AudioCue {
  static MAX_PLAYBACK_RATE = 10;

  constructor(name, theme, volume, playbackRate, loop, currentTime) {
    this.name = name;
    this.theme = theme;// || AudioTheme.All;
    this.originalVolume = this.volume = volume || 1;
    this.playbackRate = playbackRate || 1;
    this.loop = loop || false;
    this.currentTime = currentTime || 0;
    this.audioObject = null;

  }

  //call after a full sound mute to reset to startup volume settings
  ResetVolume()
  {
    this.volume = this.originalVolume;
  }

  get OriginalVolume(){
    return this.originalVolume;
  }

  get Name() {
    return this.name;
  }

  get Theme(){
    return this.theme;
  }

  set Theme(theme){
    this.theme = (theme == undefined) ? AudioType.All : theme;
  }

  get Volume() {
    return this.volume;
  }
  get PlaybackRate() {
    return this.playbackRate;
  }
  get Loop() {
    return this.loop;
  }
  get CurrentTime() {
    return this.currentTime;
  }
  get AudioObject() {
    return this.audioObject;
  }

  set Name(name) {
    this.name = name;
  }
  set Volume(volume) {
    this.volume =
      volume == undefined || (volume >= 0 && volume <= 1) ? volume : 1;
  }
  set PlaybackRate(playbackRate) {
    this.playbackRate =
      playbackRate == undefined ||
      (playbackRate > 0 && playbackRate <= MAX_PLAYBACK_RATE)
        ? playbackRate
        : 1;
  }
  set Loop(loop) {
    this.loop = loop;
  }
  set CurrentTime(currentTime) {
    this.currentTime =
      currentTime == undefined || currentTime >= 0 ? currentTime : 1;
  }
  set AudioObject(audioObject) {
    this.audioObject = audioObject;
  }
}

class SoundManager {
  cueArray = []; //name, volume, playbackRate, loop, currentTime

  constructor(cueArray, notificationCenter) {
    this.cueArray = cueArray;
    this.notificationCenter = notificationCenter;
    this.Initialize();
    this.RegisterForNotifications();
    this.count = 0;
  }

  RegisterForNotifications()
  {
    this.notificationCenter.Register(NotificationType.Sound, this, this.HandleNotification);
  }

  HandleNotification(...argArray)
  {
    let notification = argArray[0];
    switch(notification.NotificationAction)
    {
      case NotificationAction.Play:
        this.Play(notification.NotificationArguments[0]);  //remember when we created the event we passed sound name in [0] in the array - see    notificationCenter.Notify(new Notification(NotificationType.Sound, NotificationAction.Play,  ["sound_shoot"]));
        break;

      case NotificationAction.Pause:
        this.Pause(notification.NotificationArguments[0]);
        break;

      case NotificationAction.SetVolume:
        this.SetVolume(notification.NotificationArguments[0], notification.NotificationArguments[1]);
      break;  
      
      case NotificationAction.SetVolumeByTheme:
        this.SetVolumeByTheme(notification.NotificationArguments[0], notification.NotificationArguments[1]);
      break;

      case NotificationAction.SetVolumeAll:
        this.SetVolumeAll(notification.NotificationArguments[0]);
      break;   

      case NotificationAction.ResetVolumeAll:
        this.ResetVolumeAll();
      break;        

      default:
        break;  
        //add more cases for volume changes etc
    }
  }

  Initialize() {
    for (let i = 0; i < this.cueArray.length; i++) {
      var audioCue = this.cueArray[i];
      var name = audioCue.Name;
      var audioObject = document.getElementById(name);
      if (audioObject) audioCue.AudioObject = audioObject;
      else
        throw "Error: No audio object was found for cue [" + this.cueName + "]";
    }
  }

  AssetLoaded(name)
  {
    this.count++;
  }

  FindIndex(name) {
    for (let i = 0; i < this.cueArray.length; i++) {
      {
        if (this.cueArray[i].Name === name) return i;
      }
    }
    return -1;
  }

  //at the moment we can only play the sound when its currently paused i.e. not already playing
  Play(name) {
    //where in the array is this cue?
    var index = this.FindIndex(name);
    if (index != -1) {
      //get the AudioCue object
      var audioCue = this.cueArray[index];
      //get the Audio Object inside
      var audioObject = audioCue.AudioObject;

      if (audioObject) {
        if (audioObject.paused) {
          //not already playing
          audioObject.currentTime = audioCue.CurrentTime;
          audioObject.volume = audioCue.Volume; //0 - 1
          audioObject.playbackRate = audioCue.PlaybackRate; //0 ->
          audioObject.play();
        }
      }
    } else throw "Error: No audio object was found for cue [" + name + "]";
  }

  Pause(name) {
    //where in the array is this cue?
    var index = this.FindIndex(name);
    if (index != -1) {
      //get the AudioCue object
      var audioCue = this.cueArray[index];
      //get the Audio Object inside
      var audioObject = audioCue.AudioObject;

      if (audioObject) {
        if (!audioObject.paused) {
          //currently playing
          cue.pause();
        }
      }
    } else throw "Error: No audio object was found for cue [" + name + "]";
  }

  SetVolume(name, volume) {
    //where in the array is this cue?
    var index = this.FindIndex(name);

    if (index != -1) {
      //get the AudioCue object
      var audioCue = this.cueArray[index];
      //get the Audio Object inside
      var audioObject = audioCue.AudioObject;

      if (audioObject) {
        audioObject.volume = audioCue.Volume = volume; //0 - 1
      }
    } else throw "Error: No audio object was found for cue [" + name + "]";
  }

  SetVolumeByTheme(theme, volume)
  {
    //read through the array
    for(let i = 0; i < this.cueArray.length; i++)
    {
      if(this.cueArray[i].Theme === theme)
      {
        var audioObject = this.cueArray[i].AudioObject;
        if (audioObject) {
          audioObject.volume = this.cueArray[i].Volume = volume; //0 - 1
        }
        else
          throw "Error: No audio object was found for theme [" + theme + "]";
      }
    }
    //set volume based on target theme
  }

  SetVolumeAll(volume){
      //read through the array
      for(let i = 0; i < this.cueArray.length; i++)
      {
          var audioObject = this.cueArray[i].AudioObject;
          if (audioObject) {
            audioObject.volume = this.cueArray[i].Volume = volume; //0 - 1
          }
          else
            throw "Error: Cue array may be empty or contain invalid objects!";
      }
  }

  ResetVolumeAll()
  {
    //read through the array
    for(let i = 0; i < this.cueArray.length; i++)
    {
        var audioObject = this.cueArray[i].AudioObject;
        if (audioObject) {
          audioObject.volume = this.cueArray[i].OriginalVolume;
          this.cueArray[i].ResetVolume();
        }
        else
          throw "Error: Failed to reset all volumes!";
    }
  }

  Clear()
  {
    this.cueArray = []; //rest to empty
  }

  Size()
  {
    return this.cueArray.length;
  }

  ToString()
  {
    var str = "";
    for(let i = 0; i < this.cueArray.length; i++)
      str += this.cueArray[i] + ",";

    return str;  
  }











}
