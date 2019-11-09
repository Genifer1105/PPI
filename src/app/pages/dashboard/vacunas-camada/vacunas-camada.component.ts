import { PartosService } from './../../../shared/services/partos.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VacunaCamada } from 'src/app/shared/models/vacuna_camada.model';
import { Parto } from 'src/app/shared/models/parto_model';
import { VacunasCamadasService } from 'src/app/shared/services/vacunasCamadas.service';

@Component({
  selector: 'app-vacunas-camada',
  templateUrl: './vacunas-camada.component.html',
  styleUrls: ['./vacunas-camada.component.css']
})
export class VacunasCamadaComponent implements OnInit {
  public showTable = true;

  public mostrarForm = false;

  public vacunasCamadas: Array<VacunaCamada> = [];

  public vacunasCamadasForm: FormGroup;

  public showForm = false;

  public isUpdate = false;

  public selectedVacunaCamada: VacunaCamada;

  public selectedIdentificacionCamada: number;

  public partos: Array<Parto>;

  constructor(
    private vacunasCamadasService: VacunasCamadasService,
    private partosService: PartosService,
    private fb: FormBuilder
  ) {
  }

  async ngOnInit() {
    await this.showTableVacunas();
  }

  mostrarFormCamadas() {
    this.mostrarForm = !this.mostrarForm;
    this.showTable = false;
    this.isUpdate = false;
    this.selectedVacunaCamada = null;
  }

  public async getVacunasCamadas() {
    try {
      const vacunasCamadas = await this.vacunasCamadasService.getVacunasCamadas();
      console.log(vacunasCamadas);
      this.vacunasCamadas = vacunasCamadas;
    } catch (error) {
      console.error(error);
    }
  }

  public async createVacunaCamada() {
    await this.getAnimales();
    this.createForm();
    this.showForm = true;
    this.showTable = false;
  }

  private async getAnimales() {
    try {
      this.partos = await this.partosService.getPartos();
    } catch (error) {
      console.error('error on getAnimals', { error });
      throw error;
    }
  }

  public async updateVacunaCamada(identificacionCamada: number, vacuna: string, fecha: Date) {
    try {
      this.selectedVacunaCamada = await this.vacunasCamadasService.getVacunasCamadaItem(
        identificacionCamada,
        vacuna,
        fecha
      );
      this.showUpdateForm();
    } catch (error) {
      console.error('error on updateAnimal', { error });
      alert('ha ocurrido un error');
    }
  }

  private showUpdateForm() {
    this.updateForm(this.selectedVacunaCamada);
    this.showForm = true;
    this.isUpdate = true;
    this.showTable = false;
  }

  private createForm() {
    this.vacunasCamadasForm = this.fb.group({
      id_camada: [null, [Validators.required, Validators.min(1)]],
      vacuna: [null, [Validators.required]],
      fechaProgramada: [null, [Validators.required]],
      evento: [null, [Validators.required]],
      fechaEjecucion: [null, []],
      viaAplicacion: [null, [Validators.required]],
      dosis: [null, [Validators.required, Validators.min(1)]],
      laboratorio: [null, [Validators.required]],
      registroIca: [null, [Validators.required]],
      numeroLote: [null, [Validators.required]],
      tiempoRetiro: [null, []],
      observacion: [null, []]
    });
  }

  private updateForm(data: VacunaCamada) {
    this.vacunasCamadasForm = this.fb.group({
      id_camada: [data.id_camada, [Validators.required, Validators.min(1)]],
      vacuna: [data.vacuna, [Validators.required]],
      fechaProgramada: [new Date(data.fecha_programada).toISOString().split('T')[0], [Validators.required]],
      evento: [data.evento, [Validators.required]],
      fechaEjecucion: [new Date(data.fecha_ejecucion).toISOString().split('T')[0]],
      viaAplicacion: [data.via_aplicacion, [Validators.required]],
      dosis: [data.dosis, [Validators.required]],
      laboratorio: [data.laboratorio, [Validators.required]],
      registroIca: [data.registro_ica, [Validators.required]],
      numeroLote: [data.numero_lote, [Validators.required]],
      tiempoRetiro: [data.tiempo_retiro, []],
      observacion: [data.observacion, []]
    });
  }

  public async searchVacunasCamada() {
    const identificacion = prompt('Ingrese la identificación de la camada');
    if (identificacion === null) {
      return;
    }
    const identificacionCamada = +identificacion;
    console.log({ identificacion, identificacionCamada });
    if (isNaN(identificacionCamada) || identificacion.length === 0) {
      alert('la identificacion debe ser un numero');
    } else {
      await this.getVacunasByIdCamada(identificacionCamada);
    }
  }

  private async getVacunasByIdCamada(identificacion_animal: number) {
    try {
      const result = await this.vacunasCamadasService.getVacunasCamada(identificacion_animal);
      if (result.length) {
        this.selectedIdentificacionCamada = identificacion_animal;
        console.log({ selectedIdentificacionCamada: this.selectedIdentificacionCamada });
        this.vacunasCamadas = result;
      } else {
        alert('No se encontrarón registros');
      }
    } catch (error) {
      if (error.status === 404) {
        alert('No se encontro el registro');
      }
    }
  }

  public async saveVacunaCamada() {
    console.log(this.vacunasCamadasForm.value);
    const vacunaCamadaData: VacunaCamada = {
      id_camada: +this.vacunasCamadasForm.value.id_camada,
      vacuna: this.vacunasCamadasForm.value.vacuna,
      fecha_programada: this.vacunasCamadasForm.value.fechaProgramada,
      evento: this.vacunasCamadasForm.value.evento,
      fecha_ejecucion: this.vacunasCamadasForm.value.fechaEjecucion,
      via_aplicacion: this.vacunasCamadasForm.value.viaAplicacion,
      dosis: this.vacunasCamadasForm.value.dosis,
      laboratorio: this.vacunasCamadasForm.value.laboratorio,
      registro_ica: this.vacunasCamadasForm.value.registroIca,
      numero_lote: this.vacunasCamadasForm.value.numeroLote,
      tiempo_retiro: this.vacunasCamadasForm.value.tiempoRetiro,
      observacion: this.vacunasCamadasForm.value.observacion
    };
    try {
      if (this.selectedVacunaCamada) {
        await this.vacunasCamadasService.updateVacunaCamada(
          vacunaCamadaData
        );
      } else {
        await this.vacunasCamadasService.createVacunaCamada(
          vacunaCamadaData
        );
      }
      alert('Operación realizada con exito');
      this.showTableVacunas();
    } catch (error) {
      console.error('error on saveVacunaCamada', { error });
      alert('Ha ocurrido un error');
    }
  }

  async showTableVacunas() {
    await this.getVacunasCamadas();
    this.showTable = true;
    this.showForm = false;
    this.isUpdate = false;
    this.selectedVacunaCamada = null;
    this.selectedIdentificacionCamada = null;
  }
}
