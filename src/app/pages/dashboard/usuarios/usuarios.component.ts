import { User } from './../../../shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usersForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.usersForm = this.fb.group({
      identificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', []],
      correo: ['', [Validators.required]],
      id_perfil: [1, [Validators.required]],
      telefono: ['', [Validators.pattern('[0-9]*')]],
      contrasena: ['', [Validators.required]]
    });
  }

  guardar() {
     const usuario: User = {
       nombre: this.usersForm.get('nombre').value,
       apellido1: this.usersForm.get('apellido1').value,
       apellido2: this.usersForm.get('apellido2').value  ,
       contrasena: this.usersForm.get('contrasena').value ,
       correo: this.usersForm.get('correo').value ,
       id_perfil: this.usersForm.get('id_perfil').value ,
       identificacion: this.usersForm.get('identificacion').value,
       telefono: this.usersForm.get('telefono').value
     };
     this.guardarUsuario(usuario);
  }
  private async guardarUsuario(usuario: User) {
    let success;
    try {
      const result: any = await this.usersService.createUser(usuario);
      success = result.success;
    } catch (error) {
      success = false;
      console.error(error);
    }
    if (success) {
      alert('Usuario guardado con exito!');
    } else {
      alert('Error al guardar el usuario');
    }
    this.obtenerUsuarios();
  }

  private async obtenerUsuarios() {
    try {
      console.log(await this.usersService.getUsers());
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {

  }

}
