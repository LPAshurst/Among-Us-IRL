import AmongUsLogo from "../ui/amongus_logo"

export default function GameCreation() {

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
				</div>
				
			</div>
		</>
	)

}