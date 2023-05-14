import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Demandes from "./pages/Demandes";
import Stats from "./pages/Stats";
import Sidebar from "./Components/Sidebar";
import LoginForm from "./Components/loginform";
import { AuthProvider } from "./Contexts/AuthContexts";
import SecuredRoutes from "./Components/SecuredRoutes";
import LoginRedirect from "./Components/LoginRedirect";
import Navbar from "./Components/NavBar";
import DemandeForm from "./pages/DemandeForm";
import Visualization from "./pages/Visualization";


const App = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<SecuredRoutes />}>
              <Route path="/" element={<Dashboard setSelectedFilter={setSelectedFilter} />} />
              <Route path="/Dashboard" element={<Dashboard setSelectedFilter={setSelectedFilter} />} />
              <Route path="/Demandes" element={<Demandes filter={selectedFilter} />} />
              <Route path="/Stats" element={<Stats />} />
              <Route path="/DemandeForm" element={<DemandeForm />} />
              <Route path="/demand/:demand_id" element={<Visualization />} />
            </Route>
            <Route path="/Login" element={<LoginRedirect />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};


export default App;
