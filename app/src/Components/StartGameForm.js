import { Formik, Form, Field } from 'formik';
import Leaderboard from './Leaderboard';

const StartGameForm = ({ setPlayerData, setGameStatus, leaderboard, setBoard }) => {
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
          setBoard({ width: values.width, height: values.height })
          setGameStatus('playing')
        }}
      >
        <div className='flex justify-center w-full'>
          <div>
            <Leaderboard leaderboard={leaderboard} />
          </div>
          <Form className='flex flex-wrap' >
            <div>
              <label className='m-2 text-white bg-light-green w-form h-form block border border-black border-solid text-center font-bold' htmlFor="name">Player name</label>
              <Field className='m-2 w-form border border-solid bg-yellow font-bold text-center focus:ring-0' id="name" name="name" type="text" /> <br />
            </div>
            <div>
              <label className='m-2 text-white bg-light-green w-form h-form block border border-black border-solid text-center font-bold' htmlFor="width">Board width</label>
              <Field className='m-2 w-form border border-solid bg-yellow font-bold text-center focus:ring-0' id="width" name="width" type="text" />
              <div className='flex w-full justify-center'>
                <button className='m-2 bg-yellow w-form h-form block border border-black border-solid text-center font-bold hover:bg-dark-green hover:text-white' type='submit'>Start Game</button>
              </div>
            </div>
            <div>
              <label className='m-2 text-white bg-light-green w-form h-form block border border-black border-solid text-center font-bold' htmlFor="height">Board height</label>
              <Field className='m-2 w-form border border-green border-solid bg-yellow font-bold text-center focus:ring-0' id="height" name="height" type="text" />
            </div>

          </Form>

        </div >
      </Formik >


    </>
  )
}


export default StartGameForm;