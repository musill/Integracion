import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './estudiantes.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const estudiantesPorPagina = 5;

  const [nuevoEstudiante, setNuevoEstudiante] = useState({ id: '', nombre: '' });
  const [editando, setEditando] = useState(null);

  const obtenerEstudiantes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/estudiantes');
      setEstudiantes(res.data);
    } catch (error) {
      console.error('Error al obtener estudiantes', error);
    }
  };

  const crearEstudiante = async () => {
    if (!nuevoEstudiante.id || !nuevoEstudiante.nombre) {
      alert('Completa ambos campos');
      return;
    }
    try {
      await axios.post('http://localhost:8000/estudiantes', nuevoEstudiante);
      setNuevoEstudiante({ id: '', nombre: '' });
      obtenerEstudiantes();
    } catch (error) {
      console.error('Error al crear estudiante', error);
    }
  };

  const actualizarEstudiante = async () => {
    try {
      await axios.put(`http://localhost:8000/estudiantes/${editando}`, nuevoEstudiante);
      setEditando(null);
      setNuevoEstudiante({ id: '', nombre: '' });
      obtenerEstudiantes();
    } catch (error) {
      console.error('Error al actualizar estudiante', error);
    }
  };

  const eliminarEstudiante = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/estudiantes/${id}`);
      obtenerEstudiantes();
    } catch (error) {
      console.error('Error al eliminar estudiante', error);
    }
  };

  const seleccionarParaEditar = (estudiante) => {
    setEditando(estudiante.id);
    setNuevoEstudiante({ id: estudiante.id, nombre: estudiante.nombre });
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  const estudiantesFiltrados = estudiantes.filter((e) =>
    e.nombre.toLowerCase().includes(filtro.toLowerCase()) || e.id.includes(filtro)
  );

  const totalPaginas = Math.ceil(estudiantesFiltrados.length / estudiantesPorPagina);
  const estudiantesPagina = estudiantesFiltrados.slice(
    (paginaActual - 1) * estudiantesPorPagina,
    paginaActual * estudiantesPorPagina
  );

  return (
    <div className="estudiantes-container">
      <div className="estudiantes-box fade-in">
        <h2 className="titulo">Gestión de Estudiantes</h2>

        <div className="formulario">
          <input
            type="text"
            placeholder="ID"
            value={nuevoEstudiante.id}
            onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoEstudiante.nombre}
            onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })}
          />
          <button onClick={editando ? actualizarEstudiante : crearEstudiante}>
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
            {estudiantesPagina.map((e) => (
              <tr key={e.id} className="tabla-fila fade-in">
                <td>{e.id}</td>
                <td>{e.nombre}</td>
                <td>
                  <button className="btn-editar" onClick={() => seleccionarParaEditar(e)}>
                    <FaEdit />
                  </button>
                  <button className="btn-eliminar" onClick={() => eliminarEstudiante(e.id)}>
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

export default Estudiantes;
