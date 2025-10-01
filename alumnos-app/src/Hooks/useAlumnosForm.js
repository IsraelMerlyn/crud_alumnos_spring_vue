
import * as React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AlumnosContext } from '../Services/AlumnosContext';

const EMAIL_RX = /\S+@\S+\.\S+/;

const EMPTY = {
  nombre: '', apellido: '', email: '',
  numeroControl: '', telefono: '', carrera: '', imagenURL: ''
};

export default function useAlumnoFormController() {
  const nav = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const ctx = React.useContext(AlumnosContext);
  if (!ctx) throw new Error('AlumnosProvider no envuelve la app.');
  const { fetchAlumno, crearAlumno, editarAlumno } = ctx;

  const [form, setForm] = React.useState(EMPTY);
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  // Carga si es edición
  React.useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const data = await fetchAlumno(id);
        setForm({
          nombre: data?.nombre ?? '',
          apellido: data?.apellido ?? '',
          email: data?.email ?? '',
          numeroControl: data?.numeroControl ?? '',
          telefono: data?.telefono ?? '',
          carrera: data?.carrera ?? '',
          imagenURL: data?.imagenURL ?? ''
        });
      } catch {
        setMsg('No se pudo cargar el registro');
      }
    })();
  }, [id, fetchAlumno]);

  const onChange = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const invalid =
    !form.nombre.trim() ||
    !form.apellido.trim() ||
    !EMAIL_RX.test(form.email || '');

  const onSave = async () => {
    if (invalid) {
      setMsg('Completa Nombre, Apellido y un Email válido.');
      return;
    }
    setSaving(true);
    try {
      if (id) await editarAlumno(id, form);
      else await crearAlumno(form);
      nav.goBack();
    } catch {
      setMsg('No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => nav.goBack();

  return { id, form, onChange, onSave, onCancel, saving, invalid, msg, setMsg };
}
