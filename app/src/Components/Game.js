import './Game.css';
import { generateRandomPosition } from '../utils/coordinates.js';
import { useState, useEffect, useRef, useCallback } from 'react';
import Board from './Board.js';

const eventKeyToDirection = {
    'w': 'UP',
    's': 'DOWN',
    'd': 'RIGHT',
    'a': 'LEFT'
}

function Game({
    board,
    gameStatus,
    setGameStatus,
    player: { player, setPlayer }
}) {

    const [point, setPoint] = useState(
        generateRandomPosition(board, player.coordinates ?? [], {})
    );
    const pointScored = () => {
        const newPoint = generateRandomPosition(board, player.coordinates, point);
        setPoint(newPoint);
        console.log(point);
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
    const intervalRef = useRef();
    const detectEndGame = (newHeadCoordinates, player1) => {

        const colisionWithBody = player1.coordinates.length > 1 && player1.coordinates.some(
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
    const handlePointScored = useCallback((headCoordinates) => {
        console.log('Point: ', point);
        console.log('Player: ', player.coordinates);
        if (headCoordinates.x === point.x && headCoordinates.y === point.y) {
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx');
            pointScored();
        }
    }, [player.coordinates])
    const updatePlayerCoordinates = () => {
        setPlayer((oldPlayer) => {

            const headCoordinates = {
                ...oldPlayer.coordinates[0]
            }

            if (oldPlayer.direction === 'UP') {
                headCoordinates.y -= 1;
            } else if (oldPlayer.direction === 'DOWN') {
                headCoordinates.y += 1;
            } else if (oldPlayer.direction === 'RIGHT') {
                headCoordinates.x += 1;
            } else if (oldPlayer.direction === 'LEFT') {
                headCoordinates.x -= 1;
            }
            handlePointScored(headCoordinates);
            if (detectEndGame(headCoordinates, oldPlayer)) {
                setGameStatus('ended');
                // not neccessary because above state will change and component will be unmounted
                return {
                    ...oldPlayer,
                    isAlive: false
                }
            }

            const newCoordinates = [headCoordinates, ...oldPlayer.coordinates.slice(0, -1)];
            return {
                ...oldPlayer,
                coordinates: newCoordinates
            }
        })
    };

    const updatePlayerDirection = (key) => {
        setPlayer((oldPlayer) => ({
            ...oldPlayer,
            direction: eventKeyToDirection[key]
        }))
    }


    const handleMovement = (e) => {
        updatePlayerDirection(e.key);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleMovement);
        return () => window.removeEventListener('keydown', handleMovement);
    }, []);

    useEffect(() => {

        intervalRef.current = setInterval(updatePlayerCoordinates, 1000);

        // when component is unmounted then this will be triggered and interval will be cleared
        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    }, [])


    return (
        <>
            <div className='flex justify-center font-bold'>Points: {player.points}</div>
            <Board width={board.width} height={board.height} playerCoordinates={player.coordinates} point={point} />
            <div className='justify-center font-bold' style={{ display: `${player.isAlive ? 'none' : 'flex'}` }}> GAME OVER </div>
        </>
    );
}

export default Game;