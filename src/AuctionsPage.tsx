import React, { useEffect, useState } from "react";
import { fetchActiveAuctions } from "./api";
import useAuthFetch from "./hooks/useAuthFetch";
import "./AuctionsPage.css";
import config from "./apiconfig";

interface Bid {
  id: number;
  leilao_id: number;
  utilizador_id: number;
  valor_licitacao: number;
}

interface Auction {
  id: number;
  descricao: string;
  imagem: string;
  titulo: string;
  data_inicio: string;
  data_fim: string;
  localizacao: string;
  valor_base: number;
  ativo: boolean;
  bids: Bid[];
}

const AuctionsPage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [selectedAuctionId, setSelectedAuctionId] = useState<number | null>(
    null
  );
  const [bidValue, setBidValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const authFetch = useAuthFetch();

  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await fetchActiveAuctions();
      console.log(response);

      const auctionsData = response.map((auction: Auction) => ({
        ...auction,
        valor_base:
          typeof auction.valor_base === "number"
            ? auction.valor_base
            : parseFloat(auction.valor_base) || 0,
      }));
      setAuctions(auctionsData);
    };

    fetchAuctions();
  }, []);

  const handleBid = async (auctionId: number) => {
    if (!bidValue) {
      console.error("Bid value is required");
      return;
    }

    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/auctions/auctions/${auctionId}/bid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ valorLicitacao: bidValue }),
        }
      );

      console.log("Bid response:", response);
      setSuccessMessage("Bid placed successfully");
    } catch (error) {
      console.error("Failed to place bid:", error);
      setError("Failed to place bid");
    }
  };

  return (
    <div className="auctions-container text-center">
      {successMessage && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setSuccessMessage("")}>
              &times;
            </span>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setError(null)}>
              &times;
            </span>
            <p>{error}</p>
          </div>
        </div>
      )}
      {auctions.map((auction) => (
        <div key={auction.id} className="auction-card">
          <img
            src={auction.imagem}
            alt={auction.descricao}
            className="auction-image"
          />
          <div className="auction-details">
            <h3>{auction.titulo}</h3>
            <p>{auction.descricao}</p>
            <p>
              Start Date: {new Date(auction.data_inicio).toLocaleDateString()}
            </p>
            <p>End Date: {new Date(auction.data_fim).toLocaleDateString()}</p>
            <p>Location: {auction.localizacao}</p>
            <p>Starting Value: ${auction.valor_base}</p>
            <p>Status: {auction.ativo ? "Active" : "Inactive"}</p>
            <div className="bids-section">
              <h4>Past Bids:</h4>
              {auction.bids.length > 0 ? (
                <ul>
                  {auction.bids.map((bid) => (
                    <li key={bid.id}>Bid: ${bid.valor_licitacao}</li>
                  ))}
                </ul>
              ) : (
                <p>No bids yet.</p>
              )}
            </div>
            {auction.ativo && (
              <div className="bid-section">
                <input
                  type="number"
                  placeholder="Enter your bid"
                  value={selectedAuctionId === auction.id ? bidValue || "" : ""}
                  onChange={(e) => {
                    setSelectedAuctionId(auction.id);
                    setBidValue(parseFloat(e.target.value));
                  }}
                />
                <button onClick={() => handleBid(auction.id)}>Place Bid</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuctionsPage;
