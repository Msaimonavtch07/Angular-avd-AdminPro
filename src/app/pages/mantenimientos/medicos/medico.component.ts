import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospitales } from '../../../models/hospitales.model';
import { Medicos } from '../../../models/medicos.model';

import { HospitalesService } from '../../../services/hospitales.service';
import { MedicosService } from '../../../services/medicos.service';
import { delay } from 'rxjs';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent implements OnInit {

  public medicoFrom: FormGroup;
  public hospitales: Hospitales[] = [];

  public medicoSeleccionado: Medicos;
  public hospitalSeleccionado?: Hospitales;

  constructor(
    private fb: FormBuilder,
    private hospitalesService: HospitalesService,
    private medicosService: MedicosService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => { this.cargarMedico(id) });

    this.medicoFrom = this.fb.group({
      nombre: ['Saimon', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoFrom.get('hospital')?.valueChanges
        .subscribe( hospitalID => {

          this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalID )

        })

  };

  cargarMedico( id: string ) {

    this.medicosService.obtenerMedicoPorID(id)
        .pipe(
          delay(100)
        )
        .subscribe( medico => {

          if( !medico ) {
            return this.route.navigateByUrl(`/dashboard/medicos/`)
          }

          const { nombre, hospital:{_id} } = medico;
           this.medicoSeleccionado = medico;
           this.medicoFrom.setValue({nombre, hospital: _id})
        })

  };

  cargarHospitales() {

    this.hospitalesService.cargarHospitales()
        .subscribe( (hospitales: Hospitales[]) => {
          console.log(hospitales)
        })

    this.hospitales = this.hospitales;

  };

  guardarMedico() {

    const {nombre} = this.medicoFrom.value;

    if (this.medicoSeleccionado) {
      // actualizar

      const data = {
        ...this.medicoFrom.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicosService.actualizarMedico( data )
          .subscribe( resp = {
            console.log(resp)

            Swal.fire( 'Actualizado', `${nombre} Actualizado correctamente`, 'success' )
          })

    } else {
      // crear

      this.medicosService.crearMedico( this.medicoFrom.value )
          .subscribe( (resp: any) => {
            console.log(resp)
            Swal.fire( 'Creado', `${nombre} creado correctamente`, 'success' )

            this.route.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
    })

    }


  };

}
