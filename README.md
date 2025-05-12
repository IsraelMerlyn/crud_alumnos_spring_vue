# Proyecto Spring Boot y Vue 3 para Gestión de Alumnos

Este proyecto es una aplicación full-stack que consta de una API RESTful desarrollada con Spring Boot y Java 21, y una interfaz de usuario interactiva construida con Vue 3 y Vite. La aplicación permite gestionar información de alumnos, utilizando MySQL como base de datos.


Consulta el archivo [`alumnos/src/main/java/com/israel/alumnos/controllers/AlumnoController.java`](alumnos/src/main/java/com/israel/alumnos/controllers/AlumnoController.java) para ver todos los endpoints disponibles.

## Vistas del Proyecto

A continuación, se muestran algunas capturas de pantalla de la aplicación:

**Página Principal:**
![Página Principal](ruta/a/tu/imagen_principal.png)

**Formulario de Alumno:**
![Formulario de Alumno](ruta/a/tu/imagen_formulario.png)

*(Reemplaza `ruta/a/tu/imagen_principal.png` y `ruta/a/tu/imagen_formulario.png` con las rutas reales a tus imágenes. Puedes agregar más imágenes según sea necesario.)*


## Características

*   **Backend (API REST)**:
    *   Desarrollado con Spring Boot 3 y Java 21.
    *   Proporciona endpoints para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los alumnos.
    *   Utiliza Spring Data JPA para la interacción con la base de datos MySQL.
    *   Ubicado en el directorio `alumnos/`.
*   **Frontend (Interfaz de Usuario)**:
    *   Desarrollado con Vue 3 y Vite.
    *   Consume la API REST para mostrar y manipular los datos de los alumnos.
    *   Interfaz reactiva y amigable.
    *   Ubicado en el directorio `front_alumnos/`.
*   **Base de Datos**:
    *   MySQL para la persistencia de datos.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

*   JDK 21 o superior.
*   Maven 3.x.
*   Node.js (que incluye npm) versión 18.x o superior.
*   MySQL Server.

## Configuración

### Backend (Spring Boot API - `alumnos/`)

1.  **Configuración de la Base de Datos**:
    *   Abre el archivo `alumnos/src/main/resources/application.properties`.
    *   Modifica las siguientes propiedades para que coincidan con tu configuración de MySQL:
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/alumnos_tec
        spring.datasource.username=tu_usuario_mysql
        spring.datasource.password=tu_contraseña_mysql
        ```
    *   Asegúrate de que la base de datos `alumnos_tec` exista en tu servidor MySQL, o créala. Spring Boot intentará actualizar el esquema con `spring.jpa.hibernate.ddl-auto=update`.

2.  **Ejecutar la API**:
    *   Navega al directorio `alumnos/` en tu terminal.
    *   Ejecuta el siguiente comando Maven para iniciar la aplicación Spring Boot:
        ```sh
        ./mvnw spring-boot:run
        ```
        O en Windows:
        ```cmd
        mvnw.cmd spring-boot:run
        ```
    *   La API estará disponible en `http://localhost:8080`.

### Frontend (Vue 3 - `front_alumnos/`)

1.  **Instalar Dependencias**:
    *   Navega al directorio `front_alumnos/` en tu terminal.
    *   Ejecuta el siguiente comando para instalar las dependencias del proyecto:
        ```sh
        npm install
        ```

2.  **Ejecutar la Aplicación Vue**:
    *   Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor de desarrollo de Vite:
        ```sh
        npm run dev
        ```
    *   La aplicación frontend estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Estructura del Proyecto

```
.
├── alumnos/                  # Proyecto Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/israel/alumnos/  # Código fuente Java
│   │   │   │   ├── controllers/          # Controladores REST
│   │   │   │   ├── model/                # Entidades JPA
│   │   │   │   └── repository/           # Repositorios Spring Data JPA
│   │   │   └── resources/
│   │   │       └── application.properties # Configuración de la aplicación
│   │   └── test/                         # Pruebas unitarias
│   ├── pom.xml                           # Configuración de Maven
│   └── mvnw                              # Maven Wrapper
├── front_alumnos/            # Proyecto Frontend Vue 3
│   ├── public/                           # Archivos estáticos públicos
│   ├── src/                              # Código fuente Vue
│   │   ├── assets/                       # Recursos como imágenes, fuentes
│   │   ├── components/                   # Componentes Vue (si los hubiera separados)
│   │   ├── App.vue                       # Componente principal de la aplicación
│   │   └── main.js                       # Punto de entrada de la aplicación Vue
│   ├── index.html                        # HTML principal
│   ├── package.json                      # Dependencias y scripts de Node.js
│   └── vite.config.js                    # Configuración de Vite
└── README.md                           # Este archivo
```

## Endpoints de la API (Ejemplos)

La API REST se encuentra bajo la ruta base `/alumnos`.

*   `GET /alumnos/traer-alumnos`: Obtiene todos los alumnos.
*   `GET /alumnos/traer-alumno/{id}`: Obtiene un alumno por su ID.
*   `POST /alumnos/insertar-alumnos`: Crea un nuevo alumno.
*   `PUT /alumnos/editar-alumnos/{id}`: Actualiza un alumno existente.
*   `DELETE /alumnos/eliminar-alumnos/{id}`: Elimina un alumno.

Consulta el archivo [`alumnos/src/main/java/com/israel/alumnos/controllers/AlumnoController.java`](alumnos/src/main/java/com/israel/alumnos/controllers/AlumnoController.java) para ver todos los endpoints disponibles.