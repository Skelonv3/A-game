import './Game.css';
import { generateRandomPosition } from '../utils/coordinates.js'; 
import { useState, useEffect } from 'react';
import Board from './Board.js'

function Game({ board, playerCoordinates }) {

    const [player, setPlayer] = useState({
        coordinates: playerCoordinates 
        ? playerCoordinates 
        : [
            generateRandomPosition(board, [], {})
        ]
    })

    const [point, setPoint] = useState({
        ...generateRandomPosition(board, player.coordinates ?? [], {})
    })



    const updatePlayerCoordinates = (direction, player1) => {
        const newHeadCoordinates = { ...player1.coordinates[0] };

        if (direction === 'UP') {
            newHeadCoordinates.y -= 1;
        } else if (direction === 'DOWN') {
            newHeadCoordinates.y += 1;
        } else if (direction === 'RIGHT') {
            newHeadCoordinates.x += 1;
        } else if (direction === 'LEFT') {
            newHeadCoordinates.x -= 1;
        }

        const newCoordinates = [newHeadCoordinates, ...player1.coordinates.slice(0, -1)];

        return newCoordinates;
    }

    const moveUp = () => setPlayer((oldPlayer) => ({
        coordinates: updatePlayerCoordinates('UP', oldPlayer)
    }));
    const moveDown = () => setPlayer((oldPlayer) => ({
        ...oldPlayer,
        coordinates: updatePlayerCoordinates('DOWN', oldPlayer)
    }));
    const moveRight = () => setPlayer((oldPlayer) => ({
        ...oldPlayer,
        coordinates: updatePlayerCoordinates('RIGHT', oldPlayer)
    }));
    const moveLeft = () => setPlayer((oldPlayer) => ({
        ...oldPlayer,
        coordinates: updatePlayerCoordinates('LEFT', oldPlayer)
    }));

    const handleMovement = (e) => {
        if (e.key === 'w') {
            moveUp()
        } else if (e.key === 's') {
            moveDown();
        } else if (e.key === 'd') {
            moveRight();
        } else if (e.key === 'a') {
            moveLeft();
        }
        console.log(point);

    }
    const playerPos = player.coordinates[0];
    if (playerPos.x === point.x && playerPos.y === point.y) {
        const newPoint = generateRandomPosition(board, player.coordinates, point);
        setPoint(newPoint);
        setPlayer(oldPlayer => {
            const tail = oldPlayer.coordinates[oldPlayer.coordinates.length - 1];
            return {
                coordinates: [...oldPlayer.coordinates, tail]
            };
        });
    }

    // const setNewPointPosition = function () {
    //     const playerPos = player.coordinates[0];
    //     if (playerPos.x === point.x && playerPos.y === point.y) {
    //         const newPoint = generateRandomPosition(board, player.coordinates, point);
    //         setPoint(newPoint);
    //     }
    // }
    useEffect(() => {
        document.addEventListener('keydown', handleMovement)
        return () => document.removeEventListener('keydown', handleMovement);
    }, [])

    return (
        <Board width={board.width} height={board.height} playerCoordinates={player.coordinates} point={point} />
    )
}

export default Game
