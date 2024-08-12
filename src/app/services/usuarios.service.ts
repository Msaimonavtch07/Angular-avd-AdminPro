import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { registerForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { loginForm } from '../interfaces/login-form.interface';

import { catchError, map, Observable, of, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

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

  get uid(): string {
    return this.usuario.uid || '';
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
        localStorage.setItem('token', resp.token );

        return true;
      }),
      catchError( error => of(false) )
    );

  };

  crearUsuario( formData: registerForm ) {

    return this.http.post(` ${ base_url }/usuarios `, formData );

  };

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data,
      role?: this.usuario.role
    };

    return this.http.put(` ${ base_url }/usuarios/${this.uid} `, data, {
      headers: {
        'x-token': this.token
      }
    } )

  };

  login( formData: loginForm ) {

    return this.http.post(` ${ base_url }/login `, formData )
        .pipe(
          tap( (resp: any) => {
            localStorage.setItem( 'token', resp.token )
          })
        );

  };

  loginGoogle( token: string ) {

    return this.http.post(` ${ base_url }/login/google `, {token} )
        .pipe(
          tap( (resp: any) => {
            localStorage.setItem( 'token', resp.token )
          })
        );

  };

}
