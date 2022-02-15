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

export const people = new Map<string, Person>();
export const eminem = new Person(
  new Name("marshal", ["bruce"], "mathers"),
  "1972-10-17"
);
export const jayZ = new Person(
  new Name("shawn", ["corey"], "carter"),
  "1969-12-04"
);
export const pac = new Person(
  new Name("lesane", ["parish"], "crooks"),
  "1971-06-16"
);
export const biggie = new Person(
  new Name("christopher", ["george", "latore"], "wallace"),
  "1972-05-21"
);
export const logic = new Person(
  new Name("robert", ["bryson"], "hall"),
  "1990-01-22"
);
people
  .set(eminem.id, eminem)
  .set(jayZ.id, jayZ)
  .set(pac.id, pac)
  .set(biggie.id, biggie)
  .set(logic.id, logic);
