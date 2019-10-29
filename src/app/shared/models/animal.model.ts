export interface Animal {
  identificacion_animal: number;
  raza: string;
  fecha_nacimiento: Date;
  id_madre?: number;
  id_padre?: number;
  procedencia: string;
}
