import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

/* declare function customInitFuntions(); */

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styles: ``
})
export class PageComponent implements OnInit {



  constructor(
    private settingService: SettingService,
  ) {}

  ngOnInit(): void {
    /* customInitFuntions(); */
  };

}
