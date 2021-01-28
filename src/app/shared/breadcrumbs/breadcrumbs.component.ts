import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public title: string;
  public titleSub$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.titleSub$ = this.getRouteParams().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`
    }
    );
  }

  getRouteParams() {
    return this.router.events
      .pipe(
        filter((event: ActivationEnd) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => !event.snapshot.firstChild),
        map((event: ActivationEnd) => event.snapshot.data),
      )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.titleSub$.unsubscribe()
  }
}

