import { Link } from "react-router-dom";
import AmongUsLogo from "../ui/amongus_logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../ui/types";


export default function LoginPage() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate();


  async function LogInPressed() {
    setUsernameError('');
    setPasswordError('');

    if (userName === '') 
      setUsernameError('Please enter a username');
    if (password === '')
      setPasswordError('Please enter a password');
    
    const url = "http://localhost:3010/api/auth";

    const req = new Request(url);
    const response = await fetch(req)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const result = data.result;

    const user = result.find((user: User) => user.username === userName && user.password === password);
    
    if (user) {
      navigate("/join-create");
      if (!localStorage.getItem("logged_in")) 
        localStorage.setItem("logged_in", "true");
      console.log(localStorage.getItem("logged_in"));
    } else {
      window.alert("User name or password not detected");
    }
    return

  }

  return (
    <>
      <div className="flex w-screen bg-blue-900 p-2 h-fit items-center justify-center">
        <AmongUsLogo />
      </div>
      
      <div className="flex w-full h-screen justify-center items-center">


        <div className="flex flex-col w-4/5 h-1/2 bg-slate-200 md:h-2/5 md:w-1/2 mb-40 items-center rounded-lg">
          <p className="md:text-[35px] text-[25px] font-lusitana text-black p-2.5 font-bold">
          Login
          </p>

          <div className="flex w-2/3 h-10 border-2 border-red-950 rounded-md mt-5 ">
            <input className="w-full rounded-md focus:outline-none p-1" placeholder="Enter username here" onChange={(ev) => {setUserName(ev.target.value); setUsernameError('');}} value={userName}/>
          </div>
          <div className="text-red-500 text-xs">{usernameError}</div>

          <div className="flex w-2/3 h-10 border-2 border-red-950 rounded-md mt-8">
            <input className="w-full rounded-md focus:outline-none p-1 " placeholder="Enter password here" onChange={(ev) => {setPassword(ev.target.value); setPasswordError('');}} value={password}/>
          </div>
          <div className="text-red-500 text-xs">{passwordError}</div>



          <button className="flex md:w-1/4 w-1/3 h-1/6 mt-5 items-center justify-center bg-blue-400" onClick={LogInPressed}>
            <span className=" text-[15px] font-lusitana text-neutral-200">Log in</span>
          </button>

          <div className="flex h-screen w-full items-end justify-end">
            <p className="md:text-[15px] text-[10px] font-lusitana text-black p-2.5">
              No account? 
              <Link to={"/signup"}> sign up</Link>
            </p>
          </div>


        </div>
      </div>
      
    </>
  )

}