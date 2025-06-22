import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={() => navigate('/')}>ILE</h1>
      </div>
    </header>
  );
};

export default Header;
