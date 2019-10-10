import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.css']
})
export class VacunasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mostrarFormPorcinos() {
    var formulario = document.getElementById('formVacPorcinos');
    formulario.style.display = "block";
    }

  mostrarFormCamadas() {
      var formulario = document.getElementById('formVacCamadas');
      formulario.style.display = "block";
      }
  
}
