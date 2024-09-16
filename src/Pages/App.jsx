import {Route} from "@solidjs/router"
import Login from '../Components/Login';
import Homepage from "./homepage";
{/*import Regeister from '../Components/Signup';*/}

function App() {
  return(
    <>
      <Route path="/" component={Login}/>
      <Route path="/login" component={Login}/>
      <Route path="/home" component={Homepage}/>
      {/*<Route path="/register" component={Regeister}/>*/}
    </>
  );
}

export default App;
