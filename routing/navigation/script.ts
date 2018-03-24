// imports
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { JsonpModule, Jsonp, Response } from "@angular/http";
import { NgModule, Component, Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Routes, RouterModule, Router } from "@angular/router";

// domain models
class SearchItem {
  constructor(
    public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string) {
  }
}

// services
@Injectable()
class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private jsonp: Jsonp) {
    this.results = [];
    this.loading = false;
  }

  search(term: string) {
    return new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;

      this.jsonp.request(apiURL)
        .toPromise()
        .then(
          (res: Response) => { // success
            this.results = res.json().results
              .map((item: Object) => {
                return new SearchItem(
                  item.trackName,
                  item.artistName,
                  item.trackViewUrl,
                  item.artworkUrl30,
                  item.artistId
                );
              })
            // this.resutls = res.json().results;
            resolve(this.results);
          },
          (msg: Response) => { // error
            reject(msg);
          }
        );
    });
  }
}

// components
@Component({
  selector: 'app-home',
  template: `
    <div class="jumbotron">
      <h1 class="display-3">iTunes Search App</h1>
    </div>
  `
})
class HomeComponent { }

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-light bg-faded">
      <a class="navbar-brand" [routerLink]="['home']">iTunes Search App</a>
      <ul class="nav navbar-nav">
        <li class="nav-item" [routerLinkActive]="['active']">
          <a class="nav-link" [routerLink]="['home']">Home</a>
        </li>
        <li class="nav-item" [routerLinkActive]="['active']">
          <a class="nav-link" [routerLink]="['search']">Search</a>
        </li>
      </ul>
    </nav>
  `
})
class HeaderComponent {
  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['']);
  }

  goSearch() {
    this.router.navigate(['search', 'foo', 'moo']);
  }
}

@Component({
  selector: 'app-search',
  template: `
    <form class="form-inline" novalidate>
      <div class="form-group">
        <input type="search"
            class="form-control"
            placeholder="Enter search string"
            #search>
      </div>
      <button class="btn btn-primary"
          (click)="doSearch(search.value, $event)">
          Search
      </button>
    </form>
    <ul class="list-group">
      <li class="list-group-item"
          *ngFor="let track of itunes.results">
        <img src="{{ track.thumbnail }}">
        <a target="_blank"
          href="{{ track.link }}">{{ track.name }}
        </a>
      </li>
    </ul>
    <div class="text-center">
      <p class="lead" *ngIf="loading">Loading...</p>
    </div>
  `
})
class SearchComponent {
  private loading: boolean = false;

  constructor(private itunes: SearchService) { }

  doSearch(term: string, e: Object) {
    e.preventDefault();

    this.loading = true;
    this.itunes.search(term)
      .then(() => this.loading = false);
  }
}

@Component({
  selector: 'app',
  template: `
    <app-header></app-header>
    <div class="m-t-1">
      <router-outlet></router-outlet>
    <div>
  `
})
class AppComponent { }

// route configuration
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'find', redirectTo: 'search' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: 'home' }
];

// ngmodule
@NgModule({
  imports: [
    BrowserModule,
    JsonpModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent
  ],
  bootstrap: [AppComponent],
  providers: [SearchService]
})
class AppModule { }

// boostraping
platformBrowserDynamic().bootstrapModule(AppModule);