import { Component, OnDestroy, OnInit } from '@angular/core';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { MedicosService } from '../../../services/medicos.service';
import { BusquedasService } from '../../../services/busquedas.service';

import { Medicos } from '../../../models/medicos.model';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medicos[] = [];
  public cargando: boolean = true;

  public imgSub: Subscription;

  constructor(
    private medicosService: MedicosService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  };

  ngOnInit(): void {

    this.cargarMedico();

    this.imgSub = this.modalImagenService.nuevaImagen
        .pipe(
          delay(1000)
        )
        .subscribe( img => {this.cargarMedico()})

  };

  cargarMedico() {

    this.cargando = true;
    this.medicosService.cargarMedico()
        .subscribe( medicos => {
          this.cargando = false;
          this.medicos = medicos;
        })

  };

  abrirModal(medicos: Medicos) {

    this.modalImagenService.abrirModal('medicos', medicos._id, medicos.img);

  };

  buscar( termino: string ) {

    if( termino.length === 0 ) {
      return this.cargarMedico()
    };

    this.busquedasService.buscar( 'medicos', termino )
        .subscribe( resultados => {
          this.medicos = resultados
        })

  };

  borrarMedico( medico: Medicos ) {

    /* if( medico._id === this.usuariosService.uid ) {
      return Swal.fire( 'Error', 'Usted no se puede borrar asi mismo', 'error' )
    }; */

    Swal.fire({
      title: "Borrar Medico?",
      text: `Esta a punto de borrar a ${medico.nombre} !` ,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicosService.eliminarMedico( medico._id )
            .subscribe( resp => {

              this.cargarMedico();

              Swal.fire(
                'Borrando Usuario',
                `${medico.nombre} fue eliminado correctamente`,
                'success'
              )
            })

      }
    });

  };

}
