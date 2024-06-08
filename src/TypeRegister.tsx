import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const typeRegister: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="login-container">
      <div className="welcome-text">Bem-vindos</div>
        <div className="bottom-buttons">
          <button className="novo-user-botao" onClick={() => navigate("/register")}>
            Novo Utilizador
          </button>
          <button className="membro-policia-botao" onClick={() => navigate("/RegisterPolicia")}>
            Membro da Polícia
          </button>
        </div>
      </div>
  );
}

export default typeRegister;
