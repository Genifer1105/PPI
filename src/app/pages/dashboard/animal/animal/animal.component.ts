import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AnimalsService } from 'src/app/shared/services/animals.service';
import { Animal } from 'src/app/shared/models/animal.model';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  public mostrarTableAni = true;

  public animals: Array<Animal> = [];

  public animalsForm: FormGroup;

  public showForm = false;

  public isUpdate = false;

  public selectedAnimal: Animal;


  constructor(
    private animalsService: AnimalsService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.getAnimals().catch(console.error);
  }

  public async getAnimals() {
    try {
      const animals = await this.animalsService.getAnimals();
      console.log(animals);
      this.animals = animals;
    } catch (error) {
      console.error(error);
    }
  }

  public createAnimal() {
    this.createForm();
    this.showForm = true;
    this.mostrarTableAni = false;
  }

  public async updateAnimal(identificacionAnimal: number) {
    try {
      this.selectedAnimal = await this.animalsService.getAnimalInfo(identificacionAnimal);
      this.showUpdateForm();
    } catch (error) {
      console.error('error on updateAnimal', { error });
      alert('ha ocurrido un error');
    }
  }

  private showUpdateForm() {
    this.updateForm(this.selectedAnimal);
    this.showForm = true;
    this.isUpdate = true;
    this.mostrarTableAni = false;
  }

  private createForm() {
    this.animalsForm = this.fb.group({
      identificacion_animal: [null, [Validators.required, Validators.min(1)]],
      raza: [null, [Validators.required]],
      idMadre: [null, []],
      idPadre: [null, []],
      fechaNacimiento: [null, [Validators.required]],
      procedencia: [null, [Validators.required]]
    });
  }

  private updateForm(data: Animal) {
    this.animalsForm = this.fb.group({
      identificacion_animal: [data.identificacion_animal, [Validators.required, Validators.min(1)]],
      raza: [data.raza, [Validators.required]],
      idMadre: [data.id_madre, []],
      idPadre: [data.id_padre, []],
      fechaNacimiento: [new Date(data.fecha_nacimiento).toISOString().split('T')[0], [Validators.required]],
      // fechaNacimiento: [data.fecha_nacimiento, [Validators.required]],
      procedencia: [data.procedencia, [Validators.required]]
    });
  }

  public async searchAnimal() {
    const identificacion = prompt('Ingrese la identificación del animal');
    if (identificacion === null) {
      return;
    }
    const identificacionAnimal = (+identificacion);
    console.log({identificacion, identificacionAnimal});
    if (isNaN(identificacionAnimal) || identificacion.length === 0) {
      alert('la identificacion debe ser un numero');
    } else {
      try {
        this.selectedAnimal = await this.animalsService.getAnimalInfo(identificacionAnimal);
        this.showUpdateForm();
      } catch (error) {
        if (error.status === 404) {
          alert('No se encontró el registro');
        }
      }
    }
  }

  public async saveAnimal() {
    console.log(this.animalsForm.value);
    const animalData: Animal = {
      identificacion_animal: this.animalsForm.value.identificacion_animal,
      raza: this.animalsForm.value.raza,
      id_madre: this.animalsForm.value.idMadre && +this.animalsForm.value.idMadre,
      id_padre: this.animalsForm.value.idPadre && +this.animalsForm.value.idPadre,
      fecha_nacimiento: this.animalsForm.value.fechaNacimiento,
      procedencia: this.animalsForm.value.procedencia
    };
    try {
      if (this.selectedAnimal) {
        await this.animalsService.updateAnimal(animalData);
      } else {
        await this.animalsService.createAnimal(animalData);
      }
      alert('Operación realizada con exito');
      await this.getAnimals();
      this.mostrartableAnimales();
    } catch (error) {
      console.error('error on saveAnimal', { error });
      alert('Ha ocurrido un error');
    }
  }

  mostrartableAnimales() {
    this.mostrarTableAni = true;
    this.showForm = false;
    this.isUpdate = false;
    this.selectedAnimal = null;
  }
}
