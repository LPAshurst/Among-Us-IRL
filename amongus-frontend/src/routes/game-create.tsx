import AmongUsLogo from "../ui/amongus_logo"

export default function CreationPage() {


  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const gameCode = getRandomInt(50000);
	return (
		<> 
			<div className="flex w-screen bg-blue-900 p-2 h-fit items-center justify-center">
        <AmongUsLogo />
      </div>

      <div className='flex w-full h-full flex-col items-center'>

        
        <p className="font-lusitana font-bold text-neutral-200 text-[15px] md:text-[20px] mt-2">
          Game Code: {gameCode}
        </p>


      </div >
		</>
	)

}