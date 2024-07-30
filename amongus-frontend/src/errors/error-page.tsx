import { useRouteError } from "react-router-dom";
import FNAF from '/src/assets/FNAF_jumpscare.mp4'


export default function ErrorPage() {

    const error = useRouteError();
    console.error(error);

    return (
        <>

        <div className="flex justify-center items-center text-neutral-200 font-lusitana mt-5">
          <span className="text-[25px]">Wrong URL</span>
        </div>  
       
       
        <video className="mt-44" src={FNAF} autoPlay={true} muted={true} loop={true}>
        </video>

        
        
        
        
        </>



    )


}