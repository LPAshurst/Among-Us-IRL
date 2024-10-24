import { Link } from 'react-router-dom';
import red_among from '../assets/red_among.png';


export default function AmongUsLogo() {
  return (
    <header
      className='flex flex-row justify-center items-center grow'
    >
      <Link to="/">
      <img
        src={red_among}
        width={45}
      />
      </Link>

      <p className="text-[25px] font-lusitana text-neutral-200 p-2.5 self-end">Amog us in real life</p>
      
    </header>
  );
}