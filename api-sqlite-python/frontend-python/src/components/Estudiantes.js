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
    <div>
      <h2>Estudiantes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Cédula"
          value={formData.id}
          onChange={handleChange}
          maxLength={10}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Solo números
          }}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombres completos"
          value={formData.nombre}
          onChange={handleChange}
          maxLength={50}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-ZñÑ\s]/g, ""); // Solo letras y espacios
          }}
          required
        />
        <button type="submit">Crear</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est) => (
            <tr key={est.id}>
              <td>
                <input
                  type="text"
                  value={est.id}
                  readOnly
                  style={{ border: "none", background: "transparent" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={est.nombre}
                  onChange={(e) => {
                    const updatedEstudiantes = estudiantes.map((item) =>
                      item.id === est.id ? { ...item, nombre: e.target.value } : item
                    );
                    setEstudiantes(updatedEstudiantes);
                  }}
                />
              </td>
              <td>
                <button onClick={() => updateEstudiante(est.id)}>Actualizar</button>
                <button onClick={() => deleteEstudiante(est.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estudiantes;