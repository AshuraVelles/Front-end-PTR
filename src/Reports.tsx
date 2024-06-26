import React, { useEffect, useState } from "react";
import useAuthFetch from "./hooks/useAuthFetch";
import config from "./apiconfig";

// Define TypeScript interfaces for data types
interface LostAndFoundItem {
  id: number;
  titulo: string;
  descricao_curta: string;
  descricao: string;
  categoria: string;
  localizacao_perdido: { latitude: number; longitude: number };
  data_perdido: string;
  encontrado: boolean;
  foundItem?: {
    id: number;
    titulo: string;
    descricao_curta: string;
    descricao: string;
    categoria: string;
    localizacao_achado: { latitude: number; longitude: number };
    data_achado: string;
    data_limite: string;
    ativo: boolean;
    valor_monetario: string;
    policial_id: number;
    imageurl: string;
  } | null;
}

interface AuctionStatistics {
  auction_id: number;
  total_bids: number;
  highest_bid: number;
  average_bid: number;
}

interface UserActivity {
  totalItemsLost: number;
  lostItemsDetails: LostAndFoundItem[];
  auctionsParticipated: number;
  auctionsDetails: AuctionStatistics[];
}

interface Statistics {
  averageObjectsLostPerMonth: string;
  averageObjectsFoundPerMonth: string;
}

interface User {
  id: string;
  nome: string;
  email: string;
  firebase_uid: string;
}

const Report: React.FC = () => {
  const [lostAndFoundItems, setLostAndFoundItems] = useState<
    LostAndFoundItem[]
  >([]);
  const [auctionsStatistics, setAuctionsStatistics] = useState<
    AuctionStatistics[]
  >([]);
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [firebaseUid, setFirebaseUid] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const authFetch = useAuthFetch();

  const handleDateChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await authFetch(`${config.API_BASE_URL}/police/users`);
      setUsers(response);
    } catch (error) {
      setError("Failed to fetch users.");
    }
  };

  // Fetch Lost and Found items
  const fetchLostAndFoundItems = async () => {
    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/reports/items?startDate=${startDate}&endDate=${endDate}`
      );
      setLostAndFoundItems(response.lost_and_found_items);
    } catch (error) {
      setError("Failed to fetch lost and found items.");
    }
  };

  // Fetch Auction statistics
  const fetchAuctionsStatistics = async () => {
    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/reports/auctions?startDate=${startDate}&endDate=${endDate}`
      );
      setAuctionsStatistics(response);
    } catch (error) {
      setError("Failed to fetch auctions statistics.");
    }
  };

  // Fetch User Activity
  const fetchUserActivity = async () => {
    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/reports/user-activity/${userId}`
      );
      setUserActivity(response);
    } catch (error) {
      setError("Failed to fetch user activity.");
    }
  };

  // Fetch Found Objects
  const fetchFoundObjects = async () => {
    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/reports/found-objects/${firebaseUid}`
      );
      setLostAndFoundItems(response);
    } catch (error) {
      setError("Failed to fetch found objects.");
    }
  };

  // Fetch Statistics
  const fetchStatistics = async () => {
    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/reports/statistics`
      );
      setStatistics(response);
    } catch (error) {
      setError("Failed to fetch statistics.");
    }
  };

  // Fetch users on initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reports</h1>

      {/* Error Message */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ marginBottom: "20px" }}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={handleDateChange(setStartDate)}
        />
        <label style={{ marginLeft: "20px" }}>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={handleDateChange(setEndDate)}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>User ID: </label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: "20px" }}
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user.id} value={user.firebase_uid}>
              {user.nome} - {user.email}
            </option>
          ))}
        </select>
        <label>Firebase UID: </label>
        <select
          value={firebaseUid}
          onChange={(e) => setFirebaseUid(e.target.value)}
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user.id} value={user.firebase_uid}>
              {user.nome} - {user.email}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={fetchLostAndFoundItems}
          style={{ marginRight: "10px" }}
        >
          Get Lost and Found Items
        </button>
        <button
          onClick={fetchAuctionsStatistics}
          style={{ marginRight: "10px" }}
        >
          Get Auction Statistics
        </button>
        <button onClick={fetchUserActivity} style={{ marginRight: "10px" }}>
          Get User Activity
        </button>
        <button onClick={fetchFoundObjects} style={{ marginRight: "10px" }}>
          Get Found Objects
        </button>
        <button onClick={fetchStatistics}>Get Statistics</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Lost and Found Items</h2>
        {lostAndFoundItems.length > 0 ? (
          <ul>
            {lostAndFoundItems.map((item) => (
              <li key={item.id}>
                <strong>Lost Item:</strong>
                <br />
                Title: {item.titulo}
                <br />
                Description: {item.descricao}
                <br />
                Short Description: {item.descricao_curta}
                <br />
                Category: {item.categoria}
                <br />
                Lost Date: {item.data_perdido}
                <br />
                Location: Latitude: {item.localizacao_perdido.latitude},
                Longitude: {item.localizacao_perdido.longitude}
                <br />
                Found: {item.encontrado ? "Yes" : "No"}
                <br />
                {item.encontrado && item.foundItem && (
                  <>
                    <strong>Found Item:</strong>
                    <br />
                    Title: {item.foundItem.titulo}
                    <br />
                    Description: {item.foundItem.descricao}
                    <br />
                    Short Description: {item.foundItem.descricao_curta}
                    <br />
                    Category: {item.foundItem.categoria}
                    <br />
                    Found Date: {item.foundItem.data_achado}
                    <br />
                    Found Location: Latitude:{" "}
                    {item.foundItem.localizacao_achado.latitude}, Longitude:{" "}
                    {item.foundItem.localizacao_achado.longitude}
                    <br />
                    Value: ${item.foundItem.valor_monetario}
                    <br />
                    Image:{" "}
                    <img
                      src={item.foundItem.imageurl}
                      alt={item.foundItem.titulo}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <br />
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found for the given date range.</p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Auction Statistics</h2>
        {auctionsStatistics.length > 0 ? (
          <ul>
            {auctionsStatistics.map((auction) => (
              <li key={auction.auction_id}>
                Auction ID: {auction.auction_id} - Total Bids:{" "}
                {auction.total_bids} - Highest Bid: ${auction.highest_bid} -
                Average Bid: ${auction.average_bid}
              </li>
            ))}
          </ul>
        ) : (
          <p>No auctions found for the given date range.</p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>User Activity</h2>
        {userActivity ? (
          <div>
            <p>Total Items Lost: {userActivity.totalItemsLost}</p>
            <h3>Lost Items Details</h3>
            <ul>
              {userActivity.lostItemsDetails.map((item) => (
                <li key={item.id}>
                  {item.descricao_curta} - {item.categoria}
                </li>
              ))}
            </ul>
            <p>Auctions Participated: {userActivity.auctionsParticipated}</p>
            <h3>Auctions Details</h3>
            <ul>
              {userActivity.auctionsDetails.map((auction) => (
                <li key={auction.auction_id}>
                  Auction ID: {auction.auction_id} - Total Bids:{" "}
                  {auction.total_bids} - Highest Bid: ${auction.highest_bid} -
                  Average Bid: ${auction.average_bid}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No user activity found.</p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Statistics</h2>
        {statistics ? (
          <div>
            <p>
              Average Objects Lost Per Month:{" "}
              {statistics.averageObjectsLostPerMonth}
            </p>
            <p>
              Average Objects Found Per Month:{" "}
              {statistics.averageObjectsFoundPerMonth}
            </p>
          </div>
        ) : (
          <p>No statistics available.</p>
        )}
      </div>
    </div>
  );
};

export default Report;
