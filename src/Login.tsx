// src/Login.tsx
import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasErrors, setHasErrors] = useState(false);
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = 'E-mail é obrigatório';
    if (!password) newErrors.password = 'Palavra-passe é obrigatória';

    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setHasErrors(hasErrors);
    return !hasErrors;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:3000/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        login(data.user); // Note that we now pass only `data.user` to login
        console.log('User and access token set in context and localStorage');
        navigate('/profile');
      } else {
        console.error('Login failed:', data.message || data);
        setErrors({ general: data.message || 'Login failed, please check your credentials.' });
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setErrors({ general: 'An error occurred during login. Please try again.' });
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-text">Bem-vindos</div>
      <div className={`login-box ${hasErrors ? 'error-active' : ''}`}>
        <div className="login-title">Login</div>
        <div className="input-container">
          <label>E-mail</label>
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="input-container">
          <label>Palavra-Passe</label>
          <input
            type="password"
            placeholder="Palavra-Passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <div className="forgot-password">Esqueci-me da palavra-passe</div>
        </div>
        {errors.general && <div className="error">{errors.general}</div>}
        <button className="login-enter-button" onClick={handleLogin}>
          Entrar
        </button>
        <div className="bottom-buttons">
          <button className="register-button" onClick={() => navigate("/typeRegister")}>Registar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
