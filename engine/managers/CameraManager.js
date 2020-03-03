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
    return this.cameras[this.activeCameraIndex];
  }
  get Cameras(){
    return this.cameras;
  }
  //#endregion

  constructor(id) {
    this.id = id;
    this.cameras = [];
    this.activeCameraIndex = -1;
  }

  Add(camera) {
    if (camera instanceof Camera2D) {

      //store the camera
      this.cameras.push(camera);

      //if for some reason we didnt set the index then set it to be the last camera added.
      if (this.activeCameraIndex == -1)
        this.activeCameraIndex = this.cameras.length - 1;
    } 
    else throw camera + " is not a Camera2D instance!";
  }

  Remove(predicate) {
    this.cameras.splice(this.FindIndex(predicate), 1);
  }

  RemoveAll() {
    this.cameras.splice(0, this.cameras.length);
    this.activeCameraIndex = -1;
  }

  FindIndex(predicate){
    return this.cameras.findIndex(predicate);
  }

  FindAllIndices(predicate){
    let j = 0;
    let foundIndices = [];
    for(let i = 0; i < this.cameras.length; i++)
    {
      if(predicate(this.cameras[i]))
        foundIndices[j] = i;
        j++;
    }
    //return null if we found no matching cameras, otherwise return the array
    return foundIndices.length != 0 ? foundIndices : null;
  }

  Sort(compareFunction){
    this.cameras.sort(compareFunction);
  }

/*
//These are a subset of the method definitions (with some minor parameter changes) from ObjectManager
  Add(camera) {
  }

  FindIndex(predicate) {
  }

  FindIndices(predicate) {
  }

  RemoveFirstBy(predicate) {
  }

  RemoveAllBy(predicate) {
  }

  Sort(compareFunction) {
  }
*/

  Update(gameTime) {
    //should we be updating?
    if ((this.ActiveCamera.StatusType & StatusType.IsUpdated) != 0) {
      this.ActiveCamera.Update(gameTime);
    }
  }
}
