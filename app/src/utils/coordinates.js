const generateRandomPosition = function(board, playerCoordinates, pointCoordinates) {
  console.log('koordynaty', playerCoordinates);
    const occupiedPositions = [...playerCoordinates, pointCoordinates]
    let x, y;
    do {
      x = Math.trunc(Math.random() * board.width);
      y =  Math.trunc(Math.random() * board.height);  
    } while(occupiedPositions.some((coor) => coor.x === x && coor.y === y))
    return {x, y}
  }

  export {generateRandomPosition}