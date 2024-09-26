import { randomPointPosition } from './helper'


// PRE CLASS NOTATION 
// function Player(name){

// }


// Player.prototype.move = function () {

// }

// CLASS NOTATION, BUT STILL WE HAVE PROTOTYPES BEHIND THE SCENE

const KeyBindingType = Object.freeze({
    WSAD: 'WSAD',
    ARROWS: 'ARROWS'
})

const KeyBinding = Object.freeze({
    
})


class Player {

    constructor(name, board, keyBindingType){
        this.name = name
        this.coordinates = randomPointPosition(board.width, board.height, [board.pointPositon])
    }

    movePlayer() {

    }

    moving(){

    }



}



// const player1 = new Player('Patryk', board)
// const player2 = new Player('Darek', board)

// player2.move()

export default Player
