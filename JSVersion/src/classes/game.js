import Board from "./board"
import Player from "./player"


class Game {
    constructor(players, board) {
        this.board = board
        this.players = players
        this.multiplayer = players.length > 1
        this.state = 'Initiated' //use ENUM instead String
    }

    startGame(){
        this.state = 'Started'
        //startInterval
        const interval = setInterval(
            () => this.players.forEach( player => player.movePlayer(this.board.pointCoordinates) )
        ,1000);
    }

    renderBoard(){

    }

    renderPlayer(player){

    }

    renderPoint(){

    }


}

const board = new Board(10,10)
const player1 = new Player('Patryk',board, KeyBindingType.WSAD)
const game = new Game([player1], board)