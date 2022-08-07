//@Author: Andrzej Kaufman WS21 Gruppe 3

// creates the table
// create  needed elements for the table
// load scores from memory
// sort scores highest to lowest
// add text to elements
// append elements to header row
// create rows and insert cells into rows
// add text to cells
// append table body to table head
// @return table element

function buildTable() {
  let table = document.createElement("table");
  let header = table.createTHead();
  let headerRow = header.insertRow(0);
  let nameHeader = document.createElement("th");
  let levelHeader = document.createElement("th");
  let pointsHeader = document.createElement("th");
  let dateHeader = document.createElement("th");
  let characterHeader = document.createElement("th");
  let tableBody = document.createElement("tbody");
  let scores = memory.getStorageHighscore();

  scores.sort(function (a, b) {
    if (a.currentPoints < b.currentPoints) return 1;
    if (a.currentPoints > b.currentPoints) return -1;
    return 0;
  });

  table.id = "highscore";

  characterHeader.innerHTML = "Character";
  nameHeader.innerHTML = "Name";
  levelHeader.innerHTML = "End-Level";
  pointsHeader.innerHTML = "Score";
  dateHeader.innerHTML = "Date";

  headerRow.appendChild(nameHeader);
  headerRow.appendChild(levelHeader);
  headerRow.appendChild(pointsHeader);
  headerRow.appendChild(dateHeader);
  headerRow.appendChild(characterHeader);

  for (let index = 0; index < scores.length; index++) {
    let player = scores[index];
    let bodyRow = tableBody.insertRow();
    let name = bodyRow.insertCell(0);
    let level = bodyRow.insertCell(1);
    let points = bodyRow.insertCell(2);
    let date = bodyRow.insertCell(3);
    let character = bodyRow.insertCell(4);
    let portrait = new Image(70, 70);

    portrait.src = "images/characters/character_" + player.character + "/face.png";
    portrait.setAttribute("id", "portrait");

    name.innerHTML = player.playerName;
    level.innerHTML = player.currentLevel;
    points.innerHTML = player.currentPoints;
    date.innerHTML = player.date;
    character.appendChild(portrait);
    table.insertRow();
  }

  table.appendChild(tableBody);

  return table;
}

// init table function
// if no table exist tell user so

function initTable() {
  if (memory.getStorageHighscore()) {
    document.getElementById("tableanchor").appendChild(buildTable());
  } else {
    document.getElementById("tableanchor").innerHTML = "Couldnt find any finished runs!";
  }
}

// init memory
const memory = new BrowserStorage();

// init table
initTable();

// import
import { BrowserStorage } from "./modules/storage.js";
