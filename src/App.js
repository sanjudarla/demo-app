
import './App.css';
import CRUD from './CRUD';
import Doctor from './Doctor';

function App() {
  return (
    <div className="App">
      <div className='primary'> <h1>  Doctor  Details Management  </h1> </div>


      {/* <Doctor /> */}
      <CRUD/>
    </div>
  );
}

export default App;
