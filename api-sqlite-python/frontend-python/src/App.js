import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Estudiantes from "./components/Estudiantes";
import Matricula from "./components/Matriculas";

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <span className="navbar-brand">📚 Sistema Académico</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Estudiantes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/matriculas" className="nav-link">
                Matrículas
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Estudiantes />} />
          <Route path="/matriculas" element={<Matricula />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
