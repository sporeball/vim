document.addEventListener("DOMContentLoaded", victus.setup({
  id: "canvas",
  w: 550,
  h: 550,
  color: "#fff"
}));

const ctx = x();

// variable initialization
var playerCount = 0;
var currentPlayer = 1;

var player1 = new victus.Ellipse(260, 260, 5, 5, "#ea323c"),
  player2 = new victus.Ellipse(290, 260, 5, 5, "#0098dc"),
  player3 = new victus.Ellipse(260, 290, 5, 5, "#5ac54f"),
  player4 = new victus.Ellipse(290, 290, 5, 5, "#ffc825");

var loadSound = new victus.Sound("res/audio/load.ogg", 0.5),
  uiSound = new victus.Sound("res/audio/ui.wav", 0.5),
  startSound = new victus.Sound("res/audio/start.wav", 1),
  selectSound = new victus.Sound("res/audio/select.ogg", 0.5),
  rollSound = new victus.Sound("res/audio/roll.ogg", 1);
  
// var locations = ownership = vim = Array(11).fill(0).map(x => Array(11).fill(0));  

var direction = sign = null;

Pace.on("done", function() {
  setTimeout(function() {
    document.getElementById("gesture").classList.remove("d-none");
  }, 250) // the "done" event seems to fire a little early
});

document.getElementById("gesture").onclick = () => {
    document.getElementById("gesture").classList.add("d-none");
    setTimeout(function() {
      loadSound.play();
      document.getElementById("title").classList.remove("d-none");
      init();
    }, 500)
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
  playerCount = players;
  
  switch (players) {
    case 2:
      player3.hide();
      player4.hide();
      break;
    case 3:
      player4.hide();
      document.getElementById("player_3").classList.remove("d-none");
      break;
    case 4:
      document.getElementById("player_3").classList.remove("d-none");
      document.getElementById("player_4").classList.remove("d-none");
  }
  
  document.getElementById(`player_${playerCount}`).classList.add("player-last");
  document.getElementById("player_count").innerHTML = `(${playerCount}-player)`;

  document.getElementById("start").classList.add("d-none");
  document.getElementById("game").classList.remove("d-none");
  
  startSound.play();
  
  window.requestAnimationFrame(loop);
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

function loop() {
  victus.clear();
  
  grid();
  player1.draw();
  player2.draw();
  player3.draw();
  player4.draw();
  
  window.requestAnimationFrame(loop);
}

function chooseDirection(choice) {
  direction = choice;
  
  switch (choice) {
    case 1:
      document.getElementById("up").classList.add("active");
      setTimeout(function () {
        document.getElementById("up").classList.remove("active");
      }, 750)
      break;
    case 2:
      document.getElementById("right").classList.add("active");
      setTimeout(function () {
        document.getElementById("right").classList.remove("active");
      }, 750)
      break;
    case 3:
      document.getElementById("down").classList.add("active");
      setTimeout(function () {
        document.getElementById("down").classList.remove("active");
      }, 750)
      break;
    case 4:
      document.getElementById("left").classList.add("active");
      setTimeout(function () {
        document.getElementById("left").classList.remove("active");
      }, 750)
  }
  
  setTimeout(function() {
    document.getElementById("direction_container").classList.add("d-none");
    document.getElementById("sign_container").classList.remove("d-none");
  }, 750)
  
  selectSound.play();
}

function chooseSign(choice) {
  sign = choice;
  
  switch (choice) {
    case 1:
      document.getElementById("add").classList.add("active");
      setTimeout(function () {
        document.getElementById("add").classList.remove("active");
      }, 750)
      break;
    case 2:
      document.getElementById("remove").classList.add("active");
      setTimeout(function () {
        document.getElementById("remove").classList.remove("active");
      }, 750)
  }
  
  setTimeout(function() {
    document.getElementById("sign_container").classList.add("d-none");
    document.getElementById("roll_container").classList.remove("d-none");
  }, 750)
  
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