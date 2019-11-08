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
import { AyudaComponent } from './ayuda/ayuda.component';
import { AcercaComponent } from './acerca/acerca.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RoleGuardService } from 'src/app/shared/guards/role-guard.service';
import { Constants } from 'src/app/shared/constants';
import { VacunasCamadaComponent } from './vacunas-camada/vacunas-camada.component';

// aquí van los componentes del dashboard
const admin_routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  {
    path: 'animal',
    component: AnimalComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  {
    path: 'partos',
    component: PartosComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  {
    path: 'vacunas',
    component: VacunasComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE]
    }
  },
  {
    path: 'ayuda',
    component: AyudaComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  {
    path: 'acerca',
    component: AcercaComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  { 
    path: 'vacunasCamada', 
    component: VacunasCamadaComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
  {
    path: '**', redirectTo: 'home', canActivate: [RoleGuardService],
    data: {
      expectedRoles: [Constants.ADMIN_PROFILE, Constants.OPERARIO_PROFILE]
    }
  },
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
    AcercaComponent,
    PerfilComponent,
    VacunasCamadaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      admin_routes),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,

  ]

})
export class LazyLoadModule { }
