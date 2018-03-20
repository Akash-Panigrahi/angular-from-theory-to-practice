import {
  platformBrowserDynamic
} from "@angular/platform-browser-dynamic";
import {
  BrowserModule
} from "@angular/platform-browser";
import {
  NgModule,
  Component,
  Input,
  Output,
  EventEmitter,
  Pipe,
  Inject,
  InjectionToken
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

@Pipe({
  name: "clean"
})
class CleanPipe {
  transform(value: string, badWords: string): string {
    const badWordsList = badWords
      .split(",")
      .map(item => item.trim());

    for (const badWord of badWordsList) {
      value = value.replace(badWord, "$%#@!");
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

const MAX_JOKES_TOKEN = new InjectionToken<string>("Max Jokes");

class JokeService {
  jokes: Joke[];

  constructor(@Inject(MAX_JOKES_TOKEN) public maxJokes: number) {
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?", "Halloumi (Hello Me)"),
      new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
      new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’")
    ];
  }

  addJoke(joke: Joke) {
    if (this.jokes.length > this.maxJokes) {
      this.jokes.splice(this.jokes.length - 1);
    }

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
  selector: "joke",
  template: `
    <div class="card card-block">
      <h4 class="card-title">{{data.setup | clean:"boo,damn,hell"}}</h4>
      <p class="card-text" [hidden]="data.hide">{{data.punchline | clean:"boo,damn,hell"}}</p>
      <a class="btn btn-warning" style="color: white" (click)="data.toggle()">Tell me</a>
      <a class="btn btn-danger" style="color: white" (click)="jokeToDelete()">Delete</a>
    </div>
  `
})
class JokeComponent implements OnInit {
  @Input("joke") data: Joke;
  @Output() jokeDeleted = new EventEmitter<Joke>();

  jokeToDelete() {
    this.jokeDeleted.emit(this.data);
  }
}

@Component({
  selector: "joke-form",
  template: `
    <div class="card card-block">
      <h4 class="card-title">Create Joke</h4>
      <form (ngSubmit)="onSubmit()" [formGroup]="myform" novalidate>
        <div class="form-group"
            [ngClass]="{
              'has-danger': setup.invalid && (setup.dirty || setup.touched),
              'has-success': setup.valid && (setup.dirty || setup.touched)
            }">
          <input type="text"
              class="form-control"
              formControlName="setup"
              placeholder="Enter the setup">
          <div class="form-control-feedback"
              *ngIf="setup.errors && (setup.dirty || setup.touched)">
            <p *ngIf="setup.errors.required">Setup is required</p>
          </div>
        </div>
        <div class="form-group"
            [ngClass]="{
              'has-danger': punchline.invalid && (punchline.dirty || punchline.touched),
              'has-success': punchline.valid && (punchline.dirty || punchline.touched)
            }">
          <input type="text"
              class="form-control"
              placeholder="Enter the punchline"
              formControlName="punchline">
          <div class="form-control-feedback"
              *ngIf="punchline.errors && (punchline.dirty || punchline.touched)">
            <p *ngIf="punchline.errors.required">Punchline is required</p>
          </div>
        </div>
        <button type="submit"
            class="btn btn-primary">Create
        </button>
      </form>
    </div>
  `
})
class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();

  /* createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
  } */

  myform: FormGroup;
  setup: FormControl;
  punchline: FormControl;

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.setup = new FormControl("", Validators.required);
    this.punchline = new FormControl("", Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      setup: this.setup,
      punchline: this.punchline
    })
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log("Form Submitted");
      this.jokeCreated.emit(new Joke(this.setup.value, this.punchline.value));
      this.myform.reset();
    }
  }
}

@Component({
  selector: "joke-list",
  template: `
    <joke-form (jokeCreated)="jokeService.addJoke($event)">
    </joke-form>
    <joke *ngFor="let j of jokeService.jokes" [joke]="j" (jokeDeleted)="jokeService.deleteJoke($event)"></joke>
  `
})
class JokeListComponent {
  constructor(private jokeService: JokeService) { }
}

@Component({
  selector: "app",
  template: `
    <joke-list></joke-list>
  `
})
class AppComponent { }

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    JokeFormComponent,
    CleanPipe
  ],
  bootstrap: [AppComponent],
  providers: [
    JokeService,
    { provide: MAX_JOKES_TOKEN, useValue: 3 }
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);