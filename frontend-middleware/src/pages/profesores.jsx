import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profesores.css'; // Asegúrate de crear el archivo con los estilos proporcionados
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Profesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const profesoresPorPagina = 5;

  const [nuevoProfesor, setNuevoProfesor] = useState({ idprofesor: '', nombre: '' });
  const [editando, setEditando] = useState(null);

  const obtenerProfesores = async () => {
    try {
      const res = await axios.get('http://localhost:8000/profesores');
      setProfesores(res.data);
    } catch (error) {
      console.error('Error al obtener profesores', error);
    }
  };

  const crearProfesor = async () => {
    if (!nuevoProfesor.idprofesor || !nuevoProfesor.nombre) {
      alert('Completa ambos campos');
      return;
    }
    try {
      await axios.post('http://localhost:8000/profesores', nuevoProfesor);
      setNuevoProfesor({ idprofesor: '', nombre: '' });
      obtenerProfesores();
    } catch (error) {
      console.error('Error al crear profesor', error);
    }
  };

  const actualizarProfesor = async () => {
    try {
      await axios.put(`http://localhost:8000/profesores/${editando}`, nuevoProfesor);
      setEditando(null);
      setNuevoProfesor({ idprofesor: '', nombre: '' });
      obtenerProfesores();
    } catch (error) {
      console.error('Error al actualizar profesor', error);
    }
  };

  const eliminarProfesor = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/profesores/${id}`);
      obtenerProfesores();
    } catch (error) {
      console.error('Error al eliminar profesor', error);
    }
  };

  const seleccionarParaEditar = (profesor) => {
    setEditando(profesor.idprofesor);
    setNuevoProfesor({ idprofesor: profesor.idprofesor, nombre: profesor.nombre });
  };

  useEffect(() => {
    obtenerProfesores();
  }, []);

  const profesoresFiltrados = profesores.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) || p.idprofesor.toString().includes(filtro)
  );

  const totalPaginas = Math.ceil(profesoresFiltrados.length / profesoresPorPagina);
  const profesoresPagina = profesoresFiltrados.slice(
    (paginaActual - 1) * profesoresPorPagina,
    paginaActual * profesoresPorPagina
  );

  return (
    <div className="asignaturas-container">
      <div className="asignaturas-box fade-in">
        <h2 className="titulo">Gestión de Profesores</h2>

        <div className="formulario">
          <input
            type="text"
            placeholder="ID"
            value={nuevoProfesor.idprofesor}
            onChange={(e) => setNuevoProfesor({ ...nuevoProfesor, idprofesor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoProfesor.nombre}
            onChange={(e) => setNuevoProfesor({ ...nuevoProfesor, nombre: e.target.value })}
          />
          <button onClick={editando ? actualizarProfesor : crearProfesor}>
            <FaPlus style={{ marginRight: 6 }} /> {editando ? 'Actualizar' : 'Crear'}
          </button>
        </div>

        <div className="filtro">
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value);
              setPaginaActual(1);
            }}
          />
        </div>

        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesoresPagina.map((p) => (
              <tr key={p.idprofesor} className="tabla-fila fade-in">
                <td>{p.idprofesor}</td>
                <td>{p.nombre}</td>
                <td>
                  <button className="btn-editar" onClick={() => seleccionarParaEditar(p)}>
                    <FaEdit />
                  </button>
                  <button className="btn-eliminar" onClick={() => eliminarProfesor(p.idprofesor)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="paginacion">
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              className={paginaActual === i + 1 ? 'activo' : ''}
              onClick={() => setPaginaActual(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profesores;
