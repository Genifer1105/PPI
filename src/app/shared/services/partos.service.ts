import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parto } from 'src/app/shared/models/parto_model';
import { Constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PartosService {

  private static readonly BIRTH_ROUTE = Constants.URL_SERVER + 'births/';

  private static readonly BIRTH_ROUTES = {
    getPartoInfo: PartosService.BIRTH_ROUTE + 'get_birth',
    getPartos: PartosService.BIRTH_ROUTE + 'get_births',
    createPartos: PartosService.BIRTH_ROUTE + 'create_birth',
    updatePartos: PartosService.BIRTH_ROUTE + 'update_birth',
    deleteParto: PartosService.BIRTH_ROUTE + 'delete_birth'
  };

  constructor(private http: HttpClient) {}

  public async getPartos(): Promise<Parto[]> {
    const url = PartosService.BIRTH_ROUTES.getPartos;
    try {
      const result = await this.http.get<Parto[]>(url).toPromise<Parto[]>();
      return result;
    } catch (error) {
      console.error('error on getPartos', { error });
      throw error;
    }
  }

  public async createParto(data: Parto) {
    const url = PartosService.BIRTH_ROUTES.createPartos;
    try {
      const result = await this.http.post(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on getPartos', { error });
      throw error;
    }
  }

  public async updateParto(data: Parto) {
    const url = PartosService.BIRTH_ROUTES.updatePartos + '/' + data.id_camada;
    try {
      const result = await this.http.put(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on updateParto', { error });
      throw error;
    }
  }

  public async deleteParto(id_camada: number): Promise<Parto> {
    const url = PartosService.BIRTH_ROUTES.deleteParto + '/' + id_camada;
    try {
      const result = await this.http.delete<Parto>(url).toPromise<Parto>();
      return result;
    } catch (error) {
      console.error('error on getPartoInfo', {error});
      throw error;
    }
  }

  public async getPartoInfo(id_camada: number): Promise<Parto> {
    const url = PartosService.BIRTH_ROUTES.getPartoInfo + '/' + id_camada;
    try {
      const result = await this.http.get<Parto>(url).toPromise<Parto>();
      return result;
    } catch (error) {
      console.error('error on getPartoInfo', {error});
      throw error;
    }
  }

}
