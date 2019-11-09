import { VacunaCamada } from 'src/app/shared/models/vacuna_camada.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/shared/constants';


@Injectable({
  providedIn: 'root'
})

export class VacunasCamadasService {

  private static readonly VACUNA_CAMADA_ROUTE = Constants.URL_SERVER + 'births_vaccination/';

  private static readonly VACUNA_CAMADA_ROUTES = {
    getVacunasCamada: VacunasCamadasService.VACUNA_CAMADA_ROUTE + 'get_birth_vaccinations',
    getVacunasCamadas: VacunasCamadasService.VACUNA_CAMADA_ROUTE + 'get_births_vaccinations',
    getAnimalVaccinationItem: VacunasCamadasService.VACUNA_CAMADA_ROUTE + 'get_birth_vaccination_item',
    createVacunasCamadas: VacunasCamadasService.VACUNA_CAMADA_ROUTE + 'create_birth_vaccination',
    updateVacunasCamadas: VacunasCamadasService.VACUNA_CAMADA_ROUTE + 'update_birth_vaccination',
    // deleteVacunaCamada: VacunasCamadasService.VACUNA_CAMADA_ROUTE + 'delete_vacuna_porcino'
  };


  constructor(private http: HttpClient) { }

  public async getVacunasCamadas(): Promise<VacunaCamada[]> {
    const url = VacunasCamadasService.VACUNA_CAMADA_ROUTES.getVacunasCamadas;
    try {
      const result = await this.http.get<VacunaCamada[]>(url).toPromise<VacunaCamada[]>();
      return result;
    } catch (error) {
      console.error('error on getVacunasCamadas', { error });
      throw error;
    }
  }


  public async createVacunaCamada(data: VacunaCamada) {
    const url = VacunasCamadasService.VACUNA_CAMADA_ROUTES.createVacunasCamadas;
    try {
      const result = await this.http.post(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on createVacunaCamada', { error });
      throw error;
    }
  }


  public async updateVacunaCamada(data: VacunaCamada) {
    const url = `${VacunasCamadasService.VACUNA_CAMADA_ROUTES.updateVacunasCamadas}/${data.id_camada}/${data.vacuna}/${data.fecha_programada}`;
    try {
      const result = await this.http.put(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on updateVacunaCamada', { error });
      throw error;
    }
  }


  // public async deleteVacunaCamada(id_camada: number) {
  //   const url = VacunasCamadasService.VACUNA_CAMADA_ROUTES.deleteVacunaCamada + '/' + id_camada;
  //   try {
  //     const result = await this.http.delete(url).toPromise();
  //     return result;
  //   } catch (error) {
  //     console.error('error on deleteVacunaCamada', { error });
  //     throw error;
  //   }
  // }


  public async getVacunasCamada(id_camada: number): Promise<VacunaCamada[]> {
    const url = VacunasCamadasService.VACUNA_CAMADA_ROUTES.getVacunasCamada + '/' + id_camada;
    try {
      const result = await this.http.get<VacunaCamada[]>(url).toPromise<VacunaCamada[]>();
      return result;
    } catch (error) {
      console.error('error on getVacunasCamada', { error });
      throw error;
    }
  }

  public async getVacunasCamadaItem(id_camada: number, vacuna: string, fecha: Date): Promise<VacunaCamada> {
    const fechaStr = new Date(fecha).toISOString().split('T')[0];
    const url = `${VacunasCamadasService.VACUNA_CAMADA_ROUTES.getAnimalVaccinationItem}/${id_camada}/${vacuna}/${fechaStr}`;
    try {
      const result = await this.http.get<VacunaCamada>(url).toPromise<VacunaCamada>();
      return result;
    } catch (error) {
      console.error('error on getVacunasCamadaItem', { error });
      throw error;
    }
  }

}
