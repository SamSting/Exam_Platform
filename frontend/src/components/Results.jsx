import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div>
      <h1>Quiz Result</h1>
      <p>Your score is: {score} out of {total}</p>
    </div>
  );
};

export default Results;
