<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const alumnos = ref([]);

const cargarAlumnos = async () => {
  const response = await axios.get('http://localhost:8080/alumnos/traer-alumnos')
  alumnos.value = response.data;
  console.log(alumnos.value);
}

onMounted(cargarAlumnos);



</script>

<template>
  <div>
    <button class="btn btn-primary">boton</button>
  </div>

</template>

<style scoped></style>
