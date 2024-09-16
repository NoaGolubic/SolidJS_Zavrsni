// Login.js
import '../CSS/log.css';
import { createSignal } from "solid-js";



const Login = () => {
  const[email,setEmail] = createSignal("");
  const[password,setPassword] = createSignal("");

  return(
    <div className="prijava-container">      
      <form>
        <h2>Prijava</h2>
        <input type="name"  onChange={(e)=>setEmail(e.target.value)} placeholder="Korisničko ime" name='name'/>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Lozinka" name='password' />
        <button type="submit">Prijavite se</button>
      </form>
    </div>
  )
}

export default Login;