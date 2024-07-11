import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  exports: [
    BreadcrumbsComponent,
    SiderBarComponent,
    HeardComponent,
  ]
})
export class SharedModule { }
