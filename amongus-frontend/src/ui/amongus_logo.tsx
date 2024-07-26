import red_among from '../assets/red_among.png';

export default function AmongUsLogo() {
  return (
    <div
      className='flex flex-row items-center leading-none text-white'
    >
        <img
        src={red_among}
        width={150}
        height={150}
        />
      <p className="text-[44px] font-lusitana">Among us in real life</p>
    </div>
  );
}