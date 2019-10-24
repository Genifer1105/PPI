export interface Parto {
 identificacion_animal: number;
 fecha_monta: string; // tipo
 tipo_servicio: string;
 identificacion_macho: number;
 fecha_probable: string; //tipo
 fecha_parto: string; //tipo
 jaula_parto: string;
 identificacion_camada: number;
 vivos_parto: number;
 muertos_parto: number;
 machos_parto: number;
 hembras_parto: number;
 momias: number;
 peso_total_vivos: number;
 fecha_probable_destete: string; //tipo
 fehca_destete: string; // tipo
 machos_destete: number;
 hembras_destete: number;
 muertos_destete: number;
 dias_lactancia: number;
 peso_total_destete: number;
 jaula_destete: number;
}