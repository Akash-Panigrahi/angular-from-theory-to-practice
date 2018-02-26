import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule,
  Component,
  Input,
  Output,
  EventEmitter,
  Pipe
} from '@angular/core';

@Pipe({
  name: 'clean'
})
class CleanPipe {
  transform(value: string, badWords: string): string {
    const badWordsList = badWords
      .split(',')
      .map(item => item.trim());
    console.log(badWordsList);

    for (const badWord of badWordsList) {
      value = value.replace(badWord, '$%#@!');
    }

    return value;
  }
}

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
    <div class='card card-block'>
      <h4 class='card-title'>{{data.setup | clean:'boo,damn,hell'}}</h4>
      <p class='card-text' [hidden]='data.hide'>{{data.punchline | clean:'boo,damn,hell'}}</p>
      <a class='btn btn-warning' style='color: white' (click)='data.toggle()'>Tell me</a>
      <a class='btn btn-danger' style='color: white' (click)='jokeToDelete()'>Delete</a>
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
    CleanPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);