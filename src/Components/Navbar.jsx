import { useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase'; 
import "../CSS/navbar.css";

const Navbar = ({ name, showWelcome = true }) => {
    const navigate = useNavigate();

    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut(); 
        if (error) {
            console.error('Greška pri odjavi:', error.message);
        } else {
            navigate("/login"); 
        }
    };

    return (
        <header className="dashboard-header">
            <h1 onClick={() => navigate('/home')}>Pocetna</h1>
            <div className="header-buttons">
                {showWelcome && <h3>Dobrodosli, {name}!</h3>} {/* Prikaz poruke dobrodošlice samo ako je showWelcome true */}
                <button className="info-button" onClick={() => navigate('/info')}>Informacije</button>
                <button className="logout-button" onClick={logoutUser}>Odjavi se</button>
            </div>
        </header>
    );
};

export default Navbar;
