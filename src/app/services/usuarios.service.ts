import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { registerForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { loginForm } from '../interfaces/login-form.interface';

import { catchError, delay, map, Observable, of, tap } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interfaces';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  };

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {

    return this.usuario.role;
  };

  get uid(): string {
    return this.usuario.uid || '';
  };

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  };

  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );

  };

  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve()
      });
    })

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    // TODO: borrar todo...

    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  };

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const {
          nombre,
          email,
          google,
          role,
          img = '',
          uid
        } = resp.usuario;

        this.usuario = new Usuario(
          nombre, email, '', img, google, role, uid
        );

        // Con fin demostrativo...
        /* this.usuario.imprimirUsuario(); */

        this.guardarLocalStorage( resp.token, resp.menu );

        return true;
      }),
      catchError( error => of(false) )
    );

  };

  crearUsuario( formData: registerForm ) {

    return this.http.post(` ${ base_url }/usuarios `, formData )
        .pipe(
          tap( (resp: any) => {

            this.guardarLocalStorage( resp.token, resp.menu );

          })
        )

  };

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(` ${ base_url }/usuarios/${this.uid} `, data, this.headers)

  };

  login( formData: loginForm ) {

    return this.http.post(` ${ base_url }/login `, formData )
        .pipe(
          tap( (resp: any) => {

            this.guardarLocalStorage( resp.token, resp.menu );

          })
        );

  };

  loginGoogle( token: string ) {

    return this.http.post(` ${ base_url }/login/google `, {token} )
        .pipe(
          tap( (resp: any) => {

            this.guardarLocalStorage( resp.token, resp.menu );

          })
        );

  };

  cargarUsuario( desde: number = 0 ) {

    const url = ` ${base_url}/usuarios?desde=${ desde } `;
    return this.http.get<CargarUsuarios>( url, this.headers )
            .pipe(
              delay(2000),
              map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
                )

                return {
                  total: resp.total,
                  usuarios
                }
              })
            );

  };

  eliminarUsuario( usuario: Usuario ) {

    const url = ` ${base_url}/usuarios/${usuario.uid} `;
    return this.http.delete( url, this.headers );

  };

  guardarUsuario( usuario: Usuario ) {

    return this.http.put(` ${ base_url }/usuarios/${usuario.uid} `, usuario, this.headers);

  };

}
