import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

// CP. mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [

  { path: 'dashboard',
    component: PageComponent,
    canActivate: [AuthGuard],
    children: [

      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgreesBar' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gragicas' } },
      { path: 'account-setting', component: AccountSettingComponent, data: { title: 'Temas' } },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario' } },
      /* { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, */

      // CP. mantenimientos...
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Mantenimientos de usuarios' } },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
