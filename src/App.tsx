// src/App.tsx
import React from 'react';
import WelcomePage from './Welcome-Page';
import Login from './Login';
import LostItemsPage from './LostItemsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import FoundItemsPage from './FoundItemsPage';
import Profile from './Profile';
import AuctionsPage from './AuctionsPage';
import Header from './Components/Header';
import AuthProvider from './context/AuthContext';
import ItemDetailsPage from './ItemDetailsPage';
import HomePolicia from './homePolicia';
import HomeUtilizador from './homeUtilizador';
import TypeRegister from './TypeRegister';
import RegisterPolicia from './RegisterPolicia';

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lostItems" element={<LostItemsPage />} />
          <Route path="/foundItems" element={<FoundItemsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="/lost/:id" element={<ItemDetailsPage />} /> 
          <Route path="/found/:id" element={<ItemDetailsPage />} /> 
          <Route path="/RegisterPolicia" element={<RegisterPolicia />} />
          <Route path="/typeRegister" element={<TypeRegister />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
