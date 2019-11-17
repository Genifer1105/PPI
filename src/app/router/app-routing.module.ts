import { LoginGuardService } from 'src/app/shared/guards/login-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from '../pages/dashboard/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { RecuperacionComponent } from '../pages/dashboard/recuperacion/recuperacion.component';

/* import {ModuleWithProviders} from '@angular/core'*/

const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [ LoginGuardService ] },
  { path: 'recuperacion', component: RecuperacionComponent, canActivate: [ LoginGuardService ] },

  { path: 'dashboard',
  component: DashboardComponent,
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', loadChildren: '../pages/dashboard/lazyLoad.module#LazyLoadModule' },

    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [ LoginGuardService ] },
  { path: '**', redirectTo: 'login', pathMatch: 'full', canActivate: [ LoginGuardService ] }, /*home */

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
