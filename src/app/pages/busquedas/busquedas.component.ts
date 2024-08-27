import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Usuario } from '../../models/usuario.model';
import { Medicos } from '../../models/medicos.model';
import { Hospitales } from '../../models/hospitales.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: ``
})
export class BusquedasComponent implements OnInit {

  public usuario: Usuario[] = [];
  public medico: Medicos[] = [];
  public hospital: Hospitales[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({termino}) => this.busquedaGlobal(termino));

  };

  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)

          this.usuario = resp.usuario;
          this.medico = resp.medico;
          this.hospital = resp.hospital;
        });

  };

  abrirMedico( medico: Medicos ) {};

}
