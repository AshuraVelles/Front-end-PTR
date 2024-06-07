import React, { useState } from 'react';
import './AuctionsPage.css';

import { useNavigate, useParams } from 'react-router-dom';


function AddAuction() {
  const { id } = useParams(); // Get the item ID from the URL
  const [IDItem, setIDItem] = useState(id || ''); // Initialize with the ID from the URL
  const [Localização, setLocalização] = useState('');
  const [PreçoBase, setPreçoBase] = useState('');
  const [data_Inicio, setDataInicio] = useState('');
  const [data_Fim, setDataFim] = useState('');
  const [errors, setErrors] = useState({});
  const [hasErrors, setHasErrors] = useState(false); 
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
  
    if (!IDItem) newErrors.IDItem = 'ID do item é obrigatório';
    if (!Localização) newErrors.Localização = 'Localização é obrigatória';
    if (!PreçoBase) newErrors.PreçoBase = 'Preço base é obrigatório';
    if (!data_Inicio) newErrors.data_Inicio = 'Data de início é obrigatória';
    if (!data_Fim) newErrors.data_Fim = 'Data de fim é obrigatória';
  
    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setHasErrors(hasErrors);
    return !hasErrors;
  };
  const handleRegister = async () => {
    if (!validate()) return;
  
    const payload = {
      IDItem: IDItem,
      Localização: Localização,
      PreçoBase: PreçoBase,
      data_Inicio: data_Inicio,
      data_Fim: data_Fim,
      ativo: true
    };
  
    const firebaseToken = localStorage.getItem('firebaseToken'); // Get the Firebase token from localStorage
    const auth0Token = localStorage.getItem('auth0Token'); // Get the Auth0 token from localStorage
  
    try {
      const response = await fetch('/api/auctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${firebaseToken}`, // Send Firebase token in Authorization header
          'x-auth0-token': auth0Token || '' // Send Auth0 token in custom header, default to empty string if null
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        navigate('/auctions');
      } else {
        console.error('Failed to create auction');
      }
    } catch (error) {
      console.error('Error:', error);
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
            <label>Data de Inicio</label>
            <input
              type="date"
              placeholder="Data de Inicio"
              value={data_Inicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            {errors.data_Inicio && <div className="error">{errors.data_Inicio}</div>}
          
            <label>Data do Fim</label>
            <input
              type="date"
              placeholder="Data do Fim"
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
