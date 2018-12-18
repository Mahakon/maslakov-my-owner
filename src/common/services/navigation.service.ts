import * as _ from 'lodash';
import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class NavigationService implements OnDestroy {
  currentUrl = '';
  params: Params = {};
  queryParams: Params = {};

  fullUrl = '';
  private fullPath: ActivatedRoute[] = [];
  private onStateChanged$ = new Subject<string>();
  private onDestroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        takeUntil(this.onDestroy$),
        filter(navigationEvent => navigationEvent instanceof NavigationEnd)
      )
      .subscribe(navigationEvent => {
        const endEvent = <NavigationEnd>navigationEvent;

        this.currentUrl = endEvent.urlAfterRedirects || endEvent.url;
        this.fullPath = this.getFullPath();
        this.fullUrl = this.getFullUrl();
        this.params = this.mergeAllParams('params');
        this.queryParams = this.mergeAllParams('queryParams');

        this.onStateChanged$.next(this.currentUrl);
      });
  }

  onStateChanged(): Observable<string> {
    return this.onStateChanged$.asObservable();
  }

  goTo(state: string, queryParams: Params = {}): Promise<boolean> {
    return this.router.navigate([state], {queryParams});
  }

  private mergeAllParams(keyName: string = 'params'): Params {
    const params = {};

    let {snapshot} = this.activatedRoute;

    while (snapshot) {
      _.assign(params, snapshot[keyName]);

      snapshot = snapshot.firstChild;
    }

    return params;
  }

  private getFullPath(): ActivatedRoute[] {
    const path = [];

    let {snapshot} = this.activatedRoute;

    while (snapshot) {
      path.push(snapshot);

      snapshot = snapshot.firstChild;
    }

    return path;
  }

  private getFullUrl(): string {
    const path = [];

    let {snapshot} = this.activatedRoute;

    while (snapshot) {
      if (snapshot.routeConfig && snapshot.routeConfig.path) {
        path.push(snapshot.routeConfig.path);
      }

      snapshot = snapshot.firstChild;
    }

    return path.join('/');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
