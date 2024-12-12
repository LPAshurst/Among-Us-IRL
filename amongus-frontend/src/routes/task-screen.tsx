import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
import { Task } from '../types/GameTypes';
import { socket } from '../socket';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/ClearTwoTone';
import { red } from '@mui/material/colors';
import "../styles/task-screen.css"
import imposterScreen from  "../assets/Among-Us-Imposter-Loading-Screen.avif"
import crewmateScreen from "../assets/Among-Us-Crewmate.png"
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

export default function TaskScreen() {

  const [tasklist, setTasklist] = useState<Task[]>();
  const [tasksDone, setTasksDone] = useState(0);
  const [numTasks, setNumTasks] = useState(100);
  const [meeting, setMeeting] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  // const [canKill, setCanKill] = useState(false);
  const [roleTitle, setRoleTitle] = useState<String>("Crewmate");
  const [open, setOpen] = useState(false);
  const [imposterNames, setImposterNames] = useState<String[]>();
  const navigate = useNavigate();
  
  const { room } = useParams();

  function reportDead() {
    socket.emit("initMeeting", room, "A dead body has been discovered. Please report to the main room.");
    setMeeting(true);
  }

  function markSelfDead() {
    socket.emit("markSelfDead", room);
  }
  
  const handleChange = (panel: string) =>
    (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {
    
    socket.emit("join", room);

    socket.on("totalTasks", (numComplete, numTasks) => {
      setTasksDone(numComplete);
      setNumTasks(numTasks);
    });

    socket.emit('requestTasks', room);
    socket.emit("requestMeetingStatus", room);

    socket.on("receiveTasks", (userTaskList: Task[]) => {
      setTasklist(userTaskList);
    });

    socket.on("recieveMeetingStatus", (meeting: boolean) =>  {
      setMeeting(meeting);
    });

    socket.emit("requestRole", room);
    socket.on("recieveRole", (role, imposterList) => {
      setRoleTitle(role);
      setImposterNames(imposterList)
    });

    socket.on("completedMeeting", () => {
      setMeeting(false);
    });
  
    socket.on("meetingMessage", (message) => {
      window.alert(message);
      setMeeting(true);
    });
    window.scrollTo(0, 0);
    setOpen(true);
    return () => {

    };

  }, []);


  function finished_task(item: Task) {
    item.status = true
    socket.emit('finishedTask', room, item.title);
    setTasksDone(1); // This is probably bad but i dont know how else to do it.
    // Triggers a rerender for imposter done tasks so that accordian will close
  }



  socket.on("gameOver", (message) => {
    navigate("../../survey", {state: message});
  });

  return (

    <div className="task-screen">
      <LinearProgress variant="determinate" className='task-bar' sx={{height: "3rem"}} value={(tasksDone / numTasks) * 100} />
      <div className='task-accor'>
        {tasklist?.map(task => (
          <Accordion expanded={expanded === task.title && !task.status} onChange={handleChange(task.title)}>
            <AccordionSummary disabled={task.status === true}>
              <Typography>{task.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontWeight: 700 }}>Description: </Typography>
              <Typography>
                {task.description}
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>Location: </Typography>
              <Typography>
                {task.location}
              </Typography>
              <AccordionActions>
                <Button disabled={meeting} onClick={() => finished_task(task)}>Finish Task</Button>
              </AccordionActions>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      
      <Modal
        open={open}
      >
        <div className='role-screen'>
          {
          roleTitle == "Imposter" ? 
          <>
          <ClearIcon fontSize="medium" sx={{alignSelf: "flex-end",  color: red[800]}} onClick={() => setOpen(false)}/>
          <img 
            src={imposterScreen}
          />
          <Typography style={{color: "red"}}>Teamate(s)</Typography>
          <ul>{imposterNames?.map((name) => (<li style={{color: "red", listStyleType: "disc", marginLeft: "1rem"}}>{name}</li>))}</ul> 
          </>
          : 
          <>
          <ClearIcon  fontSize="large" sx={{alignSelf: "flex-end", color: 'white'}} onClick={() => setOpen(false)}/>
          <img src={crewmateScreen}/>
          </>
          }
        </div>
      
      </Modal>

      <h1 className="button-group-title">Reporting Options</h1>
      <div className='crewmate-button-group'>
        <Button onClick={reportDead} variant="contained" className='crewmate-button' disabled={meeting} >
          <p className='button-text'>Report dead body</p>
        </Button>
        <div className='vr'></div>
        <Button onClick={markSelfDead} variant="contained" className='crewmate-button' disabled={meeting}>
          <p className='button-text'>Mark self as dead</p>
        </Button>
      </div>

      <Button variant='contained' onClick={() => setOpen(true)} disabled={meeting}>
        View role
      </Button>
      {/* <Button disabled={canKill} 
        sx={{
          borderRadius: "50%", 
          background: "red", 
          color: "white", 
          fontFamily: "Avenir", 
          fontWeight: "900", 
          fontSize: "1.8rem", 
          marginTop: "2%", 
          width: "25vw", 
          height: "25vw"
        }}>
        <span>KILL</span>
      </Button> */}

    </div>
  );

}