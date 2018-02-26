import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule,
  Component,
  Directive,
  HostListener,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer
} from '@angular/core';

class Joke {
  setup: string;
  punchline: string;
  hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'joke',
  template: `
    <div class='card card-block' [ccCardHover]="{querySelector:'.card-text'}">
      <h4 class='card-title'>{{data.setup}}</h4>
      <p class='card-text' [style.display]="'none'">{{data.punchline}}</p>
      <!-- <a class='btn btn-warning' style='color: white' (click)='data.toggle()'>Tell me</a>
      <a class='btn btn-danger' style='color: white' (click)='jokeToDelete()'>Delete</a> -->
    </div>
  `
})
class JokeComponent {
  @Input('joke') data: Joke;
  @Output() jokeDeleted = new EventEmitter<Joke>();

  jokeToDelete() {
    this.jokeDeleted.emit(this.data);
  }
}

@Component({
  selector: 'joke-form',
  template: `
    <div class='card card-block'>
      <h4 class='card-title'>Create Joke</h4>
      <div class='form-group'>
        <input type='text'
              class='form-control'
              placeholder='Enter the setup'
              #setup>
      </div>
      <div class='form-group'>
        <input type='text'
              class='form-control'
              placeholder='Enter the punchline'
              #punchline>
      </div>
      <button type='button'
              class='btn btn-primary'
              (click)='createJoke(setup.value, punchline.value)'>Create
      </button>
    </div>
  `
})
class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();

  createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
  }
}

@Component({
  selector: 'joke-list',
  template: `
    <joke-form (jokeCreated)='addJoke($event)'>
    </joke-form>
    <joke *ngFor='let j of jokes' [joke]='j' (jokeDeleted)='deleteJoke($event)'></joke>
  `
})
class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke('What did the cheese say when it looked in the mirror?', 'Halloumi (Hello Me)'),
      new Joke('What kind of cheese do you use to disguise a small horse?', 'Mask-a-pony (Mascarpone)'),
      new Joke('A kid threw a lump of cheddar at me', 'I thought ‘That’s not very mature’')
    ];
  }

  addJoke(joke: Joke) {
    this.jokes.unshift(joke);
  }

  deleteJoke(joke: Joke) {
    const indexToDelete = this.jokes.indexOf(joke);
    if (indexToDelete != -1) {
      this.jokes.splice(indexToDelete, 1);
    }
  }
}

@Directive({
  selector: '[ccCardHover]'
})
class CardHoverDirective {
  @Input('ccCardHover') config: Object = {
    querySelector: '.card-text'
  }

  @HostBinding('class.card-outline-primary') private ishovering: boolean;

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  @HostListener('mouseover') onMouseOver() {
    const part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setElementStyle(part, 'display', 'block');
    this.ishovering = true;
  }

  @HostListener('mouseout') onMouseOut() {
    const part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setElementStyle(part, 'display', 'none');
    this.ishovering = false;
  }
}

@Component({
  selector: 'app',
  template: `
    <joke-list></joke-list>
  `
})
class AppComponent { }

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    JokeFormComponent,
    CardHoverDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);