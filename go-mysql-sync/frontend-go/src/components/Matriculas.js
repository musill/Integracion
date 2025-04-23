import React, { useState, useEffect } from "react";
import axios from "axios";

const Matricula = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [profeciclos, setProfeciclos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);

  const [formData, setFormData] = useState({
    id_estudiante: "",
    id_asignatura: "",
    id_ciclo: "",
    notauno: 0,
    notados: 0,
    supletorio: 0,
  });

  const [editId, setEditId] = useState(null);
  const apiBaseUrl = "http://localhost:8080";

  useEffect(() => {
    axios.get(`${apiBaseUrl}/estudiantes`).then((res) => setEstudiantes(res.data));
    axios.get(`${apiBaseUrl}/asignaturas`).then((res) => setAsignaturas(res.data));
    axios.get(`${apiBaseUrl}/profeciclo`).then((res) => setProfeciclos(res.data));
    fetchMatriculas();
  }, []);

  const fetchMatriculas = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/matricula`);
      setMatriculas(res.data);
    } catch (error) {
      console.error("Error al obtener las matrículas:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      id_asignatura: parseInt(formData.id_asignatura),
      id_ciclo: parseInt(formData.id_ciclo),
      notauno: 0,
      notados: 0,
      supletorio: 0,
    };

    try {
      if (editId) {
        await axios.put(`${apiBaseUrl}/matricula/${editId}`, payload);
        alert("Matrícula actualizada");
        setEditId(null);
      } else {
        await axios.post(`${apiBaseUrl}/matricula`, payload);
        alert("Matrícula registrada");
      }

      setFormData({
        id_estudiante: "",
        id_asignatura: "",
        id_ciclo: "",
        notauno: 0,
        notados: 0,
        supletorio: 0,
      });
      fetchMatriculas();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar/actualizar");
    }
  };

  const handleEdit = (matricula) => {
    setEditId(matricula.id);
    setFormData({
      id_estudiante: matricula.id_estudiante,
      id_asignatura: matricula.id_asignatura,
      id_ciclo: matricula.id_ciclo,
      notauno: matricula.notauno,
      notados: matricula.notados,
      supletorio: matricula.supletorio,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta matrícula?")) {
      try {
        await axios.delete(`${apiBaseUrl}/matricula/${id}`);
        alert("Matrícula eliminada");
        fetchMatriculas();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger mb-4">{editId ? "Editar Matrícula" : "Registrar Matrícula"}</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <select
            name="id_estudiante"
            className="form-select"
            value={formData.id_estudiante}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Estudiante</option>
            {estudiantes.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            name="id_asignatura"
            className="form-select"
            value={formData.id_asignatura}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Asignatura</option>
            {asignaturas.map((a) => (
              <option key={a.idasignatura} value={a.idasignatura}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            name="id_ciclo"
            className="form-select"
            value={formData.id_ciclo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Ciclo</option>
            {profeciclos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.ciclo}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100">
            {editId ? (
              <>
                <i className="bi bi-pencil-square me-2"></i> Actualizar
              </>
            ) : (
              <>
                <i className="bi bi-save me-2"></i> Guardar
              </>
            )}
          </button>
        </div>
      </form>

      <h2 className="text-center text-danger mb-4">Lista de Matrículas</h2>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>Estudiante</th>
            <th>Asignatura</th>
            <th>Ciclo</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Supletorio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map((mat) => (
            <tr key={mat.id}>
              <td>{estudiantes.find((e) => e.id === mat.id_estudiante)?.nombre || "Desconocido"}</td>
              <td>{asignaturas.find((a) => a.idasignatura === mat.id_asignatura)?.nombre || "Desconocido"}</td>
              <td>{profeciclos.find((p) => p.id === mat.id_ciclo)?.ciclo || "Desconocido"}</td>
              <td>{mat.notauno}</td>
              <td>{mat.notados}</td>
              <td>{mat.supletorio}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success btn-sm" onClick={() => handleEdit(mat)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mat.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Matricula;
