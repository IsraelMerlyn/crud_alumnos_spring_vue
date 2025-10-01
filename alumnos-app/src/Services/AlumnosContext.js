import React, { createContext, useState, useCallback } from 'react';
import { http } from '../Api/htpps';


export const AlumnosContext = createContext(null);

export function AlumnosProvider({ children }) {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlumnos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await http.get('/traer-alumnos');
      setAlumnos(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAlumno = async (id) => {
    const { data } = await http.get(`/traer-alumno/${id}`);
    return data;
  };

  const crearAlumno = async (payload) => {
    const { data } = await http.post('/insertar-alumnos', payload);
    return data;
  };

  const editarAlumno = async (id, payload) => {
    const { data } = await http.put(`/editar-alumnos/${id}`, payload);
    return data;
  };

  const eliminarAlumno = async (id) => {
    await http.delete(`/eliminar-alumnos/${id}`);
  };

  return (
    <AlumnosContext.Provider
      value={{
        alumnos,
        loading,
        fetchAlumnos,
        fetchAlumno,
        crearAlumno,
        editarAlumno,
        eliminarAlumno,
      }}
    >
      {children}
    </AlumnosContext.Provider>
  );
}