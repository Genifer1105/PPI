
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AnimalComponent } from './animal/animal/animal.component';
import { MontasComponent } from './animal/montas/montas.component';
import { PartosComponent } from './animal/partos/partos.component';
import { CamadasComponent } from './animal/camadas/camadas.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { VacunasComponent } from './vacunas/vacunas.component';
import { SharedModule } from '../../shared/shared.module';

// aquí van los componentes del dashboard


const admin_routes: Routes = [

    { path: 'animal', component: AnimalComponent },
    { path: 'montas', component: MontasComponent },
    { path: 'partos', component: PartosComponent },
    { path: 'camadas', component: CamadasComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'notificaciones', component: NotificacionesComponent },
    { path: 'vacunas', component: VacunasComponent },
    { path: '**', redirectTo: 'animal' }
];

@NgModule({
    declarations: [
        UsuariosComponent,
        AnimalComponent,
        MontasComponent,
        PartosComponent,
        CamadasComponent,
        NotificacionesComponent,
        ReportesComponent,
        VacunasComponent
        
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild (
        admin_routes) 
    ],
    exports: [
        RouterModule,
       
    ]

})

export class LazyLoadModule { }