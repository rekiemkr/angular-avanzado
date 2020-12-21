import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  @Input('valor') progress: number = 80; 
  @Input() btnClass: string = 'btn-primary'; 
  
  
  @Output() valueOut: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.btnClass = `btn ${this.btnClass}`
  }

  get getProgress():string {
    return `${this.progress}%`
  }
  
  onChange = (newNum: number) => {
    if( newNum >= 100) {
      this.progress = 100;
    } else if ( newNum <= 0) {
      this.progress = 0
    }
    this.valueOut.emit(this.progress)
  }

  changeValue = (num: number) => {
    if(this.progress >= 100 && num >= 0) return this.valueOut.emit(100)
    if(this.progress <= 0 && num <= 0) return this.valueOut.emit(0)
    this.progress+=num;
    this.valueOut.emit(this.progress)
  }

}
