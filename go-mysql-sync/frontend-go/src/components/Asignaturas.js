import React, { useState, useEffect } from "react";
import axios from "axios";

const Asignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [formData, setFormData] = useState({ idasignatura: "", nombre: "" });
  const [editId, setEditId] = useState(null);

  const apiBaseUrl = "http://localhost:8080";

  useEffect(() => {
    fetchAsignaturas();
  }, []);

  const fetchAsignaturas = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/asignaturas`);
      setAsignaturas(res.data);
    } catch (error) {
      console.error("Error al cargar asignaturas:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      idasignatura: parseInt(formData.idasignatura),
      nombre: formData.nombre,
    };

    try {
      if (editId) {
        await axios.put(`${apiBaseUrl}/asignaturas/${editId}`, payload);
        alert("Asignatura actualizada");
        setEditId(null);
      } else {
        await axios.post(`${apiBaseUrl}/asignaturas`, payload);
        alert("Asignatura registrada");
      }

      setFormData({ idasignatura: "", nombre: "" });
      fetchAsignaturas();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleEdit = (asig) => {
    setEditId(asig.idasignatura);
    setFormData({ idasignatura: asig.idasignatura, nombre: asig.nombre });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta asignatura?")) {
      try {
        await axios.delete(`${apiBaseUrl}/asignaturas/${id}`);
        fetchAsignaturas();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger mb-4">
        {editId ? "Editar Asignatura" : "Registrar Asignatura"}
      </h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            type="number"
            name="idasignatura"
            className="form-control"
            placeholder="ID Asignatura"
            value={formData.idasignatura}
            onChange={handleChange}
            required
            disabled={!!editId} // No permitir cambiar el ID al editar
          />
        </div>
        <div className="col-md-7">
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre de la asignatura"
            value={formData.nombre}
            maxLength={50}
            onChange={(e) =>
              setFormData({
                ...formData,
                nombre: e.target.value.replace(/[^a-zA-ZñÑ\s]/g, ""),
              })
            }
            required
          />
        </div>
        <div className="col-md-2">
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

      <h2 className="text-center text-danger mb-4">Lista de Asignaturas</h2>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignaturas.map((asig) => (
            <tr key={asig.idasignatura}>
              <td>{asig.idasignatura}</td>
              <td>
                <input
                  type="text"
                  value={asig.nombre}
                  className="form-control text-center"
                  onChange={(e) => {
                    const updated = asignaturas.map((item) =>
                      item.idasignatura === asig.idasignatura
                        ? { ...item, nombre: e.target.value }
                        : item
                    );
                    setAsignaturas(updated);
                  }}
                />
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleEdit(asig)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(asig.idasignatura)}
                  >
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

export default Asignaturas;
