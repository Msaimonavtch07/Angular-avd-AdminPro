import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    /* this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Subs:', valor),
      error => console.warn('Error', error),
      () => console.info('abs concluido'),
    ); */

    this.intervalSubs = this.retornaInterval()
      .subscribe(console.log)

  };

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  };

  ngOnInit(): void {

  };

  retornaInterval(): Observable<number> {

    const intervalo$ = interval(500)
                        .pipe(
                          map( valor => {
                            return valor + 1;
                          }),
                          filter( valor => (valor % 2 === 0) ? true: false ),
                          take(11),
                        )

    return intervalo$;
  };

  retornaObservable(): Observable<number> {

    let i = -1;
    const abs = new Observable<number>( observer => {
      const interval = setInterval( () => {

        i++;
        observer.next(i);

        if( i === 4 ) {
          clearInterval(interval);
          observer.complete();
        };

        if( i === 2 ) {
          /* i = 0; */
          observer.error(' El valor a llegado a 2 ')
        };

      }, 2000 )

    })
    return abs

  };

}
