import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, NgModule, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'ngfor-example',
  template: `
    <h3>NgFor</h3>
    <ul>
      <li *ngFor="let person of people; let i = index">
        <p>{{ i + 1 }} - {{ person.name }}</p>
      </li>
    </ul>
 `
})
class NgForExampleComponent {
  people: Object[] = [
    {
      "name": "Douglas Pace"
    },
    {
      "name": "Mcleod Mueller"
    },
    {
      "name": "Day Meyers"
    },
    {
      "name": "Aguirre Ellis"
    },
    {
      "name": "Cook Tyson"
    }
  ];
}

@Component({
  selector: 'ngfor-grouped-example',
  template: `
    <h3>NgFor (grouped)</h3>
    <ul *ngFor="let group of peopleByCountry; let i = index">
      <li>{{ i + 1 }} -- {{ group.country }}</li>
      <ul>
        <li *ngFor="let person of group.people; let i = index">
          {{ i + 1 }} _ {{ person.name }}
        </li>
      </ul>
    </ul>
 `
})
class NgForGroupedExampleComponent {
  peopleByCountry: any[] = [
    {
      'country': 'UK',
      'people': [
        {
          "name": "Douglas Pace"
        },
        {
          "name": "Mcleod Mueller"
        },
      ]
    },
    {
      'country': 'US',
      'people': [
        {
          "name": "Day Meyers"
        },
        {
          "name": "Aguirre Ellis"
        },
        {
          "name": "Cook Tyson"
        }
      ]
    }
  ];
}

@Component({
  selector: 'ngif-example',
  template: `
    <h4>NgIf</h4>
    <ul *ngFor="let person of people">
      <li *ngIf="person.age < 30">
      {{ person.name }} ({{ person.age }})
      </li>
    </ul>
  `
})
class NgIfExampleComponent {
  people: any[] = [
    {
      "name": "Douglas  Pace",
      "age": 35
    },
    {
      "name": "Mcleod  Mueller",
      "age": 32
    },
    {
      "name": "Day  Meyers",
      "age": 21
    },
    {
      "name": "Aguirre  Ellis",
      "age": 34
    },
    {
      "name": "Cook  Tyson",
      "age": 32
    }
  ];
}

@Component({
  selector: 'ngswitch-example',
  template: `
    <h4>NgSwitch</h4>
    <ul *ngFor="let person of people"
        [ngSwitch]="person.country">
      <li *ngSwitchCase="'UK'"
          class="text-success">{{ person.name }} ({{ person.country }})
      </li>
      <li *ngSwitchCase="'USA'"
          class="text-primary">{{ person.name }} ({{ person.country }})
      </li>
      <li *ngSwitchCase="'HK'"
          class="text-danger">{{ person.name }} ({{ person.country }})
      </li>
      <li *ngSwitchDefault
          class="text-warning">{{ person.name }} ({{ person.country }})
      </li>
    </ul>
  `
})
class NgSwitchExampleComponent {
  people: any[] = [
    {
      "name": "Douglas  Pace",
      "age": 35,
      "country": 'MARS'
    },
    {
      "name": "Mcleod  Mueller",
      "age": 32,
      "country": 'USA'
    },
    {
      "name": "Day  Meyers",
      "age": 21,
      "country": 'HK'
    },
    {
      "name": "Aguirre  Ellis",
      "age": 34,
      "country": 'UK'
    },
    {
      "name": "Cook  Tyson",
      "age": 32,
      "country": 'USA'
    }
  ];
}

@Component({
  selector: 'ngstyle-example',
  template: `
    <h4>NgStyle</h4>
    <ul *ngFor="let person of people">
      <li
        [style.font-size.px]=24
        [ngStyle]="{
          'color':getColor(person.country),
          'display':'inline-block',
          'border-radius.px':5,
          'padding':'3px 7px'
        }"
        [style.background-color]="'rgba(0, 0, 0, 0.2)'"
      >{{ person.name }} ({{ person.country }})
      </li>
    </ul>
  `
})
class NgStyleExampleComponent {

  getColor(country: string): string {
    switch (country) {
      case 'UK':
        return 'green';
      case 'USA':
        return 'blue';
      case 'HK':
        return 'red';
      case 'Italy':
        return 'rebeccapurple';
      default:
        return 'goldenrod';
    }
  }

  people: any[] = [
    {
      "name": "Aishwariya Rai",
      "country": 'IND'
    },
    {
      "name": "Kate Beckinsale",
      "country": 'Italy'
    },
    {
      "name": "Day  Meyers",
      "country": 'HK'
    },
    {
      "name": "Aguirre  Ellis",
      "country": 'UK'
    },
    {
      "name": "Cook  Tyson",
      "country": 'USA'
    }
  ];
}

@Component({
  selector: 'ngclass-example',
  template: `
    <h4>NgClass</h4>
    <ul *ngFor="let person of people">
      <li
        [ngClass]="{
          'text-success':person.country === 'UK',
          'text-primary':person.country === 'USA',
          'text-danger':person.country === 'HK'
        }"
      >{{ person.name }} ({{ person.country }})
      </li>
    </ul>

    <!--
    <ul *ngFor="let person of people">
      <li
        [class.text-success]="person.country === 'UK'"
        [class.text-primary]="person.country === 'USA'"
        [class.text-danger]="person.country === 'HK'"
      >{{ person.name }} ({{ person.country }})
      </li>
    </ul>
    -->
  `
})
class NgClassExampleComponent {

  getColor(country: string): string {
    switch (country) {
      case 'UK':
        return 'green';
      case 'USA':
        return 'blue';
      case 'HK':
        return 'red';
      case 'Italy':
        return 'rebeccapurple';
      default:
        return 'goldenrod';
    }
  }

  people: any[] = [
    {
      "name": "Aishwariya Rai",
      "country": 'IND'
    },
    {
      "name": "Kate Beckinsale",
      "country": 'Italy'
    },
    {
      "name": "Day  Meyers",
      "country": 'HK'
    },
    {
      "name": "Aguirre  Ellis",
      "country": 'UK'
    },
    {
      "name": "Cook  Tyson",
      "country": 'USA'
    }
  ];
}

@Component({
  selector: 'ngnonbindable-example',
  template: `
    <h4>NgNonBindable</h4>
    <div>
      To render the name variable we use this syntax
      <pre ngNonBindable>{{ name }}</pre>
    </div>
 `
})
class NgNonBindableExampleComponent {
}

@Component({
  selector: 'directive-app',
  template: `
    <br>
    <ngnonbindable-example></ngnonbindable-example>
    <br>
    <ngclass-example></ngclass-example>
    <br>
    <ngstyle-example></ngstyle-example>
    <br>
    <ngswitch-example></ngswitch-example>
    <br>
    <ngif-example></ngif-example>
    <br>
    <ngfor-grouped-example></ngfor-grouped-example>
    <br>
    <ngfor-example></ngfor-example>
  `
})
class DirectivesAppComponent { }

@NgModule({
  imports: [BrowserModule],
  declarations: [
    DirectivesAppComponent,
    NgForExampleComponent,
    NgForGroupedExampleComponent,
    NgIfExampleComponent,
    NgSwitchExampleComponent,
    NgStyleExampleComponent,
    NgClassExampleComponent,
    NgNonBindableExampleComponent
  ],
  bootstrap: [DirectivesAppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);