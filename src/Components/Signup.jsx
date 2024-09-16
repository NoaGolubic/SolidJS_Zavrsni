import '../CSS/reg.css'


function Registracija() {
  return (
    <div className="container-custom">
      <div className="card-custom">
        <h2 className="form-title">Registracija</h2>
        <form>
          <input type="text" className="input-field" placeholder="Vaše ime"  name="name" value={dataForm.usrName} onChange={handleChange}/>
          <input type="email" className="input-field" placeholder="Vaš email"  name="email" value={dataForm.usrMail} onChange={handleChange}/>
          <input type="password" className="input-field" placeholder="Lozinka"  name="password" value={dataForm.usrPass} onChange={handleChange}/>
          <input type="password" className="input-field" placeholder="Ponovite lozinku" value={dataForm.usrPass2} onChange={handleChange}/>
        <button className="register-btn">Registrirajte se</button>
        <div className="link-options">
          <button className="link-button">
            Već imate račun? Prijavite se
          </button>
        </div>
        </form> 
      </div>      
      </div> 
  );
}

/*UZMI MAIL ZA PONOVO SLANJE LOZINKE*/
const [dataForm, setDataForm] = useState({
    usrMail:'', usrPass:'',usrPass2:'', usrName:''
})

console.log(dataForm)

function handleChange(event){
  event.preventDefault();
    setDataForm((prevDataForm)=>{
        return{
            ...prevDataForm, 
            [event.target.name]: event.target.value
        }
    })
}

/*validacija*/
async function handleSignup(){
  const result = await supabase
  .from('users')            
  .select('name')        
  .textSearch('users', dataForm.usrName, { 
    config: "english",  
  });

  if(result.error){
    console.log("Ovaj korisnik već postoji!")
      } 

    if (dataForm.usrPass !== dataForm.usrPass2) {
        console.log("Lozinke koje ste upisali se ne podudaraju!");
        return;
      } else{
        const { error } = await supabase
        .from('users')
        .insert({name: dataForm.usrName, password: dataForm.usrPass, admin: false})

      }

    const { data, error } = await supabase.auth.signUp({
        email: dataForm.usrMail,
        password: dataForm.usrPass
      })
}

export default Registracija;
