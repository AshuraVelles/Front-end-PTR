import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li><a href='/' className='nav-button'>Home</a></li>
          <li><a href='/lostItems' className='nav-button'>Perdidos</a></li>
          <li><a href='/foundItems' className='nav-button'>Achados</a></li>
          <li><h1>RCA</h1></li> 
          <li><a href='/profile'className='nav-button'>Perfil</a></li>
          <li><a href='/login' className='nav-button'>Login</a></li>
          <li><a href='/register' className='nav-button'>Register</a></li>
          <li><a href='/auctions' className='nav-button'>Leilões</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
