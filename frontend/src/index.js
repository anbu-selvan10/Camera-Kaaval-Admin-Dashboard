import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import './styles/index.css';
import App from './App';
import Reports from './components/Reports/Reports.js';
import Profile from './components/Profile/Profile.js';
import Reports2 from './components/Reports/Report2.js';
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap the app with BrowserRouter */}
      <Routes> {/* Define the routes */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/" element={<Home/>} />
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/app" element={<App />} /> 
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/reports2" element={<Reports2/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
