export class Person {
  readonly id: string = '';
  constructor(
    public name: Name = new Name(),
    public birthday: string = '',
    public phoneNumbers: PhoneNumber[] = [],
    public emails: Email[] = []
  ) {}
}

export class Name {
  constructor(
    public first: string = '',
    public middle: string[] = [],
    public last: string = '',
    public nick: string[] = []
  ) {}
}

export class PhoneNumber {
  constructor(public type: PhoneNumber.Type, public value: string) {}
}

export namespace PhoneNumber {
  export enum Type {
    MOBILE = 'mobile',
    HOME = 'home',
    WORK = 'work',
  }
}

export class Email {
  constructor(public type: Email.Type, public value: string) {}
}

export namespace Email {
  export enum Type {
    PERSONAL = 'personal',
    WORK = 'work',
  }
}

export function validPerson(person: Person) {
  return (
    person.name.first.length >= 2 &&
    person.name.last.length >= 2 &&
    person.birthday.length === 10
  );
}
