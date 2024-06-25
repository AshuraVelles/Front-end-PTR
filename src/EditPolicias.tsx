import { useState } from 'react';
import './registerPolicia.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

function EditPolice() {
  const [nome, setNome] = useState('');
  const [postoPolicia, setPostoPolicia] = useState('');
  const [historicoPolicia, setHistoricoPolicia] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasErrors, setHasErrors] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
  
    if (!nome) newErrors.nome = 'Nome é obrigatório';
    if (!postoPolicia) {
      newErrors.postoPolicia = 'Posto de polícia é obrigatório';
    } else if (!/^\d+$/.test(postoPolicia)) {
      newErrors.postoPolicia = 'Introduza apenas dígitos para o posto de polícia';
    }

    if (historicoPolicia) {
      try {
        JSON.parse(historicoPolicia);
      } catch (e) {
        newErrors.historicoPolicia = 'Histórico de polícia deve ser um JSON válido';
      }
    }
  
    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setHasErrors(hasErrors);
    return !hasErrors;
  };

  const handleEdit = async () => {
    if (!validate()) return;

    const payload = {
      nome: nome,
      posto_policia: parseInt(postoPolicia, 10),
      historico_policia: historicoPolicia ? JSON.parse(historicoPolicia) : {}
    };

    console.log('Payload:', JSON.stringify(payload));

    try {
      const response = await fetch(`${apiUrl}/police/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Polícia editado com sucesso. ID: ${data.id}`);
        navigate('/login');
      } else {
        console.error('Falha na edição:', data.message || data);
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-box ${hasErrors ? 'error-active' : ''}`}>
        <div className="login-title">Editar Polícia</div>
        <div className="input-container mb-5 pb-5">
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
              placeholder="Posto de Polícia"
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
            {errors.historicoPolicia && <div className="error">{errors.historicoPolicia}</div>}
          </div>
          <div className="bottom-buttons">
            <button className="register-button" onClick={handleEdit}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPolice;
