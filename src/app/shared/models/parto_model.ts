export interface Parto {
  id_camada: number;
  identificacion_animal: number;
  fecha_monta: Date;
  tipo_servicio: string;
  identificacion_macho?: number;
  fecha_probable_parto: Date;
  dias_lactancia?: number;
  fecha_destete?: number;
  fecha_parto?: Date;
  fecha_probable_destete?: Date;
  jaula_destete?: string;
  jaula_parto?: string;
  numero_hembras_destete?: number;
  numero_hembras_parto?: number;
  numero_lechones_muertos_parto?: number;
  numero_lechones_vivos_parto?: number;
  numero_machos_destete?: number;
  numero_machos_parto?: number;
  numero_momias?: number;
  numero_muertos_destete?: number;
  peso_total_destete?: number;
  peso_total_vivos?: number;

}
