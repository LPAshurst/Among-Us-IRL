import { Link } from "react-router-dom";
import AmongUsLogo from "../ui/amongus_logo";
export default function LoginPage() {

  localStorage.setItem('username', 'poop');

  console.log(localStorage.getItem('username'))

  return (
    <>
      <div className="flex w-screen bg-blue-900 p-2 h-fit items-center justify-center">
        <AmongUsLogo />
      </div>
      
      <div className="flex w-full h-screen justify-center items-center">


        <div className="flex flex-col w-4/5 h-1/4 bg-slate-200 md:h-1/3 md:w-1/2 mb-40 items-center rounded-lg">
          <p className="md:text-[35px] text-[25px] font-lusitana text-black p-2.5 font-bold">
          Login
          </p>

          <div className="flex w-2/3 h-10 border-2 border-red-950 rounded-md mt-5 ">
            <input className="w-full rounded-md focus:outline-none" placeholder="Enter username here">
            </input>
          </div>

          <div className="flex w-2/3 h-10 border-2 border-red-950 rounded-md mt-8">
            <input className="w-full rounded-md focus:outline-none" placeholder="Enter password here">
            </input>
          </div>

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