import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router
} from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { filter, map, mergeMap } from 'rxjs/operators';

// import 'assets/ng-validation.css';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit  {

  loading = true;
  start = 0;
  constructor(private router: Router,
              private title: Title,
              @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {
      // spinner/loader subscription
      router.events
        .subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
      // page title subscription
      // https://toddmotto.com/dynamic-page-titles-angular-2-router-events#final-code
      this.router.events
        .pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.router.routerState.root),
            map(route => {
              while (route.firstChild) route = route.firstChild;
              return route;
            }),
            filter(route => route.outlet === 'primary'),
            mergeMap(route => route.data)
        )
        .subscribe((event) => this.updatePageTitle(event['title']));
  }

  ngOnInit() {
    this.i18NextService.events.languageChanged.subscribe(lang => {
      const root = this.router.routerState.root;
      if (root != null && root.firstChild != null) {
        const data: any = root.firstChild.data;
        this.updatePageTitle(data && data.value && data.value.title);
      }
    });
  }

  // http://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
  navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd
            || event instanceof NavigationCancel
            || event instanceof NavigationError) {
            this.loading = false;
        }
    }

    updatePageTitle(title: string): void {
      const newTitle = title || 'application_title';
      console.log('Setting page title:', newTitle);
      this.title.setTitle(newTitle);
      console.log('Setting page title end:', newTitle);
    }
}
