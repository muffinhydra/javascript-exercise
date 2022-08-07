//@Author: Andrzej Kaufman WS21 Gruppe 3
//sources:
//https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Prim's_algorithm
//https://stackoverflow.com/questions/29739751/implementing-a-randomly-generated-maze-using-prims-algorithm
//https://professor-l.github.io/mazes/

// creates the maze in array x array  form
// @param size coordinate object
// @return field maze in array x array  form

function primsc(size) {
  //create field
  var field = Array.from(Array(size.x), () => new Array(size.y));
  for (let x = 0; x < field.length; x++) {
    field[x].fill(1);
  }
  // range matrix
  const range = [
    [-2, 0],
    [0, -2],
    [2, 0],
    [0, 2],
  ];

  // seed location

  var seed = newCoordinate((size.x - 1) / 2, (size.y - 1) / 2);

  field[seed.x][seed.y] = 0;

  // create frontier
  var frontier = Array();

  //find neighbouring walls off seed location according to a key array
  //add elidgble walls to frontier
  frontier = frontier.concat(findneighbour(field, seed, range, "wall"));

  //procceed only if there are walls left in frontier
  while (frontier.length > 0) {
    // select a random wall
    const randomwall = Math.floor(Math.random() * frontier.length);

    //removing next if statement causes shortcircuits in the labyrinth
    /**
                    //check if wall is still a wall or a floor
                    // if the wall became a floor in the meantime 
                    // remove the wall from frontier accordingly and skip loop 
                    if (field[frontier[randomwall].x][frontier[randomwall].y] == 0) {
                        frontier.splice(randomwall, 1)
                        continue
                    }
               
            */

    var floor = Array();

    //add all floor elemenets in range of random wall into an array
    floor = floor.concat(findneighbour(field, frontier[randomwall], range, "floor"));

    //choose one of the floor elemnents in range
    const randomfloor = Math.floor(Math.random() * floor.length);

    //determine connecting wall

    // deference between 2 floor cells current random wall from frontier and current random floor in range
    var diff = newCoordinate(null, null);
    diff.x = floor[randomfloor].x - frontier[randomwall].x;
    diff.y = floor[randomfloor].y - frontier[randomwall].y;

    // determine coordinates of cell inbetween current random wall and current random floor in range according to diff
    var newfloor = newCoordinate(null, null);
    switch (diff.x) {
      case 0:
        newfloor.x = frontier[randomwall].x;

        break;
      case 2:
        newfloor.x = 1 + frontier[randomwall].x;

        break;
      case -2:
        newfloor.x = -1 + frontier[randomwall].x;

        break;
    }
    switch (diff.y) {
      case 0:
        newfloor.y = frontier[randomwall].y;
        break;
      case 2:
        newfloor.y = 1 + frontier[randomwall].y;
        break;
      case -2:
        newfloor.y = -1 + frontier[randomwall].y;
        break;
    }
    //add elidgbile neighbour walls to frontier with the current randowmwall as origin
    frontier = frontier.concat(findneighbour(field, frontier[randomwall], range, "wall"));

    //demolish walls
    field[newfloor.x][newfloor.y] = 0;
    field[frontier[randomwall].x][frontier[randomwall].y] = 0;

    //remove current wall from frontier
    frontier.splice(randomwall, 1);
  }
  return field;
}

// searches for neighbours in range using range matrix
// @param field maze in array x array
// @param center coordinate find neighbours to
// @param range how far to look for neighbours
// @param type what to look for
// @return temparray with all neighbours of center

function findneighbour(field, centre, range, type) {
  //translates string to numeric value for the field
  if (type == "wall") type = 1;
  if (type == "floor") type = 0;
  var temparray = Array();
  for (let index = 0; index < 4; index++) {
    try {
      if (field[centre.x + range[index][0]][centre.y + range[index][1]] == type) {
        temparray.push(newCoordinate(centre.x + range[index][0], centre.y + range[index][1]));
      }
    } catch {
      continue;
    }
  }
  // returns array with neigbours
  return temparray;
}

import { newCoordinate } from "./objects.js";
export { primsc, findneighbour };
