import {Route} from "@solidjs/router"
import Login from '../Components/Login';
import Homepage from "./homepage";
import Register from "../Components/Register";
{/*import Regeister from '../Components/Signup';*/}

function App() {
  return(
    <>
      <Route path="/" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/home" component={Homepage}/>
      {/*<Route path="/register" component={Regeister}/>*/}
    </>
  );
}

export default App;
