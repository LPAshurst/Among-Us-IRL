import { Box, Stack, Typography, Button } from "@mui/material";
import AmongUsLogo from "../ui/amongus_logo"
import { useEffect, useState } from "react";

export default function CreationPage() {

  const [tasklist, setTasklist] = useState();

  
  useEffect(() => {
    fetch("http://localhost:3010/api/tasks/list", {
      method: "GET",
      mode: "cors"
    }).then(response =>  {console.log(response); return response.json(); }
    ).then(value => {
      setTasklist(value.result);
      console.log(value.result)
    }).catch (err => {
      console.error(err);
    });
  }, [])

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function TaskContainer() {
    return (
      <Stack spacing={1.5}>
        <Stack direction="row" sx={{ alignItems: 'center' }} display="flex" gap={2}>
          <Typography color="white">Tasks</Typography>
          <Box justifySelf="end" display="flex" gap={2}>
            <Button variant="outlined">Load</Button>
            <Button variant="outlined">Saves</Button>
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
      <div className="flex w-screen bg-blue-900 p-2 h-fit items-center justify-center">
        <AmongUsLogo />
      </div>

      <div className='flex w-full h-full flex-col items-center'>


        <p className="font-lusitana font-bold text-neutral-200 text-[15px] md:text-[20px] mt-2">
          Game Code: {gameCode}
        </p>
        <Stack spacing={10} direction="row">
          <Box alignItems="center" display="flex" flexDirection="column" gap={2}>
            <Stack spacing={20} direction={"row"}>
              <TaskContainer />
            </Stack>
            <Button variant="outlined">Start</Button>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box alignItems={"center"} display="flex" flexDirection="column">
              <Typography color="white">Players</Typography>
              <Typography color="white">(3/10)</Typography>
            </Box>
            <Box sx={{ border: '1px solid white', height: '40vh', width: '25vh', padding: 2 }}>
              <Typography color="white">Jackson</Typography>
              <Typography color="white">Lorenzo</Typography>
              <Typography color="white">Zane</Typography>
            </Box>
            <Button variant="outlined">Game Settings</Button>
          </Box>
        </Stack>
      </div >
    </Box>
  )

}