import { Component, OnDestroy, OnInit } from '@angular/core';

import { HospitalesService } from '../../../services/hospitales.service';
import { Hospitales } from '../../../models/hospitales.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospitales[] = [];
  public cargando: boolean = true;

  public imgSub: Subscription;

  constructor(
    private hospitalesService: HospitalesService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) {}

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  };

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSub = this.modalImagenService.nuevaImagen
        .pipe(
          delay(1000)
        )
        .subscribe( img => {this.cargarHospitales()})

  };

  buscar( termino: string ) {

    if( termino.length === 0 ) {
      return this.cargarHospitales()
    };

    this.busquedasService.buscar( 'hospitales', termino )
        .subscribe( resultados => {
          this.hospitales = resultados
        })

  };

  cargarHospitales() {

    this.cargando = true;

    this.hospitalesService.cargarHospitales()
        .subscribe( hospitales => {
          this.cargando = false;
          this.hospitales = hospitales;
        })

  };

  guardarCambios( hospital: Hospitales ) {

    this.hospitalesService.actualizarHospitales( hospital._id, hospital.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', hospital.nombre, 'success' )
        });

  };

  borrarHospital( hospital: Hospitales ) {

    this.hospitalesService.eliminarHospitales( hospital._id )
        .subscribe( resp => {
          this.cargarHospitales()
          Swal.fire( 'Borrado', hospital.nombre, 'success' )
        });

  };

  async abrirSweetalert() {

    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: "text",
      inputLabel: "Crear Hospital...",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true,
    });

    if( value?.trim().length > 0 ) {
      this.hospitalesService.crearHospitales( value )
        .subscribe( (resp: any) => {
          this.hospitales.push(resp.hospital)
        })
    };

  };

  abrirModal(hospital: Hospitales) {

    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  };

}
