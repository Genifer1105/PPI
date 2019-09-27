import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AnimalComponent } from './animal/animal/animal.component';
import { PartosComponent } from './animal/partos/partos.component';
import { VacunasComponent } from './vacunas/vacunas.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AyudaComponent} from './ayuda/ayuda.component';

// aquí van los componentes del dashboard
const admin_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'animal', component: AnimalComponent },
  { path: 'partos', component: PartosComponent },
  { path: 'vacunas', component: VacunasComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
    declarations: [
        UsuariosComponent,
        AnimalComponent,
        PartosComponent,
        ReportesComponent,
        VacunasComponent,
        AyudaComponent,
        HomeComponent,


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
export class LazyLoadModule {}
