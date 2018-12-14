import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EncabezadoComponent } from './Components/encabezado/encabezado.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ReportesComponent } from './Components/reportes/reportes.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MenuComponent } from './Components/menu/menu.component';



/*import {ReactiveFormsModule} from '@angular/forms'; */


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    FooterComponent,
    ReportesComponent,
    RegistroComponent,
    MenuComponent,
   
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
    /*ReactiveFormsModule*/
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
