import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../components/menu/menu.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { EncabezadoComponent } from '../Components/encabezado/encabezado.component';


/**
 *  Modulo donde se puede realizar instanciación modular de clases
 *  aquí van los elementos transversales
 */ 
@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		MenuComponent,
		EncabezadoComponent,
		DashboardComponent
	],
	
	exports: [
		CommonModule,
		RouterModule,
		FormsModule,

	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule
		};
	}
}