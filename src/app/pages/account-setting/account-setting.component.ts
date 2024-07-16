import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: ``
})
export class AccountSettingComponent implements OnInit {

  /* public linkTheme = document.querySelector('#theme'); */

  constructor(
    private settingService: SettingService
  ) {}

  ngOnInit(): void {
    this.settingService.CheckCurrentTheme()
  }

  ChangeTheme( theme: string ) {
    this.settingService.ChangeTheme(theme);
  };



}
