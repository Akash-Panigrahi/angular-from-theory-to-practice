/* Class */
class Person {
  firstname = '';
  lastname = '';

  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  name() {
    return `${this.firstname} ${this.lastname}`;
  }

  whoAreYou() {
    return `Hi I'm ${this.name()}`;
  }
}

/* Class Instance */
let sky = new Person('Sky', 'Kurosaki');
sky.whoAreYou();
// Hi I'm Sky Kurosaki


/* Inheritance */
class Student extends Person {
  course;

  constructor(firstname, lastname, course) {
    super(firstname, lastname);
    this.course = course;
  }

  whoAreYou() {
    return `${super.whoAreYou()} and I'm studying ${this.course}`;
  }
}

sky = new Student('Sky', 'Kurosaki', 'Angular 5');
console.log(sky.whoAreYou());
// Hi I'm Sky Kurosaki and I'm studying Angular 5


/* Access Modifiers */
class Person1 {
  protected firstname = '';
  private lastname = '';

  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  name() {
    return `${this.firstname} ${this.lastname}`;
  }

  whoAreYou() {
    return `Hi I'm ${this.name()}`;
  }
}

class Student1 extends Person1 {
  course;

  constructor(firstname, lastname, course) {
    super(firstname, lastname);
    this.course = course;
  }

  whoAreYou() {
    return `${super.whoAreYou()} and I'm studying ${this.course}`;
  }

  test() {
    console.log(this.firstname);
  }
}

let zen = new Student1('Zen', 'Shiba', 'Angular 5');
console.log(zen.whoAreYou());


/* Constructor Shortcut */
class Person3 {
  constructor(private firstName, private lastName) {
  }
}

/* Interfaces */
interface Human {
  firstname: string;
  lastname: string;
  name?: Function;
  isLate?(time: Date): Function;
}

class Person4 implements Human {
  firstname
  lastname
}

/*
interface Human {
  firstName: string;
  lastName: string;
  name?: Function;
  isLate?(time: Date): Function;
}

class Person implements Human {
  constructor(public firstName, public lastName) {
  }

  public name() {
    return `${this.firstName} ${this.lastName}`;
  }

  protected whoAreYou() {
    return `Hi i'm ${this.name()}`;
  }
}

class Student extends Person {
  constructor(public firstName, public lastName, public course) {
    super(firstName, lastName);
  }

  whoAreYou() {
    return `${super.whoAreYou()} and i'm studying ${this.course}`;
  }
}

let asim = new Student("Asim", "Hussain", "typescript");
console.log(asim.whoAreYou());
*/