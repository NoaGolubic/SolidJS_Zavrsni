import { createSignal } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import supabase from "../Backend/supabase";
import "../CSS/dashbaord.css";
import Navbar from "../Components/Navbar";
import Lokacija from "../Components/Lokacija";
import Nagib from "../Components/Nagib";

const Homepage = () => {
  const location = useLocation();
  const name = location.state?.name || "korisniku";
  return (
    <div>
      <Navbar name={name} />
      <div class="glass-container2">
        <div className="pozadina">
          <h1>Forma za slikane avione</h1>
        </div>
      </div>
     {} <div class="flex-container">
        <Lokacija />
        <Nagib />
      </div>
    </div>
  );
};

export default Homepage;
