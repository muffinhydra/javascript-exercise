//@Author: Andrzej Kaufman WS21 Gruppe 3
// vgl.:https://stackoverflow.com/questions/2010892/how-to-store-objects-in-html5-localstorage

// push object into Array within memory
// check if param object exists
// create temp array
// if there is an array in storage load it into temp array
// push object into temparray
// write temparray int memory at id string
// @param string memory id
// @param object

function pushData(string, object) {
  if (object) {
    let tempArray = Array();

    if (localStorage.getItem(string)) {
      tempArray = getStorage(string);
    }

    tempArray.push(object);

    localStorage.setItem(string, JSON.stringify(tempArray));
  } else {
    console.log("empty param in function updateData ");
  }
}

// set object into memory
// check if param object exists
// JSON stringify object
// set object into memory
// write temparray int memory at id string
// @param string memory id
// @param object

function setStorage(string, object) {
  if (object) {
    localStorage.setItem(string, JSON.stringify(object));
  } else {
    console.log(string);
    console.log("empty param in function setStorage ");
  }
}

// get object from memory
// check if param object exists in memory
// parse JSON object
// @param string memory id
// @returns object

function getStorage(string) {
  if (localStorage.getItem(string)) {
    return JSON.parse(localStorage.getItem(string));
  } else {
    console.log("empty param in storage " + string);
  }
}

// BowserStorage class
// provides getter and setter methods for webstorage
// getter and setter work as a "mask"
// they allow for the imputs to be modified according to need
// @param object to be set in storage
// @return object out of storage

class BrowserStorage {
  constructor() {}

  getStorageSavedLabirynth() {
    return getStorage("bb36f");
  }

  setStorageSavedLabirynth(object) {
    setStorage("bb36f", object);
  }

  killStorageSavedLabirynth() {
    localStorage.removeItem("bb36f");
  }

  getStorageSavedEnd() {
    return getStorage("91084");
  }

  setStorageSavedEnd(object) {
    setStorage("91084", object);
  }

  getStorageItems() {
    return getStorage("cb67f");
  }

  setStorageItems(object) {
    setStorage("cb67f", object);
  }

  killStorageItems() {
    localStorage.removeItem("cb67f");
  }

  getStorageLabConfig() {
    return getStorage("bc2c9");
  }

  //@param object JSON object

  setStorageLabConfig(object) {
    console.log(JSON.parse(object));
    setStorage("bc2c9", JSON.parse(object));
  }

  getStoragePlayerData() {
    return getStorage("9b97e");
  }

  setStoragePlayerData(object) {
    setStorage("9b97e", object);
  }

  getStorageSavedStart() {
    return getStorage("d0954");
  }

  setStorageSavedStart(object) {
    setStorage("d0954", object);
  }

  getStorageEndTime() {
    return getStorage("1c8a0");
  }

  setStorageEndTime(object) {
    setStorage("1c8a0", object);
  }

  killStorageEndTime() {
    localStorage.removeItem("1c8a0");
  }

  getStorageTimeLeft() {
    return getStorage("a97eb");
  }

  setStorageTimeLeft(object) {
    setStorage("a97eb", object);
  }

  killStorageTimeLeft() {
    localStorage.removeItem("a97eb");
  }

  getStorageMazeGen() {
    return getStorage("f4872");
  }

  setStorageMazeGen(object) {
    setStorage("f4872", object);
  }

  getStorageNoteEntry() {
    return getStorage("1424b");
  }

  setStorageNoteEntry(array) {
    setStorage("1424b", array);
  }

  updateStorageNoteEntry(object) {
    pushData("1424b", object);
  }

  killStorageNoteEntry() {
    localStorage.removeItem("1424b");
  }

  getStorageMovement() {
    return getStorage("f55ca").value;
  }

  setStorageMovementTrue() {
    setStorage("f55ca", newBoolean(true));
  }

  setStorageMovementFalse() {
    setStorage("f55ca", newBoolean(false));
  }

  getStorageOutOfTime() {
    return getStorage("eb2cf").value;
  }

  setStorageOutOfTimeTrue() {
    setStorage("eb2cf", newBoolean(true));
  }

  setStorageOutOfTimeFalse() {
    setStorage("eb2cf", newBoolean(false));
  }

  updateStorageHighscore(object) {
    pushData("17d6a", object);
  }

  setStorageHighscore(object) {
    setStorage("17d6a", object);
  }
  getStorageHighscore() {
    return getStorage("17d6a");
  }

  // clears storage
  // carries over longterm persistent storage

  killStorage() {
    let StorageHighscore = getStorage("17d6a");
    let StorageNoteEntry = getStorage("1424b");
    localStorage.clear();
    setStorage("17d6a", StorageHighscore);
    setStorage("1424b", StorageNoteEntry);
  }
}

//imports
import { newBoolean } from "./objects.js";
//exports
export { pushData, BrowserStorage };

/**
1424b
df333
1058a
f049e
9ddee
36f98
3c928
ad989
b1e1e
e7ca9
a32e9
81ce1
72734
1b49b
f8180
17d6a
531c0
d94b4
cc72a
08422
ae9c8
4a6f4
eea3c
d7a2a
69023
a3180
ad860
d37d1
ee482
7f5b5
5acc1
c1aab
d9ffb
6c076
cccbd
6ce82
ecfb6
1d436
a6cf4
fb55a
b54dc
0cd78
21342
6420b
48788
a817c
0e68f
375c0
a9dfb
d6823
ea724
9e12f
f20db
ec4fa
5c57b
cbc67
1fd1e
ec214
59117
a62e7 */
