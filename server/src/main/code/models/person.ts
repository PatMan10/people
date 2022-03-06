import Joi from "joi";
import { model, Schema } from "mongoose";
import {
  GenericConst,
  GenericModel,
  GenericModelDbSchema,
  GenericModelJoiSchema,
  Length,
  StringConst,
} from "./generic";

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

export class Person extends GenericModel {
  constructor(
    public name: Name = new Name(),
    public birthday: string = "",
    public contact: Contact = new Contact()
  ) {
    super();
  }
}

export class Name {
  constructor(
    public first: string = "",
    public middle: string[] = [],
    public last: string = "",
    public nick: string[] = []
  ) {}
}

export class Contact {
  constructor(
    public phone: Contact.Phone[] = [],
    public email: Contact.Email[] = []
  ) {}
}

export namespace Contact {
  export class Phone {
    constructor(public type: Phone.Type, public number: string) {}
  }

  export namespace Phone {
    export enum Type {
      MOBILE = "mobile",
      HOME = "home",
      WORK = "work",
    }
  }

  export class Email {
    constructor(public type: Email.Type, public address: string) {}
  }

  export namespace Email {
    export enum Type {
      PERSONAL = "personal",
      WORK = "work",
    }
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
          enum: Contact.Phone.Type,
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
          enum: Contact.Email.Type,
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

export const PersonModel = model(
  "Person",
  new Schema<Person>(new PersonDbSchema())
);

//####################
// MODEL JOI SCHEMA
//####################

export class PersonJoiSchema extends GenericModelJoiSchema {
  readonly name = Joi.object({
    first: Joi.string()
      .min(PersonConst.NAME.FIRST.LENGTH.MIN)
      .max(PersonConst.NAME.FIRST.LENGTH.MAX)
      .pattern(PersonConst.NAME.FIRST.REGEX)
      .label("first name")
      .required()
      .trim()
      .lowercase(),

    middle: Joi.array().items(
      Joi.string()
        .min(PersonConst.NAME.MIDDLE.LENGTH.MIN)
        .max(PersonConst.NAME.MIDDLE.LENGTH.MAX)
        .pattern(PersonConst.NAME.MIDDLE.REGEX)
        .label("middle name")
        .trim()
        .lowercase()
    ),

    last: Joi.string()
      .min(PersonConst.NAME.LAST.LENGTH.MIN)
      .max(PersonConst.NAME.LAST.LENGTH.MAX)
      .pattern(PersonConst.NAME.LAST.REGEX)
      .label("last name")
      .required()
      .trim()
      .lowercase(),

    nick: Joi.array().items(
      Joi.string()
        .min(PersonConst.NAME.NICK.LENGTH.MIN)
        .max(PersonConst.NAME.NICK.LENGTH.MAX)
        .pattern(PersonConst.NAME.NICK.REGEX)
        .label("nickname")
        .trim()
        .lowercase()
    ),
  });

  readonly birthday = Joi.string()
    .min(PersonConst.BIRTHDAY.LENGTH.MIN)
    .max(PersonConst.BIRTHDAY.LENGTH.MAX)
    .pattern(PersonConst.BIRTHDAY.REGEX)
    .label("birthday")
    .required()
    .trim();

  readonly contact = {
    phone: Joi.array().items(
      Joi.object({
        type: Joi.string()
          .valid(...Object.values(Contact.Phone.Type))
          .label("phone type")
          .trim(),

        value: Joi.string()
          .min(PersonConst.CONTACT.PHONE.LENGTH.MIN)
          .max(PersonConst.CONTACT.PHONE.LENGTH.MAX)
          .pattern(PersonConst.CONTACT.PHONE.REGEX)
          .label("phone number")
          .trim(),
      })
    ),

    email: Joi.array().items(
      Joi.object({
        type: Joi.string()
          .valid(...Object.values(Contact.Email.Type))
          .label("email type")
          .trim(),

        value: Joi.string()
          .min(PersonConst.CONTACT.EMAIL.LENGTH.MIN)
          .max(PersonConst.CONTACT.EMAIL.LENGTH.MAX)
          .pattern(PersonConst.CONTACT.EMAIL.REGEX)
          .label("email address")
          .trim(),
      })
    ),
  };
}

