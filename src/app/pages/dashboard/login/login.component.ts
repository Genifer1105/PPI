import { AuthService } from './../../../shared/services/auth.service';
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
    private authService: AuthService,
    public fb: FormBuilder,
    private _router: Router

  ) {

    this.profileForm = this.fb.group({
      correo: [null, [Validators.required, Validators.email]],
      contrasena: [null, [Validators.required]],
    });
  }

  ngOnInit() {

  }

  async ingresar() {
    try {
      const correo = this.profileForm.value.correo;
      const contrasena = this.profileForm.value.contrasena;
      const loginData = await this.authService.login(correo, contrasena);
      console.log('loginData', { loginData });
      this._router.navigate(['dashboard']);
    } catch (error) {
      if (error.status === 401) {
        alert('usuario o contraseña no validos');
      }
    }
  }

}
