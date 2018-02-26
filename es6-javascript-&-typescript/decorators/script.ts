/* Decorators */
function course(target) {
  Object.defineProperty(target.prototype, 'course', {
    value: () => "Angular 5"
  });
}

@course
class NewPerson {
  constructor(public firstname, public lastname) { }
}

let newSky = new NewPerson('Sky', 'Kurosaki');
console.log(newSky.course());

/* Decorators with arguments */
function NewCourse(config) {
  return function (target) {
    Object.defineProperty(
      target.prototype,
      'course',
      {
        value: () => config.course
      }
    )
  }
}

@NewCourse({
  course: 'Angular 5'
})
class NewerPerson { }

/* From codecraft */

function Student(config) {
  return function (target) {
    Object.defineProperty(target.prototype, 'course', { value: () => config.course })
  }
}

@Student({
  course: "angular3"
})
class Person {
  constructor(private firstName, private lastName) {
  }

  public name() {
    return `${this.firstName} ${this.lastName}`;
  }

  protected whoAreYou() {
    return `Hi i'm ${this.name()}`;
  }
}

let asim = new Person("Asim", "Hussain");
console.log(asim.course());