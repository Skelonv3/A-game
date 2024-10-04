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

    const detectEndGame = (newHeadCoordinates) => {
        const colisionWithBody = player.coordinates.some(
            (coor) => coor.x === newHeadCoordinates.x && coor.y === newHeadCoordinates.y
        );

        return (
            colisionWithBody
            || (
                newHeadCoordinates.x > board.width - 1
                || newHeadCoordinates.x < 0
                || newHeadCoordinates.y > board.height - 1
                || newHeadCoordinates.y < 0
            )
        )
    }

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

        console.log(newHeadCoordinates);
        if (detectEndGame(newHeadCoordinates)) {
            console.log('KONIEC');
            setPlayer((oldPlayer) => ({
                ...oldPlayer,
                isAlive: false
            }), newPlayer => console.log(newPlayer));
            console.log(player1.isAlive);
            return player1.coordinates;
        }
        const newCoordinates = [newHeadCoordinates, ...player1.coordinates.slice(1, -1)];
        console.log(newCoordinates);
        return newCoordinates;
    };

    const moveUp = () => setPlayer((oldPlayer) => ({
        ...oldPlayer,
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

    const move = {
        'w': moveUp,
        's': moveDown,
        'd': moveRight,
        'a': moveLeft
    }

    const handleMovement = (e) => {
        console.log(player.isAlive);
        if (!player.isAlive) {
            console.log('GAME OVER');
            return;
        }
        move[e.key]();
    };

    const playerPos = player.coordinates[0];
    if (playerPos.x === point.x && playerPos.y === point.y) {
        const newPoint = generateRandomPosition(board, player.coordinates, point);
        setPoint(newPoint);
        setPlayer((oldPlayer) => {
            const tail = oldPlayer.coordinates[oldPlayer.coordinates.length - 1];
            return {
                ...oldPlayer,
                coordinates: [...oldPlayer.coordinates, tail],
                points: ++oldPlayer.points,
                isAlive: true
            };
        });
    }
    useEffect(() => {
        window.addEventListener('keydown', handleMovement);
        return () => window.removeEventListener('keydown', handleMovement);
    }, []);

    return (
        <>
            <div className='label-points'>Points: {player.points}</div>
            <Board width={board.width} height={board.height} playerCoordinates={player.coordinates} point={point} />
            <div className='label-game_over' style={{ display: `${player.isAlive ? 'none' : 'flex'}` }}> GAME OVER </div>
        </>
    );
}

export default Game;
