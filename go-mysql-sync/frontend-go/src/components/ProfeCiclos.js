import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfeCiclos = () => {
  const [profeciclos, setProfeCiclos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    ciclo: "",
    idprofesor: "",
    idasignatura: "",
  });

  const [editId, setEditId] = useState(null);
  const apiBaseUrl = "http://localhost:8080";

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/profeciclo`);
      setProfeCiclos(res.data);
      const profesoresRes = await axios.get(`${apiBaseUrl}/profesores`);
      setProfesores(profesoresRes.data);
      const asignaturasRes = await axios.get(`${apiBaseUrl}/asignaturas`);
      setAsignaturas(asignaturasRes.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ciclo: formData.ciclo,
      idprofesor: parseInt(formData.idprofesor),
      idasignatura: parseInt(formData.idasignatura),
    };

    try {
      if (editId) {
        await axios.put(`${apiBaseUrl}/profeciclo/${editId}`, payload);
        alert("Ciclo actualizado");
        setEditId(null);
      } else {
        await axios.post(`${apiBaseUrl}/profeciclo`, payload);
        alert("Ciclo registrado");
      }

      setFormData({ id: "", ciclo: "", idprofesor: "", idasignatura: "" });
      fetchAll();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setFormData({
      id: p.id,
      ciclo: p.ciclo,
      idprofesor: p.idprofesor,
      idasignatura: p.idasignatura,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este ciclo?")) {
      try {
        await axios.delete(`${apiBaseUrl}/profeciclo/${id}`);
        fetchAll();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger mb-4">
        {editId ? "Editar ProfeCiclo" : "Registrar ProfeCiclo"}
      </h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            name="ciclo"
            className="form-control"
            placeholder="Nombre del ciclo"
            value={formData.ciclo}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </div>
        <div className="col-md-4">
          <select
            name="idprofesor"
            className="form-select"
            value={formData.idprofesor}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Profesor</option>
            {profesores.map((p) => (
              <option key={p.idprofesor} value={p.idprofesor}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            name="idasignatura"
            className="form-select"
            value={formData.idasignatura}
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
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary w-100">
            {editId ? (
              <>
                <i className="bi bi-pencil-square me-2"></i>Actualizar
              </>
            ) : (
              <>
                <i className="bi bi-save me-2"></i>Guardar
              </>
            )}
          </button>
        </div>
      </form>

      <h2 className="text-center text-danger mb-4">Lista de ProfeCiclos</h2>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Ciclo</th>
            <th>Profesor</th>
            <th>Asignatura</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profeciclos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.ciclo}</td>
              <td>{profesores.find((pro) => pro.idprofesor === p.idprofesor)?.nombre || "?"}</td>
              <td>{asignaturas.find((a) => a.idasignatura === p.idasignatura)?.nombre || "?"}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success btn-sm" onClick={() => handleEdit(p)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
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

export default ProfeCiclos;
