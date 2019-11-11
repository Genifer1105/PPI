import { AnimalsService } from 'src/app/shared/services/animals.service';
import { Animal } from 'src/app/shared/models/animal.model';
import { PartosService } from './../../../../shared/services/partos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Parto } from 'src/app/shared/models/parto_model';

@Component({
  selector: 'app-partos',
  templateUrl: './partos.component.html',
  styleUrls: ['./partos.component.css']
})
export class PartosComponent implements OnInit {

  public partos: Parto[] = [];
  public mostrarTablaPartos = true;
  public showForm = false;
  public isUpdate = false;
  public selectedParto?: Parto;
  public partosForm: FormGroup;
  public animals: Animal[] = [];


  constructor(
    private partosService: PartosService,
    private animalsService: AnimalsService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.mostrartablePartos();
    try {
      await this.getPartos();
      await this.getAnimals();
    } catch (error) {
      console.error(error);
    }
  }

  public async getPartos() {
    try {
      const partos = await this.partosService.getPartos();
      console.log(partos);
      this.partos = partos;
    } catch (error) {
      console.error(error);
    }
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

  public createParto() {
    this.createForm();
    this.showForm = true;
    this.mostrarTablaPartos = false;
  }

  public async updateParto(idCamada: number) {
    try {
      this.selectedParto = await this.partosService.getPartoInfo(idCamada);
      this.showUpdateForm();
    } catch (error) {
      console.error('error on updateParto', { error });
      alert('ha ocurrido un error');
    }
  }

  private showUpdateForm() {
    this.updateForm(this.selectedParto);
    this.showForm = true;
    this.isUpdate = true;
    this.mostrarTablaPartos = false;
  }

  private createForm() {
    this.partosForm = this.fb.group({
      identificacion_animal: [null, [Validators.required]],
      fecha_monta: [null, [Validators.required]],
      id_camada: [null, [Validators.required, Validators.min(0)]],
      tipo_servicio: [null, [Validators.required]],
      identificacion_macho: [null, []],
      fecha_probable_parto: [null, [Validators.required]],
      fecha_parto: [null, []],
      jaula_parto: [null, []],
      numero_lechones_vivos_parto: [0, [Validators.required, Validators.min(0)]],
      numero_lechones_muertos_parto: [0, [Validators.required, Validators.min(0)]],
      numero_machos_parto: [0, [Validators.required, Validators.min(0)]],
      numero_hembras_parto: [0, [Validators.required, Validators.min(0)]],
      numero_momias: [0, [Validators.required, Validators.min(0)]],
      peso_total_vivos: [0, [Validators.required, Validators.min(0)]],
      fecha_probable_destete: [null, []],
      fecha_destete: [null, []],
      numero_hembras_destete: [0, [Validators.min(0)]],
      numero_machos_destete: [0, [Validators.min(0)]],
      numero_muertos_destete: [0, [Validators.min(0)]],
      dias_lactancia: [null, []],
      jaula_destete: [null, []],
      peso_total_destete: [null, []],
    }, {validator: this.formValidator});
  }

  private formValidator(data) {
    console.log(data);
    const errors: any = {};
    const fecha = new Date().getTime();
    if (data.value.id_camada != null && data.value.id_camada <= 0) {
      errors.id_camada = 'La identificación de la camada debe ser un numero mayor a 0';
    }

    if (data.value.jaula_parto != null && data.value.jaula_parto <= 0) {
      errors.jaula_parto = 'El número de jaula debe ser mayor a 0';
    }

    if (data.value.jaula_destete != null && data.value.jaula_destete <= 0) {
      errors.jaula_destete = 'El número de jaula debe ser mayor a 0';
    }
    if (data.value.numero_lechones_vivos_parto != 0 && data.value.numero_lechones_vivos_parto
       != data.value.numero_machos_parto + data.value.numero_hembras_parto) {
      errors.lechones_vivos_parto = 'El número de lechones vivos debe sumar machos y hembras';
    }

    if (data.value.numero_machos_destete != 0 && data.value.numero_machos_destete > data.value.numero_machos_parto) {
     errors.lechones_machos_destete = 'El número de machos no puede ser mayor a los del parto';
   }

   if (data.value.numero_hembras_destete != 0 && data.value.numero_hembras_destete > data.value.numero_hembras_parto) {
   errors.lechones_hembras_destete = 'El número de hembras no puede ser mayor a las del parto';
   }

   if (data.value.numero_machos_destete + data.value.numero_hembras_destete + data.value.numero_muertos_destete
     != data.value.numero_lechones_vivos_parto) {
    errors.cantidad_lechones = 'El número de lechones al destete no es igual a la cantidad de lechones vivos del parto';
  }


  if (data.value.fecha_monta != null && new Date(data.value.fecha_monta).getTime() > fecha) {
    errors.fecha_monta = 'La fecha de monta no debe ser superior a la fecha actual';
  }

  if (data.value.fecha_parto != null && new Date(data.value.fecha_parto).getTime() > fecha) {
    errors.fecha_parto = 'La fecha del parto no puede ser mayor a la fecha actual';
    }

  if (data.value.fecha_parto != null && data.value.fecha_parto < data.value.fecha_monta) {
    errors.fecha_parto_monta = 'La fecha del parto no puede ser menor a la fecha de la monta';
    }

    if (data.value.fecha_destete != null && new Date(data.value.fecha_destete).getTime() > fecha) {
      errors.fecha_destete = 'La fecha de destete no puede ser mayor a la fecha actual';
      }

    if (data.value.fecha_destete != null && data.value.fecha_destete < data.value.fecha_parto) {
      errors.fecha_destete_parto = 'La fecha de destete no puede ser menor a la fecha del parto';
      }

      if (data.value.fecha_probable_destete != null && data.value.fecha_probable_destete < data.value.fecha_parto) {
        errors.fecha_probable_destete = 'La fecha probable de destete no puede ser menor a la fecha del parto';
        }
    return errors;
  }


  private updateForm(data: Parto) {
    this.partosForm = this.fb.group({
      identificacion_animal: [data.identificacion_animal, [Validators.required, Validators.min(1)]],
      fecha_monta: [new Date(data.fecha_monta).toISOString().split('T')[0], [Validators.required]],
      id_camada: [data.id_camada, [Validators.required, Validators.min(1)]],
      tipo_servicio: [data.tipo_servicio, [Validators.required]],
      identificacion_macho: [data.identificacion_macho, []],
      fecha_probable_parto: [new Date(data.fecha_probable_parto).toISOString().split('T')[0], [Validators.required]],
      fecha_parto: [data.fecha_parto && new Date(data.fecha_parto).toISOString().split('T')[0], []],
      jaula_parto: [data.jaula_parto, []],
      numero_lechones_vivos_parto: [data.numero_lechones_vivos_parto, [Validators.required, Validators.min(0)]],
      numero_lechones_muertos_parto: [data.numero_lechones_muertos_parto, [Validators.required, Validators.min(0)]],
      numero_machos_parto: [data.numero_machos_parto, [Validators.required, Validators.min(0)]],
      numero_hembras_parto: [data.numero_hembras_parto, [Validators.required, Validators.min(0)]],
      numero_momias: [data.numero_momias, [Validators.required, Validators.min(0)]],
      peso_total_vivos: [data.peso_total_vivos, [Validators.required]],
      fecha_probable_destete: [data.fecha_probable_destete && new Date(data.fecha_probable_destete).toISOString().split('T')[0], []],
      fecha_destete: [data.fecha_destete && new Date(data.fecha_destete).toISOString().split('T')[0], []],
      numero_hembras_destete: [data.numero_hembras_destete, [Validators.min(0)]],
      numero_machos_destete: [data.numero_machos_destete, [Validators.min(0)]],
      numero_muertos_destete: [data.numero_muertos_destete, [Validators.min(0)]],
      dias_lactancia: [data.dias_lactancia, []],
      jaula_destete: [data.jaula_destete, []],
      peso_total_destete: [data.peso_total_destete, []],
    }, {validator: this.formValidator});
  }

  public async searchParto() {
    const identificacion = prompt('Ingrese el id de la camada');
    if (identificacion === null) {
      return;
    }
    const idCamada = (+identificacion);
    if (isNaN(idCamada) || identificacion.length === 0) {
      alert('el id debe ser un numero');
    } else {
      try {
        this.selectedParto = await this.partosService.getPartoInfo(idCamada);
        this.showUpdateForm();
      } catch (error) {
        if (error.status === 404) {
          alert('No se encontró el registro');
        }
      }
    }
  }

  public async saveParto() {
    console.log(this.partosForm.value);
    const partoData: Parto = {
      identificacion_animal: +this.partosForm.value.identificacion_animal,
      fecha_monta: this.partosForm.value.fecha_monta,
      id_camada: this.partosForm.value.id_camada,
      tipo_servicio: this.partosForm.value.tipo_servicio,
      identificacion_macho: this.partosForm.value.identificacion_macho && +this.partosForm.value.identificacion_macho,
      fecha_probable_parto: this.partosForm.value.fecha_probable_parto,
      fecha_parto: this.partosForm.value.fecha_parto,
      jaula_parto: this.partosForm.value.jaula_parto,
      numero_lechones_vivos_parto: this.partosForm.value.numero_lechones_vivos_parto,
      numero_lechones_muertos_parto: this.partosForm.value.numero_lechones_muertos_parto,
      numero_machos_parto: this.partosForm.value.numero_machos_parto,
      numero_hembras_parto: this.partosForm.value.numero_hembras_parto,
      numero_momias: this.partosForm.value.numero_momias,
      peso_total_vivos: this.partosForm.value.peso_total_vivos,
      fecha_probable_destete: this.partosForm.value.fecha_probable_destete,
      fecha_destete: this.partosForm.value.fecha_destete,
      numero_hembras_destete: this.partosForm.value.numero_hembras_destete,
      numero_machos_destete: this.partosForm.value.numero_machos_destete,
      numero_muertos_destete: this.partosForm.value.numero_muertos_destete,
      dias_lactancia: this.partosForm.value.dias_lactancia,
      jaula_destete: this.partosForm.value.jaula_destete,
      peso_total_destete: this.partosForm.value.peso_total_destete,
    };
    try {
      if (this.selectedParto) {
        await this.partosService.updateParto(partoData);
      } else {
        await this.partosService.createParto(partoData);
      }
      alert('Operación realizada con exito');
      await this.getPartos();
      this.mostrartablePartos();
    } catch (error) {
      console.error('error on saveParto', { error });
      alert('Ha ocurrido un error');
    }
  }

  public mostrartablePartos() {
    this.mostrarTablaPartos = true;
    this.showForm = false;
    this.isUpdate = false;
    this.selectedParto = null;
  }

}
