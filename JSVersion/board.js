// import Player from "./player";

const boardContainer = document.querySelector(".board");

const pointCoordinates = { x: 0, y: 0 };

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

const placeNewPoint = function () {
  const { x, y } = randomPointPosition(board.width, board.height, []);
  pointCoordinates.x = x;
  pointCoordinates.y = y;
  placeItem(pointCoordinates.x, pointCoordinates.y, "point");
};

const pointScored = function (pointCoordinates, points) {
  removeItem(pointCoordinates.x, pointCoordinates.y, "point");
  placeNewPoint();
  labelPoint.textContent = `Points: ${points}`;
};

const wallCollision = function (board, newHeadCoordinates) {
  if (
    newHeadCoordinates.x > board.height - 1 ||
    newHeadCoordinates.x < 0 ||
    newHeadCoordinates.y > board.height - 1 ||
    newHeadCoordinates.y < 0
  ) {
    return collisionTypes.WALLHIT;
  }
  return false;
};
const pointCollision = function (newHeadCoordinates, pointCoordinates) {
  if (
    newHeadCoordinates.x === pointCoordinates.x &&
    newHeadCoordinates.y === pointCoordinates.y
  ) {
    return collisionTypes.POINT;
  }
  return false;
};

const selfCollision = function (player, newHeadCoordinates) {
  console.log(newHeadCoordinates);
  const coordinateExists =
    player.coordinates.filter((coor) => {
      return newHeadCoordinates.x === coor.x && newHeadCoordinates.y === coor.y;
    }).length > 0;
  if (coordinateExists) {
    return collisionTypes.SELFCOLLISION;
  }
  return false;
};
const detectAction = function (
  board,
  player,
  newHeadCoordinates,
  pointCoordinates
) {
  const isWallCollision = wallCollision(board, newHeadCoordinates);
  const isPointCollision = pointCollision(newHeadCoordinates, pointCoordinates);
  const isSelfCollision = selfCollision(player, newHeadCoordinates);
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
};

// export default Board
// export {detectAction}