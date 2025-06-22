import React from 'react';
import './Header.css';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo">
          <h1>ILE</h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;
