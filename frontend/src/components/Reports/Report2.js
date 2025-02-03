import React, { useState , useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Reports2.css';
import Navbar from "../Navbar";

const Reports2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [vehicleno, setvehicleno] = useState(''); // State for input field
  const [userData, setUserData] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State for error handling

  const [verifyStatus,setVerifyStatus]=useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const report = location.state?.report;

  const findUserByVehicle = async () => {
    try {
        setError(null);
        const normalizedVehicleNo = vehicleno.trim().toUpperCase();
        const response = await axios.get(`http://localhost:8080/api/users/${normalizedVehicleNo}`);
        if (response.data) {
            setUserData(response.data);
        }
    } catch (err) {
        console.error('Error:', err);
        if (err.response?.status === 404) {
            setError('User not found.');
        } else {
            setError('An error occurred while fetching the user.');
        }
        setUserData(null);
    }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fineStatus, setFineStatus] = useState(null);

    const imposeFine = async () => {
        if (!userData || !report) return;

        try {
            setIsSubmitting(true);
            setFineStatus(null);
            
            const fineData = {
                email: userData.email, 
                description: report.description,
                amount: 150.75, 
                reportedBy: report.email, 
                status: "Unpaid",
                createdAt: new Date().toISOString()
            };

            // First create the fine
            const response = await axios.post('http://localhost:8080/api/fines/addFines', fineData);

            if (response.data) {
                setFineStatus('Fine imposed successfully');
            }
        } catch (err) {
            console.error('Error details:', err.response);
            setFineStatus('Failed to impose fine. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateVerifyStatus = async () => {
       const userConfirmation = window.confirm('Fine is imposed? Confirm verification of the report?');
       if (!userConfirmation) {
        // User clicked "Cancel," so exit the function
        return;
        }
        try{
            setIsVerifying(true);
            setVerifyStatus(null);

            const response = await axios.put(`http://localhost:8080/api/reports/update/${report.id}/Pending`);
            if (response.data){
                setVerifyStatus('Successfully verified');
            }

            navigate("/reports");
        }
        catch(err){
            console.error('Error details:',err.response);
            setVerifyStatus('Failed to verify');
        }
        finally{
            setIsVerifying(false);
        }
    }

    const [reportDetails, setReportDetails] = useState(report);

    const invalidReport = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/reports/invalid/${reportDetails.id}/Pending`
        );
        if (response.data) {
          alert('Successfully rejected');
          // Update the local state
          setReportDetails((prevDetails) => ({
            ...prevDetails,
            status: 'Pending',
          }));

          navigate("/reports");
        }
      } catch (err) {
        console.log('Error response', err.response);
      }
    };

  useEffect(() => {
    const fetchReportDetailsById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reports/${report.id}`
        );
        setReportDetails(response.data);
      } catch (err) {
        console.log('Error fetching report details:', err);
      }
    };

    fetchReportDetailsById();
  }, [reportDetails.id]);

  if (!report) {
    return (
      <div>
        <Navbar />
        <div className="error">
          <p>No report data available. Please go back and select a report.</p>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reports2-container">
      <Navbar />
      <div className="report-details-page">
        <h1>Report Details</h1>
        <div className="report-card-detailed">
          <img
            src={reportDetails.imageUrl || 'placeholder-image-url'}
            alt="Violation"
            className="report-image-detailed"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'placeholder-image-url';
            }}
          />
        </div>
        <div className="report-info">
          <h3>{reportDetails.location}</h3>
          <h2>Reported User Details:</h2>
          <p>Email: {reportDetails.email}</p>
          <p>Status: {reportDetails.status}</p>
          <p>Verified: {reportDetails.isVerified ? 'Yes' : 'No'}</p>
          <p>Description: {reportDetails.description}</p>
          <p>Latitude: {reportDetails.coordinates.latitude}</p>
          <p>Longitude: {reportDetails.coordinates.longitude}</p>
          <a
            href={reportDetails.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="maps-link"
          >
            View Location on Google Maps
          </a>
          <button onClick={invalidReport} className="back-button">
            Invalid report
          </button>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>

        <br></br>

        {/* Find User Section */}
        <div className="find-user-section">
          <h2 className='findusertitle'>Find User:</h2>
          <input
            type="text"
            value={vehicleno}
            onChange={(e) => setvehicleno(e.target.value)}
            placeholder="Enter vehicle no"
            className="find-user-input"
          />
          <button onClick={findUserByVehicle} className="back-button">
            Find
          </button>
          {error && <p className="error-message">{error}</p>}
          {userData && (
            <div className="user-data">
              <h3>Violated User Details:</h3>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>

              <button 
                    onClick={imposeFine}
                    disabled={isSubmitting}
                    className="back-button-fine"
                >
                    {isSubmitting ? 'Imposing Fine...' : 'Impose Fine'}
                </button>

                <button 
                    onClick={updateVerifyStatus}
                    disabled={isVerifying}
                    className="back-button-verify"
                >
                    {isVerifying ? 'Verifying...' : 'Verify Report'}
                </button>                
                {fineStatus && (
                    <p className={fineStatus.includes('success') ? 'success-message' : 'error-message'}>
                    {fineStatus}
                    </p>
                )}
                {verifyStatus && (
                    <p className={verifyStatus.includes('success') ? 'success-message' : 'error-message'}>
                    {verifyStatus}
                    </p>
                )}
                </div>
          )}
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default Reports2;

