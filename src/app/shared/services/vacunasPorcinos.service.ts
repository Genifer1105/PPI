import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { vacunaPorcino } from 'src/app/shared/models/vacuna_porcino.model';
import { Constants } from 'src/app/shared/constants';


@Injectable({
    providedIn: 'root'
  })

  export class VacunasPorcinosService {

    private static readonly VACUNA_PORCINO_ROUTE = Constants.URL_SERVER + 'animals_vaccination/';

    private static readonly VACUNA_PORCINO_ROUTES = {
      getVacunaPorcinoInfo: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'get_vacuna_porcino',
      getVacunasPorcinos: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'get_vacunas_porcinos',
      createVacunasPorcinos: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'create_vacuna_porcino',
      updateVacunasPorcinos: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'update_vacuna_porcino',
      deleteVacunaPorcino: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'delete_vacuna_porcino'
    };


  constructor(private http: HttpClient) {}

  public async getVacunasPorcinos(): Promise<vacunaPorcino[]> {
    const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.getVacunasPorcinos;
    try {
      const result = await this.http.get<vacunaPorcino[]>(url).toPromise<vacunaPorcino[]>();
      return result;
    } catch (error) {
      console.error('error on getVacunasPorcinos', { error });
      throw error;
    }
  }


  public async createVacunaPorcino(data: vacunaPorcino) {
    const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.createVacunasPorcinos;
    try {
      const result = await this.http.post(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on createVacunaPorcino', { error });
      throw error;
    }
  }

  
  public async updateVacunaPorcino(data: vacunaPorcino) {
    const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.updateVacunasPorcinos + '/' + data.identificacion_animal;
    try {
      const result = await this.http.put(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on updateVacunaPorcino', { error });
      throw error;
    }
  }


  public async deleteVacunaPorcino(identificacion_animal: number): Promise<vacunaPorcino> {
    const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.deleteVacunaPorcino + '/' + identificacion_animal;
    try {
      const result = await this.http.delete<vacunaPorcino>(url).toPromise<vacunaPorcino>();
      return result;
    } catch (error) {
      console.error('error on deleteVacunaPorcino', {error});
      throw error;
    }
  }


    public async getVacunasPorcinosInfo(identificacion_animal: number): Promise<vacunaPorcino> {
    const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.getVacunaPorcinoInfo + '/' + identificacion_animal;
    try {
      const result = await this.http.get<vacunaPorcino>(url).toPromise<vacunaPorcino>();
      return result;
    } catch (error) {
      console.error('error on getVacunasPorcinosInfo', {error});
      throw error;
    }
  }

  }