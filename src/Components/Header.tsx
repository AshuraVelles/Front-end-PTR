// src/components/Header.tsx
import React, { useContext } from 'react';
import './Header.css';
import { AuthContext } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext)!;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li> <a href={user ? '/homeUtilizador' : '/'} className='nav-button'>Home</a></li>
          <li><a href='/lostItems' className='nav-button'>Perdidos</a></li>
          <li><a href='/foundItems' className='nav-button'>Achados</a></li>
          <li><h1>RCA</h1></li> 
          <li><a href='/auctions' className='nav-button'>Leilões</a></li>
          {user ? (
            <>
              <li><a href='/profile' className='nav-button'>Perfil</a></li>
              <li><button onClick={handleLogout} className='nav-button'>Logout</button></li>
            </>
          ) : (
            <>
              <li><a href='/login' className='nav-button'>Login</a></li>
              <li><a href='/Register' className='nav-button'>Registo</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
