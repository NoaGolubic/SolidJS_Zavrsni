import { createSignal } from "solid-js";
import "../CSS/info.css";
import Navbar from "../Components/Navbar";
import { useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase'; 
import "../CSS/navbar.css";

//info o API, posuđenim modelima i radu aplikacije (tekst)
const info = () => {
  return (
    <div className="kartica-wrap">
        <Navbar showWelcome={false} />
      <div className="glass-kartica1">
        <h3 className="api">API - FlightRadar24</h3>
        <p className="papi">
          Lorem Ipsum je jednostavno probni tekst koji se koristi u tiskarskoj i
          slovoslagarskoj industriji. Lorem Ipsum postoji kao industrijski
          standard još od 16-og stoljeća, kada je nepoznati tiskar uzeo
          tiskarsku galiju slova i posložio ih da bi napravio knjigu s uzorkom
          tiska. Taj je tekst ne samo preživio pet stoljeća, već se i vinuo u
          svijet elektronskog slovoslagarstva, ostajući u suštini nepromijenjen.
          Postao je popularan tijekom 1960-ih s pojavom Letraset listova s
          odlomcima Lorem Ipsum-a, a u skorije vrijeme sa software-om za stolno
          izdavaštvo kao što je Aldus PageMaker koji također sadrži varijante
          Lorem Ipsum-a.
        </p>
      </div>
      <div className="glass-kartica2">
        <h3 className="modeli">3d modeli, licence i autori</h3>
        <p className="pmodeli">
          Lorem Ipsum je jednostavno probni tekst koji se koristi u tiskarskoj i
          slovoslagarskoj industriji. Lorem Ipsum postoji kao industrijski
          standard još od 16-og stoljeća, kada je nepoznati tiskar uzeo
          tiskarsku galiju slova i posložio ih da bi napravio knjigu s uzorkom
          tiska. Taj je tekst ne samo preživio pet stoljeća, već se i vinuo u
          svijet elektronskog slovoslagarstva, ostajući u suštini nepromijenjen.
          Postao je popularan tijekom 1960-ih s pojavom Letraset listova s
          odlomcima Lorem Ipsum-a, a u skorije vrijeme sa software-om za stolno
          izdavaštvo kao što je Aldus PageMaker koji također sadrži varijante
          Lorem Ipsum-a.
        </p>
      </div>
    </div>
  );
};

export default info;
