//@Author: Andrzej Kaufman WS21 Gruppe 3

// vgl. https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

// shuffle array
// @param array to be randomized
// @return randomized array

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// create items according to itemlist
// randomizes the floor list and cuts it to fit the item list
// randomizes itemlist
// combines items and floors
// @param floors DOM maze to be populated with items
// @param itemlist with items in it
// @returns randomized item object list

function createItems(floors, itemlist) {
  let itempositions = shuffle(floors).slice(0, itemlist.length);
  let randomitems = shuffle(itemlist);
  let items = Array();
  for (let index = 0; index < randomitems.length; index++) {
    items.push(newItem(randomitems[index], itempositions[index]));
  }
  return items;
}

//imports
import { newItem } from "./objects.js";

//exports
export { createItems };
