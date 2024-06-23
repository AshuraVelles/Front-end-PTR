import React from "react";
import FoundItemsContent from "./Components/FoundItemsContent";
import SearchBar from "./Components/SearchFoundItems";
import { FoundItemsProvider } from "./Components/ItemsContext";
import { Link } from "react-router-dom";
const FoundItemsPage: React.FC = () => {
  return (
    <div className="text-center">
      <FoundItemsProvider>
        <h1 className="title mt-5">Objetos Achados</h1>
        <FoundItemsContent />
      </FoundItemsProvider>
      <button>
      <Link to="/addFound" className="">
        Add Found Item
      </Link>
      </button>
    </div>
  );
};

export default FoundItemsPage;
