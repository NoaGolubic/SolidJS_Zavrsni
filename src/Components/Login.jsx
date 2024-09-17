// Login.js
import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import { createClient } from '@supabase/supabase-js';
import "../CSS/log.css"

const Login = () => {
  const [name, setName] = createSignal(''); 
  const [email, setEmail] = createSignal(''); 
  const [password, setPassword] = createSignal('');
  const navigate = useNavigate();

  const supabaseKEY = import.meta.env.VITE_SUPABASE_KEY;
  const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
  const supabase = createClient(supabaseURL, supabaseKEY);


const loginUser = async (e) => {
  e.preventDefault();
  const { data, error } = await supabase.auth.signInWithPassword({
      name: name(),
      email: email(),
      password: password(),
  })
  if (error) {
      alert(error.message);
      return;
  }
  if (data) {
      navigate("/home");
  }
}

  return(
    <div className="prijava-container">      
      <form onSubmit={(e) => loginUser(e)}>
        <h2>Prijava</h2>
        <input type="name"  onChange={(e)=>setName(e.target.value)} placeholder="Korisničko ime" name='name'/>
        <input type="email"  onChange={(e)=>setEmail(e.target.value)} placeholder="Email" name='email'/>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Lozinka" name='password' />
        <button type="submit">Prijavite se</button>
      </form>
    </div>
  )
}


export default Login;