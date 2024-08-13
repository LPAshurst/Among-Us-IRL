import AmongUsLogo from "../ui/amongus_logo"

export default function GameCreation() {

	return (
		<>
			<div className="flex w-screen bg-blue-900 p-2 h-fit items-center justify-center">
        <AmongUsLogo />
      </div>

      <div className='flex w-full h-32 justify-center '>
        <button className='bg-blue-900 w-28 self-end '>
          <span className='text-[20px] font-lusitana text-neutral-200'> Log in </span>
        </button>

        <button className='bg-blue-900 w-28 self-end ml-5'>
          <span className='text-[20px] font-lusitana text-neutral-200'> Sign up </span>
        </button>
      </div >
		</>
	)

}