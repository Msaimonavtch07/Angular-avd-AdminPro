import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuariosService } from '../../services/usuarios.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private fileUploadService: FileUploadService,
  ) {
    this.usuario = usuarioService.usuario;
  };

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  };

  actualizarPerfil() {

    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( resp => {

          const {nombre, email} = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');

        }, (err) => {
          Swal.fire('Error', err.error.msg , 'error');
        });

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
    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
      .then(
        img => this.usuario.img = img,

        Swal.fire('Guardado', 'La imagen fue guardada con exito', 'success')
      ).catch(err => {
        Swal.fire('Error', 'No se pudo cargar la img' , 'error');
      });
  };

}