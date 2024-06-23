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
        <h1 className="title mt-5">Objetos Perdidos</h1>
        <FindItemsContent />
        <button>
        <Link to="/addLost" className="">
          Add Lost Item
        </Link>
        </button>
      </LostItemsProvider>
    </div>
  );
};

export default LostItemsPage;
