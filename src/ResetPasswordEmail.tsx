import React, { useState } from 'react';
import './ResetPasswordEmail.css';
import { useNavigate } from 'react-router-dom';

const ResetPasswordEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (!email) {
      setError('Please enter your email');
    } else {
      console.log('Password reset link sent to:', email);
      navigate('/reset-password-code');
    }
  };

  return (
    <div className="reset-container">
      <header className="header">
      </header>
      <div className="reset-box">
        <h2 className="reset-title">Recuperação de palavra-passe</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }} className="reset-form">
          <div className="reset-input-container">
            <label className="reset-instruction">Insere o teu email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="reset-input"
            />
            {error && <p className="error">{error}</p>}
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
