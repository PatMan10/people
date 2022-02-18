import { Person, Name } from "./models";

export const people = new Map<string, Person>();
export const eminem = new Person(
  new Name("marshal", ["bruce"], "mathers", ["eminem", "slim shady"]),
  "1972-10-17"
);
export const jayZ = new Person(
  new Name("shawn", ["corey"], "carter", ["jay z", "hova", "jigga"]),
  "1969-12-04"
);
export const pac = new Person(
  new Name("lesane", ["parish"], "crooks", ["2 pac"]),
  "1971-06-16"
);
export const biggie = new Person(
  new Name("christopher", ["george", "latore"], "wallace", ["biggie smalls"]),
  "1972-05-21"
);
export const logic = new Person(
  new Name("robert", ["bryson"], "hall", ["logic"]),
  "1990-01-22"
);

export function seedPeople() {
  people.clear();
  people
    .set(eminem.id, eminem)
    .set(jayZ.id, jayZ)
    .set(pac.id, pac)
    .set(biggie.id, biggie)
    .set(logic.id, logic);
}
