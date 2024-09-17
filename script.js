"use strict";

const squares = document.querySelectorAll('.square');
const checkClasses = function () {
  squares.forEach((square) => {
    if (
      square.classList.contains("point") &&
      square.classList.contains("player")
    ) {
      console.log(square.querySelector("item"));
      square.querySelector("item").style.backgroundColor = 'rgb(242, 162, 33)';
    } else if (square.classList.contains("player")) {
      console.log(square.querySelector("item"));
      square.querySelector("item").style.backgroundColor = 'rgb(242, 216, 18)';
    } else if (square.classList.contains("point")) {
      console.log(square.querySelector("item"));
      square.querySelector("item").style.backgroundColor = 'rgb(41, 190, 46)';
    } else if (square.classList.contains("enemy")) {
      console.log(square.querySelector("item"));
      square.querySelector("item").style.backgroundColor = 'rgb(244, 40, 40)';
    }
  });
};
const player = {
    x: Math.trunc(Math.random() * 10),
    y: Math.trunc(Math.random() * 10),
    point: 0,
    alive: true,
    placePlayer: function() {
        squares.forEach(square => {
            square.classList.contains('player') ?  square.classList.remove('player') : '';
        })
        squares[this.y * 10 + (this.x)].classList.add("player");
    }
}
console.log(3 || 'Jonas');
player.placePlayer();
console.log(player);
checkClasses();
