// https://jestjs.io/docs/getting-started
import { randomPointPosition } from '../src/helper'


// example of posibly flaky test - think why 
test('Check if randomPosition won`t generate coordinates that are ocupied', () => {
    //given
    const boardWidth = 2
    const boardHeight = 2
    const occupiedPositions = [ {x:1, y:1} ]

    //when
    const newCoordinates = randomPointPosition(boardWidth, boardHeight, occupiedPositions)

    //then
    occupiedPositions.forEach( position => {
        expect(newCoordinates.x !== occupiedPositions.x && newCoordinates.y !== occupiedPositions.y).toBeTruthy()
    })
})