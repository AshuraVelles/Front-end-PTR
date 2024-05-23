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
  const [errors, setErrors] = useState({});
  const [hasErrors, setHasErrors] = useState(false); 
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
  
    if (!username) newErrors.username = 'Username é obrigatório';
    if (!nome) newErrors.nome = 'Nome é obrigatório';
    if (!genero) newErrors.genero = 'Género é obrigatório';
    if (!data_nasc) newErrors.data_nasc = 'Data de nascimento é obrigatória';
    if (!morada) newErrors.morada = 'Morada é obrigatória';
    if (!email) newErrors.email = 'E-mail é obrigatório';
    if (!telemovel) {
      newErrors.telemovel = 'Número de telemóvel é obrigatório';
    } else if (!/^\d+$/.test(telemovel)) {
      newErrors.telemovel = 'Introduza apenas dígitos';
    }
    if (!password) {
      newErrors.password = 'Palavra-passe é obrigatória';
    } else if (password.length < 8) { // Updated minimum length to 8 characters
      newErrors.password = 'Palavra-passe deve ter pelo menos 8 caracteres';
    } else if (!/[A-Z]/.test(password) || !/\d/.test(password)) { // Ensure at least one uppercase letter and one number
      newErrors.password = 'Palavra-passe deve conter pelo menos uma letra maiúscula e um número';
    }
  
    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setHasErrors(hasErrors);
    return !hasErrors;
  };
  

  const handleRegister = async () => {
    if (!validate()) return;

    const payload = {
      username: username,
      nome: nome,
      genero: genero,
      data_nasc: data_nasc,
      morada: morada,
      email: email,
      telemovel: telemovel,
      password: password,
      ativo: true
    };

    console.log('Payload:', JSON.stringify(payload));

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
      <div className={`login-box ${hasErrors ? 'error-active' : ''}`}>
        <div className="login-title">Registar</div>
        <div className="input-container">
          <div className='left'>
            <label>Escolhe um Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="error">{errors.username}</div>}

            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && <div className="error">{errors.nome}</div>}

            <label>Género</label>
            <input
              type="text"
              placeholder="Género"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
            {errors.genero && <div className="error">{errors.genero}</div>}

            <label>E-mail</label>
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className='right'>
            <label>Data de Nascimento</label>
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={data_nasc}
              onChange={(e) => setDataNasc(e.target.value)}
            />
            {errors.data_nasc && <div className="error">{errors.data_nasc}</div>}
          
            <label>Morada</label>
            <input
              type="text"
              placeholder="Morada"
              value={morada}
              onChange={(e) => setMorada(e.target.value)}
            />
            {errors.morada && <div className="error">{errors.morada}</div>}

            <label>Nº Telemóvel</label>
            <input
              type="text"
              placeholder="Nº Telemóvel"
              value={telemovel}
              onChange={(e) => setTelemovel(e.target.value)}
            />
            {errors.telemovel && <div className="error">{errors.telemovel}</div>}

            <label>Escolha uma Palavra-Passe</label>
            <input
              type="password"
              placeholder="Palavra-Passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="bottom-buttons">
          <button className="register-button" onClick={handleRegister}>Criar Conta</button>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Register;
