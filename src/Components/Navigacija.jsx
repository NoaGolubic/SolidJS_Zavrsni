// API pozicija aviona -> Z = (aplha) orijentiran prema sjeveru (offsetan za 50 stupnjeva/ x = beta orijentiran prema nebu)

import { createSignal, onMount, onCleanup } from "solid-js";
import '../CSS/Navigacija.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import axios from 'axios';
let udaljenostLatE;
let udaljenostLatW;
let udaljenostLngN;
let udaljenostLngS;
let cubeRef;
let mapContainer;
const [latitude, setLatitude] = createSignal(null);
const [longitude, setLongitude] = createSignal(null);
const [alpha, setAlpha] = createSignal(0);
const [beta, setBeta] = createSignal(0);
const [gamma, setGamma] = createSignal(0);
const [magHeading, setMagHeading] = createSignal(null);
const [kutAvionaX, setKutAvionaX] = createSignal(0);
const [kutAvion, setKutAvion] = createSignal(0);
const [UdaljenostZRC, setUdaljenostZRC] = createSignal(0);
const [elevation, setElevation] = createSignal(0);
const [avionLng, setAvionLng] = createSignal(0);
const [avionLat, setAvionLat] = createSignal(0);
const [visina, setVisina] = createSignal(0);

function Orijentacija() {

   //DOBIVANJE ELEVACIJE IZ API-A
   function getElevation(lat, lng) {
    const dataset = 'etopo1';
    const url = `https://api.opentopodata.org/v1/${dataset}?locations=${lat},${lng}`;

    return axios.get(url)
      .then(response => {
        if (response.data && response.data.results && response.data.results.length > 0) {
          const elevationVal = response.data.results[0].elevation;
          setElevation(elevationVal);
        } else {
          throw new Error("Could not find elevation data.");
        }
      })
      .catch(error => {
        console.error('Error fetching elevation data:', error);
        setElevation(0);
      });
  }
  onMount(() => {

    //PRIKUPLJANJE PODATAKA O LOKACIJI KORISNIKA
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);

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

    //DOBIVANJE ORIJENTACIJE MOBITELA
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

    //PRIKUPLJANJE PODATAKA O SMJERU GLEDANJA S OBZIROM NA MAGNETSKI SJEVER
    const magnetometar = () => {
      if ("Magnetometer" in window) {
        const sensor = new Magnetometer();
        sensor.start();


        sensor.onreading = () => {
          const smjer = izracunSmjer(sensor.x, sensor.y);
          setMagHeading(smjer);
        };

        sensor.onerror = (event) => {
          console.log("Došlo je do greške pri očitanju senzora magnetometra:", event.error);
        };


        onCleanup(() => {
          sensor.stop();
        });

      } else {
        console.log("Magnetometar nije podržan");
      }
      magnetometar();
      getElevation(lat, lng);
        prozor(lat, lng);  
    };

    //DEFINIRANJE ZRAČNOG PROSTORA U KOJEM SE TRAŽE AVIONI
    //jedan stupanj lat (geo širina) je 111.11km / 60  = 1.85183333333km  u minuti broj 9.72009720099 * 1.85... daje okrug od 36km
    // jedan stupanj lng (geo visine) PRIBLIŽNO je 111*cos(lat)

    function prozor(lat, lng) {
      udaljenostLatE = lat + (9.72009720099 / 60);
      udaljenostLatW = lat - (9.72009720099 / 60);

      udaljenostLngN = lng + 111 * Math.cos(lat * (Math.PI / 180));
      udaljenostLngS = lng - 111 * Math.cos(lat * (Math.PI / 180));
    }
  }); //onMOUNT

  //FUNKCIJA ZA USPOREĐIVANJE X I Y KUTA KORISNIKA I AVIONA
  function skeniranje(lat, lng, avionLat, avionLng, visina, gamma) {
    const R = 6371000;
    const X1 = avionLat * (Math.PI / 180);
    const Y1 = avionLng * (Math.PI / 180);
    const X2 = lat * (Math.PI / 180);
    const Y2 = lng * (Math.PI / 180);

    const dlat = X2 - X1;
    const dlon = Y2 - Y1;

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(X1) * Math.cos(X2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));
    const UdaljenostZRCVal = R * c;
    setUdaljenostZRC(UdaljenostZRCVal);
    let VisinaDelta = visina - elevation;

    const kutAvionValue = Math.atan(UdaljenostZRC / VisinaDelta) * (180 / Math.PI);
    setKutAvion(kutAvionValue);
    kutKor_AV(avionLat, avionLng, kut);

    gornjaGranicaY = kutAvion + 5;
    donjaGranicaY = kutAvion - 5;
    gornjaGranicaX = kutAvionaX + 5;
    donjaGranicaX = kutAvionaX - 5;

    if (gamma >= donjaGranicaY && gamma <= gornjaGranicaY && smjer >= donjaGranicaX && smjer <= gornjaGranicaX) {
      //dodati avion u bazu 
    } else {
      console.log("Avion se ne nalazi u traženom zračnom prostoru");
    }
  }

  function pozivNaGumb() {

    const lat = latitude();
    const lng = longitude();
    const gammaValue = gamma();
    getElevation(lat, lng);
    //DOHVAĆANJE INFORMACIJA O AVIONIMA U DEFINIRANOM ZRAČNOM PROSTORU
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://fr24api.flightradar24.com/common/v1/search.json?bounds=${udaljenostLatE},${udaljenostLatW},${udaljenostLngN},${udaljenostLngS}`,
      headers: {
        'Accept': 'application/json',
        'Accept-Version': 'v1',
        'Authorization': 'Bearer 9d52befb-6f75-4a23-87ce-17ff514e15c8|U7gGOhwvB5LxNzbD2Za8Pg2USZTwpoXymvYDg1kgdd483089'                            //zaljepit token 
      }
    };

    axios.request(config)
      .then((response) => {
        if (response.data === null) {
          console.log("Trenutačno nema zrakoplova u ovom području!");
        } else {
          response.data.data.forEach(flight => {

            let avionLati = flight.lat;
            setAvionLat(avionLati);
            let avionLngi = flight.lon;
            setAvionLng(avionLngi);
            let visinaA = flight.alt;
            setVisina(visinaA);

            L.marker([avionLat, avionLng]).addTo(map)
              .bindPopup(`Let BR.: ${flight.callsign},Zrakoplov: ${flight.aircraft}, Visina: ${flight.alt} ft`)
              .openPopup();

            skeniranje(lat, lng, avionLat, avionLng, visina, gammaValue);
          });
          console.log(JSON.stringify(response.data)); //ispis svih informacija  o avionu koji leti u navedenom području

        }
      })
      .catch((error) => {
        console.log(error);
      });

    //KUT X S OBZIROM NA SJEVER (KORISNIK)
    const izracunSmjer = (x, y) => {
      let kut;
      const smjer = Math.atan2(y, x) * (180 / Math.PI);
      return kut = (smjer + 360) % 360;
    };
    //IZRAČUNAVANJE KUTA X IZMEĐU AVIONA I KORISNIKA
    function kutKor_AV(avionLat, avionLng, lat, lng) {
      const kutY = Math.atan2(avionLat - lat, avionLng - lng) * (180 / Math.PI);
      const kutAvionaX = (90 - kutY + 360) % 360;
      setKutAvionaX(kutAvionaX);
      return kutAvionaX;
    }
    

  }
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

      <h2>Nagib uređaja</h2>
      <p>Alpha (Z os): {alpha().toFixed(2)}</p>
      <p>Beta (X os): {beta().toFixed(2)}</p>
      <p>Gamma (Y os): {gamma().toFixed(2)}</p>

      <h2>Avion</h2>
      <p>kut x između korisnika i aviona: {kutAvionaX()}</p>
      <p>kut y do aviona: {kutAvion()}</p>
      <p>koordinate aviona: {avionLng()}, {avionLat()}</p>
      <p>visina aviona: {visina()}</p>


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
      <button className="Pokreni" onClick={pozivNaGumb}>Skeniraj</button>
    </div>
  );
}



export default Orijentacija;
