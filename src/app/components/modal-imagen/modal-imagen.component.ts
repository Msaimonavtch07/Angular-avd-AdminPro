import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {

  /* public ocultarModal: boolean = false; */

  public imagenSubir?: File;
  public imgTemp: any = null;

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService,
  ) {}

  cerrarModal() {
    /* this.ocultarModal = true; */

    this.imgTemp = null;
    this.modalImagenService.cerrarModal;

  };

  cambiarImg( file: File ) {

    this.imagenSubir = file;

    if( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url = reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  };

  subirImagen() {

    const id   = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id)
      .then(

        Swal.fire('Guardado', 'La imagen fue guardada con exito', 'success'),

        this.modalImagenService.nuevaImagen.emit(img),
        this.cerrarModal(),

      ).catch(err => {
        Swal.fire('Error', 'No se pudo cargar la img' , 'error');
      });
  };

}
