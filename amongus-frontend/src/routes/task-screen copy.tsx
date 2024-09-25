import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';


export default function TaskCopy () {

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
  }, []);


  {tasklist?.entries.map(item => (
    <Accordion>
        <AccordionSummary> 
          <Typography>{item.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {item.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
  ))}

  return (
    
    <>
    <LinearProgress variant="determinate" sx={{height: '5%', alignSelf: "center", width: "80%", marginTop: "3%"}} value={50} />
    <div id='task-accor'>

    {tasklist}

    </div>

    </>

  )






}