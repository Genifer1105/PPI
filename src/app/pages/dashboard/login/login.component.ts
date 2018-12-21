import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(

    private _router: Router

  ) { }


  ngOnInit() {
  }


ingresar() {
  this._router.navigate(['dashboard']);
}

}