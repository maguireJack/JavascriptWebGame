class SmartArray {
  //#region Fields
  array = [];
  //#endregion

  //#region Properties
  get Array() {
    return this.array;
  }
  //#endregion

  constructor(){
      
  }

  Add(obj, bEnforceUnique=false){
    if(!bEnforceUnique)
    {
        this.array.push(obj);
    }
    else
    {
        if(this.array.find(obj) == -1)
            this.array.push(obj);
    }
  }

  Remove(obj) {
    this.array.splice(this.array.indexOf(obj), 1);
  }

  Remove(index) {
    if (index >= 0 && index < this.array.length) this.array.splice(index, 1);
  }

  Remove(predicate) {
    this.array.splice(this.array.findIndex(predicate), 1);
  }

  Find(obj) {
    return this.array.findIndex(predicate);
  }

  FindIndex(predicate) {
    return this.array.findIndex(predicate);
  }

  FindIndices(predicate) {
    let foundIndices = [];
    let index = 0;
    for (let i = 0; i < this.array.length; i++) {
      if (predicate(this.array[i])) {
        foundIndices[index] = i;
        index++;
      }
    }
    return foundIndices.length != 0 ? foundIndices : null;
  }

  Clear() {
    //why not just set length = 0 or arr = []?
    //see https://www.tutorialspoint.com/in-javascript-how-to-empty-an-array
    this.array.splice(0, this.array.length);
  }
}
