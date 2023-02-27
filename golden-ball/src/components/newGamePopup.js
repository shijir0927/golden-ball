import { useState, useLocal ,useEffect } from "react";
import '../App.css';

const NewGamePopup = (props) => {

  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");



  const handleSave = (e) => {
    if (player1.trim() !== "" && player2.trim() !== "" && player3.trim() !== "") {
        setTeamMembers([{player_name: player1}, {player_name: player2}, {player_name: player3}]);
        props.handleNewGameSubmit(teamMembers);
        props.handleClose();
    } else {
        setError("Please enter 3 players");
    }
  }

  return (
    <div className="popup-container fade-in">
        <p>Please enter team members</p>
        <label>Player#1</label> <br/>
        <input placeholder="Enter name here" name="player1" onChange={(e) => setPlayer1(e.target.value)}/><br/>
        <label>Player#2</label><br/>
        <input placeholder="Enter name here" name="player2" onChange={(e) => setPlayer2(e.target.value)}/><br/>
        <label>Player#3</label><br/>
        <input placeholder="Enter name here" name="player3" onChange={(e) => setPlayer3(e.target.value)}/><br/>
        {error}
        <br/>
        <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default NewGamePopup;
