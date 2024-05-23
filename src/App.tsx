// src/App.tsx
import React from 'react';
import WelcomePage from './Welcome-Page';
import Login from './Login';
import FindItemsPage from './FindItems';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import FoundItemsPage from './FoundItems';
import Profile from './Profile';
import AuctionsPage from './AuctionsPage';
import Header from './Components/Header';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="*" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lostItems" element={<FindItemsPage />} />
          <Route path="/foundItems" element={<FoundItemsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auctions" element={<AuctionsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
