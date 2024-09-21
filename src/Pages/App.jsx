import {Route} from "@solidjs/router"
import Login from '../Components/Login';
import Dashboard from "./dashboard";
import Register from "../Components/Register";
{/*import Regeister from '../Components/Signup';*/}

function App() {
  return(
    <>
      <Route path="/" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/home" component={Dashboard}/>

    </>
  );
}

export default App;
