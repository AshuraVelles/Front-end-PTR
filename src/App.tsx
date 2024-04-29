import WelcomePage from "./Welcome-Page";
import Login from "./Login";
import ItemGridPage from "./item-grid-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App(){

    return (
      <Router>
        <Routes>
          <Route  path = "/" element={<WelcomePage />} />
          <Route  path = "*" element={<WelcomePage />} />
          <Route  path = "/login" element={<Login />} />
          <Route  path = "/foundItems" element={<ItemGridPage />} />
        </Routes>
      </Router>
    )
    
}

export default App;