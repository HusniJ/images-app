
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

  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <img src={logo} className="App-logo" alt="logo" />
        <UserSelection setUserId={setUserId} userId={userId} />
        <SelectImages userId={userId} setUserImages={setUserImages} userImages={userImages}/>
        <ShowImages userId={userId} userImages={userImages} />
      </header>
    </div>
  );
}

export default App;
