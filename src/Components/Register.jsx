import '../CSS/reg.css';
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import supabase from '../Backend/supabase';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import threeasy from "threeasy";

// Inicijalizacija Three.js scene
const app = new threeasy(THREE, { alpha: true });
var loader = new GLTFLoader();


let modelURL3 = "src/volume_cloud/scene.gltf";
let modelURL4 = "src/volume_cloud/scene.gltf";
let modelURL9 = "src/volume_cloud/scene.gltf";
let gltf3;
let gltf4;
let gltf9;


loader.load(modelURL3, function(gltf) {
    gltf3 = gltf;
    gltf.scene.scale.x = 0.004;
    gltf.scene.scale.y = 0.004;
    gltf.scene.scale.z = 0.002;

    gltf.scene.position.x = -1,6;  
    gltf.scene.position.y = -1.3;  
    gltf.scene.position.z = 0.005;

    gltf.scene.rotation.y = 1;
  gltf.scene.rotation.z = - 0.0;
  gltf.scene.rotation.x = -0.5;
    app.scene.add(gltf3.scene);
});

loader.load(modelURL4, function(gltf) {
    gltf4 = gltf;
    gltf.scene.scale.x = 0.0043;
    gltf.scene.scale.y = 0.0044;
    gltf.scene.scale.z = 0.003;

    gltf.scene.position.x = 0.8;  
    gltf.scene.position.y = -1.4;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.0;
    gltf.scene.rotation.z = - 0.0;
    gltf.scene.rotation.x = - 0.0;
    app.scene.add(gltf4.scene);
});



loader.load(modelURL9, function(gltf) {
  gltf9 = gltf;
  gltf.scene.scale.x = 0.0032;
  gltf.scene.scale.y = 0.0033;
  gltf.scene.scale.z = 0.0031;

  gltf.scene.position.x = 1.9;  
  gltf.scene.position.y = -0.8;  
  gltf.scene.position.z = 0.005;

  gltf.scene.rotation.y = -2;
  gltf.scene.rotation.z = - 3.5;
  gltf.scene.rotation.x = - 0.49;
  app.scene.add(gltf9.scene);
});

window.addEventListener('wheel', (event) => {
  let brzina = 0.5;
  const scrollY1 = event.deltaY * -0.0001;
  const scrollY2 = event.deltaY * 0.0001;
  gltf3.scene.position.x += scrollY1 * brzina;
  gltf4.scene.position.x += scrollY2 * brzina;
  gltf9.scene.position.x += scrollY2* brzina;
});

//Rasvjeta
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
app.scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); 
app.scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
app.renderer.render(app.scene, app.camera);
}
animate();



const Register = () => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const [successMessage, setSuccessMessage] = createSignal('');

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault(); // Sprječava ponovno učitavanje stranice

    // Validacija lozinki
    if (password() !== confirmPassword()) {
      setErrorMessage("Lozinke se ne podudaraju!");
      return;
    }

    // Validacija emaila (opcionalno)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email())) {
      setErrorMessage("Unesite valjan email!");
      return;
    }

    // Provjera postoji li korisnik s istim imenom ili emailom
    const { data: existingUsers, error: userError } = await supabase
      .from('users')
      .select('id')
      .or(`name.eq.${name()},email.eq.${email()}`); // Provjerava  imena i email

    if (userError) {
      setErrorMessage('Greška pri provjeri korisnika: ' + userError.message);
      return;
    }

    if (existingUsers.length > 0) {
      setErrorMessage("Korisnik s ovim imenom ili email-om već postoji!");
      return;
    }

    try {
      // Umetanje korisnika u Supabase bazu podataka
      const { data, error } = await supabase
        .from('users')
        .insert([{ email: email(), password: password(), name: name(), created_at: new Date() }]);

      if (error) {
        setErrorMessage('Greška pri kreiranju korisnika: ' + error.message);
      } else {
        setSuccessMessage('Korisnik uspješno registriran!');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        navigate("/login"); 
      }
    } catch (error) {
      setErrorMessage('Greška: ' + error.message);
    }
  }

  return (
    <div class="glass-container">
    <canvas id="three-canvas"></canvas>
    <div className="container-custom">
      <div className="card-custom">
        <h2 className="form-title">Registracija</h2>
        <form onSubmit={registerUser}>
          <input
            type="text"
            className="input-field"
            placeholder="Vaše ime"
            name="name"
            value={name()}
            onInput={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input-field"
            placeholder="Vaš email"
            name="email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Lozinka"
            name="password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Ponovite lozinku"
            name="confirmPassword"
            value={confirmPassword()}
            onInput={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-btn">Registrirajte se</button>

          {/* Prikazivanje poruka o greškama ili uspjehu */}
          {errorMessage() && <p style={{ color: 'red' }}>{errorMessage()}</p>}
          {successMessage() && <p style={{ color: 'green' }}>{successMessage()}</p>}

          <div className="link-options">
            <button type="button" onClick={() => navigate('/login')} className="link-button">
              Već imate račun? Prijavite se
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Register;
