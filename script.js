"use strict";

placeItem(x, y, type) { 
  document.getElementById(`x${x}y${y}`).classList.add(type);
}
removeItem(x, y, type) {
  document.getElementById(`x${x}y${y}`).classList.remove(type);
}
const board = {
  height: 10,
  width: 10
}
const collisionTypes = Object.freeze({
  WALLHIT: 'wallHit',
  POINT: 'point',
  SELFCOLLISION: 'selfCollision'
})
const collisionActions = Object.freeze({
  GETPOINT: [collisionTypes.POINT],
  ENDGAME: [collisionTypes.WALLHIT, collisionTypes.SELFCOLLISION],
  MOVE: []
})
const getCollisionAction = function(collisionType, collisionActions) {
  for(let action in collisionActions) {
    if(collisionActions[action].includes(collisionType)) {
      return action;
    }
  }
  return Object.key(collisionActions.MOVE);
}
const player = {
  coordinates: [{
    x: Math.random(),
    y: Math.random()
  }],
  isAlive: true, 
  placePlayerOnStart: function(board) {
    randomPosition()
    placeItem(x[0], y[0], 'player');
  },
  movePlayer: function(newHeadCoordinates) {
    removeItem(x[coordinates.length - 1], y[coordinates.length - 1], 'player')
    placeItem(newHeadCoordinates.x, newHeadCoordinates.y, 'player');
    const action = this.detectAction(board, newHeadCoordinates, pointCoordinates);
    // Wywołanie metody obsługującej daną akcję
    // Aktualizacja tablicy
      },
  detectAction: function(board, newHeadCoordinates, pointCoordinates) {
    const isWallCollision = wallCollision();
    const isPointCollision = pointCollision();
    const isSelfCollision = selfCollision();
    if(!isWallCollision) {
      return getCollisionAction(isWallCollision, collisionActions)
    }
    if(isPointCollision) {
      return getCollisionAction(isPointCollision, collisionActions);
    }
    if(isSelfCollision) {
      return getCollisionAction(isSelfCollision, collisionActions);
    }
    return Object.key();
  },
  moveUp: function() {
    newHeadCoordinates.y = y[0]--;
    detectCollision(newHeadCoordinates);
  },
  wallCollision: function(board, newHeadCoordinates) {
    if(
      newHeadCoordinates.x > board.height - 1 || 
      newHeadCoordinates.x < 0 || 
      newHeadCoordinates.y > board.height - 1 || 
      newHeadCoordinates.y < 0
    ) {
      return collisionTypes.WALLHIT;
    }
    return false;
  },
  pointCollision: function(newHeadCoordinates, pointCoordinates) {
    if(
      newHeadCoordinates.x === pointCoordinates.x && 
      newHeadCoordinates.y === pointCoordinates.y
    ) {
      return collisionTypes.POINT;
    }
    return false;
  },
  selfCollision: function(newHeadCoordinates) {
    const coordinateExists = (player.coordinates.filter((coor, i) => {
      return newHeadCoordinates.x === coor.x && newHeadCoordinates.y === coor.y 
    }).length > 0);
    if(coordinateExists) {
      return collisionTypes.SELFCOLLISION;
    }
    return false;
  }  
}
document.eventlistener('keydown', function(e){
  if(e.key === 'w') {
    player.moveUp();
  }
});
 
 const handlers = {
  UP: handleUp,
  DOWN: handleDown,

 }

setInterval(movePlayer, 2000)