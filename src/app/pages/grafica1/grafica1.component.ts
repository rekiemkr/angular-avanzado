import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: []
})
export class Grafica1Component implements OnInit {

  public labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data = [ [350, 450, 100] ]; 

  constructor() { }

  ngOnInit(): void {
  }

}
