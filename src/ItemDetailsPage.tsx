import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchLostItemById, fetchFoundItemById } from './api';
import './ItemDetailsPage.css';

interface Location {
  latitude: number;
  longitude: number;
}

interface LostItemDetails {
  id: number;
  titulo: string;
  descricao_curta: string;
  descricao: string;
  categoria: string;
  data_perdido: string;
  localizacao_perdido: Location;
  ativo: boolean;
  utilizador_id: number;
}

interface FoundItemDetails {
  id: number;
  titulo: string;
  descricao_curta: string;
  descricao: string;
  categoria: string;
  data_achado: string;
  localizacao_achado: Location;
  data_limite: string;
  ativo: boolean;
  valor_monetario: number;
  policial_id: number;
  imageurl?: string;
}

const googleMapsUrl = (latitude: number, longitude: number) => 
  `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

const googleMapsLink = (latitude: number, longitude: number) => 
  `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;

const renderMap = (latitude: number, longitude: number) => (
  <div>
    <iframe
      width="600"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={googleMapsUrl(latitude, longitude)}
    ></iframe>
    <p>
      <a
        href={googleMapsLink(latitude, longitude)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Google Maps
      </a>
    </p>
  </div>
);

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [item, setItem] = useState<LostItemDetails | FoundItemDetails | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const type = location.pathname.includes('/lost') ? 'lost' : 'found';
        const response = type === 'lost' ? await fetchLostItemById(id!) : await fetchFoundItemById(id!);
        setItem(response);
      } catch (err) {
        setError('Failed to fetch item details');
        console.error(err);
      }
      setLoading(false);
    };

    fetchItemDetails();
  }, [id, location.pathname]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>Item not found</div>;

  if ('data_perdido' in item) {
    const lostItem = item as LostItemDetails;
    return (
      <div className="main_container">
        <div className="container">
          <h1 className='details'>{lostItem.titulo}</h1>
          <div className="item-details">
            <div className="item-info">
              <p><strong>Short Description:</strong> {lostItem.descricao_curta}</p>
              <p><strong>Description:</strong> {lostItem.descricao}</p>
              <p><strong>Category:</strong> {lostItem.categoria}</p>
              <p><strong>Date Lost:</strong> {formatDate(lostItem.data_perdido)}</p>
              <div className="item-location">
                <span><strong>Latitude:</strong> {lostItem.localizacao_perdido.latitude} <br></br>
                <strong>Longitude:</strong> {lostItem.localizacao_perdido.longitude}</span>
              </div>
              <br></br>
              <p className={`status ${lostItem.ativo ? '' : 'inactive'}`}>
                <strong>Status:</strong> {lostItem.ativo ? 'Active' : 'Inactive'}
              </p>
              <p><strong>User ID:</strong> {lostItem.utilizador_id}</p>
            </div>
            {renderMap(lostItem.localizacao_perdido.latitude, lostItem.localizacao_perdido.longitude)}
          </div>
          <div className="officer-section">
            <img src="https://png.pngtree.com/png-clipart/20230819/original/pngtree-police-man-icon-simple-vector-picture-image_8043780.png" alt="Officer Badge" />
            <p><strong>Officer ID:</strong> {lostItem.utilizador_id}</p>
            <div className="button-container">
              <a href={`/addAuction/${lostItem.id}`} className="button">Take Action</a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const foundItem = item as FoundItemDetails;
    const formattedValue = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(foundItem.valor_monetario);
    return (
      <div className="main_container">
        <div className="container">
          <h1 className='details'>{foundItem.titulo}</h1>
          <div className="item-details">
            <img
              src={foundItem.imageurl || "path/to/found-item-placeholder.jpg"}
              alt={foundItem.titulo}
            />
            <div className="item-info">
              <p><strong>Short Description:</strong> {foundItem.descricao_curta}</p>
              <p><strong>Description:</strong> {foundItem.descricao}</p>
              <p><strong>Category:</strong> {foundItem.categoria}</p>
              <p><strong>Date Found:</strong> {formatDate(foundItem.data_achado)}</p>
              <div className="item-location">
                <span><strong>Latitude:</strong> {foundItem.localizacao_achado.latitude} <br></br>
                <strong>Longitude:</strong> {foundItem.localizacao_achado.longitude}</span>
              </div>
              <br></br>
              <p><strong>Deadline:</strong> {formatDate(foundItem.data_limite)}</p>
              <p className={`status ${foundItem.ativo ? '' : 'inactive'}`}>
                <strong>Status:</strong> {foundItem.ativo ? 'Active' : 'Inactive'}
              </p>
              <p><strong>Value:</strong> {formattedValue}</p>
            </div>
            {renderMap(foundItem.localizacao_achado.latitude, foundItem.localizacao_achado.longitude)}
          </div>
          <div className="officer-section">
            <img src="https://png.pngtree.com/png-clipart/20230819/original/pngtree-police-man-icon-simple-vector-picture-image_8043780.png" alt="Officer Badge" />
            <p><strong>Officer ID:</strong> {foundItem.policial_id}</p>
            <div className="button-container">
              <a href={`/addAuction/${foundItem.id}`} className="button">Take Action</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemDetailsPage;
