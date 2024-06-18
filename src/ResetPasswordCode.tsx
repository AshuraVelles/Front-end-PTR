import React, { useState } from 'react';
import './ResetPasswordCode.css';
import { useNavigate } from 'react-router-dom';

const ResetPasswordCode: React.FC = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3995/v1/users/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Código verificado com sucesso.');
        setError('');
        navigate('/new-password');
      } else {
        setMessage('');
        setError(data.message || 'Falha ao verificar o código. Verifique o código.');
      }
    } catch (error) {
      setMessage('');
      setError('Ocorreu um erro ao verificar o código. Por favor, tente novamente.');
    }
  };

  return (
    <div className="reset-password-container">
      <header className="header">
      </header>
      <div className="reset-password-box">
        <h2 className="reset-password-title">Verificação de Código</h2>
        <form onSubmit={handleVerifyCode} className="reset-password-form">
          <div className="reset-password-input-container">
            <label className="reset-password-instruction">Insira o código recebido</label>
            <input
              type="text"
              placeholder="Digite o código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="reset-password-input"
              required
            />
          </div>
          <button type="submit" className="reset-password-button">
            Verificar código
          </button>
          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordCode;
