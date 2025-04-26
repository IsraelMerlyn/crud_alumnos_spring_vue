package com.israel.alumnos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.israel.alumnos.model.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

}
