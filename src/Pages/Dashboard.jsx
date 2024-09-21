import { createSignal } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import supabase from '../supabase'; 
import "../CSS/dashbaord.css";

const Homepage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state?.name || "korisniku";

    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut(); 
        if (error) {
            console.error('Greška pri odjavi:', error.message);
        } else {
            navigate("/login"); 
        }
    };

    // Dummy data for airplane images (replace with real data)
    const airplaneImages = [
        { id: 1, url: 'url1.jpg', description: 'Avion 1' },
        { id: 2, url: 'url2.jpg', description: 'Avion 2' },
        { id: 3, url: 'url3.jpg', description: 'Avion 3' },
    ];

    return (
        <div>
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <h4>Welcome, {name}!</h4>
                <button className="logout-button" onClick={logoutUser}>Odjavi se</button>
            </header>
            <main className="image-gallery">
                {airplaneImages.map(image => (
                    <div className="image-card" key={image.id}>
                        <img src={image.url} alt={image.description} className="airplane-image" />
                        <p className="image-description">{image.description}</p>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Homepage;
