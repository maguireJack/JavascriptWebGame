/**
 * This class is responsible for storing, updating, and returning the current active camera.
 * @author
 * @version 1.0
 * @class CameraManager
 */

class CameraManager {
  //#region Fields
  id = "";
  //#endregion

  //#region Properties
  set ActiveCameraIndex(index) {
    this.activeCameraIndex = index >= 0 ? index : 0;
  }
  get ActiveCameraIndex() {
    return this.activeCameraIndex;
  }
  get ActiveCamera() {
    return this.array[this.activeCameraIndex];
  }
  //#endregion

  constructor(id) {
    this.id = id;
    this.array = [];
    this.activeCameraIndex = -1;
  }

  Add(camera) {
    if (camera instanceof Camera2D) {
      //store the camera
      this.array.push(camera);

      //if for some reason we didnt set the index then set it to be the last camera added.
      if (this.activeCameraIndex == -1)
        this.activeCameraIndex = this.array.length - 1;
    } 
    else throw camera + " is not a Camera2D instance!";
  }

  Remove(camera) {
    this.array.splice(this.FindIndex(camera), 1);
  }

  FindIndex(camera) {
    for(let i = 0; i < this.array.length; i++)
    {
        if(this.array[i] === camera)
            return i;
    }
    return -1;
  }

  RemoveAll() {
    this.array.splice(0, this.array.length);
    this.activeCameraIndex = -1;
  }

  Update(gameTime) {
    //should we be updating?
    if ((this.ActiveCamera.StatusType & StatusType.IsUpdated) != 0) {
      this.ActiveCamera.Update(gameTime);
    }
  }
}
