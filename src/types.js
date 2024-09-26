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

// export { collisionTypes, action, collisionActions, directions, directionValues }
