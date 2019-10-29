import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../Components/menu/menu.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { EncabezadoComponent } from '../Components/encabezado/encabezado.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { AnimalsService } from './services/animals.service';
/**
*  Modulo donde se puede realizar instanciación modular de clases
*  aquí van los elementos transversales
*/
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    MenuComponent,
    EncabezadoComponent,
    DashboardComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    UsersService,
    AnimalsService
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
