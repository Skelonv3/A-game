"use strict";

const checkClasses = function () {
  [...document.querySelectorAll(".square")].forEach((square) => {
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
checkClasses();
