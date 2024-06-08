import  { useState } from 'react';
import './registerPolicia.css';
import { useNavigate } from 'react-router-dom';

function EditPostoPolicia() {
  const [morada, setMorada] = useState('');
  const [errors, setErrors] = useState({});
  const [hasErrors, setHasErrors] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
  
    if (!morada) newErrors.morada = 'morada é obrigatório';
  
    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setHasErrors(hasErrors);
    return !hasErrors;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const payload = {
      morada: morada
    };

    console.log('Payload:', JSON.stringify(payload));

    try {
      const response = await fetch('http://localhost:3995/police/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Polícia registrado com sucesso. ID: ${data.id}`);
        navigate('/login');
      } else {
        console.error('Falha no registro:', data.message || data);
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  return (
    <div className="login-container">
      
      <div className={`login-box ${hasErrors ? 'error-active' : ''}`}>
        <div className="login-title">Editar Posto de Policia</div>
        <div className="input-container">
          <div className='left'>
            <label>morada</label>
            <input
              type="text"
              placeholder="morada"
              value={morada}
              onChange={(e) => setMorada(e.target.value)}
            />
            {errors.morada && <div className="error">{errors.morada}</div>}
          </div>
          <div className="bottom-buttons">
            <button className="register-button" onClick={handleRegister}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPostoPolicia;
