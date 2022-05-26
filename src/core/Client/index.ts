import Person, { IPersonConstructor } from './Person'

interface IClienteConstructor extends IPersonConstructor {
  id?: string
}

export default class Client extends Person {
  #id?: string

  // (DEV)
  static init() {
    return new Client({ name: 'Maycon Silva', age: 22 })
  }

  constructor({ id, name, age }: IClienteConstructor) {
    super({ age, name })
    this.#id = id
  }

  get id() {
    return this.#id
  }
}
