import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { SidebarService } from '../services/sidebar.service';

/* declare function customInitFuntions(); */

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styles: ``
})
export class PageComponent implements OnInit {



  constructor(
    private settingService: SettingService,
    private sidebarService: SidebarService,
  ) {}

  ngOnInit(): void {
    customInitFuntions();

    this.sidebarService.cargarMenu();

  };

}
