export interface Parto {
  id_camada: number;
  dias_lactancia: number;
  fecha_destete: number;
  fecha_monta: Date;
  fecha_parto: Date;
  fecha_probable_destete: Date;
  fecha_probable_parto: Date;
  identificacion_animal: number;
  identificacion_macho: number;
  jaula_destete: string;
  jaula_parto: string;
  numero_hembras_destete: number;
  numero_hembras_parto: number;
  numero_lechones_muertos_parto: number;
  numero_lechones_vivos_parto: number;
  numero_machos_destete: number;
  numero_machos_parto: number;
  numero_momias: number;
  numero_muertos_destete: number;
  peso_total_destete: number;
  peso_total_vivos: number;
  tipo_servicio: string;
}
