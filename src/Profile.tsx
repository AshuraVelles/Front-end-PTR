import React, { useEffect, useState, useContext } from 'react';
import './Base-page.css';
import './Profile.css';
import { AuthContext } from './context/AuthContext';
import useAuthFetch from './hooks/useAuthFetch';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

interface UserProfile {
  username: string;
  nome: string;
  genero: string;
  data_nasc: string;
  morada: string;
  email: string;
  telemovel: string;
  historico: string | null;
  ativo: boolean;
}

interface LostItem {
  id: number;
  titulo: string;
  descricao_curta: string;
  data_perdido: string;
}

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext)!;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editingProfile, setEditingProfile] = useState<Partial<UserProfile> | null>(null);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const authFetch = useAuthFetch();
  let navigate = useNavigate();

  function RemoveAccount() {
    const confirmation = confirm("This action is PERMANENT.\nAre you sure?");
    
    if (confirmation) {
      console.log("Yes"); // Add account deletion logic here
    } else {
      console.log("No"); // You can remove this else block if it doesn't do anything
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authFetch(`${apiUrl}/users/me`);
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setLoading(false);
      }
    };

    const fetchLostItems = async () => {
      try {
        const data = await authFetch(`${apiUrl}/users/mylostitems`);
        setLostItems(data);
        setLoadingItems(false);
      } catch (error) {
        console.error('Failed to fetch lost items:', error);
        setLoadingItems(false);
      }
    };

    fetchProfile();
    fetchLostItems();
  }, []);

  const handleEditProfile = () => {
    setEditingProfile({ ...profile });
  };

  const handleSaveProfile = async () => {
    if (!editingProfile) return;

    try {
      const response = await authFetch(`${apiUrl}/users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProfile),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setEditingProfile(null);
        setSuccessMessage('Successfully updated');
        setError(null); // Clear any previous errors
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to update');
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      //setError('Failed to update');
      window.location.reload()
      setSuccessMessage(''); // Clear success message
    }
  };

  const closeErrorPopup = () => {
    setError(null);
  };

  const closeSuccessPopup = () => {
    setSuccessMessage('');
  };

  if (loading || loadingItems) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Failed to load profile.</div>;
  }

  return (
    <div className="Page-container">
      {successMessage && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeSuccessPopup}>&times;</span>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeErrorPopup}>&times;</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="welcome-text">Perfil</div>
      <div className="Page-box">
        <div className="Profile-information">
          <div className="Profile-item-Description">Username</div>
          <div className="Profile-item">{user?.email}</div>

          <div className="Profile-item-Description">Nome</div>
          <div className="Profile-item">
            {editingProfile ? (
              <input
                type="text"
                value={editingProfile.nome || ''}
                onChange={(e) => setEditingProfile({ ...editingProfile, nome: e.target.value })}
              />
            ) : (
              profile.nome
            )}
          </div>

          <div className="Profile-item-Description">Género</div>
          <div className="Profile-item">
            {editingProfile ? (
              <select
                value={editingProfile.genero || ''}
                onChange={(e) => setEditingProfile({ ...editingProfile, genero: e.target.value })}
              >
                <option value="" disabled>Select Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            ) : (
              profile.genero
            )}
          </div>

          <div className="Profile-item-Description">Data Nascimento</div>
          <div className="Profile-item">
            {editingProfile ? (
              <input
                type="date"
                value={editingProfile.data_nasc?.split('T')[0] || ''}
                onChange={(e) => setEditingProfile({ ...editingProfile, data_nasc: e.target.value })}
              />
            ) : (
              profile.data_nasc
            )}
          </div>

          <div className="Profile-item-Description">Morada</div>
          <div className="Profile-item">
            {editingProfile ? (
              <input
                type="text"
                value={editingProfile.morada || ''}
                onChange={(e) => setEditingProfile({ ...editingProfile, morada: e.target.value })}
              />
            ) : (
              profile.morada
            )}
          </div>

          <div className="Profile-item-Description">Email</div>
          <div className="Profile-item">
            {editingProfile ? (
              <input
                type="text"
                value={editingProfile.email || ''}
                onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
              />
            ) : (
              profile.email
            )}
          </div>

          <div className="Profile-item-Description">Nº Telemovel</div>
          <div className="Profile-item">
            {editingProfile ? (
              <input
                type="text"
                value={editingProfile.telemovel || ''}
                onChange={(e) => setEditingProfile({ ...editingProfile, telemovel: e.target.value })}
              />
            ) : (
              profile.telemovel
            )}
          </div>

          <div className="Profile-item-Description">Ativo</div>
          <div className="Profile-item">
            {editingProfile ? (
              <select
                value={editingProfile.ativo ? 'Sim' : 'Não'}
                onChange={(e) => setEditingProfile({ ...editingProfile, ativo: e.target.value === 'Sim' })}
              >
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            ) : (
              profile.ativo ? 'Sim' : 'Não'
            )}
          </div>

        <div className="Profile-Buttons">
          <div className="Profile-item">
            {editingProfile ? (
              <button onClick={handleSaveProfile}>Salvar</button>
            ) : (
              <button onClick={handleEditProfile}>Editar Perfil</button>
            )}
          </div>

          <div className="Profile-item">
            <button>Desativar Perfil</button>
          </div>

          <div className="Profile-item">
            <button onClick={RemoveAccount}>Remover Perfil</button>
          </div>
        </div>

          {profile.historico && (
            <>
              <div className="Profile-item">Histórico</div>
              <div className="Profile-item">{profile.historico}</div>
            </>
          )}
        </div>

        <div className="Lost-item-column">
          <div className="left-title">Itens Perdidos registados</div>
          <button onClick={() => {navigate("/SavedInfo")}}>Ver Registo dos seus Objetos/Leilões</button>
          {lostItems.map((item) => (
            <div key={item.id} className="home-page-item"> 
              {item.titulo} - {item.descricao_curta} (Perdido em {item.data_perdido})
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
