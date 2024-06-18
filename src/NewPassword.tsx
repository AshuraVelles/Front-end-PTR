import React, { useState } from 'react';
import './NewPassword.css';
import { useNavigate } from 'react-router-dom';

const NewPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3995/v1/users/new-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Senha redefinida com sucesso.');
        setError('');
        navigate('/login');
      } else {
        setMessage('');
        setError(data.message || 'Falha ao redefinir a senha. Tente novamente.');
      }
    } catch (error) {
      setMessage('');
      setError('Ocorreu um erro ao redefinir a senha. Por favor, tente novamente.');
    }
  };

  return (
    <div className="newpassword-reset-container">
      <header className="header">
      </header>
      <div className="newpassword-reset-box">
        <h2 className="newpassword-reset-title">Reposição de Senha</h2>
        <form onSubmit={handleNewPassword} className="newpassword-form">
          <div className="newpassword-reset-input-container">
            <label className="newpassword-reset-instruction">Nova Senha</label>
            <input
              type="password"
              placeholder="Digite a nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="newpassword-reset-input"
              required
            />
          </div>
          <div className="newpassword-reset-input-container">
            <label className="newpassword-reset-instruction">Confirmar Senha</label>
            <input
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="newpassword-reset-input"
              required
            />
          </div>
          <button type="submit" className="newpassword-reset-button">
            Redefinir senha
          </button>
          {message && <div className="newpassword-message">{message}</div>}
          {error && <div className="newpassword-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
