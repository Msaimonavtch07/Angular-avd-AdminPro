import { Component } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heard',
  templateUrl: './heard.component.html',
  styles: ``
})
export class HeardComponent {

  // public imgUrl = '';
  public usuario: Usuario;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
  ) {
    // this.imgUrl = usuariosService.usuario.imagenUrl;
    this.usuario = usuariosService.usuario;
  }

  logout() {
    this.usuariosService.logout();
  };

  buscar(termino: string) {
    if( termino.length === 0 ) {
      return
    };

    this.router.navigateByUrl(` dashboard/buscar/${termino} `)
  };

}
