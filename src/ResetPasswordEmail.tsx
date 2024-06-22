import React, { useState } from 'react';
import './ResetPasswordEmail.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
const ResetPasswordEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Por favor, insira seu email.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/reset-password-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Link de redefinição de senha enviado para o seu email.');
        setError('');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      } else {
        setMessage('');
        setError(data.error || 'Falha ao enviar o link de redefinição de senha. Tente novamente.');
      }
    } catch (error) {
      setMessage('');
      setError('Ocorreu um erro ao enviar o link de redefinição de senha. Por favor, tente novamente.');
    }
  };

  return (
    <div className="reset-container">
      <header className="header">
      </header>
      <div className="reset-box">
        <h2 className="reset-title">Recuperação de palavra-passe</h2>
        <form onSubmit={handleResetPassword} className="reset-form">
          <div className="reset-input-container">
            <label className="reset-instruction">Insira o seu email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="reset-input"
            />
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
          </div>
          <button type="submit" className="reset-button">
            Enviar email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
