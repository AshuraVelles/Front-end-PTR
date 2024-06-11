import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import "./Items.css"; // Ensure to import your styles

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface Errors {
  itemName?: string;
  itemDescription?: string;
  itemDate?: string;
}

const AddLostItems = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemDate, setItemDate] = useState("");
  const [itemCategory, setItemCategory] = useState("Lost");
  const [latitude, setLatitude] = useState(51.505); // Default latitude
  const [longitude, setLongitude] = useState(-0.09); // Default longitude
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const handleItemDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setItemDescription(e.target.value);
  };

  const handleItemDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemDate(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemCategory(e.target.value);
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!itemName) newErrors.itemName = "This field can't be empty";
    if (!itemDescription)
      newErrors.itemDescription = "This field can't be empty";
    if (!itemDate) newErrors.itemDate = "This field can't be empty";

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
      console.log("Sending data to server:", {
        title: itemName,
        descricao: itemDescription,
        categoria: itemCategory,
        data_perdido: itemDate,
        localizacao_perdido: {
          latitude: parseFloat(latitude.toString()),
          longitude: parseFloat(longitude.toString()),
        },
        ativo: true,
      });

      const response = await axios.post("/lost", {
        title: itemName,
        descricao: itemDescription,
        categoria: itemCategory,
        data_perdido: itemDate,
        localizacao_perdido: {
          latitude: parseFloat(latitude.toString()),
          longitude: parseFloat(longitude.toString()),
        },
        ativo: true,
      });

      const itemId = response.data.itemId;
      console.log("Lost item registered successfully with ID:", itemId);
      setSuccessMessage("Item added successfully");
      setErrorMessage("");
      setItemName("");
      setItemDescription("");
      setItemDate("");
      setItemCategory("Lost");
      setLatitude(51.505);
      setLongitude(-0.09);

      // Redirect to the LostItemsPage
      navigate(`/LostItemsPage/${itemId}`);
    } catch (error) {
      console.error("Error registering lost item:", error);
      setErrorMessage("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="add-item-page">
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={handleItemNameChange} />
          {errors.itemName && <span className="error">{errors.itemName}</span>}
        </label>
        <label>
          Item Description:
          <textarea
            value={itemDescription}
            onChange={handleItemDescriptionChange}
          />
          {errors.itemDescription && (
            <span className="error">{errors.itemDescription}</span>
          )}
        </label>
        <label>
          Item Date:
          <input type="date" value={itemDate} onChange={handleItemDateChange} />
          {errors.itemDate && <span className="error">{errors.itemDate}</span>}
        </label>
        <label>
          Item Category:
          <select value={itemCategory} onChange={handleCategoryChange}>
            <option value="Personal Items">Personal Items</option>
            <option value="Bags">Bags</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Others">Others</option>
          </select>
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

export default AddLostItems;
