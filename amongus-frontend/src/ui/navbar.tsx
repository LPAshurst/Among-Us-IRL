import { useNavigate } from 'react-router-dom';
import AmongUsLogo from "../ui/amongus_logo"
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';




export default function Navbar() {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem("logged_in");
        navigate("/");
    }
    function LogoutButton() {
        return (
            <Button onClick={logout} variant="header" aria-label="logout" startIcon={<LogoutIcon />}>
                Logout
            </Button>
        );
    }
    return (
        <div className="flex flex-row w-screen bg-blue-900 p-2 h-fit items-center justify-center">
            <div className='flex-none min-w-28 h-14'></div>
            <AmongUsLogo />
            <div className='flex flex-row justify-flex-end w-28 h-14'>
                {(localStorage.getItem("logged_in") != null) ? (<LogoutButton />) : (<div />)}
            </div>
        </div>
    );
}