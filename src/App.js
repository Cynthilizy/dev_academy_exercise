import './App.css';
import Table from './table';
import { FaHome } from 'react-icons/fa';

function App() {
  return (
    <div>
      <div><a href="/"><FaHome className='home' style={{color:'green'}}/></a></div>
     <div className='App-header'><h1>Helsinki City BikeTrip Information</h1><p>Dev Academy pre-assignment</p></div>
     <Table/>
    </div>
  );
}

export default App;
