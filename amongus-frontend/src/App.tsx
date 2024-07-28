import './App.css';
import AmongUsLogo from './ui/amongus_logo';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <>
      <div className="flex w-screen items-end rounded-lg bg-blue-900 p-3 md:h-52 mt-5">
        <AmongUsLogo />
      </div>

      <Link to="task-screen" className='w-40 h-50 self-center mt-40'>
        <button className='bg-blue-900'>
          <span className='text-[25px] font-lusitana text-neutral-200'> Log in </span>
        </button>
      </Link>
      
    </>
  );
}




