import {
  IsArray,
  IsString,
  Length as dLength,
  Matches,
  IsEnum,
  IsEmail,
  ValidateNested,
  IsObject,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  GenericConst,
  Entity,
  Length,
  StringConst,
} from '../shared/models/generic.model';

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
    /^[\d{4}-\d{2}-\d{2}]+$/
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
  @IsString()
  @dLength(PersonConst.NAME.FIRST.LENGTH.MIN, PersonConst.NAME.FIRST.LENGTH.MAX)
  @Matches(PersonConst.NAME.FIRST.REGEX)
  first: string;

  @IsArray()
  @IsString({ each: true })
  @dLength(
    PersonConst.NAME.MIDDLE.LENGTH.MIN,
    PersonConst.NAME.MIDDLE.LENGTH.MAX,
    { each: true }
  )
  @Matches(PersonConst.NAME.MIDDLE.REGEX, { each: true })
  middle: string[];

  @IsString()
  @dLength(PersonConst.NAME.LAST.LENGTH.MIN, PersonConst.NAME.LAST.LENGTH.MAX)
  @Matches(PersonConst.NAME.LAST.REGEX)
  last: string;

  @IsArray()
  @IsString({ each: true })
  @dLength(PersonConst.NAME.NICK.LENGTH.MIN, PersonConst.NAME.NICK.LENGTH.MAX, {
    each: true,
  })
  @Matches(PersonConst.NAME.NICK.REGEX, { each: true })
  nick: string[];

  constructor(first = '', middle = [], last = '', nick = []) {
    this.first = first;
    this.middle = middle;
    this.last = last;
    this.nick = nick;
  }
}

export class Contact {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Phone)
  @IsObject({ each: true })
  phone: Phone[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Email)
  @IsObject({ each: true })
  email: Email[];

  constructor(phone = [], email = []) {
    this.phone = phone;
    this.email = email;
  }
}

export enum PhoneType {
  MOBILE = 'mobile',
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}

export enum EmailType {
  PERSONAL = 'personal',
  WORK = 'work',
  OTHER = 'other',
}

export class Phone {
  @IsEnum(PhoneType)
  type: PhoneType;

  @IsString()
  @dLength(
    PersonConst.CONTACT.PHONE.LENGTH.MIN,
    PersonConst.CONTACT.PHONE.LENGTH.MAX
  )
  @Matches(PersonConst.CONTACT.PHONE.REGEX)
  @IsDefined()
  number: string;

  constructor(type = PhoneType.MOBILE, number = '') {
    this.type = type;
    this.number = number;
  }
}

export class Email {
  @IsEnum(EmailType)
  type: EmailType;

  @IsEmail()
  @dLength(
    PersonConst.CONTACT.EMAIL.LENGTH.MIN,
    PersonConst.CONTACT.EMAIL.LENGTH.MAX
  )
  address: string;

  constructor(type = EmailType.PERSONAL, address = '') {
    this.type = type;
    this.address = address;
  }
}

export class Person extends Entity {
  @IsString()
  readonly creator = '';

  @ValidateNested()
  @Type(() => Name)
  @IsObject()
  name: Name;

  @IsString()
  @dLength(PersonConst.BIRTHDAY.LENGTH.MIN, PersonConst.BIRTHDAY.LENGTH.MAX)
  @Matches(PersonConst.BIRTHDAY.REGEX)
  birthday: string;

  @ValidateNested()
  @Type(() => Contact)
  @IsObject()
  contact: Contact;

  constructor(name = new Name(), birthday = '', contact = new Contact()) {
    super();
    this.name = name;
    this.birthday = birthday;
    this.contact = contact;
  }
}
