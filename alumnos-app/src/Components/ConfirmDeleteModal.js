
import * as React from 'react';
import { Portal, Dialog, Button, Text } from 'react-native-paper';

export default function ConfirmDeleteDialog({ visible, title, body, onCancel, onConfirm }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel} style={{ borderRadius: 16 }}>
        <Dialog.Title>{title ?? 'Confirmar eliminación'}</Dialog.Title>
        {body ? (
          <Dialog.Content>
            <Text>{body}</Text>
          </Dialog.Content>
        ) : null}
        <Dialog.Actions>
          <Button onPress={onCancel}>Cancelar</Button>
          <Button mode="contained" onPress={onConfirm}>Eliminar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
