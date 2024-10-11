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
        <div className="flex justify-center">
            <h1 className="m-2 bg-yellow w-form h-form block border border-black border-solid text-center font-bold">Game Over</h1>
            <p className="m-2 bg-yellow w-form h-form block border border-black border-solid text-center font-bold">{playerData.name} score: {playerData.points}</p>
            <Leaderboard leaderboard={leaderboard} />
            <button className='m-2 bg-yellow w-form h-form block border border-black border-solid text-center font-bold hover:bg-dark-green hover:text-white' onClick={handleRestart}>Restart</button>
        </div>
    )
});

export default EndGame;