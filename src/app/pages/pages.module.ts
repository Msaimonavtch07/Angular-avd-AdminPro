import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '../components/component.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PageComponent } from './page.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// CP. mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PageComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,

    // CP. mantenimientos
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentModule,
    BaseChartDirective,
    ReactiveFormsModule

  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PageComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent
  ]
})
export class PagesModule { }
