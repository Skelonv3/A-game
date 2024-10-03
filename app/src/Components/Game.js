import './Game.css';
import { generateRandomPosition } from '../utils/coordinates.js';
import { useState, useEffect } from 'react';
import Board from './Board.js';

function Game({ board, playerCoordinates }) {

    const [player, setPlayer] = useState({
        coordinates: playerCoordinates
            ? playerCoordinates
            : [
                generateRandomPosition(board, [], {})
            ],
        points: 0,
        isAlive: true
    });

    const [point, setPoint] = useState({
        ...generateRandomPosition(board, player.coordinates ?? [], {})
    });

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
        const coordinateExists =
            player1.coordinates.some((coor) => coor.x === newHeadCoordinates.x && coor.y === newHeadCoordinates.y);

        if (coordinateExists || (newHeadCoordinates.x > 9 || newHeadCoordinates.x < 0 || newHeadCoordinates.y > 9 || newHeadCoordinates.y < 0)) {
            console.log('KONIEC');
            setPlayer((oldPlayer) => ({
                ...oldPlayer,
                isAlive: false
            }));
            return player1;
        }

        const newCoordinates = [newHeadCoordinates, ...player1.coordinates.slice(0, -1)];
        return { ...player1, coordinates: newCoordinates };
    };

    const moveUp = () => setPlayer((oldPlayer) => ({
        ...oldPlayer,
        coordinates: updatePlayerCoordinates('UP', oldPlayer).coordinates
    }));
    const moveDown = () => setPlayer((oldPlayer) => ({
        ...oldPlayer,
        coordinates: updatePlayerCoordinates('DOWN', oldPlayer).coordinates
    }));
    const moveRight = () => setPlayer((oldPlayer) => ({
        ...oldPlayer,
        coordinates: updatePlayerCoordinates('RIGHT', oldPlayer).coordinates
    }));
    const moveLeft = () => setPlayer((oldPlayer) => ({
        ...oldPlayer,
        coordinates: updatePlayerCoordinates('LEFT', oldPlayer).coordinates
    }));

    const handleMovement = (e) => {
        if (!player.isAlive) {
            return;
        }

        if (e.key === 'w') {
            moveUp();
        } else if (e.key === 's') {
            moveDown();
        } else if (e.key === 'd') {
            moveRight();
        } else if (e.key === 'a') {
            moveLeft();
        }
    };

    const playerPos = player.coordinates[0];
    if (playerPos.x === point.x && playerPos.y === point.y) {
        const newPoint = generateRandomPosition(board, player.coordinates, point);
        setPoint(newPoint);
        player.points++;
        document.querySelector('.label-points').textContent = `Points: ${player.points}`
        setPlayer((oldPlayer) => {
            const tail = oldPlayer.coordinates[oldPlayer.coordinates.length - 1];
            return {
                ...oldPlayer,
                coordinates: [...oldPlayer.coordinates, tail],
                points: oldPlayer.points,
                isAlive: true
            };
        });
    }
    if(!player.isAlive) {
        document.querySelector('.label-game_over').style.display = 'flex';
    }
    useEffect(() => {
        window.addEventListener('keydown', handleMovement);
        return () => window.removeEventListener('keydown', handleMovement);
    }, [player.isAlive]);

    return (
        <>
            <div className='label-points'>Points: 0</div>
            <Board width={board.width} height={board.height} playerCoordinates={player.coordinates} point={point}/>
            <div className='label-game_over'> GAME OVER </div>
        </>
    );
}

export default Game;
