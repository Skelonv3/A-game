"use strict";

const squares = document.querySelectorAll(".square");
let labelPoints = document.querySelector('.label-points');
const checkClasses = function () {
  squares.forEach((square) => {
    if (
      square.classList.contains("point") &&
      square.classList.contains("player")
    ) {
    player.points++;
    labelPoints.textContent = `Points: ${player.points}`;
      placePoints();
      square.querySelector("item").style.backgroundColor = "rgb(242, 162, 33)";
    } else if (square.classList.contains("player")) {
      square.querySelector("item").style.backgroundColor = "rgb(242, 216, 18)";
    } else if (square.classList.contains("point")) {
      square.querySelector("item").style.backgroundColor = "rgb(41, 190, 46)";
    } else if (square.classList.contains("enemy")) {
      square.querySelector("item").style.backgroundColor = "rgb(244, 40, 40)";
    } else {
      square.querySelector("item").style.backgroundColor = "rgb(255, 255, 255)";
    }
  });
};
function placePoints() {
  squares.forEach((square) => {
    square.classList.contains("point") ? square.classList.remove("point") : "";
  });
  squares[
    Math.trunc(Math.random() * 10) * 10 + Math.trunc(Math.random() * 10)
  ].classList.add("point");
}
placePoints();
const player = {
  x: Math.trunc(Math.random() * 10),
  y: Math.trunc(Math.random() * 10),
  points: 0,
  alive: true,
  placePlayer: function () {
    squares.forEach((square) => {
      square.classList.contains("player")
        ? square.classList.remove("player")
        : "";
    });
    squares[this.y * 10 + this.x].classList.add("player");
  },
};
player.placePlayer();

document.addEventListener("keydown", function (e) {
  console.log(player.x, player.y);
  if (e.key === "w" && player.y > 0) {
    player.y--;
    player.placePlayer();
    checkClasses();
  } else if (e.key === "s" && player.y < 9) {
    player.y++;
    player.placePlayer();
    checkClasses();
  } else if (e.key === "a" && player.x > 0) {
    player.x--;
    player.placePlayer();
    checkClasses();
  } else if (e.key === "d" && player.x < 9) {
    player.x++;
    player.placePlayer();
    checkClasses();
  }
});

console.log(player);
checkClasses();
