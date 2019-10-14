// inits
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
canvas.width = 550;
canvas.height = 550;
ctx.font = "12px Arial";

var playerCount = 0;
var currentPlayer = 1;

var locations = Array(11).fill(0).map(x => Array(11).fill(0));
var ownership = Array(11).fill(0).map(x => Array(11).fill(0));
var vim = Array(11).fill(0).map(x => Array(11).fill(0));
// thanks Longfei Wu

var direction = null;
var sign = null;

var loadSound = new Howl({
  src: ["res/audio/load.ogg"],
  volume: 0.5
});

var uiSound = new Howl({
  src: ["res/audio/ui.wav"],
  volume: 0.5
});

var startSound = new Howl({
  src: ["res/audio/start.wav"]
});

var selectSound = new Howl({
  src: ["res/audio/select.ogg"],
  volume: 0.5
});

var rollSound = new Howl({
  src: ["res/audio/roll.ogg"]
});

var ready = false;

Pace.on("done", function() {
  setTimeout(function() {
    ready = true;
    $("#gesture").removeClass("d-none");
  }, 250) // the "done" event seems to fire a little early
});

$("#gesture").click(function() {
  if (ready) {
    $("#gesture").addClass("d-none");
    setTimeout(function() {
      loadSound.play();
      $("h1").removeClass("d-none");
      init();
    }, 500)
  } else {
    
  }
});
    
function init() {
  setTimeout(function() {
    $(".subtitle").removeClass("d-none");
    uiSound.play();
  }, 750)
  setTimeout(function() {
    $("#2_player").removeClass("d-none");
    uiSound.play();
  }, 1500)
  setTimeout(function() {
    $("#3_player").removeClass("d-none");
    uiSound.play();
  }, 1750)
  setTimeout(function() {
    $("#4_player").removeClass("d-none");
    uiSound.play();
  }, 2000)
}

// start game with a certain number of players
function start(players) {
  switch (players) {
    case 2:
      playerCount = 2;
      $("#player_2").addClass("player-last");
      $("#player_count").text("(2-player)");
      predraw(2);
      break;
    case 3:
      playerCount = 3;
      $("#player_3").removeClass("d-none");
      $("#player_3").addClass("player-last");
      $("#player_count").text("(3-player)");
      predraw(3);
      break;
    case 4:
      playerCount = 4;
      $("#player_3").removeClass("d-none");
      $("#player_4").removeClass("d-none");
      $("#player_4").addClass("player-last");
      $("#player_count").text("(4-player)");
      predraw(4);
  }

  $("#start").addClass("d-none");
  $("#game").removeClass("d-none");
  
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
      $("#up").addClass("active");
      setTimeout(function () {
        $("#up").removeClass("active");
        $("#direction_container").addClass("d-none");
        $("#sign_container").removeClass("d-none");
      }, 750)
      break;
    case 2:
      $("#right").addClass("active");
      setTimeout(function () {
        $("#right").removeClass("active");
        $("#direction_container").addClass("d-none");
        $("#sign_container").removeClass("d-none");
      }, 750)
      break;
    case 3:
      $("#down").addClass("active");
      setTimeout(function () {
        $("#down").removeClass("active");
        $("#direction_container").addClass("d-none");
        $("#sign_container").removeClass("d-none");
      }, 750)
      break;
    case 4:
      $("#left").addClass("active");
      setTimeout(function () {
        $("#left").removeClass("active");
        $("#direction_container").addClass("d-none");
        $("#sign_container").removeClass("d-none");
      }, 750)
  }
  
  direction = choice;
  selectSound.play();
}

function chooseSign(choice) {
  switch (choice) {
    case 1:
      $("#add").addClass("active");
      setTimeout(function () {
        $("#add").removeClass("active");
        $("#sign_container").addClass("d-none");
        $("#roll_container").removeClass("d-none");
      }, 750)
      break;
    case 2:
      $("#remove").addClass("active");
      setTimeout(function () {
        $("#remove").removeClass("active");
        $("#sign_container").addClass("d-none");
        $("#roll_container").removeClass("d-none");
      }, 750)
  }
  
  sign = choice;
  selectSound.play();
}

function roll() {
  // disable the button for the die
  $("#roll").attr("disabled", true);
  
  rollSound.seek(1);
  rollSound.play();

  // start to change the face of the die
  var face = setInterval(function() {
    $("#roll").text(String(Math.floor(Math.random() * 6) + 1));
  }, 100)

  // stop changing the face of the die
  // also adds hover styles to indicate a face has been chosen
  setTimeout(function() {
    clearInterval(face);
  }, 2000);
  
  setTimeout(function() {
    $("#roll").addClass("hover");
  }, 2000);

  // revert the button to how it was before
  setTimeout(function() {
    $("#roll").removeClass("hover");
    $("#roll").text("roll!");
    $("#roll").attr("disabled", false);
    postRoll();
  }, 3250)
}

function postRoll() {
  if (currentPlayer !== playerCount) {
    currentPlayer++;
  } else {
    currentPlayer = 1;
  }

  switch (currentPlayer) {
    case 1:
      $(".btn-outline-warning").removeClass("btn-outline-warning").addClass("btn-outline-danger");
      $("#turn").text("player 1's turn");
      break;
    case 2:
      $(".btn-outline-danger").removeClass("btn-outline-danger").addClass("btn-outline-primary");
      $("#turn").text("player 2's turn");
      break;
    case 3:
      $(".btn-outline-primary").removeClass("btn-outline-primary").addClass("btn-outline-success");
      $("#turn").text("player 3's turn");
      break;
    case 4:
      $(".btn-outline-success").removeClass("btn-outline-success").addClass("btn-outline-warning");
      $("#turn").text("player 4's turn");
  }
  
  $("#roll_container").addClass("d-none");
  $("#direction_container").removeClass("d-none");
}

// ctx.fillStyle = "white";
// ctx.fillText("1", 22, 29);

$("#2_player").click(function() {
  start(2);
});
$("#3_player").click(function() {
  start(3);
});
$("#4_player").click(function() {
  start(4);
});

$("#up").click(function() {
  chooseDirection(1);
});

$("#right").click(function() {
  chooseDirection(2);
});

$("#down").click(function() {
  chooseDirection(3);
});

$("#left").click(function() {
  chooseDirection(4);
});

$("#add").click(function() {
  chooseSign(1);
});

$("#remove").click(function() {
  chooseSign(2);
});

$("#roll").click(function() {
  roll();
})
