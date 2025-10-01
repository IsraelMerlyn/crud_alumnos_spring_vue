import axios from 'axios';

export const http = axios.create({
  
  // baseURL: 'http://10.0.2.2:8080/alumnos',

  baseURL: 'http://192.168.0.101:8080/alumnos',
  timeout: 10000,
});

// Interceptor simple de errores
http.interceptors.response.use(
  r => r,
  err => {
    
    return Promise.reject(err);
  }
);
