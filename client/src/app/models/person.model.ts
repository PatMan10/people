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

export class Person extends GenericModel {
  constructor(
    public name: Name = new Name(),
    public birthday: string = '',
    public contact: Contact = new Contact()
  ) {
    super();
  }
}

export class Name {
  constructor(
    public first: string = '',
    public middle: string[] = [],
    public last: string = '',
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
      MOBILE = 'mobile',
      HOME = 'home',
      WORK = 'work',
    }
  }

  export class Email {
    constructor(public type: Email.Type, public address: string) {}
  }

  export namespace Email {
    export enum Type {
      PERSONAL = 'personal',
      WORK = 'work',
    }
  }
}
