////////////////////////////////
//// INITIATE GAME ////////////
////////////////////////////////

board.createBoard();
player.placePlayerOnStart();
placeNewPoint();

// Start movement
document.addEventListener("keydown", player.moving.bind(player));
const interval = setInterval(() => player.movePlayer(pointCoordinates), 1000);
