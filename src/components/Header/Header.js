import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; 
import Logo from '../Icons/Logo';

const Header = ({ themeSwitcher }) => {
  return (
    <header className="app-header">
      <div className="logo-nav">
        <Link to="/" className="logo">
          <Logo className="logo-icon" />
        </Link>
        <nav>
          {/* Usamos <Link> en lugar de <a href=""> */}
          <Link to="/">Inicio</Link>
          <Link to="/tareas">Tareas</Link>
          <Link to="/directorio">Directorio</Link>
        </nav>
      </div>
      {themeSwitcher}
    </header>
  );
};

export default Header;