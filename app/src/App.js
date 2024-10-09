import { useEffect, useState } from 'react';

import Game from './Components/Game.js'
import StartGameForm from './Components/Form.js';

import './App.css';
import { generateRandomPosition } from './utils/coordinates.js';
import Leaderboard from './Components/Leaderboard.js';


// TODO :: user must define in StartGame form size of board - can be predefined
// ex. 10x10, 20x20, 30x30, 40x60, ....
const board = {
  width: 10,
  height: 10
}

function App() {

  // const [game, setGame] = useState({
  //   board: {
  //     width: 10,
  //     height: 10
  //   },
  //   status: 'initial'
  // })

  const [gameStatus, setGameStatus] = useState('initial') // initial, playing, ended

  const [playerData, setPlayerData] = useState({
    name: '',
    points: 0,
    isAlive: true,
    direction: 'RIGHT',
    coordinates: [
      generateRandomPosition(board, [], {})
    ],
  })

  const [leaderboard, setLeaderboard] = useState(() => {
    const leaderboard = localStorage.getItem('leaderboard')
    return leaderboard ? JSON.parse(leaderboard) : []
  })

  // TODO :: move to component EndGame
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

  // TODO :: move to component EndGame
  useEffect(() => {
    if (gameStatus === 'ended') {
      // TODO :: update the leaderboard - update player score if it's higher, ex. 
      // player 'A' has 10 points in leaderboard, he plays again and gets 15 points,
      // his score in leaderboard should be updated to 15, if he gets less points we don't update his score
      // in leaderboard
      // save the score to the leaderboard
      const newLeaderboard = [...leaderboard, { name: playerData.name, points: playerData.points }]

      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard))
      setLeaderboard(newLeaderboard)
    }
  }, [gameStatus])

  return (
    <>
      {gameStatus === 'initial' && <StartGameForm setPlayerData={setPlayerData} setGameStatus={setGameStatus} leaderboard={leaderboard} />}
      {gameStatus === 'playing' && <Game board={board} player={{ player: playerData, setPlayer: setPlayerData }} gameStatus={gameStatus} setGameStatus={setGameStatus} />}
      {
        // THIS should be EndGame component 
        gameStatus === 'ended' && <>
          <h1>Game Over</h1>
          <p>{playerData.name} score: {playerData.points}</p>
          <Leaderboard leaderboard={leaderboard} />
          <button onClick={handleRestart}>Restart</button>
        </>
      }
    </>
  )
}

export default App;
