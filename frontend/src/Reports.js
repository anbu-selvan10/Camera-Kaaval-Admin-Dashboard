import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Reports.css';
import Navbar from "./Navbar";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [input, setInput] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reports/unverified/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
        console.log(response.data);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleSelect = (result) => {
    setInput(result.location);
    setShowSearchResults(false);
    
    const selectedReport = reports.find(
      (report) => report.location === result.location || report.email === result.email
    );
    
    setReports([selectedReport]);
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
    } catch (err) {
      console.error('Error:', err);
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };
  

  const handleVerify = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/reports/update/${id}/${!currentStatus}`);
      fetchReports();
    } catch (err) {
      console.error('Verification error:', err);
    }
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
          {showSearchResults && (
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleSelect(result)}
                  >
                    {result.email}
                  </div>
                ))
              ) : (
                noResults && <div className="no-results">No Product with such Name</div>
              )}
            </div>
          )}
          </div>

          <br>
          </br>
        <div className="reports-grid">
          {reports.length > 0 ? (
            reports.map((report) => (
              // Check if the report is not undefined and has the required properties
              report ? (
                <div key={report._id} className="report-card">
                  {/* Check if imageUrl exists, otherwise use a fallback */}
                  <img
                    src={report.imageUrl || 'placeholder-image-url'} // Use placeholder if no imageUrl
                    alt="Violation"
                    className="report-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'placeholder-image-url'; // Use a placeholder if image fails to load
                    }}
                  />
                  <div className="report-details">
                    <h3>{report.location}</h3>
                    <p className="email">{report.email}</p>
                    <div className="status-badges">
                      <span className={`badge ${report.isVerified ? 'verified' : 'unverified'}`}>
                        {report.isVerified ? 'Verified' : 'Unverified'}
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
                      onClick={() => handleVerify(report._id, report.isVerified)}
                      className="verify-button"
                    >
                      {report.isVerified ? 'Mark Unverified' : 'Verify Report'}
                    </button>
                  </div>
                </div>
              ) : null // Return null if the report is undefined or null
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
