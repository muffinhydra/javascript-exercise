//@Author: Andrzej Kaufman WS21 Gruppe 3

// init memory
const memory = new BrowserStorage();

// create and display maze according to static data
var floors = displayField(prim({ x: 11, y: 11 }), { x: 5, y: 5 });

// create and display items according to static data
displayItems(createItems(floors, ["crystal_1", "crystal_2", "crystal_3", "crystal_4", "crystal_5"]));

//import
import { displayField, displayItems } from "./modules/displaylab.js";
import { prim } from "./modules/primgen.js";
import { createItems } from "./modules/items.js";
import { BrowserStorage } from "./modules/storage.js";
