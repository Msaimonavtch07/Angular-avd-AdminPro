import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

// CP. mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';

const routes: Routes = [

  { path: 'dashboard',
    component: PageComponent,
    canActivate: [AuthGuard],
    children: [

      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgreesBar' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gragicas' } },
      { path: 'account-setting', component: AccountSettingComponent, data: { title: 'Temas' } },
      { path: 'buscar/:termino', component: BusquedasComponent, data: { title: 'busquedas' } },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario' } },
      /* { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, */

      // CP. mantenimientos...

      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimientos de hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimientos de medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Mantenimientos de medico' } },

      // Ruta Admin
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { title: 'Mantenimientos de usuarios' } },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
