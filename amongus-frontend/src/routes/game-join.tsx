import { useNavigate } from "react-router-dom";
import Navbar from "../ui/navbar";
import { useState } from "react";
import { socket } from "../socket";
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation } from "react-router-dom";

import "../styles/game-join.css"
import "../App.css"

export default function JoinPage() {
  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const URL = import.meta.env.VITE_API_URL;

  async function joinRoom(roomcode: string) {
    
    if (inputCode.length != 4) {
      window.alert("Game codes should be 4 characters long. Please check your code again.");
      return
    }

    const response = await fetch(URL + `api/game/${roomcode}/status`, {
      method: "GET",
      mode: "cors",
    });

    if (response.ok) {
      const data = await response.json();

      if (data === true) {
        socket.emit("join", roomcode);
        navigate("/waiting-room", {state: roomcode});
      } else {
        window.alert("That room doesnt exist");
      }

    } else {
      window.alert("Please put in a room code :3");
    }
    
  }

  function navToCreation() {
    navigate("/create-game");
    return;
  }

  return (
    <>
      <Navbar />
      <div className='game-create-join-screen'>

        <p className="game-create-join-text">
          If you intend to create a game and not play on this device
        </p>
        <p className="game-create-join-text">
          you may press this button
        </p>


        <button className='game-create-join-button' onClick={navToCreation}>
          <span className='game-create-join-text'> Create Game </span>
        </button>

        <p className="game-create-join-text">
          If someone has already created a game you may join here
        </p>
        <input className='bg-blue-900 w-56 self-center font-lusitana text-neutral-200 rounded-md p-1 border-neutral-400 border-2 mt-3' placeholder="Enter room ID here" type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}>
        </input>
        <button className='game-create-join-button' onClick={()=>{joinRoom(inputCode)}} aria-label="join">Join Game</button>
        {
        location.state !== null && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{position: "fixed", bottom: "0px", left: "0px", margin: "5px"}}>
          You are logged in as: {location.state}
        </Alert> 
        }

      </div >
    </>
  )

}