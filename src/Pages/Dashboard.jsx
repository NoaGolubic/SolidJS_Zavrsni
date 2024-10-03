import { useLocation} from "@solidjs/router";
import "../CSS/dashbaord.css";
import Navbar from "../Components/Navbar";
import Lokacija from "../Components/Lokacija";
import Nagib from "../Components/Nagib";

const Homepage = () => {
  const location = useLocation();
  const name = location.state?.name || "korisniku";
  return (
      <>
      <Navbar name={name} />
      <div class="glass-container2">
        <div className="pozadina">
          <h1>Forma za slikane avione</h1>
        </div>
      </div>
      <div class="flex-container">
        <Lokacija />
        <Nagib />
      </div>
      </>
  );
};

export default Homepage;
