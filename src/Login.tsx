import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasErrors, setHasErrors] = useState(false);
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const handleForgotPassword = () => {
    navigate('/reset-password-email');
  };

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
    console.log('apiURL:', apiUrl);
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
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
        console.log('Received accessToken:', data.user.stsTokenManager.accessToken);
        console.log('Received auth0Token:', data.accessToken);
        login(data.user, data.accessToken); // Pass both user and accessToken
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
      <div className="welcome-text">Bem-Vindos</div>
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
          <button type="button" onClick={handleForgotPassword} className="forgot-password-button">
          Esqueci-me da palavra-passe
          </button>
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