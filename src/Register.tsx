import React, { useState } from 'react';
import './register.css';
import Header from './Components/Header';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [data_nasc, setDataNasc] = useState('');
  const [morada, setMorada] = useState('');
  const [email, setEmail] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const payload = {
      nome: nome,
      genero: genero,
      data_nasc: data_nasc,
      morada: morada,
      email: email,
      telemovel: telemovel,
      password: password,  // Add the password field here
      ativo: true  // Assuming new users are active by default
    };

    console.log('Payload:', JSON.stringify(payload));  // Log the payload

    try {
      const response = await fetch('http://localhost:3999/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Registration failed:', data.message || data);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="login-container">
       
      <div className="welcome-text">Bem-vindos</div>
      <div className="login-box">
        <div className="login-title">Registar</div>
        <div className="input-container">
          <div className='left'>
            <input
              type="text"
              placeholder="Escolhe um Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              placeholder="Género"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={data_nasc}
              onChange={(e) => setDataNasc(e.target.value)}
            />
          </div>
          <div className='right'>
            <input
              type="text"
              placeholder="Morada"
              value={morada}
              onChange={(e) => setMorada(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nº Telemóvel"
              value={telemovel}
              onChange={(e) => setTelemovel(e.target.value)}
            />
            <input
              type="password"
              placeholder="Escolha uma Palavra-Passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="bottom-buttons">
          <button className="register-button" onClick={handleRegister}>Criar Conta</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
