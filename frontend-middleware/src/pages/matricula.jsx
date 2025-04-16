import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './matricula.css'; // Asegúrate de que esta ruta sea correcta
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Matriculas = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const matriculasPorPagina = 5;

  const [nuevaMatricula, setNuevaMatricula] = useState({ idmatricula: '', idestudiante: '', idasignatura: '', fecha: '' });
  const [editando, setEditando] = useState(null);

  const obtenerMatriculas = async () => {
    try {
      const res = await axios.get('http://localhost:8000/matriculas');
      setMatriculas(res.data);
    } catch (error) {
      console.error('Error al obtener matriculas', error);
    }
  };

  const crearMatricula = async () => {
    if (!nuevaMatricula.idmatricula || !nuevaMatricula.idestudiante || !nuevaMatricula.idasignatura || !nuevaMatricula.fecha) {
      alert('Completa todos los campos');
      return;
    }
    try {
      await axios.post('http://localhost:8000/matriculas', nuevaMatricula);
      setNuevaMatricula({ idmatricula: '', idestudiante: '', idasignatura: '', fecha: '' });
      obtenerMatriculas();
    } catch (error) {
      console.error('Error al crear matricula', error);
    }
  };

  const actualizarMatricula = async () => {
    try {
      await axios.put(`http://localhost:8000/matriculas/${editando}`, nuevaMatricula);
      setEditando(null);
      setNuevaMatricula({ idmatricula: '', idestudiante: '', idasignatura: '', fecha: '' });
      obtenerMatriculas();
    } catch (error) {
      console.error('Error al actualizar matricula', error);
    }
  };

  const eliminarMatricula = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/matriculas/${id}`);
      obtenerMatriculas();
    } catch (error) {
      console.error('Error al eliminar matricula', error);
    }
  };

  const seleccionarParaEditar = (matricula) => {
    setEditando(matricula.idmatricula);
    setNuevaMatricula({ idmatricula: matricula.idmatricula, idestudiante: matricula.idestudiante, idasignatura: matricula.idasignatura, fecha: matricula.fecha });
  };

  useEffect(() => {
    obtenerMatriculas();
  }, []);

  const matriculasFiltradas = matriculas.filter((m) =>
    m.idmatricula.toString().includes(filtro) || m.idestudiante.toString().includes(filtro) || m.idasignatura.toString().includes(filtro)
  );

  const totalPaginas = Math.ceil(matriculasFiltradas.length / matriculasPorPagina);
  const matriculasPagina = matriculasFiltradas.slice(
    (paginaActual - 1) * matriculasPorPagina,
    paginaActual * matriculasPorPagina
  );

  return (
    <div className="matriculas-container">
      <div className="matriculas-box fade-in">
        <h2 className="titulo">Gestión de Matrículas</h2>

        <div className="formulario">
          <input
            type="text"
            placeholder="ID Matrícula"
            value={nuevaMatricula.idmatricula}
            onChange={(e) => setNuevaMatricula({ ...nuevaMatricula, idmatricula: e.target.value })}
          />
          <input
            type="text"
            placeholder="ID Estudiante"
            value={nuevaMatricula.idestudiante}
            onChange={(e) => setNuevaMatricula({ ...nuevaMatricula, idestudiante: e.target.value })}
          />
          <input
            type="text"
            placeholder="ID Asignatura"
            value={nuevaMatricula.idasignatura}
            onChange={(e) => setNuevaMatricula({ ...nuevaMatricula, idasignatura: e.target.value })}
          />
          <input
            type="date"
            placeholder="Fecha"
            value={nuevaMatricula.fecha}
            onChange={(e) => setNuevaMatricula({ ...nuevaMatricula, fecha: e.target.value })}
          />
          <button onClick={editando ? actualizarMatricula : crearMatricula}>
            <FaPlus style={{ marginRight: 6 }} /> {editando ? 'Actualizar' : 'Crear'}
          </button>
        </div>

        <div className="filtro">
          <input
            type="text"
            placeholder="Buscar por ID matrícula, estudiante o asignatura..."
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
              <th>ID Matrícula</th>
              <th>ID Estudiante</th>
              <th>ID Asignatura</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {matriculasPagina.map((m) => (
              <tr key={m.idmatricula} className="tabla-fila fade-in">
                <td>{m.idmatricula}</td>
                <td>{m.idestudiante}</td>
                <td>{m.idasignatura}</td>
                <td>{m.fecha}</td>
                <td>
                  <button className="btn-editar" onClick={() => seleccionarParaEditar(m)}>
                    <FaEdit />
                  </button>
                  <button className="btn-eliminar" onClick={() => eliminarMatricula(m.idmatricula)}>
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

export default Matriculas;
