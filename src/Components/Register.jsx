import "../CSS/reg.css";
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import supabase from "../Backend/supabase";

const Register = () => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [errorMessage, setErrorMessage] = createSignal("");
  const [successMessage, setSuccessMessage] = createSignal("");

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
      .from("users")
      .select("id")
      .or(`name.eq.${name()},email.eq.${email()}`); // Provjerava  imena i email

    if (userError) {
      setErrorMessage("Greška pri provjeri korisnika: " + userError.message);
      return;
    }

    if (existingUsers.length > 0) {
      setErrorMessage("Korisnik s ovim imenom ili email-om već postoji!");
      return;
    }

    try {
      // Umetanje korisnika u Supabase bazu podataka
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email: email(),
            password: password(),
            name: name(),
            created_at: new Date(),
          },
        ]);

      if (error) {
        setErrorMessage("Greška pri kreiranju korisnika: " + error.message);
      } else {
        setSuccessMessage("Korisnik uspješno registriran!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage("Greška: " + error.message);
    }
  };

  return (
    <div class="glass-container">
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
            <button type="submit" className="register-btn">
              Registrirajte se
            </button>

            {/* Prikazivanje poruka o greškama ili uspjehu */}
            {errorMessage() && <p style={{ color: "red" }}>{errorMessage()}</p>}
            {successMessage() && (
              <p style={{ color: "green" }}>{successMessage()}</p>
            )}

            <div className="link-options">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="link-button"
              >
                Već imate račun? Prijavite se
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
