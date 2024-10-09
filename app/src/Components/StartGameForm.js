import { Formik, Form, Field } from 'formik';
import Leaderboard from './Leaderboard';

const StartGameForm = ({ setPlayerData, setGameStatus, leaderboard, setBoard}) => {
  return (
    <>
      <Formik

        initialValues={{
          name: ''
        }}

        onSubmit={values => {
          setPlayerData((oldPlayerData) => ({
            ...oldPlayerData,
            name: values.name
          }))
          setBoard({width: values.width, height: values.height})
          setGameStatus('playing')
        }}
      >

        <Form>
          <label htmlFor="name">Name</label>
          <Field className='m-2 border border-black border-solid' id="name" name="name" type="text" /> <br />
          <label htmlFor="width">Width</label>
          <Field className='m-2 border border-black border-solid' id="width" name="width" type="number" />
          <label htmlFor="height">Height</label>
          <Field className='m-2 border border-black border-solid' id="height" name="height" type="number" />
          <button type='submit'>Start Game</button>
          
        </Form>
      </Formik >
      <Leaderboard leaderboard={leaderboard} />
    </>
  )
}


export default StartGameForm;