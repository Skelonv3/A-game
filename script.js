"use strict";

const squares = document.querySelectorAll(".square");
const checkClasses = function () {
  squares.forEach((square) => {
    if (
      square.classList.contains("point") &&
      square.classList.contains("player")
    ) {
      console.log(square.querySelector("item"));
      square.querySelector("item").style.backgroundColor = "rgb(242, 162, 33)";
    } else if (square.classList.contains("player")) {
      console.log(square.querySelector("item"));
      square.querySelector("item").style.backgroundColor = "rgb(242, 216, 18)";
    } else if (square.classList.contains("point")) {
      console.log(square.querySelector("item"));
      square.querySelector("item").style.backgroundColor = "rgb(41, 190, 46)";
    } else if (square.classList.contains("enemy")) {
      console.log(square.querySelector("item"));
      square.querySelector("item").style.backgroundColor = "rgb(244, 40, 40)";
    } else {
      square.querySelector("item").style.backgroundColor = "rgb(255, 255, 255)";
    }
  });
};
const player = {
  x: Math.trunc(Math.random() * 10),
  y: Math.trunc(Math.random() * 10),
  point: 0,
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
