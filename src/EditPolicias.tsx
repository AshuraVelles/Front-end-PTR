import  { useState } from 'react';
import './registerPolicia.css';
import { useNavigate } from 'react-router-dom';

function EditPolice() {
  const [nome, setNome] = useState('');
  const [postoPolicia, setPostoPolicia] = useState('');
  const [historicoPolicia, setHistoricoPolicia] = useState('');
  const [errors, setErrors] = useState({});
  const [hasErrors, setHasErrors] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
  
    if (!nome) newErrors.nome = 'Nome é obrigatório';
    if (!postoPolicia) {
      newErrors.postoPolicia = 'Posto de polícia é obrigatório';
    } else if (!/^\d+$/.test(postoPolicia)) {
      newErrors.postoPolicia = 'Introduza apenas dígitos para o posto de polícia';
    }
  
    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setHasErrors(hasErrors);
    return !hasErrors;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const payload = {
      nome: nome,
      posto_policia: parseInt(postoPolicia, 10),
      historico_policia: JSON.parse(historicoPolicia || '{}')
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
        <div className="login-title">Editar Polícia</div>
        <div className="input-container">
          <div className='left'>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && <div className="error">{errors.nome}</div>}
            
            <label>Posto de Polícia</label>
            <input
              type="text"
              placeholder="ID"
              value={postoPolicia}
              onChange={(e) => setPostoPolicia(e.target.value)}
            />
            {errors.postoPolicia && <div className="error">{errors.postoPolicia}</div>}
          </div>
          <div className='right'>
            <label>Histórico de Polícia</label>
            <textarea
              placeholder="Histórico de Polícia (JSON)"
              value={historicoPolicia}
              onChange={(e) => setHistoricoPolicia(e.target.value)}
            />
          </div>
          <div className="bottom-buttons">
            <button className="register-button" onClick={handleRegister}>Registrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPolice;
