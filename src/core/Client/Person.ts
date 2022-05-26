export interface IPersonConstructor {
  name: string,
  age: number
}

export default class Person {
  #name: string
  #age: number

  constructor({ age, name }: IPersonConstructor) {
    this.#name = name
    this.#age = age
  }

  get name() {
    return this.#name
  }
  
  get age() {
    return this.#age
  }
}
