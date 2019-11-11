import { Animal } from "./../../../shared/models/animal.model";
import { AnimalsService } from "./../../../shared/services/animals.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { VacunasPorcinosService } from "src/app/shared/services/vacunasPorcinos.service";
import { VacunaPorcino } from "src/app/shared/models/vacuna_porcino.model";

@Component({
  selector: "app-vacunas",
  templateUrl: "./vacunas.component.html",
  styleUrls: ["./vacunas.component.css"]
})
export class VacunasComponent implements OnInit {
  public showTable = true;

  public mostrarForm = false;

  public vacunasPorcinos: Array<VacunaPorcino> = [];

  public vacunasPorcinosForm: FormGroup;

  public showForm = false;

  public isUpdate = false;

  public selectedVacunaPorcino: VacunaPorcino;

  public selectedIdentificacionAnimal: number;

  public animales: Array<Animal>;

  constructor(
    private vacunasPorcinosService: VacunasPorcinosService,
    private animalsService: AnimalsService,
    private fb: FormBuilder
  ) {
    this.vacunasPorcinosForm = this.fb.group({
      identificacion_animal: ["", [Validators.required]],
      vacuna: ["", [Validators.required]],
      evento: ["", [Validators.required]],
      fechaEjecucion: ["", []],
      viaAplicacion: ["", [Validators.required]],
      dosis: [1, [Validators.required]],
      laboratorio: ["", [Validators.required]],
      registroIca: ["", [Validators.required]],
      numeroLote: ["", [Validators.required]],
      tiempoRetiro: ["", []],
      observacion: ["", []]
    });
  }

  async ngOnInit() {
    await this.showTableVacunas();
  }

  mostrarFormPorcinos() {
    this.mostrarForm = !this.mostrarForm;
    this.showTable = false;
    this.isUpdate = false;
    this.selectedVacunaPorcino = null;
  }

  public async getVacunasPorcinos() {
    try {
      const vacunasPorcinos = await this.vacunasPorcinosService.getVacunasPorcinos();
      console.log(vacunasPorcinos);
      this.vacunasPorcinos = vacunasPorcinos;
    } catch (error) {
      console.error(error);
    }
  }

  public async createVacunaPorcino() {
    await this.getAnimales();
    this.createForm();
    this.showForm = true;
    this.showTable = false;
  }

  private async getAnimales() {
    try {
      this.animales = await this.animalsService.getAnimals();
    } catch (error) {
      console.error("error on getAnimals", { error });
      throw error;
    }
  }

  public async updateVacunaPorcino(
    identificacionAnimal: number,
    vacuna: string,
    fecha: Date
  ) {
    try {
      this.selectedVacunaPorcino = await this.vacunasPorcinosService.getVacunasPorcinoItem(
        identificacionAnimal,
        vacuna,
        fecha
      );
      this.showUpdateForm();
    } catch (error) {
      console.error("error on updateAnimal", { error });
      alert("ha ocurrido un error");
    }
  }

  private showUpdateForm() {
    this.updateForm(this.selectedVacunaPorcino);
    this.showForm = true;
    this.isUpdate = true;
    this.showTable = false;
  }

  private createForm() {
    this.vacunasPorcinosForm = this.fb.group(
      {
        identificacion_animal: [null, [Validators.required, Validators.min(1)]],
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
      },
      { validator: this.formValidator }
    );
  }

  private formValidator(data) {
    console.log(data);
    const errors: any = {};
    if (data.value.dosis != null ){
      if (data.value.dosis <= 0) {
        errors.dosis = 'El número de dosis no puede ser menor o igual a cero';
      } else if (data.value.dosis > 99999) {
        errors.dosis = 'El número de dosis no puede tener más de 5 caracteres';
      }
    }
    if (data.value.registroIca != null && !data.value.registroIca.match(/^[\w\d]+$/)) {
      errors.registroIca = 'El registro ica solo puede contener numeros y letras';
    }
    console.log({errors});
    return errors;
  }

  private updateForm(data: VacunaPorcino) {
    this.vacunasPorcinosForm = this.fb.group(
      {
        identificacion_animal: [
          data.identificacion_animal,
          [Validators.required, Validators.min(1)]
        ],
        vacuna: [data.vacuna, [Validators.required]],
        fechaProgramada: [
          new Date(data.fecha_programada).toISOString().split("T")[0],
          [Validators.required]
        ],
        evento: [data.evento, [Validators.required]],
        fechaEjecucion: [
          new Date(data.fecha_ejecucion).toISOString().split("T")[0]
        ],
        viaAplicacion: [data.via_aplicacion, [Validators.required]],
        dosis: [data.dosis, [Validators.required, Validators.min(1)]],
        laboratorio: [data.laboratorio, [Validators.required]],
        registroIca: [data.registro_ica, [Validators.required]],
        numeroLote: [data.numero_lote, [Validators.required]],
        tiempoRetiro: [data.tiempo_retiro, []],
        observacion: [data.observacion, []]
      },
      { validator: this.formValidator }
    );
  }

  public async searchVacunasPorcino() {
    const identificacion = prompt("Ingrese la identificación del animal");
    if (identificacion === null) {
      return;
    }
    const identificacionAnimal = +identificacion;
    console.log({ identificacion, identificacionAnimal });
    if (isNaN(identificacionAnimal) || identificacion.length === 0) {
      alert("la identificacion debe ser un numero");
    } else {
      await this.getVacunasByIdentificacionAnimal(identificacionAnimal);
    }
  }

  private async getVacunasByIdentificacionAnimal(
    identificacion_animal: number
  ) {
    try {
      const result = await this.vacunasPorcinosService.getVacunasPorcino(
        identificacion_animal
      );
      if (result.length) {
        this.selectedIdentificacionAnimal = identificacion_animal;
        console.log({
          selectedIdentificacionAnimal: this.selectedIdentificacionAnimal
        });
        this.vacunasPorcinos = result;
      } else {
        alert("No se encontrarón registros");
      }
    } catch (error) {
      if (error.status === 404) {
        alert("No se encontro el registro");
      }
    }
  }

  public async saveVacunaPorcino() {
    console.log(this.vacunasPorcinosForm.value);
    const vacunaPorcinoData: VacunaPorcino = {
      identificacion_animal: +this.vacunasPorcinosForm.value
        .identificacion_animal,
      vacuna: this.vacunasPorcinosForm.value.vacuna,
      fecha_programada: this.vacunasPorcinosForm.value.fechaProgramada,
      evento: this.vacunasPorcinosForm.value.evento,
      fecha_ejecucion: this.vacunasPorcinosForm.value.fechaEjecucion,
      via_aplicacion: this.vacunasPorcinosForm.value.viaAplicacion,
      dosis: this.vacunasPorcinosForm.value.dosis,
      laboratorio: this.vacunasPorcinosForm.value.laboratorio,
      registro_ica: this.vacunasPorcinosForm.value.registroIca,
      numero_lote: this.vacunasPorcinosForm.value.numeroLote,
      tiempo_retiro: this.vacunasPorcinosForm.value.tiempoRetiro,
      observacion: this.vacunasPorcinosForm.value.observacion
    };
    try {
      if (this.selectedVacunaPorcino) {
        await this.vacunasPorcinosService.updateVacunaPorcino(
          vacunaPorcinoData
        );
      } else {
        await this.vacunasPorcinosService.createVacunaPorcino(
          vacunaPorcinoData
        );
      }
      alert("Operación realizada con exito");
      this.showTableVacunas();
    } catch (error) {
      console.error("error on saveAnimal", { error });
      alert("Ha ocurrido un error");
    }
  }

  async showTableVacunas() {
    await this.getVacunasPorcinos();
    this.showTable = true;
    this.showForm = false;
    this.isUpdate = false;
    this.selectedVacunaPorcino = null;
    this.selectedIdentificacionAnimal = null;
  }
}
