import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from 'src/app/shared/models/animal.model';
import { Constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  private static readonly ANIMAL_ROUTE = Constants.URL_SERVER + 'animales/';

  private static readonly ANIMAL_ROUTES = {
    getAnimalInfo: AnimalsService.ANIMAL_ROUTE + 'get_animal',
    getAnimals: AnimalsService.ANIMAL_ROUTE + 'get_animals',
    createAnimals: AnimalsService.ANIMAL_ROUTE + 'create_animal',
    updateAnimals: AnimalsService.ANIMAL_ROUTE + 'update_animal',
    deleteAnimal: AnimalsService.ANIMAL_ROUTE + 'delete_animal'
  };

  constructor(private http: HttpClient) {}

  public async getAnimals(): Promise<Animal[]> {
    const url = AnimalsService.ANIMAL_ROUTES.getAnimals;
    try {
      const result = await this.http.get<Animal[]>(url).toPromise<Animal[]>();
      return result;
    } catch (error) {
      console.error('error on getAnimals', { error });
      throw error;
    }
  }

  public async createAnimal(data: Animal) {
    const url = AnimalsService.ANIMAL_ROUTES.createAnimals;
    try {
      const result = await this.http.post(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on getAnimals', { error });
      throw error;
    }
  }

  public async updateAnimal(data: Animal) {
    const url = AnimalsService.ANIMAL_ROUTES.updateAnimals + '/' + data.identificacion_animal;
    try {
      const result = await this.http.put(url, data).toPromise();
      return result;
    } catch (error) {
      console.error('error on updateAnimal', { error });
      throw error;
    }
  }

  public async deleteAnimal(identificacion_animal: number): Promise<Animal> {
    const url = AnimalsService.ANIMAL_ROUTES.deleteAnimal + '/' + identificacion_animal;
    try {
      const result = await this.http.delete<Animal>(url).toPromise<Animal>();
      return result;
    } catch (error) {
      console.error('error on getAnimalInfo', {error});
      throw error;
    }
  }

  public async getAnimalInfo(identificacion_animal: number): Promise<Animal> {
    const url = AnimalsService.ANIMAL_ROUTES.getAnimalInfo + '/' + identificacion_animal;
    try {
      const result = await this.http.get<Animal>(url).toPromise<Animal>();
      return result;
    } catch (error) {
      console.error('error on getAnimalInfo', {error});
      throw error;
    }
  }

}
