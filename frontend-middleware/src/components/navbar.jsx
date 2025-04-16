import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaChalkboardTeacher, FaBook, FaClipboardList, FaRegIdBadge, FaBars } from 'react-icons/fa'; // Usamos FaBars
import './navbar.css';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false); // Estado para controlar si está contraído o no

  const toggleNavbar = () => {
    setCollapsed(!collapsed); // Alternar entre expandido y contraído
  };

  return (
    <nav className={`navbar ${collapsed ? 'collapsed' : ''}`}>
    

      {/* Título opcional */}
      {!collapsed && <h2>Sistema Educativo</h2>}

      {/* Enlaces */}
      <Link to="/estudiantes" className="link">
        <FaUserAlt size={24} />
        {!collapsed && 'Estudiantes'}
      </Link>

      <Link to="/profesores" className="link">
        <FaChalkboardTeacher size={24} />
        {!collapsed && 'Profesores'}
      </Link>

      <Link to="/asignaturas" className="link">
        <FaBook size={24} />
        {!collapsed && 'Asignaturas'}
      </Link>

      <Link to="/matricula" className="link">
        <FaClipboardList size={24} />
        {!collapsed && 'Matrícula'}
      </Link>

      <Link to="/profeciclo" className="link">
        <FaRegIdBadge size={24} />
        {!collapsed && 'ProfeCiclo'}
      </Link>
        {/* Botón para contraer y expandir el navbar */}
        <button className="collapse-icon" onClick={toggleNavbar}>
        <FaBars size={24} />
      </button>
    </nav>
    
  );
};

export default Navbar;
