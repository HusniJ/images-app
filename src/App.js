
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import UserSelection from './components/UserSelection';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <img src={logo} className="App-logo" alt="logo" />
        <UserSelection />
      </header>
    </div>
  );
}

export default App;
