import { AuthService } from './../../../shared/services/auth.service';
import { async } from '@angular/core/testing';
import { User } from './../../../shared/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public mostrarFormCambio = false;

  public cambioContrasenaForm: FormGroup;

  public perfilForm: FormGroup;

  public usuarioEnSesion: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    try {
      console.log('usuario logueado');
      const result: any = await this.authService.getLoggedUser();
      console.log('usuario logueado', { result });
      this.usuarioEnSesion = result;
      this.mostrarFormPerfil();
    } catch (error) {
      console.error(error);
    }
  }

  private getUsuarioEnSesion() {

  }

  private mostrarFormPerfil() {
    this.perfilForm = this.fb.group({
      identificacion: [this.usuarioEnSesion.identificacion, [Validators.required]],
      nombre: [this.usuarioEnSesion.nombre, [Validators.required]],
      apellido1: [this.usuarioEnSesion.apellido1, [Validators.required]],
      apellido2: [this.usuarioEnSesion.apellido2 || 'n/a', [Validators.required]],
      telefono: [this.usuarioEnSesion.telefono || 'n/a', [Validators.required]],
      correo: [this.usuarioEnSesion.correo, [Validators.required]],
      perfil: [this.usuarioEnSesion.perfil, [Validators.required]]
    });
  }

  mostrarFormCambioContrasena() {
    this.createContrasenaForm();
    this.mostrarFormCambio = !this.mostrarFormCambio;
  }


  private createContrasenaForm() {
    this.cambioContrasenaForm = this.fb.group(
      {
        contrasena_actual: ['', Validators.required],
        contrasena_nueva: ['', Validators.required],
        confirmacion_contrasena: ['', Validators.required]
      }, { validator: this.formValidator });
  }

  private formValidator(data) {
    console.log(data);
    const errors: any = {}
    if (data.value.contrasena_nueva != null && data.value.contrasena_nueva !== data.value.confirmacion_contrasena) {
      errors.confirmacion_contrasena = 'Las contraseñas no coindicen';
    }
    return errors;
  }

  public async guardarNuevaContrasena() {
    const password = this.cambioContrasenaForm.value.contrasena_actual;
    const new_password = this.cambioContrasenaForm.value.contrasena_nueva;
    try {
      await this.authService.changePassword(password, new_password);
      this.mostrarFormCambioContrasena();
      alert('Contraseña actualizada con exito.');
    } catch (error) {
      switch (error.status) {
        case 401:
          alert('La contraseña actual es incorrecta.');
          break;
        default:
          alert('Error en la operación.');
      }
    }
  }

}
