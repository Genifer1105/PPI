export interface User {
  identificacion: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  correo: string;
  id_perfil: number;
  contrasena: string;
  telefono: string;
  perfil?: string;
}
