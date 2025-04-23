import React, { useState, useEffect } from "react";
import axios from "axios";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [formData, setFormData] = useState({ id: "", nombre: "" });

  const apiBaseUrl = "http://localhost:8080"; // URL del backend Go

  const fetchEstudiantes = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/estudiantes`);
      setEstudiantes(res.data);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/estudiantes`, formData);
      setFormData({ id: "", nombre: "" });
      fetchEstudiantes();
    } catch (error) {
      console.error("Error al crear el estudiante:", error);
    }
  };

  const updateEstudiante = async (id) => {
    const estudiante = estudiantes.find((e) => e.id === id);
    try {
      await axios.put(`${apiBaseUrl}/estudiantes/${id}`, estudiante);
      fetchEstudiantes();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const deleteEstudiante = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/estudiantes/${id}`);
      fetchEstudiantes();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger mb-4">Estudiantes</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            name="id"
            placeholder="Cédula"
            className="form-control"
            maxLength={10}
            value={formData.id}
            onChange={handleChange}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="nombre"
            placeholder="Nombres completos"
            className="form-control"
            maxLength={50}
            value={formData.nombre}
            onChange={handleChange}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^a-zA-ZñÑ\s]/g, ""))
            }
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-plus-circle me-1"></i> Crear
          </button>
        </div>
      </form>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "15%" }}>Cédula</th>
            <th>Nombre</th>
            <th style={{ width: "15%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est) => (
            <tr key={est.id}>
              <td>
                <input
                  type="text"
                  readOnly
                  value={est.id}
                  className="form-control-plaintext text-center"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={est.nombre}
                  className="form-control text-center"
                  onChange={(e) => {
                    const updated = estudiantes.map((item) =>
                      item.id === est.id
                        ? { ...item, nombre: e.target.value }
                        : item
                    );
                    setEstudiantes(updated);
                  }}
                />
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateEstudiante(est.id)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEstudiante(est.id)}
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

export default Estudiantes;
