import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReportesComponent} from './Components/reportes/reportes.component';
import { RegistroComponent } from './Components/registro/registro.component';


const routes: Routes = [
  { path: 'reportes', component: ReportesComponent },
  { path: 'registro', component: RegistroComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,, 
    RouterModule.forRoot(routes)
  ],

})
export class AppRoutingModule { }
