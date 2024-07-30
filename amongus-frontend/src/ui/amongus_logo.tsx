import red_among from '../assets/red_among.png';


export default function AmongUsLogo() {
  return (
    <div
      className='flex flex-row justify-center items-center'
    >
      <img
      src={red_among}
      width={45}
      />

      <p className="text-[25px] font-lusitana text-neutral-200 p-2.5">Amog us in real life</p>
    </div>
  );
}