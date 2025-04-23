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

  const [editId, setEditId] = useState(null); // ID de la matrícula que se está editando

  // Cargar datos iniciales
  useEffect(() => {
    axios
      .get("http://10.79.19.94:8000/estudiantes/")
      .then((res) => setEstudiantes(res.data));
    axios
      .get("http://10.79.19.94:8000/asignaturas/")
      .then((res) => setAsignaturas(res.data));
    axios
      .get("http://10.79.19.94:8000/profeciclo/")
      .then((res) => setProfeciclos(res.data));
    fetchMatriculas(); // Cargar las matrículas
  }, []);

  // Obtener las matrículas
  const fetchMatriculas = async () => {
    try {
      const res = await axios.get("http://10.79.19.94:8000/matricula/");
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
      notauno: 0, // Forzado a 0
      notados: 0, // Forzado a 0
      supletorio: 0, // Forzado a 0
    };

    try {
      if (editId) {
        // Actualizar matrícula
        await axios.put(`http://10.79.19.94:8000/matricula/${editId}/`, payload);
        alert("Matrícula actualizada con éxito");
        setEditId(null); // Salir del modo de edición
      } else {
        // Crear nueva matrícula
        await axios.post("http://10.79.19.94:8000/matricula/", payload);
        alert("Matrícula registrada con éxito");
      }

      setFormData({
        id_estudiante: "",
        id_asignatura: "",
        id_ciclo: "",
        notauno: 0,
        notados: 0,
        supletorio: 0,
      });
      fetchMatriculas(); // Actualizar la tabla de matrículas
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      alert("Error al registrar/actualizar la matrícula");
    }
  };

  const handleEdit = (matricula) => {
    setEditId(matricula.id); // Establecer el ID de la matrícula que se está editando
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
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta matrícula?")
    ) {
      try {
        await axios.delete(`http://10.79.19.94:8000/matricula/${id}/`);
        alert("Matrícula eliminada con éxito");
        fetchMatriculas(); // Actualizar la tabla de matrículas
      } catch (error) {
        console.error("Error al eliminar la matrícula:", error);
        alert("Error al eliminar la matrícula");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger mb-4">
        {editId ? "✏️ Editar Matrícula" : "📝 Registrar Matrícula"}
      </h2>
  
      <form onSubmit={handleSubmit} className="row g-3 mb-5 border p-4 rounded shadow-sm bg-light">
        <div className="col-md-4">
          <label className="form-label">Estudiante</label>
          <select
            name="id_estudiante"
            value={formData.id_estudiante}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccione Estudiante</option>
            {estudiantes.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Asignatura</label>
          <select
            name="id_asignatura"
            value={formData.id_asignatura}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccione Asignatura</option>
            {asignaturas.map((a) => (
              <option key={a.idasignatura} value={a.idasignatura}>{a.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Ciclo</label>
          <select
            name="id_ciclo"
            value={formData.id_ciclo}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccione Ciclo</option>
            {profeciclos.map((p) => (
              <option key={p.id} value={p.id}>{p.ciclo}</option>
            ))}
          </select>
        </div>
  
        <div className="col-md-12 d-flex justify-content-end">
          <button type="submit" className={`btn ${editId ? "btn-success" : "btn-primary"}`}>
            {editId ? (
              <><i className="bi bi-pencil-square me-2"></i>Actualizar Matrícula</>
            ) : (
              <><i className="bi bi-save me-2"></i>Guardar Matrícula</>
            )}
          </button>
        </div>
      </form>
  
      <h2 className="text-center text-danger mb-4">📋 Lista de Matrículas</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Estudiante</th>
              <th>Asignatura</th>
              <th>Ciclo</th>
              <th>Nota Uno</th>
              <th>Nota Dos</th>
              <th>Supletorio</th>
              <th style={{ width: "120px" }}>Acciones</th>
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
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleEdit(mat)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(mat.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Matricula;
