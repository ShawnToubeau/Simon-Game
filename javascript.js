var game = {
  power: false,
  count: 0,
  possibilities: ["red", "green", "yellow", "blue"],
  gameSequence: [],
  player: [],
  sound: {
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  },
  strict: false
};

$("#ssd").sevenSeg({ digits: 2, decimalPoint: false, value: null });

function togglePower() {
  if (!game.power) {
    game.power = true;
    $("#ssd").sevenSeg({ value: "00" });
  } else {
    game.power = false;
    game.strict = false;
    $("#ssd").sevenSeg({ value: null });
    document.getElementById("strictLght").style.backgroundColor = "black";
  }
}

function toggleStrict() {
  if (game.power) {
    if (!game.strict) {
      game.strict = true;
      document.getElementById("strictLght").style.backgroundColor = "red";
    } else {
      game.strict = false;
      document.getElementById("strictLght").style.backgroundColor = "black";
    }
  }
}

function clear() {
  game.gameSequence = [];
  game.count = "00";
  $("#ssd").sevenSeg({ value: game.count });

  addSequence();
}

function addSequence() {
  game.gameSequence.push(game.possibilities[Math.round(Math.random() * 3)]);

  playSequence();
}

function playSequence() {
  var i = 0;

  var interval = setInterval(function() {
    flashColor(document.getElementById(game.gameSequence[i]));

    i++;
    if (i >= game.gameSequence.length) {
      clearInterval(interval);
    }
  }, 700);

  clearPlayer();
}

function flashColor(btn) {
  btn.alpha(100);
  sound(btn.id);
  setTimeout(function() {
    btn.alpha(50);
  }, 600);
}

function userFlashColor(btn) {
  btn.alpha(100);
  sound(btn.id);
  setTimeout(function() {
    btn.alpha(50);
  }, 80);
}

function sound(color) {
  switch (color) {
    case "green":
      game.sound.green.play();
      break;
    case "blue":
      game.sound.blue.play();
      break;
    case "red":
      game.sound.red.play();
      break;
    case "yellow":
      game.sound.yellow.play();
      break;
  }
}

HTMLElement.prototype.alpha = function(a) {
  current_color = getComputedStyle(this).getPropertyValue("background-color");
  match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(
    current_color
  );
  a = a > 1 ? a / 100 : a;
  this.style.backgroundColor =
    "rgba(" + [match[1], match[2], match[3], a].join(",") + ")";
};

function clearPlayer() {
  game.player = [];
}

function addToPlayer(elem) {
  game.player.push(elem);
  userFlashColor(document.getElementById(elem));
  console.log(game.player);
  playerTurn(elem);
}

function start() {
  if (game.power) {
    clear();
  }
}

function playerTurn(x) {
  if (
    game.player[game.player.length - 1] !==
    game.gameSequence[game.player.length - 1]
  ) {
    $("#ssd").sevenSeg({ value: "--" });
    setTimeout(function() {
      $("#ssd").sevenSeg({ value: game.count });
    }, 1000);
    if (game.strict) {
      clear();
    } else {
      playSequence();
    }
  } else {
    var check = game.player.length === game.gameSequence.length;
    if (check) {
      game.count++;
      $("#ssd").sevenSeg({ value: game.count });
      if (game.count === 20) {
        alert("You won!");
        clear();
      } else {
        setTimeout(function() {
          addSequence();
        }, 500);
      }
    }
  }
}
