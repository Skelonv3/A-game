import { useEffect, useState, useCallback } from 'react';

import Game from './Components/Game.js'
import StartGameForm from './Components/StartGameForm.js';
import EndGame from './Components/EndGame.js';

import './App.css';
import { generateRandomPosition } from './utils/coordinates.js';

function App() {

  const [board, setBoard] = useState({
    width: 0,
    height: 0
  })

  const [gameStatus, setGameStatus] = useState('initial') 

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
  const updateLeaderboard = useCallback((playerData) => {
    let newLeaderboard = [];
    const indexOfCurrentName = leaderboard.findIndex(player => player.name === playerData.name);
    if (leaderboard.some(player => player.name === playerData.name)) {
      if (leaderboard[indexOfCurrentName].points <= playerData.points) {
        leaderboard[indexOfCurrentName].points = playerData.points;

      }
      newLeaderboard = [...leaderboard];
    } else {
      newLeaderboard = [...leaderboard, { name: playerData.name, points: playerData.points }]
    }

    localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard))
    setLeaderboard(newLeaderboard);
  }, [leaderboard])

  return (
    <>
      {gameStatus === 'initial' && <StartGameForm setPlayerData={setPlayerData} setGameStatus={setGameStatus} leaderboard={leaderboard} setBoard={setBoard} />}
      {gameStatus === 'playing' && <Game board={board} player={{ player: playerData, setPlayer: setPlayerData }} gameStatus={gameStatus} setGameStatus={setGameStatus} />}
      {gameStatus === 'ended' && <EndGame setGameStatus={setGameStatus} gameStatus={gameStatus} setPlayerData={setPlayerData} playerData={playerData} board={board} leaderboard={leaderboard} updateLeaderboard={updateLeaderboard} />}
    </>
  )
}

export default App;