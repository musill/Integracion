import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Estudiantes from './pages/estudiantes';
import Profesores from './pages/profesores';
import Asignaturas from './pages/asignaturas';
import Matricula from './pages/matricula';
import ProfeCiclo from './pages/profeciclo';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/profesores" element={<Profesores />} />
          <Route path="/asignaturas" element={<Asignaturas />} />
          <Route path="/matricula" element={<Matricula />} />
          <Route path="/profeciclo" element={<ProfeCiclo />} />
          <Route path="/" element={<h1 className="text-2xl font-bold">Bienvenido al Sistema de Gestión Educativa</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
