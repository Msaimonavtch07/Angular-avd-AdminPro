import { Component, Input } from '@angular/core';

import { ChartType } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {

  public labels1: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];

  public data1 = [
    { data: [ 350, 450, 100 ], label: 'Series A' },
    { data: [ 50, 150, 120 ], label: 'Series B' },
    { data: [ 250, 130, 70 ], label: 'Series C' }
  ];

}
