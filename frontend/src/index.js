import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import './styles/index.css';
import App from './App';
import Reports from './Reports';
import Profile from './Profile';
import Reports2 from './Report2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap the app with BrowserRouter */}
      <Routes> {/* Define the routes */}
        <Route path="/" element={<Reports />} />
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/app" element={<App />} /> 
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/reports2" element={<Reports2/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
