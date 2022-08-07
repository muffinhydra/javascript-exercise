//@Author: Andrzej Kaufman WS21 Gruppe 3

// validate file name
// check if any special characters are used
// check if name is a windows reserved file name
// @param filename
// @returns if is valid name

function validFileName(filename) {
  const invalidFileNames = ["CON", "AUX", "PRN", "LST", "NUL"];

  if (filename.match('[~"#%&*:<>?/{|}\\\\]')) {
    return false;
  }

  for (let index = 0; index < invalidFileNames.length; index++) {
    if (filename.toUpperCase() === invalidFileNames[index]) {
      return false;
    }
  }

  for (let index = 0; index < 9; index++) {
    if (filename.toUpperCase() === "COM" + index || filename.toUpperCase() === "LPT" + index) {
      return false;
    }
  }
  return true;
}

// create function for upload button
// grab file from input field
// try parsing JSON
// catch if not JSON and alert user
// load data from JSON into "longterm" persistent memory
// vgl. https://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it/56062650

document.getElementById("import").onclick = function () {
  var files = document.getElementById("selectFiles").files;

  if (files.length <= 0) {
    return false;
  }

  var fr = new FileReader();
  fr.onload = function (e) {
    let result;
    try {
      result = JSON.parse(e.target.result);
    } catch {
      alert("Please select JSON files only!");
    }
    memory.setStorageNoteEntry(result.notes);
    memory.setStorageHighscore(result.playerdata);
  };

  fr.readAsText(files.item(0));
};

// create function for download button
// grab file name from input field
// check if file name is valid
// grab data fromn longterm persitent memory and put it into an container object
// stringfy data into 1 JSON object
// bind file to download anchor
// trigger download anchor
//vgl. https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser

document.getElementById("export").onclick = function () {
  let filename = document.getElementById("filename").value;

  if (validFileName(filename)) {
    let container = newExternalStorage(memory.getStorageHighscore(), memory.getStorageNoteEntry());
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(container));
    let dlAnchorElem = document.getElementById("downloadAnchorElem");

    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", filename + ".json");
    dlAnchorElem.click();
  } else {
    alert("Invalid Filename!");
  }
};

//vgl. https://codepen.io/hidde/pen/LyLmrG

//show chosen file name in span "fileupload"
document.getElementById("selectFiles").addEventListener("change", function (e) {
  document.getElementById("fileupload").innerHTML = e.target.files[0].name;
});

//init memory
const memory = new BrowserStorage();

//imports
import { newExternalStorage } from "./modules/objects.js";
import { BrowserStorage } from "./modules/storage.js";
