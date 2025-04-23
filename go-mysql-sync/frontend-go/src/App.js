import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Estudiantes from "./components/Estudiantes";
import Asignaturas from "./components/Asignaturas";
import Profesores from "./components/Profesores";
import ProfeCiclos from "./components/ProfeCiclos";
import Matriculas from "./components/Matriculas";

const App = () => {
    return (
      <>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
          <span className="navbar-brand">📘 Sistema Académico</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" end>Estudiantes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/asignaturas" className="nav-link">Asignaturas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profesores" className="nav-link">Profesores</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profeciclos" className="nav-link">ProfeCiclos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/matriculas" className="nav-link">Matrículas</NavLink>
              </li>
            </ul>
          </div>
        </nav>
  
        {/* Contenido */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Estudiantes />} />
            <Route path="/asignaturas" element={<Asignaturas />} />
            <Route path="/profesores" element={<Profesores />} />
            <Route path="/profeciclos" element={<ProfeCiclos />} />
            <Route path="/matriculas" element={<Matriculas />} />
          </Routes>
        </div>
  
        {/* Botón flotante */}
        <NavLink to="/" className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow">
          <i className="bi bi-house-door-fill fs-4"></i>
        </NavLink>
      </>
    );
  };
  
  export default App;
  