import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSumitted = false;

  public registerForms = this.fb.group({

    nombre: ['Saimon', [Validators.required]],
    email: ['Msaimon@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]],
    password2: ['1234', [Validators.required]],
    terminos: [ true, [Validators.required]],

  }, {
    Validators: this.passwordsIguales( 'password', 'password2' )
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
  ) {}

  crearUsuario() {

    this.formSumitted = true;
    console.log(this.registerForms.value);

    if( this.registerForms.invalid ) {
      return;
    }

    // Realizar posteo...
    this.usuariosService.crearUsuario(this.registerForms.value)
        .subscribe( resp => {
          // Navegacion al dashboard...
          this.router.navigateByUrl('/');
        }, (err) => {
          // Si sucede un error...
          Swal.fire('Error', err.error.msg, 'error');
        });

  };

  campoNoValido( camp: string ): boolean {

    if( this.registerForms.get(camp)?.invalid && this.formSumitted ) {
      return true;
    } else {
      return false;
    }
  };

  contrasenasNoValidas() {

    const pass1 = this.registerForms.get('password')?.value;
    const pass2 = this.registerForms.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSumitted ) {
      return true;
    } else {
      return false;
    };

  };

  aceptarTerminos() {

    return !this.registerForms.get('terminos')?.value && this.formSumitted;

  };

  passwordsIguales( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const passControl1 = formGroup.get(pass1Name);
      const passControl2 = formGroup.get(pass2Name);

      if( passControl1  === passControl2 ) {
        passControl2?.setErrors(null);
      } else {
        passControl2?.setErrors({ noEsIgual: true })
      };

    };

  };

}
