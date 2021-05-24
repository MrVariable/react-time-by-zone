import './App.css';
import { LOCALITY } from './App.enum';
import TimeByPlace from './components/TimeByPlace';

function App() {
  return (
    <div className="App">
      <TimeByPlace items={Object.values(LOCALITY)} />
    </div>
  );
}

export default App;
