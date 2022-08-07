//@Author: Andrzej Kaufman WS21 Gruppe 3

// grab title + content form input and textarea
// validate if content is not empty
// validate if title is not empty
// validate if title has no specialcharacter
// clear input and textarea
// @return empty

function grabEntry() {
  var title = document.getElementById("inputContent").value;
  var content = document.getElementById("fieldContent").value;

  if (title.match('[~"#%&*:<>?/{|}\\\\]')) {
    alert('~"#%&*:<>?/{|}! forbidden characters!');
    return;
  }
  if (content === "") {
    alert("You didn't write anything!");
    return;
  }

  if (title === "") {
    alert("Please choose a title!");
    return;
  }

  memory.updateStorageNoteEntry(newNoteEntry(title, content));
  document.getElementById("inputContent").value = "";
  document.getElementById("fieldContent").value = "";
}

// display entries in "left container" div
// create elements needed
// set innerHTML into the elements
// set ID and Classes of elements
// append elements to container
// append container to anchor DIV
// create delete function for delete button
// whenever an entry is deleted delete the entire container and repopulate entries
function displayEntries() {
  let textfields = document.createElement("div");
  textfields.id = "textfields";
  document.getElementById("rightcontainer").appendChild(textfields);
  if (memory.getStorageNoteEntry()) {
    for (let index = 0; index < memory.getStorageNoteEntry().length; index++) {
      let container = document.createElement("div");
      let title = document.createElement("span");
      let time = document.createElement("time");
      let content = document.createElement("span");
      let button = document.createElement("button");

      title.innerHTML = memory.getStorageNoteEntry()[index].title;
      button.innerHTML = "Delete";
      time.innerHTML = "Date: " + memory.getStorageNoteEntry()[index].date;
      content.innerHTML = memory.getStorageNoteEntry()[index].content;

      container.id = "container";
      button.id = "entryDeletion" + index;
      button.classList.add("deletebutton");

      container.appendChild(title);
      container.appendChild(time);
      container.appendChild(content);
      container.appendChild(button);
      document.getElementById("textfields").appendChild(container);
      document.getElementById("entryDeletion" + index).addEventListener("click", function () {
        let array = memory.getStorageNoteEntry();
        if (confirm("Do you really want to delete the entry " + '"' + array[index].title + '" ' + array[index].date + " ?") == true) {
          array.splice(index, 1);
          memory.setStorageNoteEntry(array);
          let d = document.getElementById("rightcontainer");
          let d_nested = document.getElementById("textfields");
          let throwawayNode = d.removeChild(d_nested);
          displayEntries();
        }
      });
    }
  }
}

// create function for submit button
// whenver submit button is clicked grab entries
// delete textfields in order to repopulate it with current entries
// repopulate "rightcontainer" with entries
document.getElementById("submit").onclick = function () {
  grabEntry();
  if (memory.getStorageNoteEntry()) {
    let d = document.getElementById("rightcontainer");
    let d_nested = document.getElementById("textfields");
    let throwawayNode = d.removeChild(d_nested);
  }
  displayEntries();
};

// init memory
const memory = new BrowserStorage();

// populate "rightcontainer" with entries onload
displayEntries();

import { BrowserStorage } from "./modules/storage.js";
import { newNoteEntry } from "./modules/objects.js";
