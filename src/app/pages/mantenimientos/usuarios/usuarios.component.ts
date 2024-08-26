import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

import { Usuario } from '../../../models/usuario.model';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSub: Subscription;
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuariosService: UsuariosService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService,
  ) {}

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  };

  ngOnInit(): void {

    this.cargarUsuarios();
    this.imgSub = this.modalImagenService.nuevaImagen
        .pipe(
          delay(1000)
        )
        .subscribe( img => {this.cargarUsuarios()})

  };

  cargarUsuarios() {
    this.cargando = true;

    this.usuariosService.cargarUsuario( this.desde )
    .subscribe( ({total, usuarios}) => {
      this.totalUsuarios = total;
      if( usuarios.length !== 0 ) {
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;

        this.cargando = false;
      }

    })

  };

  cambiarPagina( valor: number) {

    this.desde += valor;

    if( this.desde < 0 ) {
      this.desde = 0;
    } else if( this.desde > this.totalUsuarios ) {
      this.desde -= valor;
    };

    this.cargarUsuarios();

  };

  buscar( termino: string ) {

    if( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp
    };

    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( (resultados: Usuario[]) => {
          this.usuarios = resultados
        })

  };

  eliminarUsuario( usuario: Usuario ) {

    if( usuario.uid === this.usuariosService.uid ) {
      return Swal.fire( 'Error', 'Usted no se puede borrar asi mismo', 'error' )
    };

    Swal.fire({
      title: "Borrar Usuario?",
      text: `Esta a punto de borrar a ${usuario.nombre} !` ,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuariosService.eliminarUsuario( usuario )
            .subscribe( resp => {

              this.cargarUsuarios();

              Swal.fire(
                'Borrando Usuario',
                `${usuario.nombre} fue eliminado correctamente`,
                'success'
              )
            })

      }
    });

  };

  cambiarRole( usuario: Usuario ) {

    this.usuariosService.guardarUsuario( usuario )
        .subscribe( resp => {
          console.log(resp)
        })

  };

  abrirModal( usuario: Usuario ) {

    console.log(usuario)
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);

  };

}
