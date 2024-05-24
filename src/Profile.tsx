// src/Profile.tsx
import React, { useEffect, useState, useContext } from 'react';
import './Base-page.css';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import useAuthFetch from './hooks/useAuthFetch';

interface UserProfile {
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
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const navigate = useNavigate();
  const authFetch = useAuthFetch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authFetch('http://localhost:3997/v1/users/me');
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setLoading(false);
      }
    };

    const fetchLostItems = async () => {
      try {
        const data = await authFetch('http://localhost:3997/v1/users/mylostitems');
        setLostItems(data);
        setLoadingItems(false);
      } catch (error) {
        console.error('Failed to fetch lost items:', error);
        setLoadingItems(false);
      }
    };

    fetchProfile();
    fetchLostItems();
  }, [authFetch]);

  if (loading || loadingItems) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Failed to load profile.</div>;
  }

  return (
    <div className="Page-container">
      <div className="welcome-text">Perfil</div>
      <div className="Page-box">
        <div className="Profile-information">
          <div className="Profile-item">Username</div>
          <div className="Profile-item">{user?.email}</div>

          <div className="Profile-item">Primeiro Nome</div>
          <div className="Profile-item">{profile.nome}</div>

          <div className="Profile-item">Género</div>
          <div className="Profile-item">{profile.genero}</div>

          <div className="Profile-item">Data Nascimento</div>
          <div className="Profile-item">{profile.data_nasc}</div>

          <div className="Profile-item">Morada</div>
          <div className="Profile-item">{profile.morada}</div>

          <div className="Profile-item">Email</div>
          <div className="Profile-item">{profile.email}</div>

          <div className="Profile-item">Nº Telemovel</div>
          <div className="Profile-item">{profile.telemovel}</div>

          <div className="Profile-item">Ativo</div>
          <div className="Profile-item">{profile.ativo ? 'Sim' : 'Não'}</div>

          {profile.historico && (
            <>
              <div className="Profile-item">Histórico</div>
              <div className="Profile-item">{profile.historico}</div>
            </>
          )}
        </div>

        <div className="Lost-item-column">
          <div className="Profile-item">Itens Perdidos registados</div>
          {lostItems.map((item) => (
            <div key={item.id} className="Profile-item">
              {item.titulo} - {item.descricao_curta} (Perdido em {item.data_perdido})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
