import { useState } from 'react';
import './AuctionsPage.css';
import { useNavigate } from 'react-router-dom';
import useAuthFetch from './hooks/useAuthFetch';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

function AddAuction() {
  const [Localização, setLocalização] = useState('');
  const [PreçoBase, setPreçoBase] = useState('');
  const [data_Inicio, setDataInicio] = useState('');
  const [data_Fim, setDataFim] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasErrors, setHasErrors] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!Localização) newErrors.Localização = 'Localização é obrigatória';
    if (!PreçoBase) newErrors.PreçoBase = 'Preço Base é obrigatório';
    if (!data_Inicio) newErrors.data_Inicio = 'Data de Início é obrigatória';
    if (!data_Fim) newErrors.data_Fim = 'Data de Fim é obrigatória';

    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setHasErrors(hasErrors);
    return !hasErrors;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const payload = {
      nome: Localização,
      PreçoBase: PreçoBase,
      data_Inicio: data_Inicio,
      data_Fim: data_Fim,
      ativo: true
    };
    const authFetch = useAuthFetch();
    console.log('Payload:', JSON.stringify(payload));

    try {
      const response = await authFetch(`${apiUrl}/auctions/auctions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Leilão criado com sucesso.');
        navigate('/auctions');
      } else {
        console.error('Falha ao criar leilão:', data.message || data);
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-box ${hasErrors ? 'error-active' : ''}`}>
        <div className="login-title">Adicionar um Leilão</div>
        <div className="input-container">
          <div className='left'>

            <label>Preço base</label>
            <input
              type="number"
              placeholder="Preço base"
              value={PreçoBase}
              onChange={(e) => setPreçoBase(e.target.value)}
            />
            {errors.PreçoBase && <div className="error">{errors.PreçoBase}</div>}

            <label>Localização</label>
            <input
              type="text"
              placeholder="Localização"
              value={Localização}
              onChange={(e) => setLocalização(e.target.value)}
            />
            {errors.Localização && <div className="error">{errors.Localização}</div>}

          </div>
          <div className='right'>
            <label>Data de Início</label>
            <input
              type="date"
              placeholder="Data de Início"
              value={data_Inicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            {errors.data_Inicio && <div className="error">{errors.data_Inicio}</div>}
          
            <label>Data de Fim</label>
            <input
              type="date"
              placeholder="Data de Fim"
              value={data_Fim}
              onChange={(e) => setDataFim(e.target.value)}
            />
            {errors.data_Fim && <div className="error">{errors.data_Fim}</div>}

          </div>
          <div className="bottom-buttons">
            <button className="register-button" onClick={handleRegister}>Criar Leilão</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAuction;
