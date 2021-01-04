import { Component } from '@angular/core';
import { Observable, Subscriber, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  public intervalObs: Subscription;

  constructor() {
    
    /* this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
       (err) => console.log(err),
      () => console.log(`Observable completado`)
    ); */

    this.intervalObs = this.retornaIntervalo()
      .subscribe(console.log)
  }

  retornaIntervalo(): Observable<number> {
    return interval(200).pipe(
      take(10),
      map( arg => arg + 1 ),
      filter( val => val % 2 === 0)
    )
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>(
      (observer: Subscriber<number>) => {
        const interval = setInterval(
          () => {
            i++;
            observer.next(i)
            if (i === 4) {
              clearInterval(interval)
              observer.unsubscribe()
            }
            if (i === 2) {
              i = 0
              // console.log();
              observer.error('Error i llego a dos')
            }
          }, 1000)
      }
    );
    return obs$
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalObs.unsubscribe()
  }
}
