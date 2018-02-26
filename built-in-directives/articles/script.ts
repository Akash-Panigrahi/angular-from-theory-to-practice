import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  Component,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


class Article {
  constructor(public title: string,
    public date: Date,
    public content: string,
    public kind: string) {
  }
}


@Component({
  selector: 'recent-articles',
  template: `
    <div *ngFor="let article of articles" class="col-md-4">
      <div class="card" [class.card-outline-primary]="article.kind === 'text'" [class.card-outline-danger]="article.kind === 'image'">
        <div class="card-block">
          <h4 class="card-title">{{ article.title }}</h4>
          <p *ngIf="article.kind === 'text'" class="card-text">{{ article.content }}</p>
          <p class="card-text">
            <small class="text-muted">Last updated {{ article.date | date:'shortDate' }}</small>
          </p>
        </div>
        <img *ngIf="article.kind === 'image'" class="card-img-bottom img-fluid" src="{{ article.content }}">
      </div>
    </div>
  `
})
class RecentArticlesComponent {
  articles: Article[] = [
    new Article("Title 1", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 2", new Date(), "https://unsplash.it/400?image=10", "image"),
    new Article("Title 3", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 4", new Date(), "https://unsplash.it/400?image=20", "image"),
    new Article("Title 5", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 6", new Date(), "https://unsplash.it/400?image=30", "image")
  ];
}


@Component({
  selector: 'app',
  template: `
<div class="row">
  <recent-articles></recent-articles>
  </div>
`
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    RecentArticlesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);