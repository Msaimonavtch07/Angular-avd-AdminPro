import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { environment } from '../../environments/environment';

import { Hospitales } from '../models/hospitales.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(
    private http: HttpClient,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  };

  cargarHospitales( desde: number = 0 ) {

    const url = ` ${base_url}/hospitales `;
    return this.http.get( url, this.headers )
        .pipe(
          map( (resp: { ok: boolean, hospitales: Hospitales[] }) => resp.hospitales )
        )

  };

  crearHospitales( nombre: string) {

    const url = ` ${base_url}/hospitales `;
    return this.http.post( url, {nombre} ,this.headers );

  };

  actualizarHospitales( _id: string ,nombre: string) {

    const url = ` ${base_url}/hospitales/ ${ _id } `;
    return this.http.put( url, {nombre} ,this.headers );

  };

  eliminarHospitales( _id: string ) {

    const url = ` ${base_url}/hospitales/ ${ _id } `;
    return this.http.delete( url, this.headers );

  };

}
