<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const alumnos = ref([]);

const nuevoAlumno = ref({
  nombre: '',
  apellido: '',
  carrera: '',
  telefono: '',
  imagenURL: ''
});

const editado = ref(false);

const cargarAlumnos = async () => {

  const response = await axios.get('http://localhost:8080/alumnos/traer-alumnos')
  alumnos.value = response.data;
  console.log(alumnos.value);
}
const agregarAlumno = async () => {
  if (editado.value) {
    await axios.put(`http://localhost:8080/alumnos/editar-alumnos/${nuevoAlumno.value.id}`, nuevoAlumno.value);
    // editado.value = false
  } else {
    await axios.post('http://localhost:8080/alumnos/insertar-alumnos', nuevoAlumno.value);
    Swal.fire({
      icon: 'success',
      title: 'Alumno agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    });

  }

  await cargarAlumnos();
  nuevoAlumno.value = {
    nombre: '',
    apellido: '',
    carrera: '',
    telefono: '',
    imagenURL: ''
  };
}
// Función para editar un alumno
const editarAlumnos = (alumno) => {
  Object.assign(nuevoAlumno.value, alumno);
  editado.value = true
}

const eliminarAlumno = async (id) => {

  Swal.fire({
    title: '¿Estás seguro de eliminar el alumno?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await eliminarAlumnoPorId(id);
      Swal.fire(
        'Eliminado!',
        'El alumno ha sido eliminado.',
        'success'
      )
    }
  })
}

const eliminarAlumnoPorId = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/alumnos/eliminar-alumnos/${id}`);

    console.log('Alumno eliminado con id:', id);
    await cargarAlumnos();
  } catch (errr) {
    console.error('Error al eliminar el alumno:', errr);
    Swal.fire({
      icon: 'error',
      title: 'Error al eliminar el alumno',
      text: 'No se pudo eliminar el alumno.',

    });
  }
}
onMounted(cargarAlumnos);



</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mt-4">
        <div class="card shadow p-4 mb-4">
          <h2 class="text-center">Formulario de Alumnos</h2>
          <form @submit.prevent="agregarAlumno">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" v-model="nuevoAlumno.nombre" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="apellido" class="form-label">Apellidos</label>
                <input type="text" class="form-control" id="apellido" v-model="nuevoAlumno.apellido" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="carrera" class="form-label">Carrera</label>
                <input type="text" class="form-control" id="carrera" v-model="nuevoAlumno.carrera" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="telefono" class="form-label">Telefono</label>
                <input type="number" class="form-control" id="telefono" v-model="nuevoAlumno.telefono" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="imagenURL" class="form-label">Imagen URL</label>
                <input type="text" class="form-control" id="imagenURL" v-model="nuevoAlumno.imagenURL">
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              {{ editado ? 'Actualizar Alumno' : 'Agregar Alumno' }}
            </button>
          </form>

        </div>

      </div>

      <div class="col-md-12">
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title mb-3">Lista de Alumnos</h5>
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Carrera</th>
                  <th scope="col">telefono</th>
                  <th scope="col">imagen</th>
                  <th scope="col">Acciones</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="alumno in alumnos" :key="alumno.id">
                  <td>{{ alumno.id }}</td>
                  <td>{{ alumno.nombre }}</td>
                  <td>{{ alumno.apellido }}</td>
                  <td>{{ alumno.carrera }}</td>
                  <td>{{ alumno.telefono }}</td>
                  <td><img :src="alumno.imagenURL" alt="Imagen de Alumno" width="50"></td>
                  <td><button @click=eliminarAlumno(alumno.id) class="btn btn-danger mx-2"><i
                        class="bi bi-trash3-fill"></i></button>
                    <button @click="editarAlumnos(alumno)" class="btn btn-warning"><i
                        class="bi bi-pencil-fill"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped></style>
