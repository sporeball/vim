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

Pace.on("done", () => {
  setTimeout(() => {
    document.getElementById("gesture").classList.remove("d-none");
  }, 250) // the "done" event seems to fire a little early
});

gesture = () => {
    document.getElementById("gesture").classList.add("d-none");
    setTimeout(() => {
      loadSound.play();
      document.getElementById("title").classList.remove("d-none");
      init();
    }, 500)
}
    
init = () => {
  setTimeout(() => {
    document.getElementById("subtitle").classList.remove("d-none");
    uiSound.play();
  }, 750)
  setTimeout(() => {
    document.getElementById("2_player").classList.remove("d-none");
    uiSound.play();
  }, 1500)
  setTimeout(() => {
    document.getElementById("3_player").classList.remove("d-none");
    uiSound.play();
  }, 1750)
  setTimeout(() => {
    document.getElementById("4_player").classList.remove("d-none");
    uiSound.play();
  }, 2000)
}

// start game with a certain number of players
start = players => {
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

grid = () => {
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

loop = () => {
  victus.clear();
  
  grid();
  player1.draw();
  player2.draw();
  player3.draw();
  player4.draw();
  
  window.requestAnimationFrame(loop);
}

chooseDirection = choice => {
  direction = choice;
  
  document.getElementById(choice).classList.add("active");  
  
  setTimeout(() => {
    document.getElementById(choice).classList.remove("active");
    document.getElementById("direction_container").classList.add("d-none");
    document.getElementById("sign_container").classList.remove("d-none");
  }, 750)
  
  selectSound.play();
}

chooseSign = choice => {
  sign = choice;
  
  document.getElementById(choice).classList.add("active");
  
  setTimeout(() => {
    document.getElementById(choice).classList.remove("active");
    document.getElementById("sign_container").classList.add("d-none");
    document.getElementById("roll_container").classList.remove("d-none");
  }, 750)
  
  selectSound.play();
}

roll = () => {
  // disable the button for the die
  document.getElementById("roll").setAttribute("disabled", "");
  
  rollSound.play();

  // start to change the face of the die
  var face = setInterval(() => {
    document.getElementById("roll").innerHTML = String(Math.floor(Math.random() * 6) + 1);
  }, 100)

  // stop changing the face of the die
  // also adds hover styles to indicate a face has been chosen
  setTimeout(() => {
    clearInterval(face);
  }, 2000);
  
  setTimeout(() => {
    document.getElementById("roll").classList.add("hover");
  }, 2000);

  // revert the button to how it was before
  setTimeout(() => {
    document.getElementById("roll").classList.remove("hover");
    document.getElementById("roll").innerHTML = "roll!";
    document.getElementById("roll").removeAttribute("disabled");
    postRoll();
  }, 3250)
}

postRoll = () => {
  currentPlayer != playerCount ? currentPlayer++ : currentPlayer = 1;

  document.getElementById("turn").innerHTML = `player ${currentPlayer}'s turn`
  
  document.getElementById("roll_container").classList.add("d-none");
  document.getElementById("direction_container").classList.remove("d-none");
}

// ctx.fillStyle = "white";
// ctx.fillText("1", 22, 29);