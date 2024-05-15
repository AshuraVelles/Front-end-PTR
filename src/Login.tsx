import React, { useState } from 'react';
import './Login.css';
import Header from './Components/Header';
import { useNavigate } from 'react-router-dom';
import Button from './Components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3999/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,  // Assuming the backend expects 'email' here
          password: password
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigate('/profile');  // Adjusted route to be lowercase and fixed typo
      } else {
        console.error('Login failed:', data.message || data);
        alert(data.message || 'Login failed, please check your credentials.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('An error occurred during login. Please try again.');
    }
  };
  

  return (
    <div className="login-container">
       
      <div className="welcome-text">Bem-vindos</div>
      <div className="login-box">
        <div className="login-title">Login</div>
        <div className="input-container">
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="forgot-password">Esqueci-me da palavra-passe</div>
        </div>
        <button className="login-enter-button" onClick={handleLogin}>
          Entrar
        </button>
        <div className="bottom-buttons">
          <button className="register-button" onClick={() => navigate("/register")}>Registar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
