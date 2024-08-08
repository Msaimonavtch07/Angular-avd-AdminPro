import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-heard',
  templateUrl: './heard.component.html',
  styles: ``
})
export class HeardComponent {

  constructor(
    private usuariosService: UsuariosService
  ) {}

  logout() {
    this.usuariosService.logout();
  };

}
