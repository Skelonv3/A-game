
/**
 * This method finds first not occupied board position
 * @returns Object in format {x, y}
 */
const randomPointPosition = function (boardWidth, boardHeight, occupiedPositions) {
    let x, y;
    
    do {
      x = Math.trunc(Math.random() * boardWidth);
      y = Math.trunc(Math.random() * boardHeight);
    } while (occupiedPositions.some((coor) => coor.x === x && coor.y === y));
  
    return { x, y };
};


const placeItem = function (x, y, type) {
    document.getElementById(`x${x}y${y}`).classList.add(type);
};
  
const removeItem = function (x, y, type) {
    document.getElementById(`x${x}y${y}`).classList.remove(type);
};

const getCollisionAction = function (collisionType, collisionActions) {
    for (let action in collisionActions) {
        if (collisionActions[action].includes(collisionType)) {
        return action;
        }
    }
    
    return action.MOVE;
};


// export { randomPointPosition , placeItem, removeItem, getCollisionAction}