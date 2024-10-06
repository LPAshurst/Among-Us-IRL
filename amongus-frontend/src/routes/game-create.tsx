import { Box, Stack, Typography, Button, Table, TableContainer, Paper, TableBody, TableRow, TableCell, List, ListItemText, TableHead, IconButton, Fab } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import Navbar from "../ui/navbar";
import { socket } from "../socket";
import { Task } from "../types/GameTypes";
import AddIcon from '@mui/icons-material/Add';

export default function CreationPage() {

  const [tasklist, setTasklist] = useState<Task[]>();
  const [players, setPlayers] = useState([]); //Remove default names later

  useEffect(() => {
    fetch("http://localhost:3010/api/tasks/list", {
      method: "GET",
      mode: "cors"
    }).then(response => response.json()).then(value => {
      setTasklist(value.result.entries);
      console.log(value.result);
    }).catch(err => {
      console.error(err);
    });
    
    socket.emit("join", "room");
  
  }, [])

  socket.on("clientList", (clientList) => {

    setPlayers(clientList);

  });

  function removeTask() {

    console.log("XD")


  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
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
              <TableCell variant="head"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasklist?.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.location}</TableCell>
                <TableCell>
                  <IconButton variant="remove" aria-label="delete" size="small" onClick={removeTask}>
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

  const gameCode = getRandomInt(50000);
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
              <Button variant="outlined" color='secondary' sx={{ marginLeft: "auto", marginRight: "auto" }}>Start</Button>
              <Fab size="small" color="secondary" aria-label="add" sx={{alignSelf:"flex-end"}}>
                <AddIcon />
              </Fab>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box alignItems={"center"} display="flex" flexDirection="column">
              <Typography color="white">Players</Typography>
              <Typography color="white">({players.length}/10)</Typography>
            </Box>
            <List sx={{ border: '1px solid white', width: '25vh', padding: 2 }} component={Paper} elevation={0}>
              {players.map((player) => (
                <Paper key={player} elevation={1}><ListItemText><Typography fontFamily={"Comfortaa"}>{player}</Typography></ListItemText></Paper>
              ))}
            </List>
            <Button variant="outlined" color='secondary'>Game Settings</Button>
          </Box>
        </Stack>
      </div >
    </Box>
  )

}