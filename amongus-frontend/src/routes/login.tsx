import { useLocation } from "react-router-dom";

export default function LoginPage() {

    let {state} = useLocation();

    console.log(state.loggedIn);
    console.log(state.setLog);

    return (
    <div className="flex">
        whatever
    </div>
    )


}