//@Author: Andrzej Kaufman WS21 Gruppe 3

//@ https://codepen.io/ProfessorSamoff/pen/mReLVB?editors=1010
//@ https://jsfiddle.net/wr1ua0db/17/

// create timer function
// get time from memory
// set endtime
// if there is endtime set re-set it with time left
// create interval
// set time left
// load time
// parse time into readable format
// display timer
// if time run out clear timer
// set movement false
// timestamp player object
// load player obeject into array
// alert user of out of time
// set out of time true
// move to highscore html

function startTimer() {
  let interval = memory.getStorageLabConfig().time;

  if (!memory.getStorageEndTime()) {
    memory.setStorageEndTime(+new Date() + interval * 60000);
  } else {
    memory.setStorageEndTime(+new Date() + memory.getStorageTimeLeft());
  }
  var clock = setInterval(function () {
    memory.setStorageTimeLeft(memory.getStorageEndTime() - new Date());
    var remaining = memory.getStorageEndTime() - new Date(),
      minutes,
      seconds;

    if (remaining >= 0) {
      minutes = parseInt(Math.floor(remaining / 1000) / 60, 10);
      seconds = parseInt(Math.floor(remaining / 1000) % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      document.getElementById("timer").textContent = minutes + ":" + seconds;
    } else {
      memory.setStorageMovementFalse();
      clearInterval(clock);
      if (!memory.getStorageOutOfTime()) {
        let player = memory.getStoragePlayerData();
        let d = new Date();
        player.date = d.toDateString();
        memory.updateStorageHighscore(player);
      }
      alert("Time's up!");
      memory.setStorageOutOfTimeTrue();
      location.href = "highscore.html";
    }
  }, 100);
  return clock;
}

//init storage
const memory = new BrowserStorage();

// export startTimer function
export { startTimer };

// imports
import { BrowserStorage } from "./storage.js";
