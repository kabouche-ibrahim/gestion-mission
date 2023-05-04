import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Demandes from "./pages/Demandes";
import Stats from "./pages/Stats";
import Sidebar from "./Components/Sidebar";
import LoginForm from "./Components/loginform";
import Navbar from "./Components/NavBar";
import DemandeForm from "./pages/DemandeForm";
import Visualization from "./pages/Visualization";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin") { 
      setIsLoggedIn(true);
    }
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Sidebar>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard setSelectedFilter={setSelectedFilter} />} />
            <Route path="/Dashboard" element={<Dashboard setSelectedFilter={setSelectedFilter} />} />
            <Route path="/Demandes" element={<Demandes filter={selectedFilter} />} />
            <Route path="/Stats" element={<Stats />} />
            <Route path="/DemandeForm" element={<DemandeForm />} />
            <Route path="/Visualization" element={<Visualization />} />
          </Routes>
        </Sidebar>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </BrowserRouter>
  );
};

export default App;

