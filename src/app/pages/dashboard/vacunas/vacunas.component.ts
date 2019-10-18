import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.css']
})
export class VacunasComponent implements OnInit {

  public mostrarForm = false;
  public mostrarFormC = false;
  

  constructor() { }

  ngOnInit() {
  }

  mostrarFormPorcinos() {
    this.mostrarForm = !this.mostrarForm;
  }

  mostrarFormCamadas() {
   this.mostrarFormC = !this.mostrarFormC;
  }
}
