import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styles: ``
})
export class SiderBarComponent {

  public usuario: Usuario;
  public menuItems: any[];

  constructor(
    private sidebarService: SidebarService,
    usuariosService: UsuariosService
  ) {
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);

    this.usuario = usuariosService.usuario;
  };

}
