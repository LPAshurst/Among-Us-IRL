import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
import { Task } from '../types/GameTypes';
import { socket } from '../socket';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(200, 200, 200, 1)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));





export default function TaskCopy () {

  const [tasklist, setTasklist] = useState<Task[]>();
  const [tasksDone, setTasksDone] = useState(0);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  

  useEffect(() => {

    socket.emit('requestTasks');
    socket.on("receiveTasks", (userTaskList: Task[]) => {
      setTasklist(userTaskList);
      console.log(userTaskList);

    });

  }, []);

  
  function finished_task(item: Task) {
    item.status = true
    setTasksDone(tasksDone + 1);
  }

  return (
    
    <>
      <LinearProgress variant="determinate" sx={{height: '5%', alignSelf: "center", width: "80%", marginTop: "3%"}} value={(tasksDone / (tasklist ? tasklist.length : 100)) * 100} />
      <div id='task-accor'>
        {tasklist?.map(task => (
        <Accordion expanded={expanded === task.title && task.status!=true} onChange={handleChange(task.title)}>
            <AccordionSummary disabled={task.status === true}> 
              <Typography>{task.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{fontWeight: 700}}>Description: </Typography>
              <Typography>
                {task.description}
              </Typography>
              <Typography sx={{fontWeight: 700}}>Location: </Typography>
              <Typography>
                {task.location}
              </Typography>
              <AccordionActions onClick={() => finished_task(task)}>
                <Button>Finish Task</Button>
                </AccordionActions>
            </AccordionDetails>
          </Accordion>
      ))}
    
      </div>
    

    </>

  )






}