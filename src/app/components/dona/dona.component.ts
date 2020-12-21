import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './dona.component.html',
  selector: 'app-dona',
})
export class DonaComponent implements OnInit {

  @Input() title: string = 'Sin titulo'
  @Input() labels: Array<string> = []
  @Input() data: Array<number> = []

  constructor() { }

  ngOnInit(): void {
  }

}
