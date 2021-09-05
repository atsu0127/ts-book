interface Optional<T> {
  flatMap<U>(f: (value: T) => None): None
  flatMap<U>(f: (value: T) => Optional<U>): Optional<U>
  getOrElse (value: T): T
}
class Some<T> implements Optional<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None
  flatMap<U>(f: (value: T) => Some<U>): Some<U>
  flatMap<U>(f: (value: T) => Optional<U>): Optional<U> {
    return f(this.value)
  }
  getOrElse(): T {
    return this.value
  }
}
class None implements Optional<never> {
  flatMap(): None {
    return this
  }
  getOrElse<U>(value: U): U {
    return value
  }
}

function Optional<T>(value: null | undefined): None
function Optional<T>(value: T): Some<T>
function Optional<T>(value: T): Optional<T> {
  if (value == null) {
    return new None
  }
  return new Some(value)
}

function oask(str: string | null): Optional<string> {
  let result = str
  if (result === null) {
    return new None
  }
  return new Some(result)
}

function oparse(birthday: string): Optional<Date> {
  let date = new Date(birthday)
  if (!oisValid(date)) {
    return new None
  }
  return new Some(date)
}

function oisValid(date:Date) {
  return Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date.getTime())
}

let response = oask('20210102')
  .flatMap(oparse)
  .flatMap(date => new Some(date.toISOString()))
  .flatMap(date => new Some(`Date is ${date}`))
  .getOrElse('Error')
