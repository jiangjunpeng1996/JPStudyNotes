interface IPerson {
  name: string
  age: number
  sayHi(): void
}

let person: IPerson = {
  name: 'John',
  age: 25,
  sayHi() {}
}

let person2: IPerson = {
  name: 'James',
  age: 26,
  sayHi() {}
}

