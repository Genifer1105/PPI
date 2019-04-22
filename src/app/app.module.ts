import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/dashboard/login/login.component';
import { AppRoutingModule } from './router/app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';



/* Módulo principal donde se cargan todos los componentes y demás
/*import {ReactiveFormsModule} from '@angular/forms'; */


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    
         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    ReactiveFormsModule

  ],
 
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
