import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../components/menu/menu.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { EncabezadoComponent } from '../Components/encabezado/encabezado.component';
import { FooterComponent } from '../components/footer/footer.component';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
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
		UsersService
	]
})

export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule
		};
	}
}
