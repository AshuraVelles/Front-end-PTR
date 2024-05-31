import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const typeRegister: React.FC = () => {
  const [hasErrors, setHasErrors] = useState(false);
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  
  return (
    <div className="login-container">
      <div className="welcome-text">Bem-vindos</div>
      <div className={`type-box ${hasErrors ? 'error-active' : ''}`}>
        <div className="bottom-buttons">
          <button className="novo-user-botao" onClick={() => navigate("/register")}>
            Novo Utilizador
          </button>
          <button className="membro-policia-botao" onClick={() => navigate("/RegisterPolicia")}>
            Membro da Polícia
          </button>
        </div>
      </div>
    </div>
  );
}

export default typeRegister;
