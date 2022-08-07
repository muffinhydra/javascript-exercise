//@Author: Andrzej Kaufman WS21 Gruppe 3

// create new coordinate object
// @param intx x value of coord
// @param inty y value of coord
// @return coordinate object

function newCoordinate(intx, inty) {
  let coordinate = {
    x: intx,
    y: inty,
  };

  return coordinate;
}

// create new player object
// @param name of player
// @param id character id
// @return player object

function newPlayer(name, id) {
  let player = {
    playerName: name,
    currentPos: {
      x: 1,
      y: 1,
    },
    currentLevel: 1,
    currentPoints: 0,
    character: id,
    date: null,
  };
  return player;
}

// create new item object
// @param item name
// @param coordinate of the item
// @return item object

function newItem(item, coordinate) {
  let treasure = {
    name: item,
    position: coordinate,
  };
  return treasure;
}

// create new note entry object
// create a timestamp when object is created
// @param title of entry
// @param content of entry
// @return note entry object

function newNoteEntry(title, content) {
  let date = new Date();
  let entry = {
    title: title,
    date: date.toLocaleString(),
    content: content,
  };
  return entry;
}

// create new object/container for external storage
// @param playerdata array
// @param notes note entry array
// @returns object/container for external storage

function newExternalStorage(playerdata, notes) {
  let memory = {
    playerdata: playerdata,
    notes: notes,
  };
  return memory;
}

// create new boolean onject
// @param value bool
// @param notes note entry array
// @returns boolean object

function newBoolean(value) {
  let boolean = {
    value: value,
  };
  return boolean;
}

export { newBoolean, newCoordinate, newPlayer, newItem, newNoteEntry, newExternalStorage };
