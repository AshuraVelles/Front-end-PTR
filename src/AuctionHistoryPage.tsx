import React, { useEffect, useState } from "react";
import useAuthFetch from "./hooks/useAuthFetch"; // Use the custom hook
import "./AuctionHistoryPage.css";
import config from "./apiconfig";

interface AuctionHistory {
  leilao_id: number;
  data_inicio: string;
  data_fim: string;
  localizacao: string;
  valor_base: string | number; // It can be string or number
  data_pagamento: string;
  valor: string | number; // It can be string or number
  objeto_descricao: string;
}

const AuctionHistoryPage: React.FC = () => {
  const [auctionHistory, setAuctionHistory] = useState<AuctionHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const authFetch = useAuthFetch(); // Use the custom hook for authenticated fetch

  const fetchAuctionHistory = async () => {
    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/auctions/auction-history`
      );
      setAuctionHistory(response);
    } catch (error) {
      console.error("Failed to fetch auction history:", error);
      setError("Failed to fetch auction history");
    }
  };

  useEffect(() => {
    fetchAuctionHistory();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="auction-history-container">
      <h2>My Auction History</h2>
      {error && <p className="error">{error}</p>}
      {auctionHistory.length === 0 ? (
        <p>No auction history found.</p>
      ) : (
        <ul className="auction-history-list">
          {auctionHistory.map((auction, index) => (
            <li key={index} className="auction-history-item">
              <h3>Auction ID: {auction.leilao_id}</h3>
              <p>Description: {auction.objeto_descricao}</p>
              <p>
                Start Date: {new Date(auction.data_inicio).toLocaleDateString()}
              </p>
              <p>End Date: {new Date(auction.data_fim).toLocaleDateString()}</p>
              <p>Location: {auction.localizacao}</p>
              <p>
                Starting Value: $
                {typeof auction.valor_base === "number"
                  ? auction.valor_base.toFixed(2)
                  : parseFloat(auction.valor_base).toFixed(2)}
              </p>
              <p>
                Payment Date:{" "}
                {new Date(auction.data_pagamento).toLocaleDateString()}
              </p>
              <p>
                Paid Amount: $
                {typeof auction.valor === "number"
                  ? auction.valor.toFixed(2)
                  : parseFloat(auction.valor).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuctionHistoryPage;
