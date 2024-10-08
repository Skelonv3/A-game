import { Formik, Form, Field } from 'formik';
import './App.css';
import Game from './Components/Game.js'
import { useEffect, useState } from 'react';

const board = {
  width: 10,
  height: 10
}

function App() {
  const [gameActive, setGameActive] = useState(false)
  const [playerData, setplayerData] = useState({
    name: '',
    score: 0
  })
  // const playerDataToStore = JSON.stringify(playerData)
  // localStorage.setItem('player', playerDataToStore);
  const handleStartGame = (e) => {
    e.preventDefault()
    setGameActive(true)
  }
  useEffect(() => {
    window.addEventListener('keydown', handleStartGame);
    return () => window.removeEventListener('keydown', handleStartGame);
  }, [])
  const HighscoreForm = () => (
    <Formik
      initialValues={{
        name: ''
      }}
      onSubmit={
        values => {
          setplayerData((oldPlayerData) => ({
            ...oldPlayerData,
            name: values.name
          }))
        }}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field id='name' name='name' />
        <button type='submit'>Submit</button>
      </Form>
    </Formik >
  );
  return (
      <HighscoreForm />
  )
  // return (
  //   <>
  //     {!gameActive && <div className='flex justify-center'>Naciśnij dowolny klawisz</div>}
  //     <Game board={board} playerCoordinates={null} gameActive={gameActive} />
  //   </>
  // );
}

export default App;
