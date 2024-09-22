import {Route} from "@solidjs/router"
import Login from '../Components/Login';
import Dashboard from "./Dashboard";
import Register from "../Components/Register";

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
