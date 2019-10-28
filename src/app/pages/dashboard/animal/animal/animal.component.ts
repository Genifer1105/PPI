import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  public animalsForm = FormGroup;

  public mostrarTableAni = false;

  constructor() { }

  ngOnInit() {

  }
  mostrartableAnimales() {
    this.mostrarTableAni = !this.mostrarTableAni;
  }
}
