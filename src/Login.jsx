import { useState } from 'react';
import './Login.css';
import Navbar from './Components/Navbar';


function App() {
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
      <div className="company-name">RCA</div>
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
          <Button onClick={() => navigate("/RegisterPage")}>Register</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;