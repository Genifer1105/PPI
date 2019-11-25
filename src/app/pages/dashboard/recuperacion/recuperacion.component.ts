import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css']
})
export class RecuperacionComponent implements OnInit {

  public sendEmailForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _router: Router
    ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.sendEmailForm = this.formBuilder.group({
      email: [null, [Validators.required]]
    });
  }

  async sendEmail() {
    const email = this.sendEmailForm.value.email;
    try {
      this.buildForm();
      await this.authService.sendRecoveryMail(email);
      alert('Te hemos enviado un correo electrónico con las instrucciones para recuperar tu contraseña.');
      this._router.navigate(['login']);
    } catch (error) {
      if (error.status === 404) {
        alert('No se ha encontrado una cuenta asociada a este correo.');
      }
    }
  }

}
