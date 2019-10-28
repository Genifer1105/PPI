export interface Animal {
  identificacion_animal: number;
  raza: string;
  fecha_nacimiento: Date;
  identificacion_madre?: number;
  identificacion_padre?: number;
  procedencia: string;
}