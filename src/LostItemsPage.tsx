import React from "react";
import FindItemsContent from "./Components/FindItemsContent";
import { LostItemsProvider } from "./Components/ItemsContext";
import { Link } from "react-router-dom";
import "./Items.css";
const LostItemsPage: React.FC = () => {
  return (
    <div className="lost-items-page">
      <LostItemsProvider>
        <h1 className="title mt-5">Objetos Perdidos</h1>
        <button>
        <Link to="/addLost" className="">
          Adicionar Objeto Perdido
        </Link>
        </button>
        <FindItemsContent />
      
      </LostItemsProvider>
    </div>
  );
};

export default LostItemsPage;
