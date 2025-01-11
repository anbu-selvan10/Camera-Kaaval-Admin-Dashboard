import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import "./styles/profiles.css";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  useEffect(() => {
    console.log('Updated Users:', users);
  }, [users]);

  const fetchUserProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/users/unverified', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', response.data);
      setUsers(response.data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (email) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/verify/${email}`);
      console.log('Verification Response:', response.data);
      alert(response.data); // Display the response message as an alert
      // Optionally, update the user's isVerified status locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, isVerified: true } : user
        )
      );
    } catch (error) {
      console.error('Error verifying user:', error);
      alert('Failed to verify user. Please try again.');
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="users-container">
        <div className="users-grid">
        {users.length > 0 ? (
          users.map((user, index) => (
            user ? (
              <div key={user._id || index} className="user-card">
                <img
                  src={user.downloadUri || 'placeholder-image-url'}
                  alt="Violation"
                  className="user-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'placeholder-image-url';
                  }}
                />
                <div className="user-details">
                  <h3>{user.vehicleno}</h3>
                  <p className="email">{user.email}</p>
                  <div className="status-badges">
                    <span className={`badge ${user.isVerified ? 'verified' : 'unverified'}`}>
                      {user.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                  {!user.isVerified && (
                    <button
                      className="verify-button"
                      onClick={() => handleVerify(user.email)}
                    >
                      Verify Profile
                    </button>
                  )}
                </div>
              </div>
            ) : null
          ))
        ) : (
          <div className="no-users">No users found</div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Profile;


