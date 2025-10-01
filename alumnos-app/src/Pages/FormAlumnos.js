import * as React from 'react';
import { View } from 'react-native';
import { Appbar, Snackbar } from 'react-native-paper';
import useAlumnoFormController from '../Hooks/useAlumnosForm';
import AlumnoForm from '../Components/AlumnosForm';

export default function FormAlumnos() {
  const { id, form, onChange, onSave, onCancel, saving, invalid, msg, setMsg } = useAlumnoFormController();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onCancel} />
        <Appbar.Content title={id ? 'Editar alumno' : 'Nuevo alumno'} />
      </Appbar.Header>

      <AlumnoForm
        form={form}
        onChange={onChange}
        onSave={onSave}
        onCancel={onCancel}
        saving={saving}
        invalid={invalid}
      />

      <Snackbar visible={!!msg} onDismiss={() => setMsg('')}>
        {msg}
      </Snackbar>
    </View>
  );
}
