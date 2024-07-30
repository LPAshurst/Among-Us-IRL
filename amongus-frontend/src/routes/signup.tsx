import { Link } from "react-router-dom";
import AmongUsLogo from "../ui/amongus_logo";
export default function SignUpPage() {

  localStorage.setItem('username', 'poop');

  console.log(localStorage.getItem('username'))

  return (
    <>
      <div className="flex w-screen bg-blue-900 p-2 h-fit items-center justify-center">
        <AmongUsLogo />
      </div>
      
      <div className="flex w-full h-screen justify-center items-center">

      <div className="flex flex-col w-4/5 h-1/3 bg-slate-200 md:h-1/2 md:w-1/2 mb-40 items-center rounded-lg">
          <p className="md:text-[25px] text-[15px] font-lusitana text-black p-2.5">
            Sign up for an account
          </p>

          <div className="flex w-2/3 h-10 border-red-50">
            poop
          </div>


          
          <div className="flex h-screen w-full items-end justify-end">
            <p className="md:text-[15px] text-[10px] font-lusitana text-black p-2.5">
              Already have an account?
              <Link to={"/login"}> log in</Link>
            </p>
          </div>
        </div>
      </div>
      
    </>
  )

}