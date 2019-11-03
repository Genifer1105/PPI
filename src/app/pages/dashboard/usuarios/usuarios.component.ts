import { Constants } from 'src/app/shared/constants';
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

  public mostrarTableUsu = true;

  public showForm = false;

  public isUpdate = false;

  public selectedUser: User = null;

  public usuarios: User[] = [];

  public readonly profiles = Constants.PROFILES;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
  }

  private createForm() {
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

  private updateForm(user: User) {
    this.usersForm = this.fb.group({
      identificacion: [user.identificacion, [Validators.required]],
      nombre: [user.nombre, [Validators.required]],
      apellido1: [user.apellido1, [Validators.required]],
      apellido2: [user.apellido2, []],
      correo: [user.correo, [Validators.required]],
      id_perfil: [user.id_perfil, [Validators.required]],
      telefono: [user.telefono, [Validators.pattern('[0-9]*')]],
      // contrasena: ['', [Validators.required]]
    });
  }

  public createUser() {
    this.createForm();
    this.showForm = true;
    this.mostrarTableUsu = false;
  }


  private showUpdateForm() {
    this.updateForm(this.selectedUser);
    this.showForm = true;
    this.isUpdate = true;
    this.mostrarTableUsu = false;
  }

  public async searchUser() {
    const identificacion = prompt('Ingrese la identificación del usuario');
    if (identificacion === null) {
      return;
    }
    const identificacionUser = (+identificacion);
    console.log({identificacion, identificacionUser});
    if (isNaN(identificacionUser) || identificacion.length === 0) {
      alert('la identificacion debe ser un numero');
    } else {
      try {
        this.selectedUser = await this.usersService.getUser(identificacionUser);
        this.showUpdateForm();
      } catch (error) {
        if (error.status === 404) {
          alert('No se encontró el registro');
        }
      }
    }
  }

  public async saveUser() {
    console.log(this.usersForm.value);
    const userData: User = {
      identificacion: this.usersForm.value.identificacion,
      nombre: this.usersForm.value.nombre,
      apellido1: this.usersForm.value.apellido1,
      apellido2: this.usersForm.value.apellido2,
      id_perfil: +this.usersForm.value.id_perfil,
      contrasena: this.usersForm.value.contrasena,
      correo: this.usersForm.value.correo,
      telefono: this.usersForm.value.telefono
    };
    try {
      if (this.selectedUser) {
        await this.usersService.updateUser(userData);
      } else {
        await this.usersService.createUser(userData);
      }
      alert('Operación realizada con exito');
      await this.obtenerUsuarios();
      this.mostarTablaUsuarios();
    } catch (error) {
      console.error('error on saveUser', { error });
      alert('Ha ocurrido un error');
    }
  }



  private async obtenerUsuarios() {
    try {
      this.usuarios = await this.usersService.getUsers();
    } catch (error) {
      console.error(error);
    }
  }

  public async updateUser(identificacion: number) {
    try {
      this.selectedUser = await this.usersService.getUser(identificacion);
      this.showUpdateForm();
    } catch (error) {
      console.error('error on updateUser', { error });
      alert('ha ocurrido un error');
    }
  }

  async ngOnInit() {
    try {
      await this.obtenerUsuarios();
    } catch(error) {
      console.error('error on get Users', {error});
    }
  }

  mostarTablaUsuarios() {
    this.mostrarTableUsu = true;
    this.showForm = false;
    this.isUpdate = false;
    this.selectedUser = null;
  }

}
