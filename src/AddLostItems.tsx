import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import useAuthFetch from "./hooks/useAuthFetch";
import config from "./apiconfig";
import "./Items.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface Errors {
  titulo?: string;
  descricao_curta?: string;
  descricao?: string;
  data_perdido?: string;
}

const AddLostItems = () => {
  const [titulo, setTitulo] = useState("");
  const [descricaoCurta, setDescricaoCurta] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataPerdido, setDataPerdido] = useState("");
  const [categoria, setCategoria] = useState("Personal Items");
  const [latitude, setLatitude] = useState(51.505); // Default latitude
  const [longitude, setLongitude] = useState(-0.09); // Default longitude
  const [address, setAddress] = useState(""); // New address state
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const authFetch = useAuthFetch();

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
  };

  const handleDescricaoCurtaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricaoCurta(e.target.value);
  };

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(e.target.value);
  };

  const handleDataPerdidoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPerdido(e.target.value);
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(e.target.value);
  };

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(e.target.value);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: e.target.value,
            format: "json",
            addressdetails: 1,
            limit: 1,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const location = response.data[0];
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);
        console.log("Geocoded latitude:", lat);
        console.log("Geocoded longitude:", lon);
        setLatitude(lat);
        setLongitude(lon);
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!titulo) newErrors.titulo = "This field can't be empty";
    if (!descricaoCurta)
      newErrors.descricao_curta = "This field can't be empty";
    if (!descricao) newErrors.descricao = "This field can't be empty";
    if (!dataPerdido) newErrors.data_perdido = "This field can't be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!validateForm()) {
      console.log("Form validation failed", errors);
      return;
    }

    try {
      const payload = {
        titulo,
        descricao_curta: descricaoCurta,
        descricao,
        categoria,
        data_perdido: dataPerdido,
        localizacao_perdido: {
          latitude: parseFloat(latitude.toFixed(6)), // Ensure proper format
          longitude: parseFloat(longitude.toFixed(6)), // Ensure proper format
        },
        ativo: true,
      };

      console.log("Payload to server:", payload);

      const response = await authFetch(`${config.API_BASE_URL}/items/lost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const itemId = response.itemId;
      console.log("Lost item registered successfully with ID:", itemId);
      setSuccessMessage("Item added successfully");
      setErrorMessage("");
      setTitulo("");
      setDescricaoCurta("");
      setDescricao("");
      setDataPerdido("");
      setCategoria("Personal Items");
      setLatitude(51.505);
      setLongitude(-0.09);
      setAddress(""); // Reset address

      // Redirect to the LostItemsPage
      navigate(`/lost/${itemId}`);
    } catch (error) {
      console.error("Error registering lost item:", error);
      setErrorMessage("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="add-item-page mt-3">
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Titulo:
          <input type="text" value={titulo} onChange={handleTituloChange} />
          {errors.titulo && <span className="error">{errors.titulo}</span>}
        </label>
        <label>
          Descricao Curta:
          <input
            type="text"
            value={descricaoCurta}
            onChange={handleDescricaoCurtaChange}
          />
          {errors.descricao_curta && (
            <span className="error">{errors.descricao_curta}</span>
          )}
        </label>
        <label>
          Descricao:
          <textarea value={descricao} onChange={handleDescricaoChange} />
          {errors.descricao && (
            <span className="error">{errors.descricao}</span>
          )}
        </label>
        <label>
          Data Perdido:
          <input
            type="date"
            value={dataPerdido}
            onChange={handleDataPerdidoChange}
          />
          {errors.data_perdido && (
            <span className="error">{errors.data_perdido}</span>
          )}
        </label>
        <label>
          Categoria:
          <select value={categoria} onChange={handleCategoriaChange}>
            <option value="Personal Items">Personal Items</option>
            <option value="Bags">Bags</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <label>
          Endereço:
          <input type="text" value={address} onChange={handleAddressChange} />
        </label>
        <label>Latitude: {latitude}</label>
        <label>Longitude: {longitude}</label>
        <button type="submit">Add Item</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <MapContainer
        key={`${latitude}-${longitude}`} // Use a key to force re-render when coordinates change
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "400px", width: "100%", marginTop: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} />
        <MapClickHandler
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      </MapContainer>
    </div>
  );
};

interface MapClickHandlerProps {
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({
  setLatitude,
  setLongitude,
}) => {
  useMapEvents({
    click(e) {
      console.log("Map clicked", e.latlng);
      const lat = parseFloat(e.latlng.lat.toFixed(6));
      const lon = parseFloat(e.latlng.lng.toFixed(6));
      console.log("Clicked latitude:", lat);
      console.log("Clicked longitude:", lon);
      setLatitude(lat);
      setLongitude(lon);
    },
  });
  return null;
};

export default AddLostItems;
