import { Component } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-heard',
  templateUrl: './heard.component.html',
  styles: ``
})
export class HeardComponent {

  // public imgUrl = '';
  public usuario: Usuario;

  constructor(
    private usuariosService: UsuariosService
  ) {
    // this.imgUrl = usuariosService.usuario.imagenUrl;
    this.usuario = usuariosService.usuario;
  }

  logout() {
    this.usuariosService.logout();
  };

}
