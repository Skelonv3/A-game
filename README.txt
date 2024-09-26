1. Wszystkie koordynaty w JS
a) board definiowany za pomocą parametrów board.width i board.height
b) player ma w sobie zapisane koordynaty - tablica obiektów z koordynatami planszy
c) pointCoordinates
d) funkcja do renderowania itemu na boardzie - przyjmuje parametry x, y, typ
e) funkcja do usuwania klasy z itemem na boardzie - x, y, typ
f) funkcja do losowania koordynatów punktu - przyjmuje parametr board, player, pointCoordinates - zwraca obiekt z x i y, gdzie x i y ma wartości, które nie znajdują się ani w pointCoordinates ani w koordynatach gracza
g) funkcja do wstawiania punktu na plansze - przyjmuje parametry board, playerCoordinates, pointCoordinates - usuwa klasy z obecnego punktu, wylosowanie nowych koordynatów i wstawienie punktu
2. Metody w obiekcie player do wstawiania pozycji gracza na planszy
a) metoda do inicjalizowania gracza na planszy - przyjmuje parametr board - losuje koordynaty gracza, ustawia jako pierwszy obiekt w tablicy i renderuje go na planszy
b) metoda do przenoszenia ogona movePlayer - przyjmuje parametry board, pointCoordinates, newHeadCoordinates - usuwa ostatni element i wstawia na początek, usuwa klasę w oparciu o ostatni element, renderuje głowę
d) metoda do wykrywania kolizji - kolizja ze ścianą, kolizja z punktem, kolizja z samym sobą
e) metoda do sprawdzania czy gracz zyje - zatrzymuje interval jesli nie zyje
e) 4 metody do poruszania się - prawo, lewo, góra, dół - w każdej wywołuje się metoda do sprawdzenia kolizji



placeItem(x, y, type) { 
  document.getElementById(`x${x}y${y}`).classList.add(type);
}
removeItem(x, y, type) {
  document.getElementById(`x${x}y${y}`).classList.remove(type);
}
board {
  height: 10,
  width: 10
}
const collisionTypes = Object.freeze({
  WALLHIT: 'wallHit',
  POINT: 'point',
  SELFCOLLISION: 'selfCollision'
})
const collisionActions = Object.freeze({
  GETPOINT: [collisionTypes.POINT]
  ENDGAME: [collisionTypes.WALLHIT, collisionTypes.SELFCOLLISION]
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
player {
  coordinates: [{
    x: Math.random()
    y: Math.random()
  }],
  isAlive: true, 
  placePlayerOnStart(board) {
      x.push(Math.random());
      y.push(Math.random());
    placeItem(x[0], y[0], 'player');
  }
  movePlayer(newHeadCoordinates) {
    removeItem(x[coordinates.length - 1], y[coordinates.length - 1], 'player')
    placeItem(newHeadCoordinates.x, newHeadCoordinates.y, 'player');
    const action = this.detectAction(board, newHeadCoordinates, pointCoordinates);
    // Wywołanie metody obsługującej daną akcję
    // Aktualizacja tablicy
      }
  detectAction(board, newHeadCoordinates, pointCoordinates) {
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
  }
  moveUp() {
    newHeadCoordinates.y = y[0]--;
    detectCollision(newHeadCoordinates);
  }
  wallCollision(board, newHeadCoordinates, pointCoordinates) {
    if(
      newHeadCoordinates.x > board.height - 1 || 
      newHeadCoordinates.x < 0 || 
      newHeadCoordinates.y > board.height - 1 || 
      newHeadCoordinates.y < 0
    ) {
      return collisionTypes.WALLHIT;
    }
    return false;
  }
  pointCollision(newHeadCoordinates, pointCoordinates) {
    if(
      newHeadCoordinates.x === pointCoordinates.x && 
      newHeadCoordinates.y === pointCoordinates.y
    ) {
      return collisionTypes.POINT;
    }
    return false;
  }
  selfCollision(newHeadCoordinates) {
    const coordinateExists = (player.coordinates.filter((coor, i) => {
      return newHeadCoordinates.x === coor.x && newHeadCoordinates.y === coor.y 
    }).length > 0);
    if(coordinateExists) {
      return collisionTypes.SELFCOLLISION;
    }
    return false;
  }  
}
eventlistener ({
  if(klawisz === 'w') {
    moveUp();
  }
  ...
})
 
 const handlers = {
  UP: handleUp,
  DOWN: handleDown,

 }

setInterval(movePlayer, 2000)