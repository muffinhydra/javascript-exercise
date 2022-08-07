//@Author: Andrzej Kaufman WS21 Gruppe 3

// The function grabs the value of the radio form from the document
// and concats it into a path for the  ajax request
// @returns  location of JSON file

function returnRadioValue() {
  const radio = document.querySelectorAll("input[name='difficulty']");
  let radioValue;
  for (const radioButton of radio) {
    if (radioButton.checked) {
      radioValue = radioButton.value;
    }
  }
  return "json/" + radioValue + ".json";
}

// use AJAX to grab a JSON file that configures the labyrinth
// put the JSON file into memory
// also move to labirynth.html
function loadLabConfig() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", returnRadioValue(), true);
  xhr.send(null);
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 4:
        console.log("onreadstatechange: request finished and response is ready. " + "(Case 4) Status is: " + xhr.status);
        if (xhr.status == 200) {
          memory.setStorageLabConfig(xhr.responseText);
          console.log("config loaded");
          location.href = "labirynth.html";
        }
        break;
      case 3:
        console.log("onreadstatechange: processing response... (Case 3) Status is: " + xhr.status);
        break;
      case 2:
        console.log("onreadstatechange: response received. (Case 2) Status is: " + xhr.status);
        break;
      case 1:
        console.log("onreadstatechange: connection established.");
        break;
      case 0:
        console.log("onreadstatechange: request not initialised yet.");
        break;
    }
  };
}

// display portrait of chosen character
// @param character id
function displayPort(int) {
  var portrait = new Image(3000, 3000);
  portrait.src = "images/characters/character_" + int + "/face.png";
  portrait.setAttribute("id", "portrait");
  document.getElementById("token").appendChild(portrait);
}

// choose next character to the right
document.getElementById("rightbutton").onclick = function () {
  let d = document.getElementById("token");
  let d_nested = document.getElementById("portrait");
  let throwawayNode = d.removeChild(d_nested);
  if (character < 6) {
    character++;
  } else {
    character = 1;
  }
  displayPort(character);
};

// choose next character to the right
document.getElementById("leftbutton").onclick = function () {
  let d = document.getElementById("token");
  let d_nested = document.getElementById("portrait");
  let throwawayNode = d.removeChild(d_nested);
  if (character > 1) {
    character--;
  } else {
    character = 6;
  }
  displayPort(character);
};

// grab inputs and set them into memory
// validate whenever name exists and has no special characters
// clear storage besides longterm persitent data
// set "out of time" to false
// set of loadLabConfig()
document.getElementById("start").onclick = function () {
  let name = document.getElementById("nameInput").value;

  if (name == "") {
    alert("Please set your name!");
    return;
  }

  if (name.match('[~"#%&*:<>?/{|}\\\\]')) {
    alert(' ~"#%&*:<>?/{|}\\ are forbidden!');
    return;
  }

  if (name.length >= 10) {
    alert("Name darf nicht länger als 10 Zeichen sein!");
    return;
  }

  //take out the garbage
  memory.killStorage();
  let player = newPlayer(name, character);
  memory.setStoragePlayerData(player);
  memory.setStorageOutOfTimeFalse();

  memory.setStorageMazeGen(document.getElementById("genselect").value);
  loadLabConfig();
};

// init memory
const memory = new BrowserStorage();

// set default radio value
document.getElementById("normal").checked = true;

// set default portrait
var character = 1;

// display character portrait
displayPort(character);

import { newPlayer } from "./modules/objects.js";
import { BrowserStorage } from "./modules/storage.js";
