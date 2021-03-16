import './App.css';
import CalendarDate from './components/CalendarDate';

function App() {
  const now = new Date(2017, 2, 8);

  return (
    <CalendarDate date={now} />
  );
}

export default App;
