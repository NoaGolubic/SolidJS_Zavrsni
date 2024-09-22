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

let modelURL = "src\assets\dassault_rafale2\scene.gltf";
let modelURL3 = "src/volume_cloud/scene.gltf";
let modelURL4 = "src/volume_cloud/scene.gltf";
let modelURL5 = "src/volume_cloud/scene.gltf";
let modelURL6 = "src/volume_cloud/scene.gltf";
let modelURL7 = "src/volume_cloud/scene.gltf";
let modelURL8 = "src/volume_cloud/scene.gltf";
let modelURL9 = "src/volume_cloud/scene.gltf";

let gltf1;
let gltf3;
let gltf4;
let gltf5;
let gltf6;
let gltf7;
let gltf8;
let gltf9;
loader.load(modelURL, function(gltf) {
    gltf1 = gltf;
    gltf.scene.scale.x = 0.09;
    gltf.scene.scale.y = 0.09;
    gltf.scene.scale.z = 0.09;

    gltf.scene.position.x = 0;
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 0;

    gltf.scene.rotation.y = -0.0;
  gltf.scene.rotation.z = - 0.0;
  gltf.scene.rotation.x = - 0.0;
    app.scene.add(gltf1.scene);
});


loader.load(modelURL3, function(gltf) {
    gltf3 = gltf;
    gltf.scene.scale.x = 0.004;
    gltf.scene.scale.y = 0.002;
    gltf.scene.scale.z = 0.002;

    gltf.scene.position.x = -3;  
    gltf.scene.position.y = -1.4;  
    gltf.scene.position.z = 0.005;

    gltf.scene.rotation.y = -0.0;
  gltf.scene.rotation.z = - 0.0;
  gltf.scene.rotation.x = - 0.0;
    app.scene.add(gltf3.scene);
});
function animate() {
  requestAnimationFrame(animate);
app.renderer.render(app.scene, app.camera);
}
animate();


loader.load(modelURL4, function(gltf) {
    gltf4 = gltf;
    gltf.scene.scale.x = 0.0043;
    gltf.scene.scale.y = 0.0044;
    gltf.scene.scale.z = 0.003;

    gltf.scene.position.x = -1.4;  
    gltf.scene.position.y = -1.3;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.0;
    gltf.scene.rotation.z = - 0.0;
    gltf.scene.rotation.x = - 0.0;
    app.scene.add(gltf4.scene);
});

loader.load(modelURL5, function(gltf) {
    gltf5 = gltf;
    gltf.scene.scale.x = 0.0053;
    gltf.scene.scale.y = 0.0032;
    gltf.scene.scale.z = 0.0031;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -2;  
    gltf.scene.position.z = 0.005;

    gltf.scene.rotation.y = -0.0;
    gltf.scene.rotation.z = - 0.0;
    gltf.scene.rotation.x = - 0.0;
    app.scene.add(gltf5.scene);
});

loader.load(modelURL6, function(gltf) {
    gltf6 = gltf;
    gltf.scene.scale.x = 0.0072;
    gltf.scene.scale.y = 0.0043;
    gltf.scene.scale.z = 0.0031;

    gltf.scene.position.x = 1.8;  
    gltf.scene.position.y = -1.44;  
    gltf.scene.position.z = 0.005;

    gltf.scene.rotation.y = -0.0;
    gltf.scene.rotation.z = - 0.0;
    gltf.scene.rotation.x = - 0.0;
    app.scene.add(gltf6.scene);
});

loader.load(modelURL7, function(gltf) {
    gltf7 = gltf;
    gltf.scene.scale.x = 0.0072;
    gltf.scene.scale.y = 0.0042;
    gltf.scene.scale.z = 0.0041;

    gltf.scene.position.x = 3;  
    gltf.scene.position.y = -1.2;  
    gltf.scene.position.z = 0.005;

    gltf.scene.rotation.y = -0.0;
    gltf.scene.rotation.z = - 0.0;
    gltf.scene.rotation.x = - 0.0;
    app.scene.add(gltf7.scene);
});

loader.load(modelURL8, function(gltf) {
  gltf8 = gltf;
  gltf.scene.scale.x = 0.0072;
  gltf.scene.scale.y = 0.0033;
  gltf.scene.scale.z = 0.0031;

  gltf.scene.position.x = -1.87;  
  gltf.scene.position.y = -1.44;  
  gltf.scene.position.z = 0.005;

  gltf.scene.rotation.y = -0.0;
  gltf.scene.rotation.z = - 0.0;
  gltf.scene.rotation.x = - 0.0;
  app.scene.add(gltf8.scene);
});

loader.load(modelURL9, function(gltf) {
  gltf9 = gltf;
  gltf.scene.scale.x = 0.0072;
  gltf.scene.scale.y = 0.0033;
  gltf.scene.scale.z = 0.0031;

  gltf.scene.position.x = 2.4;  
  gltf.scene.position.y = -1.64;  
  gltf.scene.position.z = 0.005;

  gltf.scene.rotation.y = -0.077;
  gltf.scene.rotation.z = - 0.41;
  gltf.scene.rotation.x = - 0.49;
  app.scene.add(gltf9.scene);
});

window.addEventListener('wheel', (event) => {
  let brzina = 0.5;
  const scrollY1 = event.deltaY * -0.0001;
  const scrollY2 = event.deltaY * 0.0001;
  gltf3.scene.position.x += scrollY1 * brzina;
  gltf4.scene.position.x += scrollY2 * brzina;
  gltf5.scene.position.x += scrollY1 * brzina;
  gltf6.scene.position.x += scrollY2 * brzina;
  gltf7.scene.position.x += scrollY1 * brzina;
  gltf8.scene.position.x += scrollY2 * brzina;
  gltf9.scene.position.x += scrollY2* brzina;
});
//Rasvjeta
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
app.scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); 
app.scene.add(ambientLight);

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
    <div class="container">
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
