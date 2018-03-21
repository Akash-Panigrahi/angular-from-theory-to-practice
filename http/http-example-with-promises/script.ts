import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HttpModule, Http, Response } from "@angular/http";
import { NgModule, Component, Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

class SearchItem {
  constructor(
    public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string) {
  }
}

@Injectable()
class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private http: Http) {
    this.results = [];
    this.loading = false;
  }

  search(term: string) {
    return new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;

      this.http.get(apiURL)
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

@Component({
  selector: 'app',
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
class AppComponent {
  private loading: boolean = false;

  constructor(private itunes: SearchService) { }

  doSearch(term: string, e: Object) {
    e.preventDefault();

    this.loading = true;
    this.itunes.search(term)
      .then(() => this.loading = false);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  providers: [SearchService]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);