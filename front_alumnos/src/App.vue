<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const alumnos = ref([]);

const nuevoAlumno = ref({
  nombre: '',
  apellido: '',
  carrera: '',
  telefono: '',
  imagenURL: ''
});

const cargarAlumnos = async () => {
  const response = await axios.get('http://localhost:8080/alumnos/traer-alumnos')
  alumnos.value = response.data;
  console.log(alumnos.value);
}
const agregarAlumno = async () => {
  await axios.post('http://localhost:8080/alumnos/insertar-alumnos', nuevoAlumno.value);
  await cargarAlumnos();
  nuevoAlumno.value = {
    nombre: '',
    apellido: '',
    carrera: '',
    telefono: '',
    imagenURL: ''
  };
}

const eliminarAlumno = async (id) => {
  await axios.delete(`http://localhost:8080/alumnos/eliminar-alumnos/${id}`);
  console.log('Alumno eliminado con id:', id);
  await cargarAlumnos();
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

            <button type="submit" class="btn btn-primary">Agregar Alumno</button>
          </form>

        </div>

      </div>

      <div class="col-md-12">
        <h2>Tabla de Alumnos</h2>

        <table class="table">
          <thead>
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
                <button class="btn btn-warning"><i class="bi bi-pencil-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>



  </div>

</template>

<style scoped></style>
