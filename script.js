"use strict";

const boardContainer = document.querySelector(".board");
const labelPoint = document.querySelector(".label-points");
const labelGameOver = document.querySelector(".label-game_over");

const collisionTypes = Object.freeze({
  WALLHIT: "wallHit",
  POINT: "point",
  SELFCOLLISION: "selfCollision",
});

const action = Object.freeze({
  GETPOINT: "GETPOINT",
  ENDGAME: "ENDGAME",
  MOVE: "MOVE",
});

const collisionActions = Object.freeze({
  [action.GETPOINT]: [collisionTypes.POINT],
  [action.ENDGAME]: [collisionTypes.WALLHIT, collisionTypes.SELFCOLLISION],
  [action.MOVE]: [],
});

const directions = Object.freeze({
  UP: "UP",
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
});

const directionValues = Object.freeze({
  [directions.UP]: -1,
  [directions.DOWN]: 1,
  [directions.RIGHT]: 1,
  [directions.LEFT]: -1,
});

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

const getNewCoordinates = function (player) {
  const newHeadCoordinates = {
    x: player.coordinates[0].x,
    y: player.coordinates[0].y,
  };
  if (player.direction === directions.UP || player.direction === directions.DOWN) {
    newHeadCoordinates.y += directionValues[player.direction];
  } else if (player.direction === directions.RIGHT || player.direction === directions.LEFT) {
    newHeadCoordinates.x += directionValues[player.direction];
  } 
  return newHeadCoordinates;
};

const getCollisionAction = function (collisionType, collisionActions) {
  for (let action in collisionActions) {
    if (collisionActions[action].includes(collisionType)) {
      return action;
    }
  }
  return action.MOVE;
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
  } while (occupiedPositions.some((coor) => coor.x === x && coor.y === y));

  return { x, y };
};

const randomizePointPosition = function () {
  const position = randomPointPosition();
  pointCoordinates.x = position.x;
  pointCoordinates.y = position.y;
};

const placeNewPoint = function () {
  randomizePointPosition();
  placeItem(pointCoordinates.x, pointCoordinates.y, "point");
};

const pointScored = function (pointCoordinates, points) {
  removeItem(pointCoordinates.x, pointCoordinates.y, "point");
  placeNewPoint();
  labelPoint.textContent = `Points: ${points}`;
};

const moving = function (e) {
  if (player.isAlive) {
    if (e.key === "w") {
      player.direction = directions.UP;
    }
    if (e.key === "s") {
      player.direction = directions.DOWN;
    }
    if (e.key === "d") {
      player.direction = directions.RIGHT;
    }
    if (e.key === "a") {
      player.direction = directions.LEFT;
    }
  }
};
const gameLoop = function () {
  if (player.isAlive) {
    const newHeadCoordinates = getNewCoordinates(this);
    player.movePlayer(newHeadCoordinates, pointCoordinates);
  }
};
const player = {
  coordinates: [
    {
      x: Math.trunc(Math.random() * board.width),
      y: Math.trunc(Math.random() * board.height),
    },
  ],

  // TODO :: on start generate proper direction based on starting point, so user won't endgame at the beginig due to hitting wall
  direction: directions.RIGHT,
  isAlive: true,
  points: 0,
  placePlayerOnStart: function () {
    placeItem(this.coordinates[0].x, this.coordinates[0].y, "player");
  },

  movePlayer: function (pointCoordinates) {
    const newHeadCoordinates = getNewCoordinates();

    const currentAction = this.detectAction(
      board,
      newHeadCoordinates,
      pointCoordinates
    );

    console.log(currentAction, this.isAlive);

    if (currentAction === action.GETPOINT) {
      this.points++;
      pointScored(pointCoordinates, this.points);
      this.coordinates.unshift(pointCoordinates);
    } else if (currentAction === action.ENDGAME) {
      this.isAlive = false;
      labelGameOver.style.display = "flex";
    }

    if (currentAction === action.MOVE || currentAction === action.GETPOINT) {
      removeItem(
        this.coordinates[this.coordinates.length - 1].x,
        this.coordinates[this.coordinates.length - 1].y,
        "player"
      );

      placeItem(newHeadCoordinates.x, newHeadCoordinates.y, "player");

      this.coordinates.pop();
      this.coordinates.unshift(newHeadCoordinates);
    }
  },

  detectAction: function (board, newHeadCoordinates, pointCoordinates) {
    const isWallCollision = this.wallCollision(board, newHeadCoordinates);
    const isPointCollision = this.pointCollision(
      newHeadCoordinates,
      pointCoordinates
    );
    const isSelfCollision = this.selfCollision(newHeadCoordinates);
    if (isWallCollision) {
      return getCollisionAction(isWallCollision, collisionActions);
    }
    if (isPointCollision) {
      return getCollisionAction(isPointCollision, collisionActions);
    }
    if (isSelfCollision) {
      return getCollisionAction(isSelfCollision, collisionActions);
    }
    return getCollisionAction("", collisionActions);
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

////////////////////////////////
//// INITIATE GAME ////////////
////////////////////////////////

board.createBoard();
player.placePlayerOnStart();
placeNewPoint();

// Start movement
document.addEventListener("keydown", moving);
const interval = setInterval(
  () => player.movePlayer(poi),
  1000
);
