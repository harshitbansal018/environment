import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import EcoTipUpload from './components/EcoTipUpload';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import EcoTourismCards from './components/EcoTourismCards'; // ✅ new cards

import './App.css';

const App = () => {
  const [points, setPoints] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addPoints = (practice) => {
    if (practice === 'used public transport') {
      setPoints(points + 10);
    } else if (practice === 'recycle waste') {
      setPoints(points + 15);
    } else if (practice === 'used recycle bags') {
      setPoints(points + 5);
    }
  };

  const redeemPoints = () => {
    if (points >= 10) {
      setPoints(points - 10);
      alert("🎉 You redeemed 10 points for a discount!");
    } else {
      alert("⚠️ You don't have enough points to redeem!");
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Dashboard />
                  {/* ✅ Replaced Rewards + Community with New Cards */}
                  <EcoTourismCards points={points} handleRedeem={redeemPoints} />
                  <EcoTipUpload addPoints={addPoints} />

                </>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
            
          />
          <Route
            path="/auth"
            element={<AuthPage setIsAuthenticated={setIsAuthenticated} />}
         

          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
