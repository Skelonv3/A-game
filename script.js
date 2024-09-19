"use strict";

const squares = document.querySelectorAll(".square");
const labelPoints = document.querySelector(".label-points");
const labelGameOver = document.querySelector(".label-game_over");

let length = 1;
let turnsAfterScoringPoint = -1;
const pointCoordinates = [];

const pointScored = function () {
  player.points++;
  length++;
  labelPoints.textContent = `Points: ${player.points}`;
};
const placePoint = function (squaresArray) {
    pointCoordinates[0] = Math.trunc(Math.random() * 10);
    pointCoordinates[1] = Math.trunc(Math.random() * 10);
    console.log(pointCoordinates[0], pointCoordinates[1]);
  squaresArray.forEach((square) => {
    square.querySelector("item").classList.contains("point")
      ? square.querySelector("item").classList.remove("point")
      : "";
  });
  squares[pointCoordinates[1] * 10 + pointCoordinates[0]]
    .querySelector("item")
    .classList.add("point");
};
const move = function (e) {
  for (let i = length - 1; i >= 0; i--) {
    if (i === 0) {
      if (e.key === "w") {
        if (player.y[0] === 0) {
          player.alive = false;
        } else {
          player.y[0]--;
        }
      } else if (e.key === "s") {
        if (player.y[0] === 9) {
          player.alive = false;
        } else {
          player.y[0]++;
        }
      } else if (e.key === "a") {
        if (player.x[0] === 0) {
          player.alive = false;
        } else {
          player.x[0]--;
        }
      } else if (e.key === "d") {
        if (player.x[0] === 9) {
          player.alive = false;
        } else {
          player.x[0]++;
        }
      }
    } else if (i > 0) {
      if (
        (e.key === "w" && player.y[0] === 0) ||
        (e.key === "s" && player.y[0] === 9) ||
        (e.key === "a" && player.x[0] === 0) ||
        (e.key === "d" && player.x[0] === 9)
      ) {
      } else {
        player.x[i] = player.x[i - 1];
        player.y[i] = player.y[i - 1];
      }
    }
  }
  for (let i = 0; i < length; i++) {
    if (player.x[0] === player.x[i] && player.y[0] === player.y[i] && i > 2) {
      player.alive = false;
    }
    if(pointCoordinates[0] === player.x[i] && pointCoordinates[1] === player.y[i] && i > 0) {
      placePoint(squares);
    }
  }
  console.log(player.x, player.y);

  if (!player.alive) {
    document.removeEventListener("keydown", move);
    labelGameOver.style.display = "flex";
  }
  console.log(player.alive);
  player.placePlayer();
  if (
    player.x[0] === pointCoordinates[0] &&
    player.y[0] === pointCoordinates[1]
  ) {
    pointScored();
    placePoint(squares);
  }
};

const player = {
  x: [Math.trunc(Math.random() * 10)],
  y: [Math.trunc(Math.random() * 10)],
  points: 0,
  alive: true,
  placePlayer: function () {
    squares.forEach((square) => {
      square.querySelector("item").classList.contains("player")
        ? square.querySelector("item").classList.remove("player")
        : "";
    });
    for (let i = 0; i < length; i++) {
      squares[this.y[i] * 10 + this.x[i]]
        .querySelector("item")
        .classList.add("player");
    }
  },
};
placePoint(squares);
player.placePlayer();
document.addEventListener("keydown", move);
