import {
  GenericConst,
  GenericModel,
  Length,
  StringConst,
} from './generic.model';

//####################
// CONSTRAINTS
//####################

export class PersonConst extends GenericConst {
  static readonly NAME = class {
    static readonly FIRST = new StringConst(
      new Length(2, 25),
      PersonConst.REGEX.ALPHA
    );
    static readonly MIDDLE = new StringConst(
      new Length(2, 25),
      PersonConst.REGEX.ALPHA
    );
    static readonly LAST = new StringConst(
      new Length(2, 25),
      PersonConst.REGEX.ALPHA_SYM
    );
    static readonly NICK = new StringConst(
      new Length(2, 25),
      PersonConst.REGEX.ALPHANUMERIC_SYM
    );
  };

  static readonly BIRTHDAY = new StringConst(
    new Length(10, 10),
    /^\d{4}-\d{2}-\d{2}$/
  );

  static readonly CONTACT = class {
    static readonly PHONE = new StringConst(
      new Length(10, 10),
      PersonConst.REGEX.NUMERIC
    );
    static readonly EMAIL = new StringConst(
      new Length(4, 50),
      PersonConst.REGEX.FREE
    );
  };
}

//####################
// TS MODEL
//####################

export class Name {
  first: string;
  middle: string[];
  last: string;

  nick: string[];

  constructor(
    first: string = '',
    middle: string[] = [],
    last: string = '',
    nick: string[] = []
  ) {
    this.first = first;
    this.middle = middle;
    this.last = last;
    this.nick = nick;
  }
}

export class Contact {
  phone: Phone[];
  email: Email[];

  constructor(phone: Phone[] = [], email: Email[] = []) {
    this.phone = phone;
    this.email = email;
  }
}

export enum PhoneType {
  MOBILE = 'mobile',
  HOME = 'home',
  WORK = 'work',
}

export enum EmailType {
  PERSONAL = 'personal',
  WORK = 'work',
}

export class Phone {
  type: PhoneType;
  number: string;

  constructor(type: PhoneType, number: string) {
    this.type = type;
    this.number = number;
  }
}

export class Email {
  type: EmailType;
  address: string;

  constructor(type: EmailType, address: string) {
    this.type = type;
    this.address = address;
  }
}

export class Person extends GenericModel {
  name: Name;
  birthday: string;
  contact: Contact;

  constructor(
    name: Name = new Name(),
    birthday: string = '',
    contact: Contact = new Contact()
  ) {
    super();
    this.name = name;
    this.birthday = birthday;
    this.contact = contact;
  }
}
