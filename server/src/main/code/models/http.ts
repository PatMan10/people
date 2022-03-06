export class Body<T> {
  constructor(readonly payload?: T, readonly error?: Error) {}
}

export class Error {
  constructor(readonly message: string) {}
}
