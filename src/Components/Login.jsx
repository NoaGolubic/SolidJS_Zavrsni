import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase';
import "../CSS/log.css";
import * as THREE from "three";
import threeasy from "threeasy";

const Login = () => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const navigate = useNavigate();

  let canvasRef;

  onMount(() => {
    const app = new threeasy(THREE, { alpha: true, canvas: canvasRef });

    // Glass material for the frame
    const glassMaterial = app.material({
      type: 'physical',
      transmission: 1.0,
      roughness: 0.0,
      ior: 1.5,
      thickness: 0.1,
      color: 0xffffff,
    });

    // Frame geometry (slightly larger than the form)
    const frameGeometry = app.geometry({ type: 'box', width: 1.2, height: 1.2, depth: 0.05 });
    const frameMesh = app.mesh({ geometry: frameGeometry, material: glassMaterial });

    // Positioning the frame
    frameMesh.position.set(0, 0, -0.5);
    app.scene.add(frameMesh);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    app.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    app.scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      app.renderer.render(app.scene, app.camera);
    };
    animate();
  });

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
  
      navigate("/home", { state: { name: data.name } });
    } catch (error) {
      setErrorMessage('Greška: ' + error.message);
    }
  };

  return (
    <div className="prijava-container">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute' }}></canvas>
      <form onSubmit={loginUser} style={{ position: 'relative', zIndex: 1 }}>
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
  );
};

export default Login;
