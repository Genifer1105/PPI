export interface VacunaCamada {
    id_camada: number;
    vacuna: string;
    fecha_programada: Date;
    evento: string;
    fecha_ejecucion?: Date;
    via_aplicacion: string;
    dosis: number;
    laboratorio: string;
    registro_ica: string;
    numero_lote: string;
    tiempo_retiro?: string;
    observacion?: string;
}
