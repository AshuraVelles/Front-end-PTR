import { useState } from 'react';
import './registerPolicia.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

function EditPostoPolicia() {
  const [morada, setMorada] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasErrors, setHasErrors] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!morada) newErrors.morada = 'Morada é obrigatório';

    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    setHasErrors(hasErrors);
    return !hasErrors;
  };

  const handleEdit = async () => {
    if (!validate()) return;

    const payload = {
      morada: morada,
    };

    console.log('Payload:', JSON.stringify(payload));

    try {
      const response = await fetch(`${apiUrl}/police/members`, {
        method: 'PUT', // Assuming you're editing, you might want to use PUT or PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Posto de Polícia editado com sucesso. ID: ${data.id}`);
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
        <div className="login-title text-center">Editar Posto de Polícia</div>
        <div className="input-container mb-5 pb-5">
          <div className="left w-100">
            <label>Morada</label>
            <input
              type="text"
              placeholder="Morada"
              value={morada}
              onChange={(e) => setMorada(e.target.value)}
            />
            {errors.morada && <div className="error">{errors.morada}</div>}
          </div>
          <div className="bottom-buttons">
            <button className="register-button" onClick={handleEdit}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPostoPolicia;
