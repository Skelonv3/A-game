"use strict";

const boardContainer = document.querySelector(".board");

const board = {
  height: 10,
  width: 10,
  createBoard: function () {
    let square;
    let item;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        square = document.createElement("div");
        item = document.createElement("div");
        square.setAttribute("class", "square");
        item.setAttribute("id", `x${j}y${i}`);
        item.setAttribute("class", "item");
        boardContainer.appendChild(square);
        square.appendChild(item);
      }
    }
    let grid = `1rem / `;
    for (let i = 0; i < board.width; i++) {
      grid += "auto ";
    }
    document.querySelector(".board").style.grid = grid;
  },
};

const placeItem = function (x, y, type) {
  document.getElementById(`x${x}y${y}`).classList.add(type);
};
const removeItem = function (x, y, type) {
  document.getElementById(`x${x}y${y}`).classList.remove(type);
};

board.createBoard();
const collisionTypes = Object.freeze({
  WALLHIT: "wallHit",
  POINT: "point",
  SELFCOLLISION: "selfCollision",
});
const collisionActions = Object.freeze({
  GETPOINT: [collisionTypes.POINT],
  ENDGAME: [collisionTypes.WALLHIT, collisionTypes.SELFCOLLISION],
  MOVE: [],
});
const getCollisionAction = function (collisionType, collisionActions) {
  for (let action in collisionActions) {
    if (collisionActions[action].includes(collisionType)) {
      return action;
    }
  }
  return Object.key(collisionActions.MOVE);
};
const pointCoordinates = { x: 0, y: 0 };
/**
 * This method finds first not occupied board position
 * @returns Object in format {x, y}
 */
const randomPointPosition = function () {
  let x, y;
  const occupiedPositions = [...player.coordinates, pointCoordinates];
  do {
    x = Math.trunc(Math.random() * board.width);
    y = Math.trunc(Math.random() * board.height);
    console.log(player.coordinates, pointCoordinates);
  } while (occupiedPositions.some((coor) => coor.x === x && coor.y === y));
  return { x, y };
};
const randomizePointPosition = function () {
  const position = randomPointPosition();
  pointCoordinates.x = position.x;
  pointCoordinates.y = position.y;
}
const placeNewPoint = function () {
  randomizePointPosition();
  placeItem(pointCoordinates.x, pointCoordinates.y, "point");
};
const player = {
  coordinates: [
    {
      x: Math.trunc(Math.random() * board.width),
      y: Math.trunc(Math.random() * board.height),
    },
  ],
  isAlive: true,
  placePlayerOnStart: function () {
    console.log(this.coordinates[0].x, this.coordinates[0].y);
    placeItem(this.coordinates[0].x, this.coordinates[0].y, "player");
  },
  movePlayer: function (newHeadCoordinates, pointCoordinates) {
    removeItem(
      this.coordinates[this.coordinates.length - 1].x,
      this.coordinates[this.coordinates.length - 1].y,
      "player"
    );
    placeItem(newHeadCoordinates.x, newHeadCoordinates.y, "player");
    const action = this.detectAction(
      board,
      newHeadCoordinates,
      pointCoordinates
    );
    if (action === collisionActions.GETPOINT) {
      placeNewPoint();
    }
    if (action === collisionActions.ENDGAME) {
      clearInterval(interval);
    }
    // Wywołanie metody obsługującej daną akcję
    // Aktualizacja tablicy
  },
  detectAction: function (board, newHeadCoordinates, pointCoordinates) {
    const isWallCollision = wallCollision(board, newHeadCoordinates);
    const isPointCollision = pointCollision(
      newHeadCoordinates,
      pointCoordinates
    );
    const isSelfCollision = selfCollision(newHeadCoordinates);
    if (isWallCollision) {
      return getCollisionAction(isWallCollision, collisionActions);
    }
    if (isPointCollision) {
      return getCollisionAction(isPointCollision, collisionActions);
    }
    if (isSelfCollision) {
      return getCollisionAction(isSelfCollision, collisionActions);
    }
    return Object.key();
  },
  moveUp: function () {
    newHeadCoordinates.y = this.coordinates[0].y--;
    this.movePlayer(newHeadCoordinates);
  },
  moveDown: function () {
    newHeadCoordinates.y = this.coordinates[0].y++;
  },
  moveRight: function () {
    newHeadCoordinates.x = this.coordinates[0].x++;
  },
  moveLeft: function () {
    newHeadCoordinates.x = this.coordinates[0].x--;
  },
  wallCollision: function (board, newHeadCoordinates) {
    if (
      newHeadCoordinates.x > board.height - 1 ||
      newHeadCoordinates.x < 0 ||
      newHeadCoordinates.y > board.height - 1 ||
      newHeadCoordinates.y < 0
    ) {
      return collisionTypes.WALLHIT;
    }
    return false;
  },
  pointCollision: function (newHeadCoordinates, pointCoordinates) {
    if (
      newHeadCoordinates.x === pointCoordinates.x &&
      newHeadCoordinates.y === pointCoordinates.y
    ) {
      return collisionTypes.POINT;
    }
    return false;
  },
  selfCollision: function (newHeadCoordinates) {
    const coordinateExists =
      this.coordinates.filter((coor) => {
        return (
          newHeadCoordinates.x === coor.x && newHeadCoordinates.y === coor.y
        );
      }).length > 0;
    if (coordinateExists) {
      return collisionTypes.SELFCOLLISION;
    }
    return false;
  },
};
document.addEventListener("keydown", function (e) {
  if (e.key === "w") {
    player.moveUp();
  }
});
player.placePlayerOnStart();
placeNewPoint();
// const interval = setInterval(player.movePlayer, 2000);
