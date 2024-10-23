import { Button, Rating, TextField } from "@mui/material";
import Navbar from "../ui/navbar";

export default function SurveyForm() {


  function handleSubmit(event) {
    // event.preventDefault();
    console.log("Submitted");
    window.location.reload();
  }

  return (
    <>
      <Navbar />

      <div className="flex w-full h-screen justify-center items-center">
        <div className="flex flex-col w-4/5 h-1/2 bg-slate-200 md:h-2/5 md:w-1/2 mb-40 items-center rounded-lg">
          <form onSubmit={handleSubmit}>
            <div>
              <TextField id="namefield" label="Name" name="name" variant="filled" />
            </div>
            <div>
              <Rating name="rating" defaultValue={5}></Rating>
            </div>
            <div>
              <TextField id="commentfield" label="Comment" multiline minRows={6} variant="filled"></TextField>
            </div>
            <Button type="submit" name="comment" variant="contained">Submit</Button>
          </form>
        </div>
      </div>

    </>
  )

}