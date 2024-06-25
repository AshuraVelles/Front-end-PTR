import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ClaimItemPage.css';
import config from './apiconfig';
import useAuthFetch from './hooks/useAuthFetch';

interface Location {
  latitude: number;
  longitude: number;
}

interface ItemDetails {
  id: number;
  titulo: string;
  descricao_curta: string;
  descricao: string;
  categoria: string;
  data_achado: string;
  localizacao_achado: Location;
  ativo: boolean;
  claimant_id?: string;
}

interface User {
  firebase_uid: string;
  nome: string;
  email: string;
}

const ClaimItemPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [usersFetched, setUsersFetched] = useState<boolean>(false);

  const authFetch = useAuthFetch();

  useEffect(() => {
    if (!dataFetched) {
      const fetchItemDetails = async () => {
        try {
          const response = await authFetch(`${config.API_BASE_URL}/items/found/${itemId}`);
          setItem(response);
          setDataFetched(true);
        } catch (err) {
          setError("Failed to fetch item details");
        }
      };

      fetchItemDetails();
    }
  }, [itemId, authFetch, dataFetched]);

  useEffect(() => {
    if (!usersFetched) {
      const fetchUsers = async () => {
        try {
          const response = await authFetch(`${config.API_BASE_URL}/users/users`);
          if (Array.isArray(response)) {
            setUsers(response);
            setUsersFetched(true);
          } else {
            setError("Failed to fetch users");
          }
        } catch (err) {
          setError("Failed to fetch users");
        }
      };

      fetchUsers();
    }
  }, [authFetch, usersFetched]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  const handleClaimItem = async () => {
    if (!selectedUser) {
      setError("Please select a user to claim the item");
      return;
    }

    try {
      const response = await authFetch(`${config.API_BASE_URL}/police/items/${itemId}/claim?claimantId=${selectedUser}`, {
        method: 'PUT',
      });

      if (response.message === 'Item claimed successfully' || response.message === 'Item activated and owner removed') {
        setSuccessMessage(response.message);
        setTimeout(() => window.location.reload(), 2000); // Refresh the page after 2 seconds
      } else {
        setError(`Failed to claim item, message: ${response.error || response.message}`);
      }
    } catch (err: any) {
      setError(`Error caught! Failed to claim item because ${err.message}`);
    }
  };

  return (
    <div className="claim-item-page">
      <h1 className="text-center">Reivindicar Objeto</h1>
      {item ? (
        <div className="item-details">
          <h2>{item.titulo}</h2>
          <p><strong>Pequena Descrição:</strong> {item.descricao_curta}</p>
          <p><strong>Descrição:</strong> {item.descricao}</p>
          <p><strong>Categoria:</strong> {item.categoria}</p>
          <p><strong>Data Encontrado:</strong> {new Date(item.data_achado).toLocaleDateString()}</p>
          {item.localizacao_achado ? (
            <p><strong>Localização:</strong> {item.localizacao_achado.latitude}, {item.localizacao_achado.longitude}</p>
          ) : (
            <p><strong>Localização:</strong> Indisponivel </p>
          )}
          <p className={`status ${item.ativo ? "" : "inactive"}`}><strong>Estado:</strong> {item.ativo ? "Ativo" : "Desativo"}</p>
          <p><strong>Dono Atual:</strong> {item.claimant_id ? users.find(user => user.firebase_uid === item.claimant_id)?.nome || "Desconhecido" : "Não tem dono"}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="claim-section">
        <label htmlFor="user-select">Escolha o Utilizador para Reivindicar Objeto:</label>
        <select id="user-select" value={selectedUser} onChange={handleUserChange}>
          <option value="">Escolher Utilizador</option>
          <option value="0">Não tem dono</option>
          {users.map((user) => (
            <option key={user.firebase_uid} value={user.firebase_uid}>
              {user.nome} ({user.email})
            </option>
          ))}
        </select>
        <div className="text-center" >
        <button onClick={handleClaimItem}>Reivindicar Objeto</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ClaimItemPage;
