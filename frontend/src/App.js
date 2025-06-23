import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Rewards from './components/Rewards';
import Community from './components/Community';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage'; // import auth page

import './App.css';

const App = () => {
  const [points, setPoints] = useState(0);

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
    } else {
      alert("You don't have enough points to redeem!");
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
              <>
                <Dashboard />
                <Rewards points={points} handleRedeem={redeemPoints} />
                <Community addPoints={addPoints} />
              </>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
