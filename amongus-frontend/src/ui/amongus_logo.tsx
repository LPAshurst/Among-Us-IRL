import red_among from '../assets/red_among.png';

export default function AmongUsLogo() {
  return (
    <div
      className='flex flex-row items-center justify-center leading-none text-white'
    >
        <img
        src={red_among}
        width={100}
        height={100}
        />
      <p className="text-[25px] font-lusitana text-neutral-200">Amog us in real life</p>
    </div>
  );
}