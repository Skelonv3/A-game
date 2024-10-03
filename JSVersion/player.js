const labelPoint = document.querySelector(".label-points");
const labelGameOver = document.querySelector(".label-game_over");

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
    const newHeadCoordinates = this.getNewCoordinates(this);
    const currentAction = detectAction(
      board,
      this,
      newHeadCoordinates,
      pointCoordinates
    );

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

  getNewCoordinates: function () {
    const newHeadCoordinates = {
      x: this.coordinates[0].x,
      y: this.coordinates[0].y,
    };
    if (
      this.direction === directions.UP ||
      this.direction === directions.DOWN
    ) {
      newHeadCoordinates.y += directionValues[this.direction];
    } else if (
      this.direction === directions.RIGHT ||
      this.direction === directions.LEFT
    ) {
      newHeadCoordinates.x += directionValues[this.direction];
    }
    return newHeadCoordinates;
  },

  moving: function (e) {
    if (this.isAlive) {
      if (e.key === "w") {
        this.direction = directions.UP;
      }
      if (e.key === "s") {
        this.direction = directions.DOWN;
      }
      if (e.key === "d") {
        this.direction = directions.RIGHT;
      }
      if (e.key === "a") {
        this.direction = directions.LEFT;
      }
    }
  },
};
