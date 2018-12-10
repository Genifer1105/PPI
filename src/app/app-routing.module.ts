import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReportesComponent} from './Components/reportes/reportes.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './Components/menu/menu.component';

const routes: Routes = [
 
  { path: 'menu', component: MenuComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
]; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
