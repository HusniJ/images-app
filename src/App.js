
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import UserSelection from './components/UserSelection';
import SelectImages from './components/SelectImages';
import ShowImages from './components/ShowImages';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [userImages, setUserImages] = useState([]);

  const clearImages = () => {
    setUserImages([]);
  }

  const clearUserId = () => {
    setUserImages([]);
    setUserId(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Image Book</h1>
        <UserSelection setUserId={setUserId} userId={userId} />
        <SelectImages userId={userId} setUserImages={setUserImages} userImages={userImages} clearUserId={clearUserId} />
        <ShowImages userId={userId} userImages={userImages} clearImages={clearImages} clearUserId={clearUserId} />
      </header>
    </div>
  );
}

export default App;
