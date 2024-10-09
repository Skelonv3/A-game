import { Formik, Form, Field } from 'formik';
import Leaderboard from './Leaderboard';

const StartGameForm = ({ setPlayerData: setPlayerData, setGameStatus, leaderboard }) => (
  <>
    <Formik

      initialValues={{
        name: ''
      }}

      onSubmit={values => {
        console.log(values);
        setPlayerData((oldPlayerData) => ({
          ...oldPlayerData,
          name: values.name
        }))
        setGameStatus('playing')
      }}
    >

      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" type="text" />
        <button type='submit'>Start Game</button>
      </Form>
    </Formik >
    <Leaderboard leaderboard={leaderboard} />
  </>
)

export default StartGameForm;
