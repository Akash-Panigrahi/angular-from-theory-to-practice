import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule,
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'model-form',
  template: `
    <form [formGroup]="myform" novalidate>
      <fieldset formGroupName="name">
        <div class="form-group">
          <label>First Name</label>
          <input type="text"
                class="form-control"
                formControlName="firstName"
                required>
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input type="text"
                class="form-control"
                formControlName="lastName"
                required>
        </div>
      </fieldset>

      <div class="form-group">
        <label>Email</label>
        <input type="email"
              class="form-control"
              formControlName="email"
              required>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password"
              class="form-control"
              formControlName="password"
              required>
      </div>

      <div class="form-group">
        <label>Language</label>
        <select class="form-control"
          formControlName="language">
          <option value="">Please select a language</option>
          <option *ngFor="let lang of langs"
                  [value]="lang">{{ lang }}
          </option>
        </select>
      </div>
    </form>
    <pre>{{ myform.value | json }}</pre>
  `
})
class ModelFormComponent implements OnInit {
  langs: string[] = [
    'English',
    'French',
    'German'
  ];
  myform: FormGroup;

  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl()
      }),
      email: new FormControl(),
      password: new FormControl(),
      language: new FormControl()
    });
  }
}

@Component({
  selector: 'app',
  template: `
    <model-form></model-form>
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
    ModelFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);