import React, { useEffect, useState } from 'react';
import { fetchActiveAuctions } from './api';
import './AuctionsPage.css';

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

  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await fetchActiveAuctions();
      console.log(response);
      
      const auctionsData = response.map((auction: Auction) => ({
        ...auction,
        valor_base: typeof auction.valor_base === 'number' ? auction.valor_base : parseFloat(auction.valor_base) || 0
      }));
      setAuctions(auctionsData);
    };

    fetchAuctions();
  }, []);

  return (
    <div className="auctions-container text-center">
      {auctions.map(auction => (
        <div key={auction.id} className="auction-card">
          <img src={auction.imagem} alt={auction.descricao} className="auction-image" />
          <div className="auction-details">
            <h3>{auction.titulo}</h3>
            <p>{auction.descricao}</p>
            <p>Start Date: {new Date(auction.data_inicio).toLocaleDateString()}</p>
            <p>End Date: {new Date(auction.data_fim).toLocaleDateString()}</p>
            <p>Location: {auction.localizacao}</p>
            <p>Starting Value: ${auction.valor_base}</p>
            <p>Status: {auction.ativo ? 'Active' : 'Inactive'}</p>
            <div className="bids-section">
              <h4>Past Bids:</h4>
              {auction.bids.length > 0 ? (
                <ul>
                  {auction.bids.map(bid => (
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
