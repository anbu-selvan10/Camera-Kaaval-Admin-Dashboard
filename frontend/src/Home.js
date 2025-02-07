import React, { use } from 'react';
import './styles/Home.css';
import profile from "./images/profile.jpg";
import traffic from "./images/traffic2.jpg";
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const Home = () => {

    const navigate = useNavigate();
    function navigateReports(){
        navigate("/reports");
    }

    function navigateProfiles(){
        navigate("/profile");
    }
    
    return (
        <div>
            <Navbar/>
        
        <div className="homepage-container">
        {/* Section 1 */}
        <section className="home1-section">
            <div className="home1-text">
            <h1>Verify Reports</h1>
            <p>
                In this town, we got people reporting traffic violations.
                These reports can be both real or fake.
                As an admin, it is our responsibility to check whether the report is
                valid or not.
                <br></br>
                <br></br>

                Impose Fines, Prevent Accidents !!!
            </p>
            <button className="btn-primary" onClick={navigateReports}>
                    Verify Reports</button>
            </div>
            <div className="home1-image">
            <img
                src={traffic}
                alt="Reports Preview"
            />
            </div>
            
        </section>

        {/* Section 2 */}
        <section className="profile-section">
        <div className="home2-image">
            <img
                src={profile}
                alt="profile Preview"
            />
            </div>
            <div className="profile-content">
            <h2>Verify Profiles</h2>
            <p>
                Users tend to use our app with sheer interest.
                The users will be uploading their vehicle licenses.
                As an admin, check whether the vehicle number is valid.
                If valid, then allow them to report, else reject.

            </p>
            <button className="btn-secondary" onClick={navigateProfiles}>Verify Profiles</button>
            </div>
            
        </section>
        </div>
        </div>
  );
};

export default Home;
