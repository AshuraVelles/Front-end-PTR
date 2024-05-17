import WelcomePage from "./Welcome-Page";
import Login from "./Login";
import FindItemsPage from "./FindItemsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import FoundItemsPage from "./FoundItemsPage";
import Profile from "./Profile";
import ItemDetailsPage from './ItemDetailsPage';

function App(){

    return (
      <Router>
        <Routes>
          <Route  path = "/" element={<WelcomePage />} />
          <Route  path = "*" element={<WelcomePage />} />
          <Route  path = "/login" element={<Login />} />
          <Route  path = "/register" element={<Register />} />
          <Route  path = "/lostItems" element={<FindItemsPage />} />
          <Route  path = "/foundItems" element={<FoundItemsPage />} />
          <Route  path = "/profile" element={<Profile />} />
          <Route path="/lost/:id" element={<ItemDetailsPage />} /> {/* Add route for lost item details */}
          <Route path="/found/:id" element={<ItemDetailsPage />} /> 
        </Routes>
      </Router>
    )
    
}

export default App;