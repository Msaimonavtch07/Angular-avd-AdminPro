import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SiderBarComponent } from './sider-bar/sider-bar.component';
import { HeardComponent } from './heard/heard.component';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SiderBarComponent,
    HeardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    BreadcrumbsComponent,
    SiderBarComponent,
    HeardComponent,
  ]
})
export class SharedModule { }
