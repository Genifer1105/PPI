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

  constructor (
   private fb: FormBuilder
  ) {
    this.cambioContrasenaForm = this.fb.group({
     contrasena_actual: [" ", Validators.required],
     contrasena_nueva: [" ", Validators.required],
     confirmacion_contrasena: [" ", Validators.required]
    });
  }

  ngOnInit() {
  }

    mostrarFormCambioContrasena() {
      this.mostrarFormCambio= !this.mostrarFormCambio;
  }


private createForm() {
  this.cambioContrasenaForm = this.fb.group(
    {
    contrasena_actual: [" ", Validators.required],
    contrasena_nueva: [" ", Validators.required],
    confirmacion_contrasena: [" ", Validators.required]
    }, { validator: this.formValidator });
}

private formValidator(data) {
  console.log(data);
  const errors: any = {}
  if (data.value.contrasena_nueva != null && data.value.contrasena_nueva  != data.value.confirmacion_contrasena){
    errors.confirmacion_contrasena = 'Las contraseñas no coindicen';
  }
  return errors;
}

}
