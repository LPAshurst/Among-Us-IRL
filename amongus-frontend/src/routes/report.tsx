import Navbar from "../ui/navbar";
import { Typography } from "@mui/material";

export default function Report() {
  return (

    <>
        <Navbar />
        <div style={{display: "flex", width: "100%", justifyContent:"center"}}>
          <ol type={"1"} start={1}>
            <li><Typography sx={{color: "white"}}>this is the url to our github repo which is shared with each other and the prof: http://github.com/...</Typography></li>
            <li><Typography sx={{color: "white"}}>this is the url to our deployed application where anyone could try our app: http://example.github.io/...</Typography></li>
            <li><Typography sx={{color: "white"}}>This page satisfies this requirement</Typography></li>
            {/* Need to do this one (media queries) */}
            <li><Typography sx={{color: "white"}}>this is the url to our deployed application where anyone could try our app: http://example.github.io/...</Typography></li>
            <li><Typography sx={{color: "white"}}>Since we are using react our pages are actually just routes within a react router. All of the different pages we use are in the "routes" folder</Typography></li>

            <li><Typography sx={{color: "white"}}>In our "amongus_logo.tsx" file within the ui folder we use a header component to create our banner</Typography></li>

            <li><Typography sx={{color: "white"}}>We have a lot of navigational buttons on display. One being creating the logout button that displayed on our banner. When this button is clicked the user is taken to the home screen.</Typography></li>

            <li><Typography sx={{color: "white"}}>We have some images on display in the home screen with some alt attributes</Typography></li>

            <li><Typography sx={{color: "white"}}>this is the url to our deployed application where anyone could try our app: http://example.github.io/...</Typography></li>

            <li><Typography sx={{color: "white"}}>this is the url to our deployed application where anyone could try our app: http://example.github.io/...</Typography></li>

            <li><Typography sx={{color: "white"}}>We have a form</Typography></li>

            <li><Typography sx={{color: "white"}}>this is the url to our deployed application where anyone could try our app: http://example.github.io/...</Typography></li>

            <li><Typography sx={{color: "white"}}>We are going to communicate with our own backend for part 3. Our backend will allow us to retrieve tasks from a server and display it to users.</Typography></li>


          </ol>
        </div>
    </>

  )
}