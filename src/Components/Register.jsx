import '../CSS/reg.css'
import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";
import { createClient } from "@supabase/supabase-js";
import supabase from '../supabase';


const Register = () => {  
    const [name, setName] = createSignal(''); 
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            name: name(),
            email: email(),
            password: password(),
        })
        if (error) {
            alert(error.message);
            return;
        }
        if (data) {
            navigate("/");
        }
    }
  return (
    <div className="container-custom">
      <div className="card-custom">
        <h2 className="form-title">Registracija</h2>
        <form onsubmit={(e) => registerUser(e)}>
          <input type="text" className="input-field" placeholder="Vaše ime"  name="name" onChange={(e) => setName(e.target.value)} />
          <input type="email" className="input-field" placeholder="Vaš email"  name="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="input-field" placeholder="Lozinka"  name="password" onChange={(e) => setPassword(e.target.value)} />
          <input type="password" className="input-field" placeholder="Ponovite lozinku" onChange={(e) => setPassword(e.target.value)} />
        <button className="register-btn">Registrirajte se</button>
        <div className="link-options">
          <button href="/login"className="link-button">
            Već imate račun? Prijavite se
          </button>
        </div>
        </form> 
      </div>      
      </div> 
  );
}

export default Register;