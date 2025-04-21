import React from "react";
import Estudiantes from "./components/Estudiantes";
import Matriculas from "./components/Matriculas";
import './App.css';

function App() {
  return (
    <div>
      <h1>CRUD Estudiantes y Matrícula</h1>
      <Estudiantes />
      <Matriculas />
    </div>
  );
}

export default App;
