import { createSignal } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase'; 
import "../CSS/dashbaord.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import threeasy from "threeasy";

// Inicijalizacija Three.js scene
const app = new threeasy(THREE, { alpha: true });
var loader = new GLTFLoader();


let modelURL = "/src/assets/dassault_rafale/scene.gltf";
let modelURL2 = "/src/assets/dassault_rafale/scene.gltf";

let modelURL3 = "/src/assets/volume_cloud/scene.gltf";
let modelURL4 = "/src/assets/volume_cloud/scene.gltf";
let modelURL5 = "/src/assets/volume_cloud/scene.gltf";
let modelURL6 = "/src/assets/volume_cloud/scene.gltf";
let modelURL7 = "/src/assets/volume_cloud/scene.gltf";

let gltf1;
let gltf2;

let gltf3;
let gltf4;
let gltf5;
let gltf6;
let gltf7;

loader.load(modelURL, function(gltf) {
    gltf1 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf1.scene);
});

loader.load(modelURL2, function(gltf) {
    gltf2 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = -1.15;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = 0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf.scene);
});

window.addEventListener("scroll", onScroll);

function onScroll(){
    const scrollY = window.scrollY;
        const k = 0.0001; 
        const povecanje = 0.005 + scrollY * k;
        gltf1.scene.scale.set(povecanje, povecanje, povecanje);
        gltf2.scene.scale.set(povecanje, povecanje, povecanje);
}

loader.load(modelURL3, function(gltf) {
    gltf3 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf3.scene);
});

loader.load(modelURL4, function(gltf) {
    gltf4 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf4.scene);
});

loader.load(modelURL5, function(gltf) {
    gltf5 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf5.scene);
});

loader.load(modelURL6, function(gltf) {
    gltf6 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf6.scene);
});

loader.load(modelURL7, function(gltf) {
    gltf7 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf7.scene);
});

//Rasvjeta
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
app.scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); 
app.scene.add(ambientLight);

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
