document.addEventListener("DOMContentLoaded", victus.setup({
  id: "canvas",
  w: 550,
  h: 550,
  color: "#fff"
}));

var ctx = x();

// variable initialization
var playerCount = 0;
var currentPlayer = 1;

var locations = Array(11).fill(0).map(x => Array(11).fill(0));
var ownership = Array(11).fill(0).map(x => Array(11).fill(0));
var vim = Array(11).fill(0).map(x => Array(11).fill(0));
// thanks Longfei Wu

var direction = null;
var sign = null;

var loadSound = new victus.Sound("res/audio/load.ogg", 0.5);
var uiSound = new victus.Sound("res/audio/ui.wav", 0.5);
var startSound = new victus.Sound("res/audio/start.wav", 1);
var selectSound = new victus.Sound("res/audio/select.ogg", 0.5);
var rollSound = new victus.Sound("res/audio/roll.ogg", 1);

var ready = false;

Pace.on("done", function() {
  setTimeout(function() {
    ready = true;
    document.getElementById("gesture").classList.remove("d-none");
  }, 250) // the "done" event seems to fire a little early
});

document.getElementById("gesture").onclick = () => {
  if (ready) {
    document.getElementById("gesture").classList.add("d-none");
    setTimeout(function() {
      loadSound.play();
      document.getElementById("title").classList.remove("d-none");
      init();
    }, 500)
  } else {
    
  }
}
    
function init() {
  setTimeout(function() {
    document.getElementById("subtitle").classList.remove("d-none");
    uiSound.play();
  }, 750)
  setTimeout(function() {
    document.getElementById("2_player").classList.remove("d-none");
    uiSound.play();
  }, 1500)
  setTimeout(function() {
    document.getElementById("3_player").classList.remove("d-none");
    uiSound.play();
  }, 1750)
  setTimeout(function() {
    document.getElementById("4_player").classList.remove("d-none");
    uiSound.play();
  }, 2000)
}

// start game with a certain number of players
function start(players) {
  switch (players) {
    case 2:
      playerCount = 2;
      document.getElementById("player_2").classList.add("player-last");
      document.getElementById("player_count").innerHTML = "(2-player)";
      predraw(2);
      break;
    case 3:
      playerCount = 3;
      document.getElementById("player_3").classList.remove("d-none");
      document.getElementById("player_3").classList.add("player-last");
      document.getElementById("player_count").innerHTML = "(3-player)";
      predraw(3);
      break;
    case 4:
      playerCount = 4;
      document.getElementById("player_3").classList.remove("d-none");
      document.getElementById("player_4").classList.remove("d-none");
      document.getElementById("player_4").classList.add("player-last");
      document.getElementById("player_count").innerHTML = "(4-player)";
      predraw(4);
  }

  document.getElementById("start").classList.add("d-none");
  document.getElementById("game").classList.remove("d-none");
  
  startSound.play();

  grid();
}

function grid() {
  for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
      ctx.beginPath();
      ctx.strokeStyle = "#ccc";
      ctx.lineWidth = "1";
      ctx.rect(i * 50, j * 50, 50, 50);
      ctx.stroke();
    }
  }
}

// draw a circle for a specific player in the square at coordinates cx,cy
// set center to false to draw in the player's corner (movement)
// set center to true to draw in the center (ownership)
function draw(player, cx, cy, center) {
  var x;
  var y;
  var radius = 5;

  switch (player) {
    case 1:
      ctx.fillStyle = "#ea323c";
      x = (cx * 50) + 10;
      y = (cy * 50) + 10;
      break;
    case 2:
      ctx.fillStyle = "#0098dc";
      x = (cx * 50) + 40;
      y = (cy * 50) + 10;
      break;
    case 3:
      ctx.fillStyle = "#5ac54f";
      x = (cx * 50) + 10;
      y = (cy * 50) + 40;
      break;
    case 4:
      ctx.fillStyle = "#ffc825";
      x = (cx * 50) + 40;
      y = (cy * 50) + 40;
  }

  if (center) {
    x = 25;
    y = 25;
    radius = 10;
  }

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

// setup function
// creates a few draw calls at once for the start of the game
function predraw(players) {
  switch (players) {
    case 2:
      draw(1, 5, 5, 0);
      draw(2, 5, 5, 0);
      break;
    case 3:
      draw(1, 5, 5, 0);
      draw(2, 5, 5, 0);
      draw(3, 5, 5, 0);
      break;
    case 4:
      draw(1, 5, 5, 0);
      draw(2, 5, 5, 0);
      draw(3, 5, 5, 0);
      draw(4, 5, 5, 0);
  }
}

function chooseDirection(choice) {
  switch (choice) {
    case 1:
      document.getElementById("up").classList.add("active");
      setTimeout(function () {
        document.getElementById("up").classList.remove("active");
        document.getElementById("direction_container").classList.add("d-none");
        document.getElementById("sign_container").classList.remove("d-none");
      }, 750)
      break;
    case 2:
      document.getElementById("right").classList.add("active");
      setTimeout(function () {
        document.getElementById("right").classList.remove("active");
        document.getElementById("direction_container").classList.add("d-none");
        document.getElementById("sign_container").classList.remove("d-none");
      }, 750)
      break;
    case 3:
      document.getElementById("down").classList.add("active");
      setTimeout(function () {
        document.getElementById("down").classList.remove("active");
        document.getElementById("direction_container").classList.add("d-none");
        document.getElementById("sign_container").classList.remove("d-none");
      }, 750)
      break;
    case 4:
      document.getElementById("left").classList.add("active");
      setTimeout(function () {
        document.getElementById("left").classList.remove("active");
        document.getElementById("direction_container").classList.add("d-none");
        document.getElementById("sign_container").classList.remove("d-none");
      }, 750)
  }
  
  direction = choice;
  selectSound.play();
}

function chooseSign(choice) {
  switch (choice) {
    case 1:
      document.getElementById("add").classList.add("active");
      setTimeout(function () {
        document.getElementById("add").classList.remove("active");
        document.getElementById("sign_container").classList.add("d-none");
        document.getElementById("roll_container").classList.remove("d-none");
      }, 750)
      break;
    case 2:
      document.getElementById("remove").classList.add("active");
      setTimeout(function () {
        document.getElementById("remove").classList.remove("active");
        document.getElementById("sign_container").classList.add("d-none");
        document.getElementById("roll_container").classList.remove("d-none");
      }, 750)
  }
  
  sign = choice;
  selectSound.play();
}

function roll() {
  // disable the button for the die
  document.getElementById("roll").setAttribute("disabled", "");
  
  rollSound.play();

  // start to change the face of the die
  var face = setInterval(function() {
    document.getElementById("roll").innerHTML = String(Math.floor(Math.random() * 6) + 1);
  }, 100)

  // stop changing the face of the die
  // also adds hover styles to indicate a face has been chosen
  setTimeout(function() {
    clearInterval(face);
  }, 2000);
  
  setTimeout(function() {
    document.getElementById("roll").classList.add("hover");
  }, 2000);

  // revert the button to how it was before
  setTimeout(function() {
    document.getElementById("roll").classList.remove("hover");
    document.getElementById("roll").innerHTML = "roll!";
    document.getElementById("roll").removeAttribute("disabled");
    postRoll();
  }, 3250)
}

function postRoll() {
  currentPlayer != playerCount ? currentPlayer++ : currentPlayer = 1;

  document.getElementById("turn").innerHTML = `player ${currentPlayer}'s turn`
  
  document.getElementById("roll_container").classList.add("d-none");
  document.getElementById("direction_container").classList.remove("d-none");
}

// ctx.fillStyle = "white";
// ctx.fillText("1", 22, 29);

document.getElementById("2_player").onclick = () => { start(2); }
document.getElementById("3_player").onclick = () => { start(3); }
document.getElementById("4_player").onclick = () => { start(4); }

document.getElementById("up").onclick = () => { chooseDirection(1); }
document.getElementById("right").onclick = () => { chooseDirection(2); }
document.getElementById("down").onclick = () => { chooseDirection(3); }
document.getElementById("left").onclick = () => { chooseDirection(4); }

document.getElementById("add").onclick = () => { chooseSign(1); }
document.getElementById("remove").onclick = () => { chooseSign(2); }

document.getElementById("roll").onclick = () => { roll(); }