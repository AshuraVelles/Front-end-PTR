import React from "react";
import FoundItemsContent from "./Components/FoundItemsContent";
import SearchBar from "./Components/SearchFoundItems";
import { FoundItemsProvider } from "./Components/ItemsContext";
import { Link } from "react-router-dom";
const FoundItemsPage: React.FC = () => {
  return (
    <div>
      <FoundItemsProvider>
        <h1 className="title">Objetos Achados</h1>
        <FoundItemsContent />
      </FoundItemsProvider>
      <Link to="/addFound" className="add-button">
        Add Found Item
      </Link>
    </div>
  );
};

export default FoundItemsPage;
