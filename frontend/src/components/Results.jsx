import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, email } = location.state || { score: 0, total: 0, email: '' };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!email) {
          console.error('User email not found in state');
          return;
        }

        console.log(`Fetching user with email: ${email}`);
        const response = await axios.get(`http://localhost:5000/auth/user?email=${email}`);
        console.log('User fetched:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [email]);

  useEffect(() => {
    const updateScore = async () => {
      try {
        if (user && user.email) {
          console.log(`Updating score for ${user.email} to ${score}`);
          await axios.post('http://localhost:5000/auth/update_score', {
            email: user.email,
            score: score,
          });
          console.log('Score updated');
        }
      } catch (error) {
        console.error('Error updating score:', error);
      }
    };

    updateScore();
  }, [score, user]);

  const handleExit = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Quiz Result</h1>
      {user ? (
        <p>
          Welcome, {user.displayName}! Your score is: {score} out of {total}
        </p>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={handleExit}>Exit</button>
    </div>
  );
};

export default Results;
