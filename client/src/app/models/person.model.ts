export class Name {
  constructor(
    public first: string = '',
    public middle: string[] = [],
    public last: string = ''
  ) {
  }
}

export class Person {
  readonly id?: string;

  constructor(public name: Name = new Name(), public birthday: string = '') {
  }
}
