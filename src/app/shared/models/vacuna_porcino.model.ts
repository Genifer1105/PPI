export interface vacuna_Porcino {
  identificacion_animal: number;
  vacuna: string;
  fecha_programada: string; // tipo
  evento: string;
  fecha_ejecucion: string; // tipo
  via_aplicacion: string;
  dosis: number; // validar tipo
  laboratorio: string;
  registro_ica: string;
  numero_lote: string;
  tiempo_retiro: string;
  observacion: string;
}