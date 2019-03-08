import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  profileForm: FormGroup;


  constructor(

    public fb: FormBuilder,
    private _router: Router

  ) {

    this.profileForm = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }


  ngOnInit() {

  }


  ingresar() {
    console.log('prueba');
    if (!this.profileForm.valid) {
      console.log('no valido')
      return;
    }
    this._router.navigate(['dashboard']);
  }

}
