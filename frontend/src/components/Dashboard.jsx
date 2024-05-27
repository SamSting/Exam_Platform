import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  if (!user) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  }

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          {user.picture && <img src={user.picture} alt={`${user.name}'s profile`} className="profile-pic" />} <br /><br />
          <button onClick={startQuiz}>Start Quiz</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Dashboard;
