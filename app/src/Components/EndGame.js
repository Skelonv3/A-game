import { memo } from "react";
import { useEffect } from "react"

import { generateRandomPosition } from "../utils/coordinates"
import Leaderboard from "./Leaderboard"

const EndGame = memo(({ setGameStatus, gameStatus, setPlayerData, playerData, board, leaderboard, updateLeaderboard }) => {
    const handleRestart = () => {
        setGameStatus('initial')
        setPlayerData({
            name: '',
            points: 0,
            isAlive: true,
            direction: 'RIGHT',
            coordinates: [
                generateRandomPosition(board, [], {})
            ],
        })
    }
    useEffect(() => {
       updateLeaderboard(playerData)
    }, [gameStatus])
    return (
        <>
            <h1>Game Over</h1>
            <p>{playerData.name} score: {playerData.points}</p>
            <Leaderboard leaderboard={leaderboard} />
            <button onClick={handleRestart}>Restart</button>
        </>
    )
});

export default EndGame;