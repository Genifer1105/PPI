export interface vacunaCamada {
    identificacion_camada: number;
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