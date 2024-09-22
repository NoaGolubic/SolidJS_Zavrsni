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
let modelURL = "/src/assets/dassault_rafale2/scene.gltf";
let modelURL2 = "/src/assets/dassault_rafale2/scene.gltf";
let gltf1;
let gltf2;
let gore = false;
loader.load(modelURL, function(gltf) {
    gltf1 = gltf;
    gltf.scene.scale.x = 0.03;
    gltf.scene.scale.y = 0.03;
    gltf.scene.scale.z = 0.03;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf1.scene);
});

loader.load(modelURL2, function(gltf) {
  gltf2 = gltf;
    gltf.scene.scale.x = 0.03;
    gltf.scene.scale.y = 0.03;
    gltf.scene.scale.z = 0.03;

    gltf.scene.position.x = -1.15;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = 0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf2.scene);
});

window.addEventListener('wheel', (event) => {
  const max = 0.08;
  const scrollY = event.deltaY * -0.0001;
  let newScale = gltf1.scene.scale.x + scrollY;
  let minScale = (0.03, 0.03, 0.03);
  newScale = Math.min(Math.max(newScale, minScale), max);
        gltf1.scene.scale.set(newScale, newScale, newScale);
        gltf2.scene.scale.set(newScale, newScale, newScale);

        if (newScale >= max){
        gltf1.scene.rotation.y = event.deltaY * -0.2;
        gltf2.scene.rotation.y = event.deltaY * -0.2;
        gore = true;
        }
});


function animate() {
  requestAnimationFrame(animate);
  window.addEventListener('wheel', (event) => {

if(gore === true){
gltf1.scene.rotation.y += event.deltaY * 0.8;
gltf2.scene.rotation.y += event.deltaY * 0.8;

}
app.renderer.render(app.scene, app.camera);
}); 
}

animate();



/*
loader.load(modelURL3, function(gltf) {
    gltf3 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf3.scene);
});

loader.load(modelURL4, function(gltf) {
    gltf4 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf4.scene);
});

loader.load(modelURL5, function(gltf) {
    gltf5 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf5.scene);
});

loader.load(modelURL6, function(gltf) {
    gltf6 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf6.scene);
});

loader.load(modelURL7, function(gltf) {
    gltf7 = gltf;
    gltf.scene.scale.x = 0.005;
    gltf.scene.scale.y = 0.005;
    gltf.scene.scale.z = 0.005;

    gltf.scene.position.x = 1;  
    gltf.scene.position.y = -0.8;  
    gltf.scene.position.z = 0.00005;

    gltf.scene.rotation.y = -0.477;
    gltf.scene.rotation.z = - 0.41;
    gltf.scene.rotation.x = - 0.4;
    app.scene.add(gltf7.scene);
});
*/
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
  );
}

export default Register;
