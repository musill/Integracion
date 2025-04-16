import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profeciclo.css'; // Asegúrate de que esta ruta sea correcta
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Profeciclos = () => {
  const [profeciclos, setProfeciclos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const profeciclosPorPagina = 5;

  const [nuevoProfeciclo, setNuevoProfeciclo] = useState({ idprofeciclo: '', idprofesor: '', idasignatura: '', ciclo: '' });
  const [editando, setEditando] = useState(null);

  const obtenerProfeciclos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/profeciclos');
      setProfeciclos(res.data);
    } catch (error) {
      console.error('Error al obtener profeciclos', error);
    }
  };

  const crearProfeciclo = async () => {
    if (!nuevoProfeciclo.idprofeciclo || !nuevoProfeciclo.idprofesor || !nuevoProfeciclo.idasignatura || !nuevoProfeciclo.ciclo) {
      alert('Completa todos los campos');
      return;
    }
    try {
      await axios.post('http://localhost:8000/profeciclos', nuevoProfeciclo);
      setNuevoProfeciclo({ idprofeciclo: '', idprofesor: '', idasignatura: '', ciclo: '' });
      obtenerProfeciclos();
    } catch (error) {
      console.error('Error al crear profeciclo', error);
    }
  };

  const actualizarProfeciclo = async () => {
    try {
      await axios.put(`http://localhost:8000/profeciclos/${editando}`, nuevoProfeciclo);
      setEditando(null);
      setNuevoProfeciclo({ idprofeciclo: '', idprofesor: '', idasignatura: '', ciclo: '' });
      obtenerProfeciclos();
    } catch (error) {
      console.error('Error al actualizar profeciclo', error);
    }
  };

  const eliminarProfeciclo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/profeciclos/${id}`);
      obtenerProfeciclos();
    } catch (error) {
      console.error('Error al eliminar profeciclo', error);
    }
  };

  const seleccionarParaEditar = (profeciclo) => {
    setEditando(profeciclo.idprofeciclo);
    setNuevoProfeciclo({ idprofeciclo: profeciclo.idprofeciclo, idprofesor: profeciclo.idprofesor, idasignatura: profeciclo.idasignatura, ciclo: profeciclo.ciclo });
  };

  useEffect(() => {
    obtenerProfeciclos();
  }, []);

  const profeciclosFiltrados = profeciclos.filter((p) =>
    p.idprofeciclo.toString().includes(filtro) || p.idprofesor.toString().includes(filtro) || p.idasignatura.toString().includes(filtro)
  );

  const totalPaginas = Math.ceil(profeciclosFiltrados.length / profeciclosPorPagina);
  const profeciclosPagina = profeciclosFiltrados.slice(
    (paginaActual - 1) * profeciclosPorPagina,
    paginaActual * profeciclosPorPagina
  );

  return (
    <div className="profeciclos-container">
      <div className="profeciclos-box fade-in">
        <h2 className="titulo">Gestión de Profeciclos</h2>

        <div className="formulario">
          <input
            type="text"
            placeholder="ID Profeciclo"
            value={nuevoProfeciclo.idprofeciclo}
            onChange={(e) => setNuevoProfeciclo({ ...nuevoProfeciclo, idprofeciclo: e.target.value })}
          />
          <input
            type="text"
            placeholder="ID Profesor"
            value={nuevoProfeciclo.idprofesor}
            onChange={(e) => setNuevoProfeciclo({ ...nuevoProfeciclo, idprofesor: e.target.value })}
          />
          <input
            type="text"
            placeholder="ID Asignatura"
            value={nuevoProfeciclo.idasignatura}
            onChange={(e) => setNuevoProfeciclo({ ...nuevoProfeciclo, idasignatura: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ciclo"
            value={nuevoProfeciclo.ciclo}
            onChange={(e) => setNuevoProfeciclo({ ...nuevoProfeciclo, ciclo: e.target.value })}
          />
          <button onClick={editando ? actualizarProfeciclo : crearProfeciclo}>
            <FaPlus style={{ marginRight: 6 }} /> {editando ? 'Actualizar' : 'Crear'}
          </button>
        </div>

        <div className="filtro">
          <input
            type="text"
            placeholder="Buscar por ID profeciclo, profesor o asignatura..."
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
              <th>ID Profeciclo</th>
              <th>ID Profesor</th>
              <th>ID Asignatura</th>
              <th>Ciclo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profeciclosPagina.map((p) => (
              <tr key={p.idprofeciclo} className="tabla-fila fade-in">
                <td>{p.idprofeciclo}</td>
                <td>{p.idprofesor}</td>
                <td>{p.idasignatura}</td>
                <td>{p.ciclo}</td>
                <td>
                  <button className="btn-editar" onClick={() => seleccionarParaEditar(p)}>
                    <FaEdit />
                  </button>
                  <button className="btn-eliminar" onClick={() => eliminarProfeciclo(p.idprofeciclo)}>
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

export default Profeciclos;
