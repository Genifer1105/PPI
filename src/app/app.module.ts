import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EncabezadoComponent } from './Components/encabezado/encabezado.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ReportesComponent } from './Components/reportes/reportes.component';
import { MenuComponent } from './Components/menu/menu.component';
import { RegistroComponent } from './Components/registro/registro.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    FooterComponent,
    ReportesComponent,
    MenuComponent,
    RegistroComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
