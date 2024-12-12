import Navbar from "../ui/navbar";
import { Typography  } from "@mui/material";
import "../App.css"
import { Link } from "react-router-dom";
import "../styles/report.css"

export default function Report() {
  return (

  <>
  <Navbar />
    <ol className="outer-report-list">
      <li><Typography>Our code is in the github <a href="https://github.com/343F24/343f24-final-project-amongus">repo</a>.</Typography></li>
      <li><Typography>Our page is being hosted <a href="https://343f24.github.io/343f24-final-project-amongus/">here</a></Typography></li>
      <li><Typography>This is our report page thus satisfying this requirement.</Typography></li>
      <li>
        <Typography>
          There are media queries present within the index.css file located at ./src/styles/index.css.
          These media queries helped us with some design issues present on mobile devices.
        </Typography>
      </li>
      <li><Typography>We have at least 5 seperate "routes". Home page, Game create page, Game Join page, Login/Sign Up Page, and the actual Game Page</Typography></li>
        <ol className="inner-report-list">
          <li>
            <Link to="../">Home page</Link>
          </li>
          <li>
            <Link to="../create-game">Game create page</Link>
          </li>
          <li>
            <Link to="../join-create">Game Join page</Link>
          </li>
          <li>
            <Link to="../login">Login</Link>
          </li>
          <li>
            <Link to="../game/:room">Game Page</Link>
          </li> 
        </ol>
      <li><Typography>The among us banner you see almost everywhere is our header</Typography></li>
      <li>
        <Typography>
          We have navigational links all through out the website to transfer to different parts. 
          For example if you press the among us character in the banner it will take you to the home page
        </Typography>
      </li>
      <li><Typography>We have images in the home screen as well as the header. All of them have alt attributes.</Typography></li>
      <li><Typography>The header uses the fantasy font and all other text uses lusitana</Typography></li>
      <li><Typography>The validation stuff i dont even know (ask stewart)</Typography></li>
      <li><Typography>We have a form <Link to="/survey">here</Link></Typography></li>
      <li><Typography>The <Link to="/waiting-room">waiting room</Link> has a link to the inner sloth among us website</Typography></li>
      <li><Typography>We will be communicating with our own API for task related updates</Typography></li>

    </ol>
  </>
  )
}