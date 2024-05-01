import { useState } from 'react';
import './Login.css';
import Navbar from './Components/Navbar';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = () => {
    // Your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (

    
    <div className="login-container">
      <Navbar />
      <div className="welcome-text">Bem-vindos</div>
      <div className="login-box">
       
        <div className="login-title">Login</div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        
        
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
          <button className='register-button' onClick={() => navigate("/RegisterPage")}>Registar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;