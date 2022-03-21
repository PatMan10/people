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
import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Schema } from 'mongoose';
import {
  GenericConst,
  GenericModel,
  GenericModelDbSchema,
  Length,
  StringConst,
} from '../common/models/generic.model';

//####################
// CONSTRAINTS
//####################

export class PersonConst extends GenericConst {
  static readonly NAME = class {
    static readonly FIRST = new StringConst(
      new Length(2, 25),
      PersonConst.REGEX.ALPHA,
    );
    static readonly MIDDLE = new StringConst(
      new Length(2, 25),
      PersonConst.REGEX.ALPHA,
    );
    static readonly LAST = new StringConst(
      new Length(2, 25),
      PersonConst.REGEX.ALPHA_SYM,
    );
    static readonly NICK = new StringConst(
      new Length(2, 25),
      PersonConst.REGEX.ALPHANUMERIC_SYM,
    );
  };

  static readonly BIRTHDAY = new StringConst(
    new Length(10, 10),
    /^\d{4}-\d{2}-\d{2}$/,
  );

  static readonly CONTACT = class {
    static readonly PHONE = new StringConst(
      new Length(10, 10),
      PersonConst.REGEX.NUMERIC,
    );
    static readonly EMAIL = new StringConst(
      new Length(4, 50),
      PersonConst.REGEX.FREE,
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
    { each: true },
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

  constructor(
    first: string = '',
    middle: string[] = [],
    last: string = '',
    nick: string[] = [],
  ) {
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
  @IsEnum(PhoneType)
  type: PhoneType;

  @IsString()
  @dLength(
    PersonConst.CONTACT.PHONE.LENGTH.MIN,
    PersonConst.CONTACT.PHONE.LENGTH.MAX,
  )
  @Matches(PersonConst.CONTACT.PHONE.REGEX)
  @IsDefined()
  number: string;

  constructor(type: PhoneType, number: string) {
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
    PersonConst.CONTACT.EMAIL.LENGTH.MAX,
  )
  address: string;

  constructor(type: EmailType, address: string) {
    this.type = type;
    this.address = address;
  }
}

export class Person extends GenericModel {
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

  constructor(
    name: Name = new Name(),
    birthday: string = '',
    contact: Contact = new Contact(),
  ) {
    super();
    this.name = name;
    this.birthday = birthday;
    this.contact = contact;
  }
}

export class CreatePersonDto extends PickType(Person, [
  'name',
  'birthday',
  'contact',
]) {
  constructor(
    public name: Name = new Name(),
    public birthday: string = '',
    public contact: Contact = new Contact(),
  ) {
    super();
  }
}

export class UpdatePersonDto extends PickType(Person, [
  'name',
  'birthday',
  'contact',
]) {
  constructor(
    public name: Name = new Name(),
    public birthday: string = '',
    public contact: Contact = new Contact(),
  ) {
    super();
  }
}

//####################
// DB MODEL
//####################

export class PersonDbSchema extends GenericModelDbSchema {
  readonly name = {
    first: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: PersonConst.NAME.FIRST.LENGTH.MIN,
      maxlength: PersonConst.NAME.FIRST.LENGTH.MAX,
      match: PersonConst.NAME.FIRST.REGEX,
    },
    middle: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: PersonConst.NAME.MIDDLE.LENGTH.MIN,
        maxlength: PersonConst.NAME.MIDDLE.LENGTH.MAX,
        match: PersonConst.NAME.MIDDLE.REGEX,
      },
    ],
    last: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: PersonConst.NAME.LAST.LENGTH.MIN,
      maxlength: PersonConst.NAME.LAST.LENGTH.MAX,
      match: PersonConst.NAME.LAST.REGEX,
    },
    nick: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: PersonConst.NAME.NICK.LENGTH.MIN,
        maxlength: PersonConst.NAME.NICK.LENGTH.MAX,
        match: PersonConst.NAME.NICK.REGEX,
      },
    ],
  };

  readonly birthday = {
    type: String,
    required: true,
    trim: true,
    minlength: PersonConst.BIRTHDAY.LENGTH.MIN,
    maxlength: PersonConst.BIRTHDAY.LENGTH.MAX,
    match: PersonConst.BIRTHDAY.REGEX,
  };

  readonly contact = {
    phone: [
      {
        _id: false,
        type: {
          type: String,
          enum: PhoneType,
        },
        number: {
          type: String,
          required: true,
          trim: true,
          minlength: PersonConst.CONTACT.PHONE.LENGTH.MIN,
          maxlength: PersonConst.CONTACT.PHONE.LENGTH.MAX,
          match: PersonConst.CONTACT.PHONE.REGEX,
        },
      },
    ],

    email: [
      {
        _id: false,
        type: {
          type: String,
          enum: EmailType,
        },
        address: {
          type: String,
          required: true,
          trim: true,
          minlength: PersonConst.CONTACT.EMAIL.LENGTH.MIN,
          maxlength: PersonConst.CONTACT.EMAIL.LENGTH.MAX,
          match: PersonConst.CONTACT.EMAIL.REGEX,
        },
      },
    ],
  };
}

export const PersonSchema = new Schema<Person>(new PersonDbSchema());
