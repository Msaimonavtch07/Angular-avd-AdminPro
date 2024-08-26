import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Medicos } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

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

  cargarMedico( desde: number = 0 ) {

    const url = ` ${base_url}/medicos `;
    return this.http.get( url, this.headers )
        .pipe(
          map( (resp: { ok: boolean, medicos: Medicos[] }) => resp.medicos )
        )

  };

  obtenerMedicoPorID( id: string ) {

    const url = ` ${base_url}/medicos/${id} `;
    return this.http.get( url, this.headers )
        .pipe(
          map( (resp: { ok: boolean, medicos: Medicos}) => resp.medicos )
        )

  };

  crearMedico( medico: { nombre: string, hospital: string }) {

    const url = ` ${base_url}/hospitales `;
    return this.http.post( url, medico ,this.headers );

  };

  actualizarMedico( medico: Medicos) {

    const url = ` ${base_url}/medicos/ ${ medico._id } `;
    return this.http.put( url, medico ,this.headers );

  };

  eliminarMedico( _id: string ) {

    const url = ` ${base_url}/medicos/ ${ _id } `;
    return this.http.delete( url, this.headers );

  };

}
