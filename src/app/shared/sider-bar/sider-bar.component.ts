import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styles: ``
})
export class SiderBarComponent {

  menuItems: any[];

  constructor(
    private sidebarService: SidebarService,
  ) {
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems)
  }

}
