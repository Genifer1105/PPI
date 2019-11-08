import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {VacunasPorcinosService} from 'src/app/shared/services/vacunasPorcinos.service';
import { vacunaPorcino } from 'src/app/shared/models/vacuna_porcino.model';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.css']
})
export class VacunasComponent implements OnInit {

  public mostrarTableVac = true;

  public mostrarForm = false;
  
  public vacunasPorcinos: Array<vacunaPorcino> = [];

  public vacunasPorcinosForm : FormGroup;

  public showForm = false;

  public isUpdate = false;

  public selectedVacunaPorcino: vacunaPorcino;

  constructor(
    private vacunasPorcinosService: VacunasPorcinosService,
    private fb: FormBuilder
    ) {
      this.vacunasPorcinosForm = this.fb.group({
        identificacion_animal: ['', [Validators.required]],
        vacuna: ['', [Validators.required]],
        evento: ['', [Validators.required]],
        fecha_ejecucion: ['', []],
        via_aplicacion: ['', [Validators.required]],
        dosis: [1, [Validators.required]],
        laboratorio: ['', [Validators.required]],
        registro_ica: ['', [Validators.required]],
        numero_lote: ['', [Validators.required]],
        tiempo_retiro: ['', []],
        observacion: ['', []]

      });
    }

  ngOnInit() {
  }

  mostrarFormPorcinos() {
    this.mostrarForm = !this.mostrarForm;
  }



  public async getVacunaPorcino() {
    try {
      const vacunasPorcinos = await this.vacunasPorcinosService.getVacunasPorcinos;
      console.log(vacunasPorcinos);
     this.vacunasPorcinos = vacunasPorcinos;
    } catch (error) {
      console.error(error);
    }
  }

  public createVacunaPorcino() {
    this.createForm();
    this.showForm = true;
    this.mostrarTableVac = false;
  }


    public async updateVacunaPorcino(identificacionAnimal: number) {
    try {
      this.selectedVacunaPorcino = await this.vacunasPorcinosService.getVacunasPorcinosInfo(identificacionAnimal);
      this.showUpdateForm();
    } catch (error) {
      console.error('error on updateAnimal', { error });
      alert('ha ocurrido un error');
    }
  }

  private showUpdateForm() {
    this.updateForm(this.selectedVacunaPorcino);
    this.showForm = true;
    this.isUpdate = true;
    this.mostrarTableVac = false;
  }

  
  private createForm() {
    this.vacunasPorcinosForm = this.fb.group({
      identificacion_animal: [null, [Validators.required, Validators.min(1)]],
      vacuna: [null, [Validators.required]],
      fechaProgramada: [null, [Validators.required]],
      evento: [null, [Validators.required]],
      fechaEjecucion: [null, []],
      viaAplicacion: [null, [Validators.required]],
      dosis: [null, [Validators.required]],
      laboratorio: [null, [Validators.required]],
      registroIca: [null, [Validators.required]],
      numeroLote: [null, [Validators.required]],
      tiempoRetiro: [null, []],
      observacion: [null, []],

    });
  }

  private updateForm(data: vacunaPorcino) {
    this.vacunasPorcinosForm = this.fb.group({
      identificacion_animal: [data.identificacion_animal, [Validators.required, Validators.min(1)]],
      vacuna: [data.vacuna, [Validators.required]],
      fechaProgramada: [data.fecha_programada, [Validators.required]],
      evento: [data.evento, [Validators.required]],
      fechaEjecucion: [new Date(data.fecha_ejecucion).toISOString().split('T')[0]],
      viaAplicacion: [data.via_aplicacion, [Validators.required]],
      dosis: [data.dosis, [Validators.required]],
      laboratorio: [data.laboratorio, [Validators.required]],
      registroIca: [data.registro_ica, [Validators.required]],
      numeroLote: [data.numero_lote, [Validators.required]],
      tiempoRetiro: [data.tiempo_retiro, []],
      observacion: [data.observacion, []],
    });
  }

  public async searchVacunaPorcino() {
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
        this.selectedVacunaPorcino = await this.vacunasPorcinosService.getVacunasPorcinosInfo(identificacionAnimal);
        this.showUpdateForm();
      } catch (error) {
        if (error.status === 404) {
          alert('No se encontró el registro');
        }
      }
    }
  }


  public async saveVacunaPorcino() {
    console.log(this.vacunasPorcinosForm.value);
    const vacunaPorcinoData: vacunaPorcino = {
      identificacion_animal: this.vacunasPorcinosForm.value.identificacion_animal,
      vacuna: this.vacunasPorcinosForm.value.vacuna,
      fechaProgramada: this.vacunasPorcinosForm.value.fecha_programada,
      evento: this.vacunasPorcinosForm.value.evento,
      fechaEjecucion: this.vacunasPorcinosForm.value.fecha_ejecucion,
      viaAplicacion: this.vacunasPorcinosForm.value.via_aplicacion,
      dosis: this.vacunasPorcinosForm.value.dosis,
      laboratorio: this.vacunasPorcinosForm.value.laboratorio,
      registroIca: this.vacunasPorcinosForm.value.registro_ica,
      numeroLote: this.vacunasPorcinosForm.value.numero_lote,
      tiempoRetiro: this.vacunasPorcinosForm.value.tiempo_retiro,
      observacion: this.vacunasPorcinosForm.value.observacion,
    };
    try {
      if (this.selectedVacunaPorcino) {
        await this.vacunasPorcinosService.updateVacunaPorcino(vacunaPorcinoData);
      } else {
        await this.vacunasPorcinosService.createVacunaPorcino(vacunaPorcinoData);
      }
      alert('Operación realizada con exito');
      await this.getVacunaPorcino();
      this.mostrarTableVacunas();
    } catch (error) {
      console.error('error on saveAnimal', { error });
      alert('Ha ocurrido un error');
    }
  }

  mostrarTableVacunas() {
    this.mostrarTableVac = true;
    this.showForm = false;
    this.isUpdate = false;
    this.selectedVacunaPorcino = null;
  }
  
}
