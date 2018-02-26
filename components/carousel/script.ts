import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  Component,
  NgModule,
  AfterContentInit,
  Input,
  QueryList,
  ContentChildren
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'carousel-item',
  template: `
    <div class="carousel-item text-center" [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
`
})
class CarouselItemComponent {
  isActive: boolean;
}

@Component({
  selector: 'carousel',
  template: `
    <div class="carousel slide">
      <div class="carousel-inner" role="listbox">
        <ng-content></ng-content>
      </div>
    </div>
`
})
class CarouselComponent implements AfterContentInit {
  @Input('delay') lateness: number;

  @ContentChildren(CarouselItemComponent) carouselItemsList: QueryList<CarouselItemComponent>;

  ngAfterContentInit() {
    const carouselItems: CarouselItemComponent[] = this.carouselItemsList.toArray();
    let count: number = 0;
    const max: number = carouselItems.length;

    setInterval(() => {
      let i = count % max;
      carouselItems.forEach((item: CarouselItemComponent) => item.isActive = false);
      carouselItems[i].isActive = true;
      count++;
    }, this.lateness);
  }
}


//TODO: Take a look at the markup below to see how you might implement this?
@Component({
  selector: 'app',
  template: `
    <carousel [delay]="2000">
      <carousel-item>
        <img src="https://unsplash.it/200?image=0" alt="">
      </carousel-item>
      <carousel-item>
        <img src="https://unsplash.it/200?image=5" alt="">
      </carousel-item>
      <carousel-item>
        <img src="https://unsplash.it/200?image=10" alt="">
      </carousel-item>
      <carousel-item>
        <img src="https://unsplash.it/200?image=15" alt="">
      </carousel-item>
      <carousel-item>
        <img src="https://unsplash.it/200?image=20" alt="">
      </carousel-item>
    </carousel>
    `
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CarouselItemComponent,
    CarouselComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);