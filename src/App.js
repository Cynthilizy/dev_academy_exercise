import './App.css';
import Table from './table';
import { FaHome } from 'react-icons/fa';

function App() {
  return (
    <div>
      <div><a href="/"><FaHome className='home' style={{color:'deeppink'}}/></a></div>
     <div className='App-header'><h1>Helsinki City Bike App</h1><p>Dev Academy pre-assignment</p></div>
     <Table/>
    </div>
  );
}

export default App;
