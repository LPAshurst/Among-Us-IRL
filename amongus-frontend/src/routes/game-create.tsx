import { Box, Stack, Typography, Button, Table, TableContainer, Paper, TableBody, TableRow, TableCell, List, ListItemText, TableHead, Fab, MenuItem} from "@mui/material";
import IconButton from "@mui/material/IconButton"
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from "@mui/material/Select";
import Navbar from "../ui/navbar";
import { socket } from "../socket";
import { Task } from "../types/GameTypes";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import "../styles/game-create.css"

import { Settings } from "../types/GameTypes"

declare module '@mui/material' {
  interface ButtonPropsVariantOverrides {
    remove: true;
  }
  interface ButtonBaseOwnProps {
    variant?: string | undefined;
  }
}

const URL = import.meta.env.VITE_API_URL;

export default function CreationPage() {

  const [tasklist, setTasklist] = useState<Task[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [gameCode, setGameCode] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [numImposters, setImposters] = useState(2);
  const [numHard, setNumHard] = useState(2);
  const [numMedium, setNumMedium] = useState(3);
  const [numEasy, setNumEasy] = useState(4);

  const navigate = useNavigate();

  useEffect(() => {
    const localcode = localStorage.getItem("room");

    async function setup() {
      let valid = true;

      // Check if a code is in local storage
      if (!localcode) {
        valid = false;
      } else {
        // Check validity of the code
        const response = await fetch(URL + `api/game/${localcode}/status`, {
          method: "GET",
          mode: "cors"
        });
        const data = await response.json();
        console.log(data);
        // If invalid, remove from local storage
        if (!data) {
          localStorage.removeItem("room");
          valid = false;
        }
      }

      let data;
      if (valid) {
        // Get existing game info
        console.log("Fetching room data");
        const response = await fetch(URL + `api/game/${localcode}/info`, {
          method: "GET",
          mode: "cors"
        });
        data = await response.json();
        // TODO handle if started already
      } else {
        // Create a new game
        console.log("Creating new room");
        const response = await fetch(URL + `api/game/create`, {
          method: "GET",
          mode: "cors",
          headers: {
            authorization: `bearer ${localStorage.getItem("logged_in")}`,
          }
        });
        data = await response.json();
        localStorage.setItem("room", data.room)
      }

      if (data.started) {
        navigate(`../admin-console/${data.room}`);
      }
      setGameCode(data.room);
      setTasklist(data.tasklist);
      setPlayers(data.players.map((val: { username: string }) => val.username));

      socket.on("clientList", (clientList: string[]) => {
        setPlayers(clientList);
      });
      socket.emit("join", data.room);
    }
    setup();
  }, [])
  
  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
  function saveSettings() {
    handleClose();
    const numImposters = document.getElementById('numImposters') as HTMLInputElement;
    const numHard = document.getElementById('numHard') as HTMLInputElement;
    const numMedium = document.getElementById('numMedium') as HTMLInputElement;
    const numEasy = document.getElementById('numEasy') as HTMLInputElement;

    setImposters(Number(numImposters.value));
    setNumHard(Number(numHard.value));
    setNumMedium(Number(numMedium.value));
    setNumEasy(Number(numEasy.value));

    console.log(tasklist);
    //FIXME validate input

  }

  function removeTask(index: number) {
    const temp = [...tasklist];
    temp.splice(index, 1);
    setTasklist(temp);
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
    console.log(newTask)
    setTasklist((prevTasklist) => (prevTasklist ? [...prevTasklist, newTask] : [newTask]));
  }

  function exportList() {
    
    let uridata = encodeURIComponent(JSON.stringify(tasklist));
    uridata = 'data:application/json;charset=utf-8,' + uridata;
    const link = document.createElement("a");
    link.setAttribute("href", uridata);
    link.setAttribute("download", "tasklist.json");
    link.click();

  }
  function importList() {
    
    const fileelem = document.createElement("input");
    fileelem.setAttribute("display", "none");
    fileelem.setAttribute("id", "file");
    fileelem.setAttribute("type", "file");
    fileelem.addEventListener("change", (_ev) => {
      console.log(fileelem.files)
      let file = fileelem.files;
      if (!file) {
        window.alert("No file");
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", (ev) => {
        console.log(ev);
        try {
          if (!ev.target) {
            return;
          }
          let res = ev.target.result;
          console.log(ev.target.result);
          let decoded = decodeURIComponent(res as string);
          let parsed = JSON.parse(decoded);
          setTasklist(parsed);
        } catch (err) {
          console.error(err);
        }
      });

      reader.readAsText(file[0]);
    })
    fileelem.click();
    
  }

  function initializeStart() {

    const settings: Settings = {
      numImposters: numImposters,
      numHard: numHard,
      numMedium: numMedium,
      numEasy: numEasy
    }
    socket.emit("startGame", gameCode, tasklist, settings, (status: boolean, msg: string) => {
      if (status) {
        console.log("Game creation successful");
        navigate(`../admin-console/${gameCode}`);
      } else {
        console.log("Game creation failed");
        window.alert(msg);
      }
    });

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
            {tasklist?.map((task, index) => (
              <TableRow key={task.id} id={task.id} sx={{ verticalAlign: 'top' }}>
                <TableCell><TextField defaultValue={task.title} onChange={(ev) => tasklist[index].title = ev.target.value} autoComplete="off" fullWidth variant="filled"/></TableCell>
                <TableCell><TextField defaultValue={task.description} onChange={(ev) => tasklist[index].description = ev.target.value} autoComplete="off" fullWidth variant="filled" multiline rows={3}/></TableCell>
                <TableCell><TextField defaultValue={task.location} onChange={(ev) => tasklist[index].location = ev.target.value} autoComplete="off" fullWidth variant="filled"/></TableCell>
                <TableCell align="center">
                  <FormControl variant="filled">
                    <Select label="Difficulty" defaultValue={task.difficulty} onChange={(ev) => tasklist[index].difficulty = ev.target.value as string} >
                      <MenuItem aria-label="Easy" value="Easy">Easy</MenuItem>
                      <MenuItem aria-label="Medium" value="Medium">Medium</MenuItem>
                      <MenuItem aria-label="Hard" value="Hard">Hard</MenuItem>                   
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell sx={{ height: "100%", verticalAlign:"middle" }}>
                  <IconButton variant="remove" aria-label="delete" size="small" onClick={() => { removeTask(index) }}>
                    <ClearIcon sx={{ minWidth: 20, width: 20, minHeight: 20, height: 20 }} />
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
    <>
      <Navbar />

      <div className='game-create-screen'>

        <h1 className="game-code">
          Game Code: {gameCode}
        </h1>
        <div className="game-create-content">
          <Box alignItems="center" display="flex" flexDirection="column" gap={2} marginRight={5}>
            <Stack spacing={20} direction={"row"}>
              <TaskContainer />
            </Stack>
            <Box justifyContent="space-around" alignItems="center" display="flex" gap={2} width={"100%"}>
              <Button variant="contained" color='secondary' onClick={importList}>Import</Button>
              <Button variant="contained" color='secondary' onClick={exportList}>Export</Button>
              <Button variant="contained" color='secondary' sx={{ marginLeft: "auto", marginRight: "auto" }} onClick={initializeStart}>Start</Button>
              <Fab size="small" color="secondary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={addRow}>
                <AddIcon />
              </Fab>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box alignItems={"center"} display="flex" flexDirection="column">
              <Typography color="white">Players</Typography>
              <Typography color="white">({players.length}/10)</Typography>
            </Box>
            <List sx={{ border: '1px solid white', width: '13vw', padding: 2 }} component={Paper} elevation={0}>
              {Array.from(players).map((player, index) => (
                <Paper elevation={1} key={index}><ListItemText><Typography fontFamily={"Comfortaa"}>{player}</Typography></ListItemText></Paper>
              ))}
            </List>
            <Button variant="contained" color='secondary' onClick={handleOpen}>Game Settings</Button>
            <div className="settings-quick-view">
              <Typography>
                Number of imposters: {numImposters}
              </Typography>
              <Typography>
                Number of "Hard" tasks per crewmate: {numHard}
              </Typography>
              <Typography>
                Number of "Medium" tasks per crewmate: {numMedium}
              </Typography>
              <Typography>
                Number of "Easy" tasks per crewmate: {numEasy}
              </Typography>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box
                component="form"
                noValidate
                onSubmit={formSubmit}
                className="game-settings"
              >
                <h2 style={{
                  fontSize: "2rem", 
                  fontWeight: "bolder", 
                  color: "black", 
                  marginTop: "-3rem",
                  marginBottom: "1rem"
                }}>
                  Game settings
                </h2>

                <FormControl>
                  <h2 className="form-title">Number of Imposters</h2>
                  <TextField
                    id="numImposters"
                    type="number"
                    name="usenumImpostersr"
                    defaultValue={numImposters.toString()}
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    className="text-field"
                    InputProps={{ inputProps: { min: 0} }}
                    sx={{fontWeight: "1000"}}
                  />
                </FormControl>

                <FormControl>
                  <h2 className="form-title">Number of Hard Tasks</h2>
                  <TextField
                    name="numHard"
                    defaultValue={numHard.toString()}
                    type="number"
                    id="numHard"
                    autoFocus
                    required
                    fullWidth
                    InputProps={{ inputProps: { min: 0 } }}
                    variant="outlined"
                    className="text-field"
                  />
                </FormControl>

                <FormControl>
                  <h2 className="form-title">Number of Medium Tasks</h2>
                  <TextField
                    name="numMedium"
                    defaultValue={numMedium.toString()}
                    type="number"
                    id="numMedium"
                    autoFocus
                    required
                    fullWidth
                    InputProps={{ inputProps: { min: 0 } }}
                    className="text-field"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl>
                  <h2 className="form-title">Number of Easy Tasks</h2>
                  <TextField

                    name="numEasy"
                    defaultValue={numEasy.toString()}
                    type="number"
                    id="numEasy"
                    autoFocus
                    required
                    fullWidth
                    InputProps={{ inputProps: { min: 0 } }}
                    className="text-field"
                    variant="outlined"
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={saveSettings}
                  style={{marginTop: "10px", backgroundColor: "red", color: "black"}}
                >
                  Save Settings
                </Button>

              </Box>
            </Modal>
          </Box>
        </div>
      </div >
    </>
  )
}