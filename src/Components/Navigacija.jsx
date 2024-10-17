import { createSignal, onMount } from "solid-js";
import '../CSS/Navigacija.css';
import L from 'leaflet';  
import 'leaflet/dist/leaflet.css';  

function Navigacija() {
  const [latitude, setLatitude] = createSignal(null);
  const [longitude, setLongitude] = createSignal(null);
  let mapContainer;

  // Geolocation API za dobivanje trenutne lokacije
  onMount(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);

        // Inicijalizacija Leaflet mape nakon dobivanja lokacije
        const map = L.map(mapContainer).setView([lat, lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
          .bindPopup(`Trenutna lokacija: ${lat}, ${lng}`)
          .openPopup();
      }, (error) => {
        console.error("Greška kod dobivanja geolokacije: ", error);
      });
    } else {
      console.log("Geolokacija nije dostupna.");
    }
    /*
    const handleOrientation1 = (event) => {    
      const [alpha, setAlpha] = createSignal(0);  
      const [beta, setBeta] = createSignal(0);    
      const [gamma, setGamma] = createSignal(0);  
      setAlpha(event.alpha); 
      setBeta(event.beta);    
      setGamma(event.gamma);  
  
      // Rotiranje mape
      if (map) {
        const mapElement = map.getContainer();
        mapElement.style.transform = "rotateX(${beta()}deg)";
        }
      }
      window.addEventListener('deviceorientation', handleOrientation1);
        onCleanup(() => {
          window.removeEventListener('deviceorientation', handleOrientation1);
    });
    */
  });

  const [alpha, setAlpha] = createSignal(0);  
  const [beta, setBeta] = createSignal(0);    
  const [gamma, setGamma] = createSignal(0);  
  let cubeRef;
  
  onMount(() => {
    
    const handleOrientation = (event) => {
      setAlpha(event.alpha); 
      setBeta(event.beta);    
      setGamma(event.gamma);  


      if (cubeRef) {
        cubeRef.style.transform = `rotateX(${beta()}deg) rotateY(${gamma()}deg) rotateZ(${alpha()}deg)`;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    onCleanup(() => {
      window.removeEventListener('deviceorientation', handleOrientation);
    });
  });
  

  return (
    <div className="App">
      {/* Prikaz lokacije */}
      {latitude() && longitude() ? (
        <>
          {/* Element za prikaz mape */}
          <div class="glass-container3">
          <div className="mapa" ref={mapContainer} style={{ height: "340px", width: "340px" }}></div>
          </div>
        </>
      ) : (
        <p>Učitavanje lokacije...</p>
      )}
          <div className="App">
      <h2>Nagib uređaja</h2>
      <p>Alpha (Z os): {alpha().toFixed(2)}</p>
      <p>Beta (X os): {beta().toFixed(2)}</p>
      <p>Gamma (Y os): {gamma().toFixed(2)}</p>

      {/* 3D kocka */}
      <div className="scene">
        <div className="cube" ref={el => cubeRef = el}>
          <div className="face front">Front</div>
          <div className="face back">Back</div>
          <div className="face left">Left</div>
          <div className="face right">Right</div>
          <div className="face top">Top</div>
          <div className="face bottom">Bottom</div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Navigacija;
