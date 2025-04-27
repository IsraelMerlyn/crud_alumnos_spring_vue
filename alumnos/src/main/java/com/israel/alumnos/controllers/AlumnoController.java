package com.israel.alumnos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.israel.alumnos.model.Alumno;
import com.israel.alumnos.repository.AlumnoRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/alumnos")
@CrossOrigin(origins = "*")
public class AlumnoController {

    @Autowired
    private AlumnoRepository alumnoRepository;

    // Metodo get para traer todos los alumnos de la base de datos
    @GetMapping("/traer-alumnos")
    public List<Alumno> TraerAlumnos() {
        return alumnoRepository.findAll();
    }

    @GetMapping("/traer-alumno/{id}")
    public ResponseEntity<Alumno> TraerUnAlumno(@PathVariable Long id) {
        return alumnoRepository.findById(id)
                .map(alumno -> ResponseEntity.ok(alumno))
                .orElse(ResponseEntity.notFound().build());
    }

    // Metodo para insertar un alumno en la base de datos
    @PostMapping("/insertar-alumnos")
    public Alumno insertarAlumno(@RequestBody Alumno alumno) {
        return alumnoRepository.save(alumno);

    }

    // Metodo para editar un alumno en la base de datos
    @PutMapping("/editar-alumnos/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(@PathVariable Long id, @RequestBody Alumno alumno) {
        return alumnoRepository.findById(id).map(alumnoExistente -> {
            alumnoExistente.setNombre(alumno.getNombre());
            alumnoExistente.setApellido(alumno.getApellido());
            alumnoExistente.setEmail(alumno.getEmail());
            alumnoExistente.setNumeroControl(alumno.getNumeroControl());
            alumnoExistente.setTelefono(alumno.getTelefono());
            alumnoExistente.setCarrera(alumno.getCarrera());
            alumnoExistente.setImagenURL(alumno.getImagenURL());
            Alumno actualizado = alumnoRepository.save(alumnoExistente);
            return ResponseEntity.ok(actualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    // metodo para eliminar un alumno de la base de datos
    @DeleteMapping("/eliminar-alumnos/{id}")
    public void eliminarAlumno(@PathVariable Long id) {
        alumnoRepository.deleteById(id);
    }

}
