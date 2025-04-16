import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './asignaturas.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Asignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const asignaturasPorPagina = 5;

  const [nuevaAsignatura, setNuevaAsignatura] = useState({ idasignatura: '', nombre: '' });
  const [editando, setEditando] = useState(null);

  const obtenerAsignaturas = async () => {
    try {
      const res = await axios.get('http://localhost:8000/asignaturas');
      setAsignaturas(res.data);
    } catch (error) {
      console.error('Error al obtener asignaturas', error);
    }
  };

  const crearAsignatura = async () => {
    if (!nuevaAsignatura.idasignatura || !nuevaAsignatura.nombre) {
      alert('Completa ambos campos');
      return;
    }
    try {
      await axios.post('http://localhost:8000/asignaturas', nuevaAsignatura);
      setNuevaAsignatura({ idasignatura: '', nombre: '' });
      obtenerAsignaturas();
    } catch (error) {
      console.error('Error al crear asignatura', error);
    }
  };

  const actualizarAsignatura = async () => {
    try {
      await axios.put(`http://localhost:8000/asignaturas/${editando}`, nuevaAsignatura);
      setEditando(null);
      setNuevaAsignatura({ idasignatura: '', nombre: '' });
      obtenerAsignaturas();
    } catch (error) {
      console.error('Error al actualizar asignatura', error);
    }
  };

  const eliminarAsignatura = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/asignaturas/${id}`);
      obtenerAsignaturas();
    } catch (error) {
      console.error('Error al eliminar asignatura', error);
    }
  };

  const seleccionarParaEditar = (asignatura) => {
    setEditando(asignatura.idasignatura);
    setNuevaAsignatura({ idasignatura: asignatura.idasignatura, nombre: asignatura.nombre });
  };

  useEffect(() => {
    obtenerAsignaturas();
  }, []);

  const asignaturasFiltradas = asignaturas.filter((a) =>
    a.nombre.toLowerCase().includes(filtro.toLowerCase()) || a.idasignatura.toString().includes(filtro)
  );

  const totalPaginas = Math.ceil(asignaturasFiltradas.length / asignaturasPorPagina);
  const asignaturasPagina = asignaturasFiltradas.slice(
    (paginaActual - 1) * asignaturasPorPagina,
    paginaActual * asignaturasPorPagina
  );

  return (
    <div className="asignaturas-container">
      <div className="asignaturas-box fade-in">
        <h2 className="titulo">Gestión de Asignaturas</h2>

        <div className="formulario">
          <input
            type="text"
            placeholder="ID"
            value={nuevaAsignatura.idasignatura}
            onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, idasignatura: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nuevaAsignatura.nombre}
            onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, nombre: e.target.value })}
          />
          <button onClick={editando ? actualizarAsignatura : crearAsignatura}>
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
            {asignaturasPagina.map((a) => (
              <tr key={a.idasignatura} className="tabla-fila fade-in">
                <td>{a.idasignatura}</td>
                <td>{a.nombre}</td>
                <td>
                  <button className="btn-editar" onClick={() => seleccionarParaEditar(a)}>
                    <FaEdit />
                  </button>
                  <button className="btn-eliminar" onClick={() => eliminarAsignatura(a.idasignatura)}>
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

export default Asignaturas;
