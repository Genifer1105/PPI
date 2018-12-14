import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


   public id:number;
   public fechaNacimiento:string ;
   public raza:string;
   public procedencia:string;
   public idPadre:number;
   public razaPadre:string;
   public idMadre:number;
   public razaMadre:string ;



  constructor(id:number,fechaNacimiento:string,raza:string,procedencia:string,idPadre:number,
    razaPadre:string,idMadre:number,razaMadre:string) {

         id = this.id;
         fechaNacimiento =this.fechaNacimiento;
         raza = this.raza;
         procedencia = this.procedencia;
         idPadre = this.idPadre;
         razaPadre = this.razaPadre;
         idMadre = this.idMadre;
         razaMadre = this.razaMadre;

    }
      
    
  ngOnInit() {
    /*  primer método que se ejecuta después del constructor dentro del componente, llamar servicios o funciones   */
  }


  /* funciones */

}
