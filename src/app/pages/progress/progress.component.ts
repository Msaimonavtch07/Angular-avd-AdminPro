import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1: number = 24;
  progreso2: number = 34;

  get getProgress1() {
    return ` ${ this.progreso1 }% `
  };

  get getProgress2() {
    return ` ${ this.progreso2 }% `
  };

  /* cambioSalida(valor: number) {
    this.progreso1 = valor;
  }; */

}
