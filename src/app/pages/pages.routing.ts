import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PageComponent } from './page.component';


const routes: Routes = [

  { path: 'dashboard',
    component: PageComponent,
    canActivate: [AuthGuard],
    canLoad: [ AuthGuard ],
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
