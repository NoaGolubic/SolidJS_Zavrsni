import { createSignal } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase'; 
import "../CSS/dashbaord.css";
import Navbar from "../Components/Navbar";

//let prebaceno = false;
//let brojPrebacenih = 0;

const Homepage = () => {
    const location = useLocation();
    const name = location.state?.name || "korisniku";

    const [showDetails, setShowDetails] = createSignal({}); // Drži stanje za prikaz detalja o avionima

    const toggleDetails = (index) => {
        setShowDetails((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
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
            <Navbar name={name} />
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
