import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import WelcomePage from "./Welcome-Page";
import Login from "./Login";
import LostItemsPage from "./LostItemsPage";
import Register from "./Register";
import FoundItemsPage from "./FoundItemsPage";
import Profile from "./Profile";
import AuctionsPage from "./AuctionsPage";
import Header from "./Components/Header";
import ItemDetailsPage from "./ItemDetailsPage";
import HomePolicia from "./homePolicia";
import HomeUtilizador from "./homeUtilizador";
import AddAuction from "./addAuction";
import TypeRegister from "./TypeRegister";
import RegisterPolicia from "./RegisterPolicia";
import AdminHome from "./AdminHome";
import EditPolice from "./EditPolicias";
import AddPostoPolicia from "./AddPostosPolicia";
import EditPostoPolicia from "./EditPostoPolicia";
import AddLostItems from "./AddLostItems";
import AddFoundItems from "./AddFoundItems";
import Payment from "./Payment";
import Success from "./Success";
import Failure from "./Failure";
import ClaimItemPage from "./ClaimItemPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="*" element={<WelcomePage />} />
          <Route path="/home" element={<HomeUtilizador />} />
          <Route path="/homePolicia" element={<HomePolicia />} />
          <Route path="/homeUtilizador" element={<HomeUtilizador />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lostItems" element={<LostItemsPage />} />
          <Route path="/foundItems" element={<FoundItemsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="/addLost" element={<AddLostItems />} />
          <Route path="/addFound" element={<AddFoundItems />} />
          <Route path="/addAuction/:id" element={<AddAuction />} />{" "}
          {/* Pass the item ID */}
          <Route path="/claim/:itemId" element={<ClaimItemPage />} />
          <Route path="/lost/:id" element={<ItemDetailsPage />} />
          <Route path="/found/:id" element={<ItemDetailsPage />} />
          <Route path="/RegisterPolicia" element={<RegisterPolicia />} />
          <Route path="/typeRegister" element={<TypeRegister />} />
          <Route path="/Admin" element={<AdminHome />} />
          <Route path="/EditPolicia" element={<EditPolice />} />
          <Route path="/AddPostoPolicia" element={<AddPostoPolicia />} />
          <Route path="/EditPostoPolicia" element={<EditPostoPolicia />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
