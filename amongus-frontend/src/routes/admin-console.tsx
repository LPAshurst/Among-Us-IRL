import Navbar from "../ui/navbar";
import "../styles/admin-console.css"
import { socket } from "../socket";
import { useParams } from 'react-router-dom';
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Countdown from "react-countdown";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function AdminConsole() {

  const { room } = useParams();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [alive, setAlive] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [meeting, setMeeting] = useState(false);
  const navigate = useNavigate();

  socket.on("meetingMessage", reportedMeeting);

  function reportedMeeting() {
  
    socket.emit("requestAlive", room);
    setOpen(true);
    setMeeting(true);
  }


  function callMeeting() {

    const button = document.getElementById('meeting-button') as HTMLButtonElement;

    button.classList.add("pressed");
    var delay = 1000;
    setTimeout(() => button.classList.remove("pressed"), delay);

    socket.emit("initMeeting", room, "An emergency meeting has been called. Please make your way to the admin room", "emergency meeting");
    socket.emit("requestAlive", room);

    setMeeting(true);
    setOpen(true);

  }

  function handleRadioChange (event: React.ChangeEvent<HTMLInputElement>)  {
    setValue((event.target as HTMLInputElement).value);
  };

  function skipVote() {
    socket.emit("endMeeting", room);
    handleClose();
    setValue(''); // reset the value
    setMeeting(false);
  }

  function handleAutoClose() {
    if (meeting) { // only attempt to auto close if the meeting is still in progress
      if (value == '') {
        window.alert("no one was voted out....")
      } else {
        socket.emit("votedOut", room, value);
      }
      socket.emit("endMeeting", room);
      handleClose();
      setValue(''); // reset the value
      setMeeting(false);
    }
  }

  function handleVote (event: React.FormEvent<HTMLFormElement>)  {
    event.preventDefault();

    if (value == '') {
      window.alert("no one was voted out....")
    } else {
      socket.emit("votedOut", room, value);
    }
    socket.emit("endMeeting", room);
    handleClose();
    setValue(''); // reset the value
    setMeeting(false);
  };

  socket.on("aliveList", (alive) => {
    setAlive(alive);
  });

  socket.on("gameOver", (message) => {
    localStorage.removeItem("room");
    navigate("../../survey", {state: message});
  });

  socket.on("votingResults", (username, result) => {
    if (result) {
      window.alert(`${username} was an imposter`);
    } else {
      window.alert(`${username} was not an imposter`);
    }
  });

  return (
    <>
      <Navbar />
      
      <div className="admin-screen">

        <button className="meeting-button" id="meeting-button" onClick={callMeeting} disabled={meeting}><span>Call Meeting</span></button>
        <Modal
        open={open}
        onClose={(_event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}
        >
          <div className="voting-screen" id="voting-screen">
            <h2 style={{
              fontSize: "2rem", 
              fontWeight: "bolder", 
              color: "whitesmoke", 
              textShadow: "3px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
              marginTop: "-3rem",
              marginBottom: "1rem"
            }}>
              Who is the imposter?
            </h2>

            <form onSubmit={handleVote}>
              <FormControl sx={{minWidth: "30vw", display: "flex"}}>
                  <RadioGroup onChange={handleRadioChange} className="radio-container">
                    {alive.map((username, index) => (
                      <FormControlLabel
                        key={index}
                        value={username}
                        control={<Radio />}
                        label={username.charAt(0).toUpperCase() + username.slice(1)}
                        sx={{
                          border: "2px solid #000", 
                          margin: "4px", 
                          borderRadius: "10%",
                          padding: "15px"
                        }}
                      />
                    ))}
                    
                  </RadioGroup>
                  <Button sx=
                  {{
                    color: "black",
                    fontWeight: "bold",
                    height: "2.5rem",
                    position: "absolute",
                    bottom: "-3rem",
                    backgroundColor: "beige",
                  }}
                  variant="contained"
                  onClick={skipVote}
                  >
                    Skip Vote
                  </Button>

                  <Button sx=
                  {{ 
                    backgroundColor: "black",
                    maxWidth: "30%",
                    padding: "10px",
                    marginTop: "1rem",
                    alignSelf: "center"
                    
                  }} 
                  type='submit' 
                  variant="contained"
                  onMouseOver={() => {
                    const votingScreen = document.getElementById('voting-screen') as HTMLDivElement;
                    votingScreen.classList.toggle("change-color");
                  }}
                  onMouseOut={() => {
                    const votingScreen = document.getElementById('voting-screen') as HTMLDivElement;
                    votingScreen.classList.toggle("change-color");
                  }}
                  >
                    Lock in vote
                  </Button>

                  <Countdown
                    onComplete={handleAutoClose}
                    date={Date.now() + 300000}
                    className="countdown" 
                    renderer={
                      props => <span style=
                      {{
                        fontSize: "1rem", 
                        fontWeight: "bolder", 
                        color: "whitesmoke", 
                        textShadow: "2px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
                        position: "absolute",
                        right: "-1.5rem",
                        bottom: "-3rem" 
                      }}>
                        Voting ends in: {props.seconds + props.minutes * 60} seconds
                      </span>}
                  />
              </FormControl>

            </form>
          </div>
        </Modal>
      </div>
    </>
  )
}