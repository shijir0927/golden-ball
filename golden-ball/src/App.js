import { useState, useLocal ,useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import UserNamePopup from "./components/userNamePopup";
import NewGamePopup from "./components/newGamePopup";
import GameTable from "./components/gameTable";

import logo from './assets/bowlingball.svg';
import './App.css';
import DATA from "./mockData";

const firebaseConfig = {
  apiKey: "AIzaSyCPUq5dHg0O0Va5S5giKy8-7hVVR55DQSs",
  authDomain: "golden-ball-a97ba.firebaseapp.com",
  projectId: "golden-ball-a97ba",
  storageBucket: "golden-ball-a97ba.appspot.com",
  messagingSenderId: "607648278323",
  appId: "1:607648278323:web:559cfafc1629a9f61a0046",
  measurementId: "G-PQ197YS06H"
};


const App = () => {
  const [userName, setUserName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [showUserNamePopup, setShowUserNamePopup] = useState(false);
  const [showNewGamePopup, setShowNewGamePopup] = useState(false);
  const [games, setGames] = useState([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function fetchGames() {
    const gamesCol = collection(db, 'games');
    const gameSnapshot = await getDocs(gamesCol);
    const gameList = gameSnapshot.docs.map(doc => doc.data());
    setGames(arr => [...arr, gameList]);
    return gameList;
  }

  useEffect(() => {
    fetchGames();
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    } else if(name == null) {
      setShowUserNamePopup(true);
    }
  },[]);

  const handleAddGame = (e) => {
    setShowNewGamePopup(true);
  }

  const handleUserNameSubmit = (value) => {
    setUserName(value);
  }

  const handleNewGameSubmit = (value) => {
    console.log("here");
    setTeamMembers(value);
  }

  return (
    <div className="">
      <header className="app-header">
        <div className="header-left">
          <div className="header-logo-container">
            <img src={logo} className="app-logo" alt="logo" />
            <p>Golden Ball</p>
          </div>
          <a>History</a>
        </div>
        <button onClick={handleAddGame}>Add Game</button>
      </header>

      <div>Hello {userName}!</div>

      <div>{teamMembers.map(member => member.player_name)}</div>

      <div>
        {games && games.map(game => <GameTable data={game}/>)}
      </div>

      {showUserNamePopup && <UserNamePopup handleClose={() => setShowUserNamePopup(false)} handleUserNameSubmit={() => handleUserNameSubmit}/>}
      {showNewGamePopup && <NewGamePopup handleClose={() => setShowNewGamePopup(false)} handleNewGameSubmit={handleNewGameSubmit}/>}
    </div>
  );
}

export default App;
