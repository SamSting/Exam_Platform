import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = async (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log('Decoded Token:', credentialResponseDecoded); // Verify the decoded token structure
  
    try {
      const response = await axios.post('http://localhost:5000/auth/google', {
        token: credentialResponse.credential,
      }, {
        withCredentials: true,
      });
      console.log(response.data);
      setUser(credentialResponseDecoded);
      localStorage.setItem('user', JSON.stringify(credentialResponseDecoded));
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  

  return (
    <GoogleOAuthProvider clientId="1939564990-6qvkcvi9jc0s11okocp1vgjujd3ttagr.apps.googleusercontent.com">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={
              <>
                <h1>Login With Google</h1>
                <br />
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  className="login-button"
                />
              </>
            } />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
