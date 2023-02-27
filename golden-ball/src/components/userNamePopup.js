import { useState, useLocal ,useEffect } from "react";
import '../App.css';

const UserNamePopup = (props) => {

  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");


  const saveUserName = () => {
    if (userName !== null && userName.trim() !== "") {
        localStorage.setItem("name", userName);
        props.handleUserNameSubmit(userName);
        props.handleClose();
    } else {
        setError("Please enter a valid name")
    }
  }

  const handleNameChange = (e) => {
    const name = e.target.value;
    setUserName(name)
  }

  return (
    <div className="user-name-popup-container popup-container fade-in">
        <label>Please enter your name</label>
        <input placeholder="Enter name here" name="name" onChange={handleNameChange}/>
        {error}
        <button onClick={saveUserName}>Save</button>
    </div>
  );
}

export default UserNamePopup;
