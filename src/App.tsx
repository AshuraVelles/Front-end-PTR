import WelcomePage from "./Welcome-Page";
import Login from "./Login";
import FindItemsPage from "./FindItems";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import FoundItemsPage from "./FoundItems";


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
        </Routes>
      </Router>
    )
    
}

export default App;