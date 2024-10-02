import { createSignal, onMount } from "solid-js";
import '../CSS/Lokacija.css';
import L from 'leaflet';  
import 'leaflet/dist/leaflet.css';  

function Lokacija() {
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
    </div>
  );
}

export default Lokacija;
