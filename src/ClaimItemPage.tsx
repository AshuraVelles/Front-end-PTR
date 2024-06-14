import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ClaimItemPage.css";

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
}

interface User {
  firebase_uid: string;
  nome: string;
  email: string;
}

const ClaimItemPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/found/${itemId}`);
        setItem(response.data);
      } catch (err) {
        setError("Failed to fetch item details");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };

    fetchItemDetails();
    fetchUsers();
  }, [itemId]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  const handleClaimItem = async () => {
    if (!selectedUser) {
      setError("Please select a user to claim the item");
      return;
    }

    try {
      await axios.put(`/api/items/${itemId}/claim`, null, {
        params: { claimantId: selectedUser },
      });
      setSuccessMessage("Item claimed successfully");
      navigate(`/items/${itemId}`); // Navigate to the item details page or another page
    } catch (err) {
      setError("Failed to claim item");
    }
  };

  if (!item) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="claim-item-page">
      <h1>Claim Item</h1>
      <div className="item-details">
        <h2>{item.titulo}</h2>
        <p>
          <strong>Short Description:</strong> {item.descricao_curta}
        </p>
        <p>
          <strong>Description:</strong> {item.descricao}
        </p>
        <p>
          <strong>Category:</strong> {item.categoria}
        </p>
        <p>
          <strong>Date Found:</strong>{" "}
          {new Date(item.data_achado).toLocaleDateString()}
        </p>
        <p>
          <strong>Location:</strong> {item.localizacao_achado.latitude},{" "}
          {item.localizacao_achado.longitude}
        </p>
        <p className={`status ${item.ativo ? "" : "inactive"}`}>
          <strong>Status:</strong> {item.ativo ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="claim-section">
        <label htmlFor="user-select">Select User to Claim Item:</label>
        <select
          id="user-select"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.firebase_uid} value={user.firebase_uid}>
              {user.nome} ({user.email})
            </option>
          ))}
        </select>

        <button onClick={handleClaimItem}>Claim Item</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ClaimItemPage;
