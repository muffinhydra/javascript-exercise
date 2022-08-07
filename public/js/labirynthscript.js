//@Author: Andrzej Kaufman WS21 Gruppe 3

// create field and populate gui
// grab data from memory and display it
// if there is no maze generete maze according to JSON config
// display the maze,
// create item list
// save item list to memory
// display items on field
// init token on field
function createField() {
  document.getElementById("playername").textContent = memory.getStoragePlayerData().playerName;
  document.getElementById("highscore").textContent = memory.getStoragePlayerData().currentPoints;
  document.getElementById("level").textContent = memory.getStoragePlayerData().currentLevel;

  if (!memory.getStorageSavedLabirynth()) {
    mazegenerator(memory.getStorageLabConfig().size);
  }
  // init spielflaeche
  let floors = displayField(memory.getStorageSavedLabirynth(), memory.getStorageSavedEnd());

  if (!memory.getStorageItems()) {
    memory.setStorageItems(createItems(floors, memory.getStorageLabConfig().items));
  }

  displayItems(memory.getStorageItems());

  //initialize token
  let token = getToken("down");
  displayToken(memory.getStoragePlayerData().currentPos, token);
  // init token on spielflaeche
}

// delete current field
// remove current maze and item list from memory
// increment level in player object in memory
// switch start and end with each other
// create new field

function newStage() {
  //vgl. https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild+

  let d = document.getElementById("spielflaeche");
  let d_nested = document.getElementById("base");
  let throwawayNode = d.removeChild(d_nested);

  memory.killStorageSavedLabirynth();
  memory.killStorageItems();

  let player = memory.getStoragePlayerData();
  player.currentLevel += 1;
  memory.setStoragePlayerData(player);

  initStartEnd();

  // create new labirynth

  createField();
}

// switches start and end postions
function initStartEnd() {
  if (isOdd(memory.getStoragePlayerData().currentLevel)) {
    memory.setStorageSavedStart(newCoordinate(1, 1));
    memory.setStorageSavedEnd(memory.getStorageLabConfig().finish);
  } else {
    memory.setStorageSavedStart(memory.getStorageLabConfig().finish);
    memory.setStorageSavedEnd(newCoordinate(1, 1));
  }
}

// compares two cordinate object with each other
// @returns if is equal
function comparePosition(coord1, coord2) {
  if (coord1.x == coord2.x && coord1.y == coord2.y) {
    return true;
  } else {
    return false;
  }
}

// checks if number is odd
// @returns if is odd
function isOdd(num) {
  return num % 2;
}

// creates a new maze accordint to value in memory
// writes new maze directly into memory

function mazegenerator(object) {
  switch (String(memory.getStorageMazeGen())) {
    case "prim":
      memory.setStorageSavedLabirynth(prim(object));
      break;
    case "primsc":
      memory.setStorageSavedLabirynth(primsc(object));
      break;
  }
}

// create function for pause button
// clear timer
// restart timer with time left
document.getElementById("pause").onclick = function () {
  if (memory.getStorageMovement()) {
    clearInterval(timer);
    memory.setStorageMovementFalse();
  } else {
    memory.setStorageEndTime(+new Date() + memory.getStorageTimeLeft());
    timer = startTimer();
    memory.setStorageMovementTrue();
  }
};

//imports
import { displayField, displayToken, displayItems } from "./modules/displaylab.js";
import { prim } from "./modules/primgen.js";
import { primsc } from "./modules/primgen_copy.js";
import { newCoordinate } from "./modules/objects.js";
import { startTimer } from "./modules/clock.js";
import { moveToken, getToken } from "./modules/movement.js";
import { createItems } from "./modules/items.js";
import { BrowserStorage } from "./modules/storage.js";
export { newStage, comparePosition };

//init storage
const memory = new BrowserStorage();

// eventlistener for keystrokes
document.addEventListener("keydown", moveToken);

//testing function enables new lab each reload
//localStorage.removeItem("savedLabirynth")

// if there is a labconfig loaded init start field timer
// set movement true
// else move to tokenselection
if (memory.getStorageLabConfig()) {
  initStartEnd();

  //init field
  createField();

  //start timer
  var timer = startTimer();

  //enable momevement
  memory.setStorageMovementTrue();
} else {
  location.href = "tokenselector.html";
}
