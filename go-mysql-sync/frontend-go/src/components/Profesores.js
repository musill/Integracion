import React, { useState, useEffect } from "react";
import axios from "axios";

const Profesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [formData, setFormData] = useState({ idprofesor: "", nombre: "" });
  const [editId, setEditId] = useState(null);

  const apiBaseUrl = "http://localhost:8080";

  useEffect(() => {
    fetchProfesores();
  }, []);

  const fetchProfesores = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/profesores`);
      setProfesores(res.data);
    } catch (error) {
      console.error("Error al obtener profesores:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      idprofesor: parseInt(formData.idprofesor),
      nombre: formData.nombre,
    };

    try {
      if (editId) {
        await axios.put(`${apiBaseUrl}/profesores/${editId}`, payload);
        alert("Profesor actualizado");
        setEditId(null);
      } else {
        await axios.post(`${apiBaseUrl}/profesores`, payload);
        alert("Profesor registrado");
      }

      setFormData({ idprofesor: "", nombre: "" });
      fetchProfesores();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleEdit = (profesor) => {
    setEditId(profesor.idprofesor);
    setFormData({ idprofesor: profesor.idprofesor, nombre: profesor.nombre });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este profesor?")) {
      try {
        await axios.delete(`${apiBaseUrl}/profesores/${id}`);
        fetchProfesores();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger mb-4">
        {editId ? "Editar Profesor" : "Registrar Profesor"}
      </h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            type="number"
            name="idprofesor"
            className="form-control"
            placeholder="ID Profesor"
            value={formData.idprofesor}
            onChange={handleChange}
            required
            disabled={!!editId}
          />
        </div>
        <div className="col-md-7">
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre del profesor"
            maxLength={50}
            value={formData.nombre}
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

      <h2 className="text-center text-danger mb-4">Lista de Profesores</h2>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesores.map((prof) => (
            <tr key={prof.idprofesor}>
              <td>{prof.idprofesor}</td>
              <td>
                <input
                  type="text"
                  value={prof.nombre}
                  className="form-control text-center"
                  onChange={(e) => {
                    const updated = profesores.map((item) =>
                      item.idprofesor === prof.idprofesor
                        ? { ...item, nombre: e.target.value }
                        : item
                    );
                    setProfesores(updated);
                  }}
                />
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleEdit(prof)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(prof.idprofesor)}
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

export default Profesores;
