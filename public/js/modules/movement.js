//@Author: Andrzej Kaufman

// move token through DOM maze
// get player and maze from memory
// check if movement true
// set current of the player
// check fo key code
// switch according to code
// check for wall within switch
// check if out of bound within switch
// get the token according to directionb
// remove token at old position
// set current position with next position (which can be current)
// add token at current position
// checkt for items at current position
// add points according to items if item at position
// set player data into storage
// check if at exit, if yes move to next stage
// @param event key input

function moveToken(e) {
  let player = memory.getStoragePlayerData();

  let currentLabirynth = memory.getStorageSavedLabirynth();
  let direction;
  //check localstorage if movement is enabled
  if (memory.getStorageMovement()) {
    //initial position of the token
    var nextPosition = newCoordinate(player.currentPos.x, player.currentPos.y);

    //checks for walls
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft":
        if (player.currentPos.x - 1 >= 0 && currentLabirynth[player.currentPos.x - 1][player.currentPos.y] == 0) nextPosition.x--;
        direction = "left";
        break;
      case "KeyW":
      case "ArrowUp":
        if (currentLabirynth[player.currentPos.x][player.currentPos.y - 1] == 0) nextPosition.y--;
        direction = "up";
        break;
      case "KeyD":
      case "ArrowRight":
        if (
          player.currentPos.x + 1 < memory.getStorageLabConfig().size.x &&
          currentLabirynth[player.currentPos.x + 1][player.currentPos.y] == 0
        )
          nextPosition.x++;
        direction = "right";
        break;
      case "KeyS":
      case "ArrowDown":
        if (currentLabirynth[player.currentPos.x][player.currentPos.y + 1] == 0) nextPosition.y++;
        direction = "down";
        break;
      default:
        return;
    }

    let token = getToken(direction);

    // deleting the token after switch
    let d = document.getElementById("base").children[player.currentPos.x].children[player.currentPos.y];
    let d_nested = document.getElementById("playertoken");
    let throwawayNode = d.removeChild(d_nested);

    // set current position
    player.currentPos = nextPosition;

    // display token on spielflaeche
    displayToken(player.currentPos, token);

    let itemplacement = checkItems(player.currentPos);

    if (itemplacement) {
      const d = document.getElementById("base").children[player.currentPos.x].children[player.currentPos.y];
      const d_nested = document.getElementById("base").children[player.currentPos.x].children[player.currentPos.y].children[1];
      const throwawayNode = d.removeChild(d_nested);

      switch (itemplacement.name) {
        case "crystal_1":
          player.currentPoints = player.currentPoints + 100;
          break;
        case "crystal_2":
          player.currentPoints = player.currentPoints + 200;
          break;
        case "crystal_3":
          player.currentPoints = player.currentPoints + 250;
          break;
        case "crystal_4":
          player.currentPoints = player.currentPoints + 300;
          break;
        case "crystal_5":
          player.currentPoints = player.currentPoints + 500;
          break;
      }
      document.getElementById("highscore").textContent = player.currentPoints;
    }
    memory.setStoragePlayerData(player);

    //check if exit
    //if yes do next stage
    if (comparePosition(player.currentPos, memory.getStorageSavedEnd())) {
      newStage();
    }
  }
}

// get token according to direction
// if direction is not empty  concat a path to the token
// create image and set source to the created path
// set classes and ids to img element
// @param direction token is facing
// @return token img element

function getToken(direction) {
  if (direction != "") {
    let path = "images/characters/character_" + memory.getStoragePlayerData().character + "/" + direction + ".png";
    let token = new Image(26, 26);
    token.src = path;
    token.classList.add("token");
    token.id = "playertoken";
    return token;
  } else {
    console.log("movement got no direction!");
  }
}
// check if at current pos there is an item
// get item object list from memory
// go through list and compare to current position
// @param currentposition coordinate object
// @return item

function checkItems(currentposition) {
  let items = memory.getStorageItems();

  for (let index = 0; index < items.length; index++) {
    if (comparePosition(currentposition, items[index].position)) {
      memory.setStorageItems(items.filter((temp) => temp.position !== items[index].position));

      return items[index];
    }
  }
}

//init storage
const memory = new BrowserStorage();

//imports
import { BrowserStorage } from "./storage.js";
import { displayToken } from "./displaylab.js";
import { newCoordinate } from "./objects.js";
import { newStage, comparePosition } from "../labirynthscript.js";

//exports
export { moveToken, getToken };
