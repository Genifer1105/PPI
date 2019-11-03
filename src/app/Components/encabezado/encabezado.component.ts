import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  salir() {
    this.authService.logout();
    this._router.navigate(['login']);
  }



}
