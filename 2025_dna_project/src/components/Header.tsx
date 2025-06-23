import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={() => navigate('/')}>ILE</h1>
        <nav className="nav-links">
          <button onClick={() => navigate('/my-loans')} className="nav-button">
            내 대출 현황
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
