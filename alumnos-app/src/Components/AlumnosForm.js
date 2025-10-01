
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, TextInput, Button, HelperText } from 'react-native-paper';

export default function AlumnoForm({ form, onChange, onSave, onCancel, saving, invalid }) {
  const emailInvalid = form.email && !/\S+@\S+\.\S+/.test(form.email);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card mode="elevated" style={{ borderRadius: 16 }}>
        <Card.Title title="Datos del alumno" />
        <Card.Content style={{ gap: 12, paddingBottom: 8 }}>
          <TextInput label="Nombre" mode="outlined" value={form.nombre} onChangeText={(v)=>onChange('nombre', v)} />
          <TextInput label="Apellido" mode="outlined" value={form.apellido} onChangeText={(v)=>onChange('apellido', v)} />
          <TextInput label="Email" mode="outlined" keyboardType="email-address" value={form.email} onChangeText={(v)=>onChange('email', v)} />
          <HelperText type="error" visible={emailInvalid}>Email inválido</HelperText>

          <TextInput label="No. Control" mode="outlined" value={form.numeroControl} onChangeText={(v)=>onChange('numeroControl', v)} />
          <TextInput label="Teléfono" mode="outlined" keyboardType="phone-pad" value={form.telefono} onChangeText={(v)=>onChange('telefono', v)} />
          <TextInput label="Carrera" mode="outlined" value={form.carrera} onChangeText={(v)=>onChange('carrera', v)} />
          <TextInput label="Imagen URL (opcional)" mode="outlined" value={form.imagenURL} onChangeText={(v)=>onChange('imagenURL', v)} />
        </Card.Content>

        <Card.Actions style={{ justifyContent: 'flex-end', paddingHorizontal: 16, paddingBottom: 12 }}>
          <Button onPress={onCancel}>Cancelar</Button>
          <Button mode="contained" onPress={onSave} loading={saving} disabled={invalid} style={{ marginLeft: 8 }}>
            Guardar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}
