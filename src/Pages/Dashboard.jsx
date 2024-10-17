import { useLocation} from "@solidjs/router";
import Navbar from "../Components/Navbar";
import Navigacija from "../Components/Navigacija";
import Forma from "../Components/forma";
import  "../CSS/dashboard.css";

const Homepage = () => {
  const location = useLocation();
  const name = location.state?.name || "korisniku";
  return (
      <>
      <Navbar name={name} />
      <div class="flex-container">
        <Forma/>
        <Navigacija/>
      </div>
      </>
  );
};

export default Homepage;
