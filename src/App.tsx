import WelcomePage from "./Welcome-Page";
import Login from "./Login";
import ItemGridPage from "./item-grid-page";

import Register from "./Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Grid from "./Components/item-grid";

function App(){

    return (
      <Router>
        <Routes>
          <Route  path = "/" element={<WelcomePage />} />
          <Route  path = "*" element={<WelcomePage />} />
          <Route  path = "/login" element={<Login />} />
          <Route  path = "/foundItems" element={<ItemGridPage />} />
          <Route  path = "/registerPage" element={<Register />} />

        </Routes>
      </Router>
    )
    
}

export default App;