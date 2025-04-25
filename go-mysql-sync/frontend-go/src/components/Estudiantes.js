import React, { useState, useEffect } from "react";
import axios from "axios";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [formData, setFormData] = useState({ ID: "", Nombre: "" });
  const [editID, setEditID] = useState(null);

  const apiBaseUrl = "http://localhost:8080";

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

  useEffect(() => {
    console.log("Estudiantes cargados:", estudiantes);
  }, [estudiantes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editID) {
        await axios.put(`${apiBaseUrl}/estudiantes/${editID}`, formData);
        setEditID(null);
      } else {
        await axios.post(`${apiBaseUrl}/estudiantes`, formData);
      }
      setFormData({ ID: "", Nombre: "" });
      fetchEstudiantes();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleEdit = (estudiante) => {
    setEditID(estudiante.ID);
    setFormData({
      ID: estudiante.ID,
      Nombre: estudiante.Nombre,
    });
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
            name="ID"
            placeholder="Cédula"
            className="form-control"
            maxLength={10}
            value={formData.ID}
            onChange={handleChange}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
            required
            disabled={editID !== null} // para evitar cambiar ID al editar
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="Nombre"
            placeholder="Nombres completos"
            className="form-control"
            maxLength={50}
            value={formData.Nombre}
            onChange={handleChange}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^a-zA-ZñÑ\s]/g, ""))
            }
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editID ? (
              <>
                <i className="bi bi-pencil-square me-1"></i> Actualizar
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-1"></i> Crear
              </>
            )}
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
            <tr key={est.ID}>
              <td>
                <input
                  type="text"
                  readOnly
                  value={est.ID}
                  className="form-control-plaintext text-center"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={est.Nombre || ""}
                  className="form-control text-center"
                  onChange={(e) => {
                    const updated = estudiantes.map((item) =>
                      item.ID === est.ID
                        ? { ...item, Nombre: e.target.value }
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
                    onClick={() => handleEdit(est)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEstudiante(est.ID)}
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
