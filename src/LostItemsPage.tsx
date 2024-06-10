import React from "react";
import FindItemsContent from "./Components/FindItemsContent";
import SearchBar from "./Components/SearchBar";
import { LostItemsProvider } from "./Components/ItemsContext";
import { Link } from "react-router-dom";
import "./Items.css";
const LostItemsPage: React.FC = () => {
  return (
    <div className="lost-items-page">
      <LostItemsProvider>
        <h1 className="title">Objetos Perdidos</h1>
        <SearchBar />
        <FindItemsContent />
        <Link to="/addLost" className="add-button">
          Add Lost Item
        </Link>
      </LostItemsProvider>
    </div>
  );
};

export default LostItemsPage;
