import React from 'react';

const Navbar = ({ examName, timer }) => {
  return (
    <nav>
      <div className="logo">Logo</div>
      <div className="exam-name">{examName}</div>
      <div className="timer">{timer}</div>
    </nav>
  );
};

export default Navbar;
