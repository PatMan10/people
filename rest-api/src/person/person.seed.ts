import {
  Person,
  Name,
  Contact,
  Phone,
  PhoneType,
  Email,
  EmailType,
} from './person.model';
import { god } from '../user/user.seed';

const eminem = (): Person =>
  new Person(
    god._id,
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
const jayZ = (): Person =>
  new Person(
    god._id,
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
const pac = (): Person =>
  new Person(
    god._id,
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
const biggie = (): Person =>
  new Person(
    god._id,
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
const logic = (): Person =>
  new Person(
    god._id,
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

export const getPeople = (): Person[] => [
  eminem(),
  jayZ(),
  pac(),
  biggie(),
  logic(),
];
