import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {

    this.menu = JSON.parse(localStorage.getItem( 'menu' )) || [] ;

  };

  /* menu: any[] = [

    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Mani', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Graficas', url: 'grafica1' },
        { title: 'Promesis', url: 'promesas' },
        { title: 'Rxjs', url: 'rxjs' },
      ]
    },

    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: 'usuarios' },
        { title: 'Medicos', url: 'medicos' },
        { title: 'Hospitales', url: 'hospitales' },
      ]
    },


  ]; */

  constructor() { }
}
