import './Game.css';
import { generateRandomPosition } from '../utils/coordinates.js';
import { useState, useEffect, useRef } from 'react';
import Board from './Board.js';

const eventKeyToDirection = {
    'w': 'UP',
    's': 'DOWN',
    'd': 'RIGHT',
    'a': 'LEFT'
}

function Game({ board, playerCoordinates, gameActive }) {

    const [player, setPlayer] = useState({
        coordinates: playerCoordinates
            ? playerCoordinates
            : [
                generateRandomPosition(board, [], {})
            ],
        points: 0,
        isAlive: true,
        direction: 'RIGHT'
    });

    const [point, setPoint] = useState({
        ...generateRandomPosition(board, player.coordinates ?? [], {})
    });

    const intervalRef = useRef();
    const detectEndGame = (newHeadCoordinates, player1) => {
        console.log(player1.coordinates);
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
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                headCoordinates.x -= 1;
            }
            
            if (detectEndGame(headCoordinates, oldPlayer)) {
                clearInterval(intervalRef.current)
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
        // const newHeadCoordinates = { ...player1.coordinates[0] };
        // console.log(newHeadCoordinates);
        // console.log(player1.direction);
        // if (player1.direction === 'UP') {
        //     newHeadCoordinates.y -= 1;
        // } else if (player1.direction === 'DOWN') {
        //     newHeadCoordinates.y += 1;
        // } else if (player1.direction === 'RIGHT') {
        //     newHeadCoordinates.x += 1;
        // } else if (player1.direction === 'LEFT') {
        //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        //     newHeadCoordinates.x -= 1;
        // }

        // if (detectEndGame(newHeadCoordinates)) {
        //     setPlayer((oldPlayer) => ({
        //         ...oldPlayer,
        //         isAlive: false
        //     }));
        // }
        // const newCoordinates = [newHeadCoordinates, ...player1.coordinates.slice(0, -1)];

        // setPlayer((oldPlayer) => ({
        //     ...oldPlayer,
        //     coordinates: newCoordinates
        // }))
    };

    const updatePlayerDirection = (key) => {
        setPlayer((oldPlayer) => ({
            ...oldPlayer,
            direction: eventKeyToDirection[key]
        }))
    }
    const handleMovement = (e) => {
        console.log(player.isAlive);
        updatePlayerDirection(e.key);
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
    useEffect(() => {
        console.log(gameActive);
        if (!gameActive) {
            clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(updatePlayerCoordinates, 1000);
        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
    }, [gameActive])
    return (
        <>
            <div className='flex justify-center font-bold'>Points: {player.points}</div>
            <Board width={board.width} height={board.height} playerCoordinates={player.coordinates} point={point} />
            <div className='justify-center font-bold' style={{ display: `${player.isAlive ? 'none' : 'flex'}` }}> GAME OVER </div>
        </>
    );
}

export default Game;