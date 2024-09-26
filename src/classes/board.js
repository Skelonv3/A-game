
class Board {
    constructor(width,height){
        this.width = width
        this.height = height
        this.pointPosition = randomPointPosition(this.width, this.height, [])
    }

    setPointPosition(occupiedPositions){
        this.pointPosition = randomPointPosition(this.width, this.height, occupiedPositions)
    }


}

export default Board