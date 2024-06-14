import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import useAuthFetch from "./hooks/useAuthFetch";
import config from "./apiconfig";
import "./Items.css"; // Ensure to import your styles

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface Errors {
  titulo?: string;
  descricao_curta?: string;
  descricao?: string;
  data_achado?: string;
  picture_link?: string;
  cost?: string;
}

const AddFoundItems = () => {
  const [titulo, setTitulo] = useState("");
  const [descricaoCurta, setDescricaoCurta] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataAchado, setDataAchado] = useState("");
  const [categoria, setCategoria] = useState("Personal Items");
  const [latitude, setLatitude] = useState(51.505); // Default latitude
  const [longitude, setLongitude] = useState(-0.09); // Default longitude
  const [pictureLink, setPictureLink] = useState("");
  const [cost, setCost] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const authFetch = useAuthFetch();

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
    console.log("Titulo:", e.target.value);
  };

  const handleDescricaoCurtaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescricaoCurta(e.target.value);
    console.log("Descricao Curta:", e.target.value);
  };

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(e.target.value);
    console.log("Descricao:", e.target.value);
  };

  const handleDataAchadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataAchado(e.target.value);
    console.log("Data Achado:", e.target.value);
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(e.target.value);
    console.log("Categoria:", e.target.value);
  };

  const handlePictureLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPictureLink(e.target.value);
    console.log("Picture Link:", e.target.value);
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCost(e.target.value);
    console.log("Cost:", e.target.value);
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!titulo) newErrors.titulo = "This field can't be empty";
    if (!descricaoCurta)
      newErrors.descricao_curta = "This field can't be empty";
    if (!descricao) newErrors.descricao = "This field can't be empty";
    if (!dataAchado) newErrors.data_achado = "This field can't be empty";
    if (!pictureLink) newErrors.picture_link = "This field can't be empty";
    if (!cost) newErrors.cost = "This field can't be empty";

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
        data_achado: dataAchado,
        localizacao_achado: JSON.stringify({
          latitude: parseFloat(latitude.toString()),
          longitude: parseFloat(longitude.toString()),
        }),
        data_limite: dataAchado, // assuming you want to use the same date as `data_achado`
        valor_monetario: parseFloat(cost),
        imageURL: pictureLink,
        ativo: true,
      };

      console.log("Sending data to server:", payload);

      const response = await authFetch(
        `${config.API_BASE_URL}/police/items/found/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      console.log("Response received from server:", response);

      if (response && response.id) {
        const itemId = response.id;
        console.log("Found item registered successfully with ID:", itemId);
        setSuccessMessage("Item added successfully");
        setErrorMessage("");
        setTitulo("");
        setDescricaoCurta("");
        setDescricao("");
        setDataAchado("");
        setCategoria("Personal Items");
        setLatitude(51.505);
        setLongitude(-0.09);
        setPictureLink("");
        setCost("");

        // Redirect to the FoundItemsPage
        navigate(`/found/${itemId}`);
      } else {
        console.error("Failed to add item:", response);
        setErrorMessage("Failed to add item. Please try again.");
      }
    } catch (error) {
      console.error("Error registering found item:", error);
      setErrorMessage("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="add-item-page">
      <h1>Add Found Item</h1>
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
          Data Encontrada:
          <input
            type="date"
            value={dataAchado}
            onChange={handleDataAchadoChange}
          />
          {errors.data_achado && (
            <span className="error">{errors.data_achado}</span>
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
          Link da foto do item:
          <input
            type="text"
            value={pictureLink}
            onChange={handlePictureLinkChange}
          />
          {errors.picture_link && (
            <span className="error">{errors.picture_link}</span>
          )}
        </label>
        <label>
          Custo:
          <input type="text" value={cost} onChange={handleCostChange} />
          {errors.cost && <span className="error">{errors.cost}</span>}
        </label>
        <label>Latitude: {latitude}</label>
        <label>Longitude: {longitude}</label>
        <button type="submit">Add Item</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <MapContainer
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
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });
  return null;
};

export default AddFoundItems;
