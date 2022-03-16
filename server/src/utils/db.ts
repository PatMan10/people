import {
  Person,
  Name,
  Contact,
  Phone,
  PhoneType,
  Email,
  EmailType,
} from '../models/person.model';

export const eminem = new Person(
  new Name('marshal', ['bruce'], 'mathers', ['eminem', 'slim shady']),
  '1972-10-17',
  new Contact(
    [
      new Phone(PhoneType.MOBILE, '0123456789'),
      new Phone(PhoneType.WORK, '0987654321'),
    ],
    [
      new Email(EmailType.PERSONAL, 'eminem@me.com'),
      new Email(EmailType.WORK, 'eminem@work.com'),
    ],
  ),
);
export const jayZ = new Person(
  new Name('shawn', ['corey'], 'carter', ['jay z', 'hova', 'jigga']),
  '1969-12-04',
  new Contact(
    [
      new Phone(PhoneType.MOBILE, '0123456789'),
      new Phone(PhoneType.WORK, '0987654321'),
    ],
    [
      new Email(EmailType.PERSONAL, 'jayZ@me.com'),
      new Email(EmailType.WORK, 'jayZ@work.com'),
    ],
  ),
);
export const pac = new Person(
  new Name('lesane', ['parish'], 'crooks', ['2 pac']),
  '1971-06-16',
  new Contact(
    [
      new Phone(PhoneType.MOBILE, '0123456789'),
      new Phone(PhoneType.WORK, '0987654321'),
    ],
    [
      new Email(EmailType.PERSONAL, '2pac@me.com'),
      new Email(EmailType.WORK, '2pac@work.com'),
    ],
  ),
);
export const biggie = new Person(
  new Name('christopher', ['george', 'latore'], 'wallace', ['biggie smalls']),
  '1972-05-21',
  new Contact(
    [
      new Phone(PhoneType.MOBILE, '0123456789'),
      new Phone(PhoneType.WORK, '0987654321'),
    ],
    [
      new Email(EmailType.PERSONAL, 'biggie@me.com'),
      new Email(EmailType.WORK, 'biggie@work.com'),
    ],
  ),
);
export const logic = new Person(
  new Name('robert', ['bryson'], 'hall', ['logic']),
  '1990-01-22',
  new Contact(
    [
      new Phone(PhoneType.MOBILE, '0123456789'),
      new Phone(PhoneType.WORK, '0987654321'),
    ],
    [
      new Email(EmailType.PERSONAL, 'logic@me.com'),
      new Email(EmailType.WORK, 'logic@work.com'),
    ],
  ),
);

export const people = [eminem, jayZ, pac, biggie, logic];
