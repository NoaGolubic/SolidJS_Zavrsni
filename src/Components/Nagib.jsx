import { createSignal, onMount, onCleanup } from "solid-js";
import "../CSS/nagib.css"

function Nagib() {
  const [latitude, setLatitude] = createSignal(null);
  const [longitude, setLongitude] = createSignal(null);
  const [alpha, setAlpha] = createSignal(0);  
  const [beta, setBeta] = createSignal(0);    
  const [gamma, setGamma] = createSignal(0);  

  let cubeRef;
  
  onMount(() => {
    
    const handleOrientation = (event) => {
      setAlpha(event.alpha); 
      setBeta(event.beta);    
      setGamma(event.gamma);  


      if (cubeRef) {
        cubeRef.style.transform = `rotateX(${beta()}deg) rotateY(${gamma()}deg) rotateZ(${alpha()}deg)`;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    onCleanup(() => {
      window.removeEventListener('deviceorientation', handleOrientation);
    });
  });

  return (
    <div className="App">
      <h2>Nagib uređaja</h2>
      <p>Alpha (Z os): {alpha().toFixed(2)}</p>
      <p>Beta (X os): {beta().toFixed(2)}</p>
      <p>Gamma (Y os): {gamma().toFixed(2)}</p>

      {/* 3D kocka */}
      <div className="scene">
        <div className="cube" ref={el => cubeRef = el}>
          <div className="face front">Front</div>
          <div className="face back">Back</div>
          <div className="face left">Left</div>
          <div className="face right">Right</div>
          <div className="face top">Top</div>
          <div className="face bottom">Bottom</div>
        </div>
      </div>
    </div>
  );
}

export default Nagib;
