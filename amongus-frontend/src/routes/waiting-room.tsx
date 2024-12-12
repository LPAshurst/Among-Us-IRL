import Navbar from "../ui/navbar";
import { socket } from "../socket";
import { useNavigate, useLocation } from "react-router-dom";


export default function WaitingRoom() {
  const navigate = useNavigate();
  const location = useLocation();

  socket.on("gameStarted", () => navigate(`../game/${location.state}`))
  
  function leaveGame() {
    socket.emit("leave", location.state); // location.state should hold the room the user is in. Gonna want to change this to url param
    navigate("../join-create");
  }

  return (
    <>
      <Navbar />
      <h1 style={{color: 'white'}}>WELCOME TO THE WAITING ROOM XD</h1>
      <iframe width="420" height="315" src="https://www.youtube.com/embed/NZ9uVJWAomc?autoplay=1&mute=1" style={{alignSelf: "center"}}>
      </iframe>
      <h1 style={{color: 'white'}}>Here are some <a href="https://www.ign.com/wikis/among-us/Rules_and_Settings:_How_to_Create_the_Best_Among_Us_Game">rules</a> for among us</h1>
      <button onClick={leaveGame}>Leave Game</button>
    </>
  );
}