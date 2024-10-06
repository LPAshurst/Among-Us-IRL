import { Box, Stack, Typography, Button, Table, TableContainer, Paper, TableBody, TableRow, TableCell, List, ListItemText, TableHead, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import Navbar from "../ui/navbar";
import { socket } from "../socket";


export default function CreationPage() {

  const [tasklist, setTasklist] = useState();
  const [players, setPlayers] = useState([]); //Remove default names later


  useEffect(() => {
    fetch("http://localhost:3010/api/tasks/list", {
      method: "GET",
      mode: "cors"
    }).then(response => response.json()).then(value => {
      setTasklist(value.result);
      console.log(value.result)
    }).catch(err => {
      console.error(err);
    });

    socket.emit("join", "room");

    
  }, [])

  socket.on("clientList", (clientList) => {

    setPlayers(clientList);

  });


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
            {tasklist?.entries.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.location}</TableCell>
                <TableCell><IconButton aria-label="delete" variant="remove" size="small"><ClearIcon sx={{minWidth: 20, width: 20, minHeight: 20, height: 20,}} /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
    return (
      <Stack spacing={1.5}>
        <Stack direction="row" sx={{ alignItems: 'center' }} display="flex" gap={2}>
          <Typography color="white">Tasks</Typography>
          <Box justifySelf="end" display="flex" gap={2}>
            <Button variant="outlined" color='secondary'>Load</Button>
            <Button variant="outlined" color='secondary'>Saves</Button>
          </Box>
        </Stack>
        <Stack sx={{ p: 2, border: '1px solid white' }} spacing={0}>
          <Stack sx={{ border: '1px solid white', color: 'white' }} direction="row">
            <Box sx={{ border: '1px solid white', padding: 2, width: '15vw' }}>Name</Box>
            <Box sx={{ border: '1px solid white', padding: 2, width: '15vw' }}>Location</Box>
            <Box sx={{ border: '1px solid white', padding: 2, width: '15vw' }}>Difficulty</Box>
          </Stack>
          {tasklist?.entries.map(item => (
            <Task name={item.name} location={item.location} difficulty={item.difficulty}></Task>
          ))}
        </Stack>
      </Stack>
    );
  }

  function Task(props: any) {
    return (<Stack sx={{ border: '1px solid white', color: 'white' }} direction="row">
      <Box sx={{ border: '1px solid white', padding: 2, width: '15vw' }}>{props.name}</Box>
      <Box sx={{ border: '1px solid white', padding: 2, width: '15vw' }}>{props.location}</Box>
      <Box sx={{ border: '1px solid white', padding: 2, width: '15vw' }}>{props.difficulty}</Box>
    </Stack>);
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
            <Button variant="outlined" color='secondary'>Start</Button>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box alignItems={"center"} display="flex" flexDirection="column">
              <Typography color="white">Players</Typography>
              <Typography color="white">({players.length}/10)</Typography>
            </Box>
            {/* <Box sx={{ border: '1px solid white', height: '40vh', width: '25vh', padding: 2 }}>
              <Typography color="white">Jackson</Typography>
              <Typography color="white">Lorenzo</Typography>
              <Typography color="white">Zane</Typography>
            </Box> */}
            {/* <TableContainer component={Paper}>
              <Table sx={{ border: '1px solid white', width: '25vh', padding: 2 }}>
                <TableBody>
                  {players.map((player) => (
                    <TableRow key={player}><TableCell>{player}</TableCell></TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </TableContainer> */}
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