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
        login(data.user, data.accessToken); // Pass both user and accessToken

        if(data.userType === undefined) {
          console.error('User type not found in response:', data);
          setErrors({ general: 'Tipo de utilizador não encontrado na resposta do servidor.' });
        }
        localStorage.setItem('isCop', data.userType.iscop); // Store user type in localStorage
        localStorage.setItem('isAdmin', data.userType.isadmin); // Store user type in localStorage
        console.log('User and access token set in context and localStorage');
        console.log('User type:', data.userType);
        if (data.userType.isadmin) {
          navigate('/admin');
        } else if (data.userType.iscop) {
          navigate('/policiahome');
        } else {
          navigate('/profile');
        }
      } else {
        console.error('Login failed:', data.message || data);
        setErrors({ general: data.message || 'Login falhou, verifique as suas credenciais.' });
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setErrors({ general: 'Ocorreu um erro durante o login. Tente novamente.' });
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-text">Bem-Vindos!</div>
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
          
        </div>
        <button type="button" onClick={handleForgotPassword} className="forgot-password-button">
          Esqueci-me da palavra-passe
          </button>
        {errors.general && <div className="error h5 text-center">{errors.general}</div>}
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
