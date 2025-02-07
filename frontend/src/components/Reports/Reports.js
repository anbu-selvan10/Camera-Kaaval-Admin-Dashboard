import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Reports.css';
import Navbar from "../Navbar";
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerifiedView, setIsVerifiedView] = useState(false);

  const [input, setInput] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true); 
      const response = await axios.get('http://localhost:8080/api/reports/unverified', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('API Response:', response.data); 
      setReports(response.data);
      setIsVerifiedView(false);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value); 

    if (value.trim() === '') {
      fetchReports(); 
    } else {
      const filteredReports = reports.filter(
        (report) =>
          report.location.toLowerCase().includes(value.toLowerCase()) ||
          report.email.toLowerCase().includes(value.toLowerCase())
      );
      setReports(filteredReports);
    }
  };

  const fetchVerifiedReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/reports/verified', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Verified Reports API Response:', response.data); 
      setReports(response.data);
      setIsVerifiedView(true);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleReportsView = () => {
    if (isVerifiedView) {
      fetchReports(); // Fetch unverified reports
    } else {
      fetchVerifiedReports(); // Fetch verified reports
    }
  };

  // ... rest of the existing methods (handleChange, handleSelect, etc.) remain the same

  const handleVerify = (id, currentStatus, report) => {
    navigate('/reports2', { state: { report } });
  };

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <Navbar/>

      <div className="reports-container">
        <h1>Violation Reports</h1>
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search by location or email"
            aria-label="Search"
            value={input}
            onChange={handleInputChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button 
            className={`view-reports-toggle ${isVerifiedView ? 'unverified-view' : 'verified-view'}`} 
            onClick={toggleReportsView}
          >
            {isVerifiedView ? 'View Unverified Reports' : 'View Verified Reports'}
          </button>
          {/* ... rest of the search results code ... */}
        </div>

        <br></br>
        <div className="reports-grid">
          {reports.length > 0 ? (
            reports.map((report) => (
              report ? (
                <div key={report._id} className="report-card">
                  <img
                    src={report.imageUrl || 'placeholder-image-url'}
                    alt="Violation"
                    className="report-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'placeholder-image-url';
                    }}
                  />
                  <div className="report-details">
                    <h3>{report.location}</h3>
                    <p className="email">{report.email}</p>
                    <div className="status-badges">
                      <span className={`badge ${report.verified ? 'verified' : 'unverified'}`}>
                        {report.verified ? 'Verified' : 'Unverified'}
                      </span>
                      <span className={`badge ${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                    </div>
                    <a
                      href={report.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="maps-link"
                    >
                      View Location
                    </a>
                    <button
                      onClick={() => handleVerify(report._id, report.verified, report)}
                      className="verify-button"
                    >
                      {report.verified ? 'Mark Unverified' : 'Verify Report'}
                    </button>
                  </div>
                </div>
              ) : null 
            ))
          ) : (
            <div className="no-reports">No reports found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;

