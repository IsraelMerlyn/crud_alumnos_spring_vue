import * as React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Appbar, Snackbar, ActivityIndicator, Card, Avatar, IconButton, Text, Chip, FAB } from 'react-native-paper';
import ConfirmDeleteDialog from '../Components/ConfirmDeleteModal';
import useAlumnosListController from '../Hooks/useAlumnosList';

export default function ListaScreen({ navigation }) {
  const {
    local, loading, busy, refreshing,
    msg, setMsg,
    onManualRefresh,
    requestDelete, confirmDelete, cancelDelete,
    deleteState,
    goToCreate, goToEdit,
  } = useAlumnosListController(navigation);

  const renderItem = ({ item }) => {
    const titulo = `${item?.nombre ?? ''} ${item?.apellido ?? ''}`.trim() || 'Sin nombre';
    const subtitulo = item?.email ? `${item.email}` : '';
    const carrera = item?.carrera || 'Sin carrera';
    const avatar = item?.imagenURL
      ? <Avatar.Image size={48} source={{ uri: item.imagenURL }} />
      : <Avatar.Text size={48} label={(item?.nombre?.[0] || 'A') + (item?.apellido?.[0] || 'L')} />;

    return (
      <Card mode="elevated" style={{ marginHorizontal: 16, marginTop: 12, borderRadius: 16 }}>
        <Card.Title
          title={titulo}
          subtitle={subtitulo}
          left={() => avatar}
          right={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconButton icon="pencil" onPress={() => goToEdit(item.id)} />
              <IconButton icon="delete" onPress={() => requestDelete(item)} />
            </View>
          )}
        />
        <Card.Content style={{ gap: 8 }}>
          <Chip icon="school" compact>{carrera}</Chip>
          {item?.telefono ? <Text variant="bodySmall">Tel: {item.telefono}</Text> : null}
          {item?.numeroControl ? <Text variant="bodySmall">No. Control: {item.numeroControl}</Text> : null}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Alumnos" />
        <Appbar.Action icon="plus" onPress={goToCreate} />
        <Appbar.Action icon="refresh" onPress={onManualRefresh} />
      </Appbar.Header>

      {(loading || busy) && <ActivityIndicator style={{ marginTop: 16 }} />}

      <FlatList
        data={local}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          !(loading || busy) ? (
            <View style={{ padding: 24 }}>
              <Text variant="bodyMedium">No hay alumnos para mostrar.</Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onManualRefresh} />
        }
      />

      <FAB
        icon="plus"
        onPress={goToCreate}
        style={{ position: 'absolute', right: 16, bottom: 16 }}
      />

      <ConfirmDeleteDialog
        visible={deleteState.open}
        title="Eliminar registro"
        body={`¿Deseas eliminar a ${deleteState.alumno?.nombre ?? 'este alumno'}? Esta acción no se puede deshacer.`}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />

      <Snackbar visible={!!msg} onDismiss={() => setMsg('')}>
        {msg}
      </Snackbar>
    </View>
  );
}
