export interface Parto {
 identificacion_animal: number;
 fecha_monta: Date; 
 tipo_servicio: string;
 identificacion_macho?: number;
 fecha_probable: Date; 
 fecha_parto: Date; 
 jaula_parto: string;
 identificacion_camada: number;
 vivos_parto: number;
 muertos_parto: number;
 machos_parto: number;
 hembras_parto: number;
 momias: number;
 peso_total_vivos: number;
 fecha_probable_destete?: Date; 
 fecha_destete?: Date; 
 machos_destete?: number;
 hembras_destete?: number;
 muertos_destete?: number;
 dias_lactancia?: number;
 peso_total_destete?: number;
 jaula_destete?: number;
}