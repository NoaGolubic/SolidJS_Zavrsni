import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase';
import "../CSS/log.css";

const Login = () => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email())
        .eq('password', password())
        .eq('name', name())
        .single();
  
      if (error || !data) {
        setErrorMessage('Neispravni podaci za prijavu. Pokušajte ponovo.');
        return;
      }
  
      // Ako su podaci ispravni, preusmjeri na stranicu s korisničkim imenom
      navigate("/home", { state: { name: data.name } });
    } catch (error) {
      setErrorMessage('Greška: ' + error.message);
    }
  };

  return (
    <div className="glass-container4">
    <div className="prijava-container">      
    <form onSubmit={loginUser}>
      <h2>Prijava</h2>
      <input 
        type="text" 
        onInput={(e) => setName(e.target.value)} 
        placeholder="Korisnicko ime" 
        required 
      />
      <input 
        type="email" 
        onInput={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        onInput={(e) => setPassword(e.target.value)} 
        placeholder="Lozinka" 
        required 
      />
      <button type="submit">Prijavite se</button>

      {errorMessage() && <p style={{ color: 'red' }}>{errorMessage()}</p>}
    </form>
  </div>
  </div>
);
};
export default Login;
