import { nanoid } from "nanoid";

export class Name {
  constructor(
    public first: string = "",
    public middle: string[] = [],
    public last: string = ""
  ) {}
}

export class Person {
  readonly id: string = nanoid();
  constructor(public name: Name = new Name(), public birthday: string = "") {}
}

export function validPerson(person: Person) {
  return (
    person.name.first.length >= 2 &&
    person.name.last.length >= 2 &&
    person.birthday.length === 10
  );
}
