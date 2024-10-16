import { useLocation} from "@solidjs/router";
import "../CSS/dashbaord.css";
import Navbar from "../Components/Navbar";
import Lokacija from "../Components/Lokacija";
import Nagib from "../Components/Nagib";
import Forma from "../Components/fomra";

const Homepage = () => {
  const location = useLocation();
  const name = location.state?.name || "korisniku";
  return (
      <>
      <Navbar name={name} />
      <div class="flex-container">
        <Lokacija />
        <Nagib />
        <Forma/>
      </div>
      </>
  );
};

export default Homepage;
