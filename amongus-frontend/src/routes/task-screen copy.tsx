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

const TASK_STATUS = {
  TODO: 1,
  DONE: 2
}


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

  const [tasklist, setTasklist] = useState();
  const [tasksDone, setTasksDone] = useState(0);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  

  useEffect(() => {
    fetch("http://localhost:3010/api/tasks/list", {
      method: "GET",
      mode: "cors"
    }).then(response =>  {console.log(response); return response.json(); }
    ).then(value => {
      const withStatus = value.result;
      withStatus.entries.forEach((task)=>{
        task.status = TASK_STATUS.TODO;
      })
      setTasklist(withStatus);
      console.log(withStatus)
    }).catch (err => {
      console.error(err);
    });
  }, []);

  
  function finished_task(item) {

    item.status = TASK_STATUS.DONE
    setTasksDone(tasksDone + 1);
  }


  return (
    
    <>
      <LinearProgress variant="determinate" sx={{height: '5%', alignSelf: "center", width: "80%", marginTop: "3%"}} value={(tasksDone / (tasklist ? tasklist.entries.length : 100)) * 100} />
      <div id='task-accor'>
        {tasklist?.entries.map(item => (
        <Accordion expanded={expanded === item.name && item.status!=TASK_STATUS.DONE} onChange={handleChange(item.name)}>
            <AccordionSummary disabled={item.status === TASK_STATUS.DONE}> 
              <Typography>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{fontWeight: 700}}>Description: </Typography>
              <Typography>
                {item.description}
              </Typography>
              <Typography sx={{fontWeight: 700}}>Location: </Typography>
              <Typography>
                {item.location}
              </Typography>
              <AccordionActions onClick={() => finished_task(item)}>
                <Button>Finish Task</Button>
                </AccordionActions>
            </AccordionDetails>
          </Accordion>
      ))}
    
      </div>
    

    </>

  )






}