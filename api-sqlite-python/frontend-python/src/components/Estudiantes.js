import React, { useState, useEffect } from "react";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]); // Estado para almacenar los estudiantes
  const [formData, setFormData] = useState({ id: "", nombre: "" }); // Estado para el formulario

  const apiBaseUrl = "http://127.0.0.1:8000"; // URL base del backend

  // Obtener estudiantes desde la base de datos
  const fetchEstudiantes = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/estudiantes/`); // Solicitud GET al backend
      if (response.ok) {
        const data = await response.json(); // Convertir la respuesta a JSON
        setEstudiantes(data); // Actualizar el estado con los datos obtenidos
      } else {
        console.error("Error al obtener los estudiantes");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Crear estudiante
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/estudiantes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ id: "", nombre: "" }); // Limpiar el formulario
        fetchEstudiantes(); // Actualizar la tabla
      } else {
        console.error("Error al crear el estudiante");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // Eliminar estudiante
  const deleteEstudiante = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/estudiantes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEstudiantes(); // Actualizar la tabla
      } else {
        console.error("Error al eliminar el estudiante");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // Actualizar estudiante
  const updateEstudiante = async (id) => {
    const estudiante = estudiantes.find((est) => est.id === id);
    if (estudiante) {
      try {
        const response = await fetch(`${apiBaseUrl}/estudiantes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(estudiante),
        });
        if (response.ok) {
          fetchEstudiantes(); // Actualizar la tabla
        } else {
          console.error("Error al actualizar el estudiante");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    }
  };

  // Ejecutar fetchEstudiantes al cargar el componente
  useEffect(() => {
    fetchEstudiantes();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger mb-4">Estudiantes</h2>
      <div className="table-wrapper">
      <form onSubmit={handleSubmit} className="row g-3 mb-5 border p-4 rounded shadow-sm bg-light">
        <div className="col-md-4">
          <input
            type="text"
            name="id"
            className="form-control"
            placeholder="Cédula"
            value={formData.id}
            onChange={handleChange}
            maxLength={10}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombres completos"
            value={formData.nombre}
            onChange={handleChange}
            maxLength={50}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-ZñÑ\s]/g, "");
            }}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Crear
          </button>
        </div>
      </form>
      </div>
      <div className="table-wrapper">
      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th style={{width:"120px"}}>Cédula</th>
            <th style={{width:"300px"}}>Nombre</th>
            <th style={{width:"50px"}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est) => (
            <tr key={est.id}>
              <td style={{width:"120px"}}> 
                <input
                  type="text"
                  value={est.id}
                  readOnly
                  className="form-control-plaintext text-center"
                />
              </td>
              <td style={{width:"300px"}}> 
                <input
                  type="text"
                  value={est.nombre}
                  onChange={(e) => {
                    const updatedEstudiantes = estudiantes.map((item) =>
                      item.id === est.id
                        ? { ...item, nombre: e.target.value }
                        : item
                    );
                    setEstudiantes(updatedEstudiantes);
                  }}
                  className="form-control text-center"
                />
              </td>
              <td style={{width:"40px"}}> 
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => updateEstudiante(est.id)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
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
    </div>
  );
};

export default Estudiantes;
