import { useNavigate } from 'react-router-dom';
import AmongUsLogo from "../ui/amongus_logo"
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import "../styles/banner.css"

export default function Navbar() {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem("logged_in");
        if (localStorage.getItem("room")) {
            localStorage.removeItem("room");
        }
        navigate("/");
        window.location.reload();
    }
    function LogoutButton() {
        return (
            <Button className="logout-btn" onClick={logout} variant="header" aria-label="logout" startIcon={<LogoutIcon />}>
                Logout
            </Button>
        );
    }
    return (
        <header className="banner">
            <AmongUsLogo />
            {(localStorage.getItem("logged_in") != null) ? (<LogoutButton />) : (<div />)}
        </header>
    );
}