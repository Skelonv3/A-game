import './App.css';
import Game from './Components/Game.js'
import { generateRandomPosition } from './utils/coordinates.js'



const board = {
  width: 10,
  height: 10
}




function App() {
  return (
    <Game board={board} playerCoordinates={null}/>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}
export default App;
