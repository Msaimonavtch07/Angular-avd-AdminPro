import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
// implementar el OnDestroy()
export class BreadcrumbsComponent {

  /* public title: string;
  public tituloSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.tituloSub = this.getArgumentosRutas()
                                .subscribe( ({ titulo }) => {
                                  this.title = titulo;
                                });

  }ngOnDestroy(): void {
    this.tituloSub.unsubscribe()
  };

  getArgumentosRutas() {

    this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
        map( ( event: ActivationEnd ) => event.snapshot.data ),
      )

  }; */

}
