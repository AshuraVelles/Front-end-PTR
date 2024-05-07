import React from 'react';
import './Header.css'; // Assuming you will style it using CSS

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li><a href='/' className='nav-button'>Home</a></li>
          <li><a href='/' className='nav-button'>Sobre</a></li>
          <li><h1>RCA</h1></li>  {/* Logo or title in the center */}
          <li><a href='/'className='nav-button'>Perfil</a></li>
          <li><a href='login' className='nav-button'>Logout</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
