import { Box, Stack, Typography, Button, Table, TableContainer, Paper, TableBody, TableRow, TableCell, List, ListItemText, TableHead, IconButton, Fab } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import Navbar from "../ui/navbar";
import { socket } from "../socket";
import { Task } from "../types/GameTypes";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

export default function CreationPage() {

  const [tasklist, setTasklist] = useState<Task[]>([]);
  const [players, setPlayers] = useState<Set<string>>(new Set()); 
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState<string>(""); 

  useEffect(() => {
    fetch("http://localhost:3010/api/tasks/list", {
      method: "GET",
      mode: "cors"
    }).then(response => response.json()).then(value => {
      setTasklist(value.result.entries);
    }).catch(err => {
      console.error(err);
    });

    const roomVal = localStorage.getItem("room");
    const userName = localStorage.getItem("logged_in");
    if (!roomVal) {
      const newRoom = getRandomRoom();
      setGameCode(newRoom);
      localStorage.setItem("room", newRoom);
      socket.emit("join", newRoom, userName);
    } else {
      setGameCode(roomVal);
      socket.emit("join", roomVal, userName);
    }
  }, [])

  // socket.on("clientList", (clientUsername: string) => {
  socket.on("clientList", (clientList: string[]) => {
    console.log(clientList);
    setPlayers(new Set(clientList));
    // setPlayers((players) => new Set(players).add(clientUsername));
    console.log(players);
  });

  function removeTask(taskId: string) {
    document.getElementById(taskId)?.remove();
    
    const newTasks = tasklist?.filter((task) => {
      console.log(task.title);
      console.log(taskId);
      return task.title !== taskId
    });
    console.log(newTasks);
    setTasklist(newTasks);
  }

  function addRow() {
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: "New Title",
      location: "New Location",
      description: "New Description",
      status: false,
      difficulty: "New Difficulty"
    }
    setTasklist((prevTasklist) => (prevTasklist ? [...prevTasklist, newTask] : [newTask]));
  }


  function initializeStart() {

    for (const task of tasklist) {
      
      if (!(task.difficulty.toLowerCase() == "hard" || task.difficulty.toLowerCase() == "medium" || task.difficulty.toLowerCase() == "easy")) {
        window.alert(`The difficulty of ${task.title} needs to either be "Hard", "Medium", or "Easy".\nCurrently it is ${task.difficulty}`);
      }
    }

    socket.emit("startGame", tasklist);
    navigate("../copy")

  }

  
  function getRandomRoom() {
    let randomRoom = "";
    const min = 0;
    const max = 9;
    for (let index = 0; index < 4; index++) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      randomRoom += rand.toString();
    }
    return randomRoom;
  }

  function TaskContainer() {
    return (

      <TableContainer component={Paper}>
        <Table sx={{ padding: 2, minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell variant="head">Name</TableCell>
              <TableCell variant="head">Description</TableCell>
              <TableCell variant="head">Location</TableCell>
              <TableCell variant="head">Difficulty</TableCell>
              <TableCell variant="head"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody id={"table-body"}>
            {tasklist?.map((task) => (
              <TableRow key={task.id} id={task.title} contentEditable suppressContentEditableWarning={true}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.location}</TableCell>
                <TableCell>{task.difficulty}</TableCell>
                <TableCell>
                  <IconButton variant="remove" aria-label="delete" size="small" onClick={() => {removeTask(task.title)}}>
                    <ClearIcon sx={{minWidth: 20, width: 20, minHeight: 20, height: 20}} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    );
  }


  return (
    <Box>
      <Navbar />

      <div className='flex w-full h-full flex-col items-center'>

        <p className="font-lusitana font-bold text-neutral-200 text-[15px] md:text-[20px] mt-2">
          Game Code: {gameCode}
        </p>
        <Stack spacing={10} direction="row">
          <Box alignItems="center" display="flex" flexDirection="column" gap={2}>
            <Stack spacing={20} direction={"row"}>
              <TaskContainer />
            </Stack>
            <Box justifyContent="space-around" alignItems="center" display="flex" gap={2} width={"100%"}>
              <Button variant="outlined" color='secondary' sx={{ marginLeft: "auto", marginRight: "auto" }} onClick={initializeStart}>Start</Button>
              <Fab size="small" color="secondary" aria-label="add" sx={{alignSelf:"flex-end"}} onClick={addRow}>
                <AddIcon />
              </Fab>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box alignItems={"center"} display="flex" flexDirection="column">
              <Typography color="white">Players</Typography>
              <Typography color="white">({players.size}/10)</Typography>
            </Box>
            <List sx={{ border: '1px solid white', width: '25vh', padding: 2 }} component={Paper} elevation={0}>
              {Array.from(players).map((player) => (
                <Paper elevation={1}><ListItemText><Typography fontFamily={"Comfortaa"}>{player}</Typography></ListItemText></Paper>
              ))}
            </List>
            <Button variant="outlined" color='secondary'>Game Settings</Button>
          </Box>
        </Stack>
      </div >
    </Box>
  )

}