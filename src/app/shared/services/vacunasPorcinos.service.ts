import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VacunaPorcino } from 'src/app/shared/models/vacuna_porcino.model';
import { Constants } from 'src/app/shared/constants';


@Injectable({
  providedIn: 'root'
})

export class VacunasPorcinosService {

  private static readonly VACUNA_PORCINO_ROUTE = Constants.URL_SERVER + 'animals_vaccination/';

  private static readonly VACUNA_PORCINO_ROUTES = {
    getVacunasPorcino: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'get_animal_vaccinations',
    getVacunasPorcinos: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'get_animals_vaccinations',
    getAnimalVaccinationItem: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'get_animal_vaccination_item',
    createVacunasPorcinos: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'create_animal_vaccination',
    updateVacunasPorcinos: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'update_animal_vaccination',
    // deleteVacunaPorcino: VacunasPorcinosService.VACUNA_PORCINO_ROUTE + 'delete_vacuna_porcino'
  };


  constructor(private http: HttpClient) { }

  public async getVacunasPorcinos(): Promise<VacunaPorcino[]> {
    const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.getVacunasPorcinos;
    try {
      const result = await this.http.get<VacunaPorcino[]>(url).toPromise<VacunaPorcino[]>();
      return result;
    } catch (error) {
      console.error('error on getVacunasPorcinos', { error });
      throw error;
    }
  }


  public async createVacunaPorcino(data: VacunaPorcino) {
    const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.createVacunasPorcinos;
    try {
      const result = await this.http.post(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on createVacunaPorcino', { error });
      throw error;
    }
  }


  public async updateVacunaPorcino(data: VacunaPorcino) {
    const url = `${VacunasPorcinosService.VACUNA_PORCINO_ROUTES.updateVacunasPorcinos}/${data.identificacion_animal}/${data.vacuna}/${data.fecha_programada}`;
    try {
      const result = await this.http.put(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on updateVacunaPorcino', { error });
      throw error;
    }
  }


  // public async deleteVacunaPorcino(identificacion_animal: number) {
  //   const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.deleteVacunaPorcino + '/' + identificacion_animal;
  //   try {
  //     const result = await this.http.delete(url).toPromise();
  //     return result;
  //   } catch (error) {
  //     console.error('error on deleteVacunaPorcino', { error });
  //     throw error;
  //   }
  // }


  public async getVacunasPorcino(identificacion_animal: number): Promise<VacunaPorcino[]> {
    const url = VacunasPorcinosService.VACUNA_PORCINO_ROUTES.getVacunasPorcino + '/' + identificacion_animal;
    try {
      const result = await this.http.get<VacunaPorcino[]>(url).toPromise<VacunaPorcino[]>();
      return result;
    } catch (error) {
      console.error('error on getVacunasPorcino', { error });
      throw error;
    }
  }

  public async getVacunasPorcinoItem(identificacion_animal: number, vacuna: string, fecha: Date): Promise<VacunaPorcino> {
    const fechaStr = new Date(fecha).toISOString().split('T')[0];
    const url = `${VacunasPorcinosService.VACUNA_PORCINO_ROUTES.getAnimalVaccinationItem}/${identificacion_animal}/${vacuna}/${fechaStr}`;
    try {
      const result = await this.http.get<VacunaPorcino>(url).toPromise<VacunaPorcino>();
      return result;
    } catch (error) {
      console.error('error on getVacunasPorcinoItem', { error });
      throw error;
    }
  }

}
