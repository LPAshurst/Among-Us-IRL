import { useNavigate } from "react-router-dom";
import Navbar from "../ui/navbar";
import { useEffect, useState } from "react";
import { socket } from "../socket";

import { Button } from '@mui/material';


export default function JoinPage() {
  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
    };
  }, []);

  function joinRoom(roomcode: string) {
    socket.emit("join", roomcode, localStorage.getItem("logged_in"));
  }

  function navToCreation() {
    navigate("/create-game");
    return;
  }

  return (
    <>
      <Navbar />

      <div className='flex w-full h-full flex-col items-center'>

        <p className="font-lusitana font-bold text-neutral-200 text-[15px] md:text-[20px] mt-2">
          If you intent to create a game and not play on this device
        </p>
        <p className="font-lusitana font-bold text-neutral-200 text-[15px] md:text-[20px]">
          you may press this button
        </p>


        <button className='bg-blue-900 md:w-40 w-32 self-center mt-3' onClick={navToCreation}>
          <span className='text-[15px] md:text-[20px] font-lusitana text-neutral-200'> Create Game </span>
        </button>

        <p className="font-lusitana font-bold text-neutral-200 text-[15px] md:text-[20px] mt-10">
          If someone has already created a game you may join here
        </p>
        <input className='bg-blue-900 w-56 self-center font-lusitana text-neutral-200 rounded-md p-1 border-neutral-400 border-2 mt-3' placeholder="Enter room ID here" type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}>
        </input>
        <Button onClick={()=>{joinRoom(inputCode)}} variant="contained" aria-label="join">Join Game</Button>

      </div >
    </>
  )

}