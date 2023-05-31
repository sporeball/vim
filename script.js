document.addEventListener("DOMContentLoaded", victus.setup({
  id: "canvas",
  w: 552,
  h: 552,
  color: "#fff"
}));

const player1 = new victus.Ellipse(261, 261, 10, 10, "#ea323c"),
  player2 = new victus.Ellipse(291, 261, 10, 10, "#0098dc"),
  player3 = new victus.Ellipse(261, 291, 10, 10, "#5ac54f"),
  player4 = new victus.Ellipse(291, 291, 10, 10, "#ffc825");

const loadSound = new victus.Sound("res/audio/load.ogg", 0.5),
  uiSound = new victus.Sound("res/audio/ui.wav", 0.5),
  startSound = new victus.Sound("res/audio/start.wav", 1),
  selectSound = new victus.Sound("res/audio/select.ogg", 0.5),
  rollSound = new victus.Sound("res/audio/roll.ogg", 1);

// var locations = ownership = vim = Array(11).fill(0).map(x => Array(11).fill(0));

let playerCount;
let currentPlayer = 1;

let direction;
let sign;

// when done loading assets, display the gesture prompt
Pace.on("done", () => {
  setTimeout(() => {
    showElement('gesture');
  }, 250); // the "done" event seems to fire a little early
});

// called when a gesture is received
function gesture () {
  hideElement('gesture');
  setTimeout(() => {
    loadSound.reset();
    loadSound.play();
    mainMenu();
  }, 500);
}

// display the main menu
function mainMenu () {
  showElement('title');
  setTimeout(() => {
    showElement('subtitle');
    uiSound.reset();
    uiSound.play();
  }, 750);
  setTimeout(() => {
    showElement('2_player');
    uiSound.reset();
    uiSound.play();
  }, 1500);
  setTimeout(() => {
    showElement('3_player');
    uiSound.reset();
    uiSound.play();
  }, 1750);
  setTimeout(() => {
    showElement('4_player');
    uiSound.reset();
    uiSound.play();
  }, 2000);
}

// start game with a certain number of players
function start (players) {
  playerCount = players;

  switch (players) {
    case 2:
      player3.hide();
      player4.hide();
      break;
    case 3:
      player4.hide();
      showElement('player_3');
      break;
    case 4:
      showElement('player_3');
      showElement('player_4');
  }

  document.getElementById(`player_${playerCount}`).classList.add("player-last");
  document.getElementById("player_count").innerHTML = `(${playerCount}-player)`;

  hideElement('start');
  showElement('game');

  startSound.reset();
  startSound.play();

  window.requestAnimationFrame(main);
}

/**
 * game functions
 */

/**
 * choose which direction you want to move in
 * @param {string} choice 'up', 'down', 'left', or 'right'
 */
function chooseDirection (choice) {
  direction = choice;

  document.getElementById(choice).classList.add("active");

  // show sign prompt
  setTimeout(() => {
    document.getElementById(choice).classList.remove("active");
    hideElement('direction_container');
    showElement('sign_container');
  }, 750)

  selectSound.reset();
  selectSound.play();
}

/**
 * choose whether you want to add or remove vim from the square you land on
 * @param {string} choice 'add' or 'remove'
 */
function chooseSign (choice) {
  sign = choice;

  document.getElementById(choice).classList.add("active");

  // show roll prompt
  setTimeout(() => {
    document.getElementById(choice).classList.remove("active");
    hideElement('sign_container');
    showElement('roll_container');
  }, 750);

  selectSound.reset();
  selectSound.play();
}

// roll the die
function roll () {
  // disable the button for the die
  document.getElementById("roll").setAttribute("disabled", "");
  // play sound
  rollSound.reset();
  rollSound.play();
  // start to change the face of the die
  let face = setInterval(() => {
    document.getElementById("roll").innerHTML = String(Math.floor(Math.random() * 6) + 1);
  }, 100)
  // stop changing the face of the die
  // also adds hover styles to indicate a face has been chosen
  setTimeout(() => {
    clearInterval(face);
    document.getElementById("roll").classList.add("hover");
  }, 2000);
  // revert the button to how it was before
  setTimeout(() => {
    document.getElementById("roll").classList.remove("hover");
    document.getElementById("roll").innerHTML = "roll!";
    document.getElementById("roll").removeAttribute("disabled");
    nextTurn();
  }, 3250)
}

// move on to the next turn
function nextTurn () {
  // update whose turn it is
  currentPlayer != playerCount ? currentPlayer++ : currentPlayer = 1;
  document.getElementById("turn").innerHTML = `player ${currentPlayer}'s turn`
  // show direction prompt
  hideElement('roll_container');
  showElement('direction_container');
}

/**
 * drawing functions
 */

// draw all players
function drawPlayers () {
  player1.draw();
  player2.draw();
  player3.draw();
  player4.draw();
}

// draw the grid
function drawGrid () {
  for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
      victus.ctx.beginPath();
      victus.ctx.strokeStyle = "#ccc";
      victus.ctx.lineWidth = "1";
      victus.ctx.rect(i * 50 + 1, j * 50 + 1, 50, 50);
      victus.ctx.stroke();
    }
  }
}

/**
 * utility functions
 */

function showElement (element) {
  document.getElementById(element).classList.remove("d-none");
}

function hideElement (element) {
  document.getElementById(element).classList.add("d-none");
}

/**
 * main loop
 */

function main () {
  victus.clear();

  drawGrid();
  drawPlayers();

  window.requestAnimationFrame(main);
}

// ctx.fillStyle = "white";
// ctx.fillText("1", 22, 29);
