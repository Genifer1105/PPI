import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  public mostrarTableAni = false;

  constructor() { }

  ngOnInit() {
  }
  
  mostrartableAnimales() {
    this.mostrarTableAni = !this.mostrarTableAni;
  }
}
