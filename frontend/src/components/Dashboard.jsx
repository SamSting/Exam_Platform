import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const Dashboard = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    const fetchUpdatedUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/current_user', { withCredentials: true });
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error fetching updated user:', error);
      }
    };

    fetchUpdatedUser(); // Automatically fetch updated user data when component mounts

  }, []); // Empty dependency array ensures the effect runs only once

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.displayName}</h1>
          {user.image && <img src={user.image} alt={`${user.displayName}'s profile`} className="profile-pic" />} <br /><br />
          <button onClick={startQuiz}>Start Quiz</button> <br />
          <h1>Your Last Score: {user.score !== undefined ? user.score : 'NA'}</h1>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Dashboard;
