import React, { useState, useEffect, useCallback } from "react";

const Matriculas = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [formData, setFormData] = useState({
    id_estudiante: "",
    id_asignatura: "",
    id_profeciclo: "",
    notauno: 0,
    notados: 0,
    supletorio: 0,
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [profeciclos, setProfeciclos] = useState([]);

  const apiBaseUrl = "http://127.0.0.1:8000";

  // Función general para actualizar todo
  const fetchAll = useCallback(async () => {
    await Promise.all([
      fetchEstudiantes(),
      fetchAsignaturas(),
      fetchProfeciclos(),
      fetchMatriculas(),
    ]);
  }, []);

  const fetchMatriculas = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/matricula/`);
      const data = await res.json();
      setMatriculas(data);
    } catch (error) {
      console.error("Error al obtener matrículas:", error);
    }
  };

  const fetchEstudiantes = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/estudiantes/`);
      const data = await res.json();
      setEstudiantes(data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  const fetchAsignaturas = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/asignaturas/`);
      const data = await res.json();
      setAsignaturas(data);
    } catch (error) {
      console.error("Error al obtener asignaturas:", error);
    }
  };

  const fetchProfeciclos = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/profeciclo/`);
      if (res.ok) {
        const data = await res.json();
        setProfeciclos(data);
      } else {
        console.error("Error al obtener profeciclos:", res.statusText);
      }
    } catch (error) {
      console.error("Error de conexión al obtener profeciclos:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", formData);
    try {
      const res = await fetch(`${apiBaseUrl}/matricula/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({
          id_estudiante: "",
          id_asignatura: "",
          id_profeciclo: "",
          notauno: 0,
          notados: 0,
          supletorio: 0,
        });
        await fetchAll(); // Actualiza todo tras agregar
      } else {
        console.error("Error al crear matrícula:", res.statusText);
      }
    } catch (error) {
      console.error("Error al crear matrícula:", error);
    }
  };

  const deleteMatricula = async (id) => {
    try {
      const res = await fetch(`${apiBaseUrl}/matricula/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchAll(); // Actualiza todo tras eliminar
      }
    } catch (error) {
      console.error("Error al eliminar matrícula:", error);
    }
  };

  useEffect(() => {
    fetchAll(); // Carga inicial
  }, [fetchAll]);

  return (
    <div>
      <h2>Matrículas</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="id_estudiante"
          value={formData.id_estudiante}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un estudiante</option>
          {estudiantes.map((est) => (
            <option key={est.id} value={est.id}>
              {est.nombre}
            </option>
          ))}
        </select>
        <select
          name="id_asignatura"
          value={formData.id_asignatura}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una asignatura</option>
          {asignaturas.map((asig) => (
            <option key={asig.idasignatura} value={asig.idasignatura}>
              {asig.nombre}
            </option>
          ))}
        </select>
        <select
          name="id_profeciclo"
          value={formData.id_profeciclo}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione el Ciclo</option>
          {Array.isArray(profeciclos) &&
            profeciclos.map((profeciclo) => (
              <option key={profeciclo.id} value={profeciclo.id}>
                {profeciclo.ciclo}
              </option>
            ))}
        </select>
        <button type="submit">Agregar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Asignatura</th>
            <th>Ciclo</th>
            <th>Nota Uno</th>
            <th>Nota Dos</th>
            <th>Supletorio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map((mat) => (
            <tr key={mat.id}>
              <td>{mat.id}</td>
              <td>
                {estudiantes.find((e) => e.id === mat.id_estudiante)?.nombre ||
                  "Desconocido"}
              </td>
              <td>
                {asignaturas.find(
                  (a) => a.idasignatura === mat.id_asignatura
                )?.nombre || "Desconocido"}
              </td>
              <td>
                {profeciclos.find((p) => p.id === mat.id_ciclo)?.ciclo || "Desconocido"}
              </td>
              <td>{mat.notauno}</td>
              <td>{mat.notados}</td>
              <td>{mat.supletorio}</td>
              <td>
                <button onClick={() => deleteMatricula(mat.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Matriculas;
