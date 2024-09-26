import { createSignal } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase'; 
import "../CSS/dashbaord.css";

//let prebaceno = false;
//let brojPrebacenih = 0;

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

    /*nakon sto se koordinate usporede (tocno), a svi okviri su popunjeni, podaci se izmjenjuju s lijeva na desno 
    svakim prebacivanjem povisit count
    function izmjena_Pod(){
    if (brojPrebaceno > 3){
        switch(brojPrebaceno % 3){
            case 1:
                promjeni podatke u prvom okviru

                break;
            case 2:
                promjeni podatke u drugom okviru
                break;

            case 0: 
                promjeni podatke u 3 okviru
                break;
        }
    }
    }

    smisliti laksi dohvat npr ime1, model1, detalji1, slika1, ime2, model2...*/
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
                <button className="info-button"  onClick={() => navigate('/info')}>Informacije</button>
            </header>
            <div className="pozadina">
                <h2>Forma za slikane avione</h2>
                <div className="kartice">
                    {avioni.map((avion, index) => (
                        <div className="kartica" key={index}>
                            <h3>{avion.ime}</h3>
                            <p>{avion.model}</p>
                            <button className="details-button" onClick={() => toggleDetails(index) && kretanje()}>
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
