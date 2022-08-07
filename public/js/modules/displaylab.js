//@Author: Andrzej Kaufman WS21 Gruppe 3

// init floor list
// add anchor to "spielflaeche"
// loop to create column div
// set classes and ids
// append column to base
// loop through column
// create image
// create and append cell div
// insert image src according to maze array
// if 0 = floor or 1 = wall
// append image to cell
// @param labirynth array filled with 0 and 1
// @param end coord object
// @returns  list of all floors

function displayField(labyrinth, end) {
  let floors = Array();
  let size = 26;
  //memory.setStorageTileSize(size)
  let base = document.createElement("div");
  base.id = "base";
  document.getElementById("spielflaeche").appendChild(base);

  for (let i = 0; i < labyrinth.length; i++) {
    var column = document.createElement("div");
    column.classList.add("gridColumn");
    column.id = "column";

    document.getElementById("base").appendChild(column);

    for (let j = 0; j < labyrinth[i].length; j++) {
      var img = new Image(size, size);

      var cell = document.createElement("div");
      cell.classList.add("gridElement");
      document.getElementById("base").children[i].appendChild(cell);

      if (i == end.x && j == end.y) {
        img.src = "images/exit.jpg";
        img.classList.add("floor");
      } else {
        if (labyrinth[i][j] == 0) {
          img.src = "images/floor.jpg";
          img.classList.add("floor");
          floors.push(newCoordinate(i, j));
        }

        if (labyrinth[i][j] == 1) {
          img.src = "images/wall.png";
          img.classList.add("wall");
        }
      }

      document.getElementById("base").children[i].children[j].appendChild(img);
    }
  }
  return floors;
}

// display items in the DOM maze
// loop through the items array
// create new image
// add src to image
// add classes and ids to image
// display image
// @param items array with items in it

function displayItems(items) {
  for (let index = 0; index < items.length; index++) {
    let size = 26;

    let item = new Image(size, size);
    item.src = "images/items/" + items[index].name + ".png";
    item.classList.add("item");
    item.id = items[index].name;

    displayToken(items[index].position, item);
  }
}

// display token
// @param coordinate coordingate of token
// @param token img element to be appended

function displayToken(coordinate, token) {
  document.getElementById("base").children[coordinate.x].children[coordinate.y].appendChild(token);
}

//init storage
const memory = new BrowserStorage();

//imports
import { BrowserStorage } from "./storage.js";
import { newCoordinate, newItem } from "./objects.js";

// exports
export { displayField, displayToken, displayItems };
