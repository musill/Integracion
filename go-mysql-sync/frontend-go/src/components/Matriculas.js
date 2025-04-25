import React, { useState, useEffect } from "react";
import axios from "axios";

const Matricula = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [profeciclos, setProfeciclos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);

  const [formData, setFormData] = useState({
    IDEstudiante: "",
    IDAsignatura: "",
    IDCiclo: "",
    NotaUno: 0,
    NotaDos: 0,
    Supletorio: 0,
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

  const calcularSupletorio = (n1, n2) => {
    const nota1 = parseFloat(n1);
    const nota2 = parseFloat(n2);
    if (isNaN(nota1) || isNaN(nota2)) return 0;

    const promedio = (nota1 + nota2) / 2;
    return promedio < 7 ? +(7 - promedio).toFixed(2) : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    if (name === "NotaUno" || name === "NotaDos") {
      const nuevoSuple = calcularSupletorio(
        name === "NotaUno" ? value : formData.NotaUno,
        name === "NotaDos" ? value : formData.NotaDos
      );
      updatedForm.Supletorio = nuevoSuple;
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      IDEstudiante: formData.IDEstudiante,
      IDAsignatura: parseInt(formData.IDAsignatura),
      IDCiclo: parseInt(formData.IDCiclo),
      NotaUno: parseFloat(formData.NotaUno),
      NotaDos: parseFloat(formData.NotaDos),
      Supletorio: parseFloat(formData.Supletorio),
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
        IDEstudiante: "",
        IDAsignatura: "",
        IDCiclo: "",
        NotaUno: 0,
        NotaDos: 0,
        Supletorio: 0,
      });
      fetchMatriculas();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar/actualizar");
    }
  };

  const handleEdit = (matricula) => {
    setEditId(matricula.ID);
    setFormData({
      IDEstudiante: matricula.IDEstudiante,
      IDAsignatura: matricula.IDAsignatura,
      IDCiclo: matricula.IDCiclo,
      NotaUno: matricula.NotaUno,
      NotaDos: matricula.NotaDos,
      Supletorio: matricula.Supletorio,
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

  const getNombreEstudiante = (id) => estudiantes.find((e) => e.ID === id)?.Nombre || "Desconocido";
  const getNombreAsignatura = (id) => asignaturas.find((a) => a.IDAsignatura === id)?.Nombre || "Desconocido";
  const getNombreCiclo = (id) => profeciclos.find((p) => p.ID === id)?.Ciclo || "Desconocido";

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger mb-4">{editId ? "Editar Matrícula" : "Registrar Matrícula"}</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <select
            name="IDEstudiante"
            className="form-select"
            value={formData.IDEstudiante}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Estudiante</option>
            {estudiantes.map((e) => (
              <option key={e.ID} value={e.ID}>
                {e.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            name="IDAsignatura"
            className="form-select"
            value={formData.IDAsignatura}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Asignatura</option>
            {asignaturas.map((a) => (
              <option key={a.IDAsignatura} value={a.IDAsignatura}>
                {a.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            name="IDCiclo"
            className="form-select"
            value={formData.IDCiclo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Ciclo</option>
            {profeciclos.map((p) => (
              <option key={p.ID} value={p.ID}>
                {p.Ciclo}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Nota 1</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="NotaUno"
            value={formData.NotaUno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Nota 2</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="NotaDos"
            value={formData.NotaDos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Supletorio (automático)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="Supletorio"
            value={formData.Supletorio}
            readOnly
          />
        </div>

        <div className="col-md-4">
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
            <tr key={mat.ID}>
              <td>{getNombreEstudiante(mat.IDEstudiante)}</td>
              <td>{getNombreAsignatura(mat.IDAsignatura)}</td>
              <td>{getNombreCiclo(mat.IDCiclo)}</td>
              <td>{mat.NotaUno}</td>
              <td>{mat.NotaDos}</td>
              <td>{mat.Supletorio}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success btn-sm" onClick={() => handleEdit(mat)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mat.ID)}>
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
