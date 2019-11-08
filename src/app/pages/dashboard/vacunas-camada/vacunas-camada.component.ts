import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacunas-camada',
  templateUrl: './vacunas-camada.component.html',
  styleUrls: ['./vacunas-camada.component.css']
})
export class VacunasCamadaComponent implements OnInit {

  
  public mostrarFormC = false;
  
  constructor() { }

  ngOnInit() {
  }

  mostrarFormCamadas() {
    this.mostrarFormC = !this.mostrarFormC;
   }
}
