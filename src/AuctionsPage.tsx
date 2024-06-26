import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
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

const stripePromise = loadStripe(
  "pk_test_51PK5IeFruPD66GZIuJ552Q38kHb6VILa0iyWHTPLaD1IgFLR9yBXuEx3LxDCW4vQKCVw08jQjcjTs6d6hzur0ce600sR7zPHzH"
);
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

const AuctionsPage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [selectedAuctionId, setSelectedAuctionId] = useState<number | null>(
    null
  );
  const [bidValue, setBidValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [userInfo, setUserInfo] = useState<{
    isCop: boolean;
    firebase_uid: string;
  } | null>(null);
  const [highestBidder, setHighestBidder] = useState<{
    utilizador_id: string;
    valor_licitacao: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [auctionStatus, setAuctionStatus] = useState<string>("active");
  const authFetch = useAuthFetch();

  // Fetch user role and active auctions on initial load
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        console.log("Fetching user role...");
        const response = await authFetch(
          `${config.API_BASE_URL}/users/user/role`
        );
        console.log("User role response:", response);
        setUserInfo(response);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  // Fetch auctions based on status
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        let response;
        if (auctionStatus === "active") {
          response = await fetchActiveAuctions();
        } else {
          response = await authFetch(
            `${config.API_BASE_URL}/auctions/auctions?status=${auctionStatus}`
          );
        }
        console.log(
          `${
            auctionStatus.charAt(0).toUpperCase() + auctionStatus.slice(1)
          } Auctions response:`,
          response
        );

        const auctionsData = response.map((auction: Auction) => ({
          ...auction,
          valor_base:
            typeof auction.valor_base === "number"
              ? auction.valor_base
              : parseFloat(auction.valor_base) || 0,
        }));
        setAuctions(auctionsData);

        // Fetch highest bidder for already inactive auctions
        if (auctionStatus === "active") {
          auctionsData.forEach((auction: Auction) => {
            if (!auction.ativo) {
              fetchHighestBidder(auction.id);
            }
          });
        }
      } catch (error) {
        console.error(`Failed to fetch ${auctionStatus} auctions:`, error);
        setError(`Failed to fetch ${auctionStatus} auctions`);
      }
    };

    fetchAuctions();
  }, [auctionStatus]);

  const fetchHighestBidder = async (auctionId: number) => {
    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/auctions/auctions/${auctionId}/highest-bidder`
      );
      console.log("Highest Bidder response:", response);
      setHighestBidder(response);
    } catch (error) {
      console.error("Highest bidder not fetched correctly:", error);
    }
  };

  // Handle bid placement
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
      setSuccessMessage("Licitação com sucesso");
      setSelectedAuctionId(auctionId); // To refresh the auction and possibly highest bidder information
    } catch (error) {
      console.error("Failed to place bid:", error);
      setError("Failed to place bid");
    }
  };

  // Handle auction ending
  const handleEndAuction = async (auctionId: number) => {
    try {
      const response = await authFetch(
        `${config.API_BASE_URL}/auctions/auctions/${auctionId}/end`,
        {
          method: "POST",
        }
      );

      console.log("End auction response:", response);
      setSuccessMessage("Auction ended successfully");

      // Fetch the highest bidder after ending the auction
      fetchHighestBidder(auctionId);

      setSelectedAuctionId(auctionId); // To fetch the highest bidder after ending the auction
    } catch (error) {
      console.error("Failed to end auction:", error);
      setError("Failed to end auction");
    }
  };

  // Handle checkout
  const handleCheckout = async (auctionId: number, bidValue: number) => {
    setIsProcessing(true);

    try {
      // Call the add-pagamento endpoint first
      const addPagamentoResponse = await axios.post(
        `${apiUrl}/stripe/add-pagamento`,
        {
          licitacao_id: auctionId,
          utilizador_id: userInfo?.firebase_uid,
          valor: bidValue,
        }
      );

      const pagamentoId = addPagamentoResponse.data.id;
      console.log("Pagamento ID:", pagamentoId);

      // Now create the checkout session with the pagamento ID
      const {
        data: { id },
      } = await axios.post(`${apiUrl}/stripe/create-checkout-session`, {
        pagamento_id: pagamentoId, // Use the pagamento ID for the payment
      });

      console.log("Received checkout session ID:", id);

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const result = await stripe?.redirectToCheckout({ sessionId: id });

      if (result?.error) {
        console.error(result.error.message);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="auctions-container text-center">
      <div>
        <label htmlFor="auction-status">Select Auction Status:</label>
        <select
          id="auction-status"
          value={auctionStatus}
          onChange={(e) => setAuctionStatus(e.target.value)}
        >
          <option value="active">Active Auctions</option>
          <option value="past">Past Auctions</option>
          <option value="upcoming">Future Auctions</option>
        </select>
      </div>

      {/* Error and Success Messages */}
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

      {/* Active Auctions */}
      {auctionStatus === "active" &&
        auctions.map((auction) => (
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
              {auction.ativo && userInfo && !userInfo.isCop && (
                <div className="bid-section">
                  <input
                    type="number"
                    placeholder="Enter your bid"
                    value={
                      selectedAuctionId === auction.id ? bidValue || "" : ""
                    }
                    onChange={(e) => {
                      setSelectedAuctionId(auction.id);
                      setBidValue(parseFloat(e.target.value));
                    }}
                  />
                  <button onClick={() => handleBid(auction.id)}>
                    Place Bid
                  </button>
                </div>
              )}
              {auction.ativo && userInfo && userInfo.isCop && (
                <button onClick={() => handleEndAuction(auction.id)}>
                  End Auction
                </button>
              )}
              {!auction.ativo &&
                highestBidder?.utilizador_id === userInfo?.firebase_uid &&
                highestBidder && (
                  <button
                    onClick={() =>
                      handleCheckout(auction.id, highestBidder.valor_licitacao)
                    }
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Pay"}
                  </button>
                )}
            </div>
          </div>
        ))}

      {/* Spacer */}
      <div style={{ height: "15px" }}></div>

      {/* Past and Future Auctions */}
      {(auctionStatus === "past" || auctionStatus === "upcoming") &&
        auctions.map((auction) => (
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
            </div>
          </div>
        ))}
    </div>
  );
};

export default AuctionsPage;
