//CorrectCh_New.mp3 by Gronkjaer -- https://freesound.org/s/654321/ -- License: Creative Commons 0
//PROVJERIT JER IMA POSTAVLJANJE MAGSMJERA
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import "../CSS/Navigacija.css";
import L, { bounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import supabase from "../Backend/supabase";

const [latitude, setLatitude] = createSignal(null);
const [longitude, setLongitude] = createSignal(null);
const [alpha, setAlpha] = createSignal(0);
const [beta, setBeta] = createSignal(0);
const [gamma, setGamma] = createSignal(0);
const [magHeading, setMagHeading] = createSignal(null);
 const [udaljenostLatE, setUdaljenostLatE] = createSignal(null);
 const [udaljenostLatW, setUdaljenostLatW] = createSignal(null);
 const [udaljenostLngN, setUdaljenostLngN] = createSignal(null);
 const [udaljenostLngS, setUdaljenostLngS] = createSignal(null);
const [kutAvionaX, setKutAvionaX] = createSignal(0);
const [kutYAvion, setKutYAvion] = createSignal(0);
const [UdaljenostZRC, setUdaljenostZRC] = createSignal(0);
const [elevation, setElevation] = createSignal(0);
const [avionLng, setAvionLng] = createSignal(0);
const [avionLat, setAvionLat] = createSignal(0);
const [visina, setVisina] = createSignal(0);

let cubeRef;
let mapContainer;

function Navigacija() {
  //Stavljanje korisnika na mapu
  function lokacijaKorisnik() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lng);
            console.log(
              "LATITUDA I LONGITUDA KORISNIK: ",
              latitude(),
              longitude(),
            );
            resolve();
          },
          (error) => {
            console.error("Error fetching geolocation:", error);
            reject(error);
          },
        );
      } else {
        console.log("Geolocation is not supported");
      }
    });
  }
  const magnetometar = () => {
    if ("Magnetometer" in window) {
      const sensor = new Magnetometer();
      sensor.start();

      //KUT X S OBZIROM NA SJEVER (KORISNIK)
      sensor.onreading = () => {
        let kut;
        let smjer = Math.atan2(sensor.y, sensor.x) * (180 / Math.PI);
        kut = (smjer + 360) % 360;
        setMagHeading(kut);
      };
      onCleanup(() => {
        sensor.stop();
      });
    }
  }

  //Orijentacija mobitela
  const handleOrientation = (event) => {
    setAlpha(event.alpha);
    setBeta(event.beta);
    setGamma(event.gamma);

    if (cubeRef) {
      cubeRef.style.transform =
        `rotateX(${beta()}deg) rotateY(${gamma()}deg) rotateZ(${alpha()}deg)`;
    }
  };

  onMount(() => {
    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  });

  //DEFINIRANJE ZRAČNOG PROSTORA U KOJEM SE TRAŽE AVIONI
  //jedan stupanj lat (geo širina) je 111.11km / 60  = 1.85183333333km  u minuti broj 9.72009720099 * 1.85... daje okrug od 36km
  // jedan stupanj lng (geo visine) PRIBLIŽNO je 111*cos(lat)
  function prozor(lat, lng) {
    setUdaljenostLatE(lat + 9.72009720099 / 60);
    setUdaljenostLatW(lat - 9.72009720099 / 60);
    setUdaljenostLngN(lng + 111 * Math.cos(lat * (Math.PI / 180)));
    setUdaljenostLngS(lng - 111 * Math.cos(lat * (Math.PI / 180)));

    console.log(
      "Okvir gledanja",
      udaljenostLatE(),
      udaljenostLatW(),
      udaljenostLngN(),
      udaljenostLngS(),
    );
  }

  // Izračun kuta X između korisnika i aviona
  function kutKor_AV(avionLat, avionLng, lat, lng) {
    const kutY = Math.atan2(avionLat - lat, avionLng - lng) * (180 / Math.PI);
    const kutAvionaX = (90 - kutY + 360) % 360;
    setKutAvionaX(kutAvionaX);
    return kutAvionaX;
  }

  // API elevacija

  /*
 try {
    const dataset = "etopo1";
    const lat = lat;
    const lng = lng;
    const response = await fetch(
      "https://veclcridxyeqhbenssvk.supabase.co/functions/v1/APIpozivELEV",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VITE_SUPABASE_KEY}`,
        },
        body: JSON.stringify(dataset, lat, lng),
      },
    );
  */
  async function getElevation(lat, lng) {
    const dataset = "etopo1";
    const url =
      `https://api.opentopodata.org/v1/${dataset}?locations=${lat},${lng}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const jsonData = await response.json();

      if (jsonData && jsonData.results && jsonData.results[0]) {
        const elevationData = jsonData.results[0].elevation;
        setElevation(elevationData);
      } else {
        console.error("Nije moguće pronači elevaciju");
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka o elevaciji:", error);
    }
  }
}

//Sveukupni izračun kuteva
function skeniranje(lat, lng, avionLat, avionLng, visina, gamma) {
  const R = 6371000;
  const X1 = avionLat * (Math.PI / 180);
  const Y1 = avionLng * (Math.PI / 180);
  const X2 = lat * (Math.PI / 180);
  const Y2 = lng * (Math.PI / 180);

  const dlat = X2 - X1;
  const dlon = Y2 - Y1;

  const a = Math.sin(dlat / 2) ** 2 +
    Math.cos(X1) * Math.cos(X2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  const UdaljenostZRCVal = R * c;
  setUdaljenostZRC(UdaljenostZRCVal);
  const VisinaDelta = visina - elevation();

  const kutAvionYValue = Math.atan(UdaljenostZRC() / VisinaDelta) *
    (180 / Math.PI);
  setKutYAvion(kutAvionYValue);
  kutKor_AV(avionLat(), avionLng(), latitude(), longitude());

  gornjaGranicaY = kutYAvion + 5;
  donjaGranicaY = kutYAvion - 5;
  gornjaGranicaX = kutAvionaX + 5;
  donjaGranicaX = kutAvionaX - 5;
  console.log("Gornja i donja granica kuta x:", gornjaGranicaX, donjaGranicaX);
  console.log("Gornja i donja granica kuta y:", gornjaGranicaY, donjaGranicaY);

  if (
    gamma() >= donjaGranicaY && gamma() <= gornjaGranicaY &&
    magHeading() >= donjaGranicaX && magHeading() <= gornjaGranicaX
  ) {
    //Dodati avion u bazu
    var audio = document.getElementById("audiosuccess");
    audio.play();
  } else {
    var audio = document.getElementById("audiofail");
    audio.play();
    console.log("Avion se ne nalazi u traženom zračnom prostoru");
  }
}

//FLIGHTRADAR24
async function fetchFlightData() {
  try {
    const bounds = {
      udaljenostLatE: udaljenostLatE(),
      udaljenostLatW: udaljenostLatW(),
      udaljenostLngN: udaljenostLngN(),
      udaljenostLngS: udaljenostLngS(),
    };
    const response = await fetch(
      "https://veclcridxyeqhbenssvk.supabase.co/functions/v1/APIpoziv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VITE_SUPABASE_KEY}`,
        },
        body: JSON.stringify(bounds),
      },
    );
    const data = await response.json();
    if (response.ok) {
      data.forEach((flight) => {
        setAvionLat(flight.lat);
        setAvionLng(flight.lon);
        setVisina(flight.alt);
        L.marker([avionLat(), avionLng()]).addTo(mapContainer)
          .bindPopup(
            `Let: ${flight.callsign}, Zrakoplov: ${flight.aircraft}, Altituda: ${visina()} m`,
          )
          .openPopup();
        skeniranje(
          latitude(),
          longitude(),
          avionLat(),
          avionLng(),
          visina(),
          gamma(),
        );
      });
    } else {
      console.log("Postoje problemi s dohvačanjem informacija o avionima");
    }
  } catch (error) {
    console.error(error);
  }
}

async function pokretac() {
  try {
    await lokacijaKorisnik();
    if (latitude() !== null && longitude() !== null) {
      const map = L.map(mapContainer).setView([latitude(), longitude()], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        //attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const userMarker = L.marker([latitude(), longitude()])
        .addTo(map)
        .bindPopup("Vaša lokacija")
        .openPopup();
      prozor(latitude(), longitude());

      await getElevation(latitude(), longitude());

      fetchFlightData();

      console.log("Korisnikova lokacija: ", latitude(), longitude());
    } else {
      console.log("Pričekajte da se LAT i LNG učitaju");
    }
  } catch (error) {
    console.error("Error during the process:", error);
  }


return (
  <div className="App">
    {latitude() && longitude()
      ? (
        <div className="map-container">
          <div className="map" ref={(el) => (mapContainer = el)}></div>
        </div>
      )
      : null}

    <h2>Avion</h2>
    <p>kut x između korisnika i aviona: {kutAvionaX()}</p>
    <p>kut y do aviona: {kutYAvion()}</p>
    <p>koordinate aviona: {avionLng()}, {avionLat()}</p>
    <p>visina aviona: {visina()}</p>
    <p>elevacija: {elevation()}</p>

    <h2>Nagib uređaja</h2>
    <p>Alpha (Z os): {alpha().toFixed(2)}</p>
    <p>Beta (X os): {beta().toFixed(2)}</p>
    <p>Gamma (Y os): {gamma().toFixed(2)}</p>
    <p>Kut gledanja: {magHeading()}</p>

    <div className="scene">
      <div className="cube" ref={(el) => cubeRef = el}>
        <div className="face front">Front</div>
        <div className="face back">Back</div>
        <div className="face left">Left</div>
        <div className="face right">Right</div>
        <div className="face top">Top</div>
        <div className="face bottom">Bottom</div>
      </div>
    </div>

    <audio id="audiosuccess" src="src\assets\bingo.mp3"></audio>
    <audio id="audiofail" src="src\assets\fail.mp3"></audio>

    <button className="Pokreni" onClick={pokretac}>Pokreni</button>
  </div>
);
}
export default Navigacija;
