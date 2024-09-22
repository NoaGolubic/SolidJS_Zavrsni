import { createSignal } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase'; 
import "../CSS/dashbaord.css";

const Homepage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state?.name || "korisniku";

    const [showDetails, setShowDetails] = createSignal({}); // Drži stanje za prikaz detalja o avionima

    const toggleDetails = (index) => {
        setShowDetails((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut(); 
        if (error) {
            console.error('Greška pri odjavi:', error.message);
        } else {
            navigate("/login"); 
        }
    };

    const avioni = [
        { ime: "Dassault Rafale", model: "Multirole Fighter", detalji: "Detaljne informacije o Dassault Rafale avionu..." },
        { ime: "F-16 Falcon", model: "Fighter Jet", detalji: "Detaljne informacije o F-16 Falcon avionu..." },
        { ime: "Eurofighter Typhoon", model: "Multirole Fighter", detalji: "Detaljne informacije o Eurofighter Typhoon avionu..." }
    ];

    return (
        <div>
            <header className="dashboard-header">
                <h1>Pocetna</h1>
                <h3>Dobrodosli, {name}!</h3>
                <button className="logout-button" onClick={logoutUser}>Odjavi se</button>
            </header>
            <div className="pozadina">
                <h2>Forma za slikane avione</h2>
                <div className="kartice">
                    {avioni.map((avion, index) => (
                        <div className="kartica" key={index}>
                            <h3>{avion.ime}</h3>
                            <p>{avion.model}</p>
                            <button className="details-button" onClick={() => toggleDetails(index)}>
                                {showDetails()[index] ? "Sakrij detalje" : "Prikaži detalje"}
                            </button>
                            {showDetails()[index] && (
                                <div className="detalji">
                                    <p>{avion.detalji}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
