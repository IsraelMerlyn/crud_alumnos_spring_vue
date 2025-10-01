
import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AlumnosContext } from '../Services/AlumnosContext';

const changed = (prev, next) => {
  if (!Array.isArray(prev) || !Array.isArray(next)) return true;
  if (prev.length !== next.length) return true;
  const a = prev.map(x => x.id).join(',');
  const b = next.map(x => x.id).join(',');
  return a !== b;
};

export default function useAlumnosListController(navigation) {
  const ctx = React.useContext(AlumnosContext);
  if (!ctx) throw new Error('AlumnosProvider no envuelve la app.');
  const { alumnos = [], loading, fetchAlumnos, eliminarAlumno } = ctx;

  const [local, setLocal] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [deleteState, setDeleteState] = React.useState({ open: false, alumno: null });
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      setBusy(true);
      try {
        await fetchAlumnos();
        setLocal(prev => (changed(prev, alumnos) ? alumnos : prev));
      } catch {
        setMsg('No se pudo cargar la lista');
      } finally {
        setBusy(false);
      }
    })();
  }, [fetchAlumnos]);

  React.useEffect(() => {
    if (changed(local, alumnos)) setLocal(alumnos);
  }, [alumnos]); // eslint-disable-line

  useFocusEffect(
    React.useCallback(() => {
      const doRefresh = async () => {
        try {
          const before = local;
          await fetchAlumnos();
          if (changed(before, alumnos)) setMsg('Lista actualizada');
        } catch {}
      };
      doRefresh();
      timerRef.current = setInterval(doRefresh, 8000);
      return () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
      };
    }, [fetchAlumnos])
  );

  const onManualRefresh = async () => {
    setRefreshing(true);
    try {
      const before = local;
      await fetchAlumnos();
      if (changed(before, alumnos)) setMsg('Lista actualizada');
    } catch {
      setMsg('Error al actualizar');
    } finally {
      setRefreshing(false);
    }
  };

  const requestDelete = (alumno) => setDeleteState({ open: true, alumno });
  const cancelDelete = () => setDeleteState({ open: false, alumno: null });

  const confirmDelete = async () => {
    const id = deleteState.alumno?.id;
    if (!id) return cancelDelete();
    try {
      setBusy(true);
      await eliminarAlumno(id);
      await fetchAlumnos();
      setMsg('Alumno eliminado');
    } catch {
      setMsg('No se pudo eliminar');
    } finally {
      setBusy(false);
      cancelDelete();
    }
  };

  // Navegación (recibida por props)
  const goToCreate = () => navigation.navigate('Form');
  const goToEdit = (id) => navigation.navigate('Form', { id });

  return {
    local, loading, busy, refreshing,
    msg, setMsg,
    onManualRefresh,
    requestDelete, confirmDelete, cancelDelete,
    deleteState,
    goToCreate, goToEdit,
  };
}
